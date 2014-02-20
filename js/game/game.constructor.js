(function()
{
	var self = memoryScript;

	/**
	 * Constructor.
	 *
	 * @param cellCountX
	 * @param cellCountY
	 */
	self.Game = function(cellCountX, cellCountY)
	{
		// Variables
		this.cellCountX          = cellCountX;
		this.cellCountY          = cellCountY;
		this.players             = [];
		this.currentPlayerIndex  = 0;
		this.turnedCardElements  = [];
		this.turnTimer           = null;
		this.loadingBarAnimation = null;
		this.startTime           = Math.round((new Date()).getTime() / 1000);

		// Elements
		this.$board                  = $$('.board');
		this.$turnTimeSlider         = $$('.turn-time-slider');
		this.$turnTimeSliderValue    = $$('.turn-time-slider-value');
		this.$currentPlayerNameField = $$('.current-player-name');
		this.$playerScores           = $$('.player-scores');
		this.$loadingBarBackground   = $$('.loading-bar-background');
		this.$loadingBarProgress     = $$('.loading-bar-progress');
		this.$endOfGameScreen        = $$('.end-of-game-screen');

		// Events
		this.$turnTimeSlider.addEvent('change', (function(){ this.handleTurnTimeSliderChange(); }).bind(this));
		this.$board.addEvent('click:relay(.card-container)', (function(event, element){ this.handleCardClick(element); }).bind(this));

		// Start up
		this.$playerScores.set('text', '');

		this.players.push(new self.Player('Player 1'));
		this.players.push(new self.Player('Player 2'));

		this.currentPlayerIndex = Math.floor(Math.random() * this.players.length);

		this.$endOfGameScreen.setStyle('height', 0);

		this.nextTurn(true);
		this.prepareBoard(this.cellCountX, this.cellCountY);
	};

	/**
	 * Fires when the turn time slider changes.
	 */
	self.Game.prototype.handleTurnTimeSliderChange = function()
	{
		this.$turnTimeSliderValue.set('text', Math.round(this.getTurnTime() / 100) / 10);
	};

	/**
	 * Handles a click on a card.
	 *
	 * @param element
	 */
	self.Game.prototype.handleCardClick = function(element)
	{
		var $element     = $$(element),
			elementIndex = 0;

		// Prevent flipping cards when card is already flipped or two cards have been opened in the same turn
		if (this.turnedCardElements.length >= 2 ||
			$element[0].hasClass('flipped'))
		{
			return;
		}

		// Start the timer of the turn if it hasn't already been started
		if (this.turnTimer == null)
		{
			this.startTurnTimer();
		}

		$element.addClass('flipped');

		this.turnedCardElements.push($element);

		// When two cards have been turned, wait a defined number of seconds
		if (this.turnedCardElements.length >= 2)
		{
			// Check if card values match
			if (this.turnedCardElements[0].getElement('.card-back')[0].get('text') == this.turnedCardElements[1].getElement('.card-back')[0].get('text'))
			{
				this.turnedCardElements = [];

				this.players[this.currentPlayerIndex].incrementScore();

				if (this.loadingBarAnimation != null)
				{
					this.loadingBarAnimation.cancel();
				}

				// Check if end of game state was reached
				if (this.isEndOfGame())
				{
					this.handleEndOfGame();

					return;
				}

				this.nextTurn(false);
			}
		}
	};

	/**
	 * Start turn timer.
	 */
	self.Game.prototype.startTurnTimer = function()
	{
		this.resetTurnTimer();

		// Animate loading bar
		this.loadingBarAnimation = new Fx.Tween(this.$loadingBarProgress[0], {
			duration  : this.getTurnTime(),
			transition: 'linear',
			property  : 'width',
			onComplete: (function(){ this.$loadingBarProgress.setStyle('width', 0); }).bind(this),
			onCancel  : (function(){ this.$loadingBarProgress.setStyle('width', 0); }).bind(this)
		}).start(0, this.$loadingBarBackground.getSize()[0].x + 2);

		// Go to next turn when the turn time runs out
		this.turnTimer = setTimeout((function()
		{
			this.nextTurn(true);
		}).bind(this), this.getTurnTime())
	};

	/**
	 * Start turn timer.
	 */
	self.Game.prototype.resetTurnTimer = function()
	{
		if (this.loadingBarAnimation != null)
		{
			this.loadingBarAnimation.cancel();
		}

		clearTimeout(this.turnTimer);

		this.turnTimer = null;
	};

	/**
	 * Go to next turn.
	 *
	 * @param nextPlayer
	 */
	self.Game.prototype.nextTurn = function(nextPlayer)
	{
		var nextPlayerIndex = this.currentPlayerIndex,
			elementIndex    = 0;

		// Set next player if next player is true
		if (nextPlayer)
		{
			nextPlayerIndex += 1;

			if (nextPlayerIndex >= this.players.length)
			{
				nextPlayerIndex = 0;
			}

			this.$currentPlayerNameField.set('text', this.players[nextPlayerIndex].name);

			this.currentPlayerIndex = nextPlayerIndex;
		}

		// Flip cards that haven't been matched yet
		for (elementIndex; elementIndex < this.turnedCardElements.length; elementIndex++)
		{
			this.turnedCardElements[elementIndex].removeClass('flipped');
		}

		this.turnedCardElements = [];

		this.resetTurnTimer();
	};

	/**
	 * Returns the period of time in milliseconds the cards are set to be shown for.
	 *
	 * @return int turnTime
	 */
	self.Game.prototype.getTurnTime = function()
	{
		var turnTime = parseInt(this.$turnTimeSlider[0].get('value'));

		if (isNaN(turnTime))
		{
			return 5000;
		}

		return turnTime;
	};

	/**
	 * Checks if end of game state is reached.
	 *
	 * @return boolean
	 */
	self.Game.prototype.isEndOfGame = function()
	{
		return this.$board.getElements('.card-container.flipped')[0].length >= this.cellCountX * this.cellCountY;
	};

	/**
	 * Handles the end of the game.
	 */
	self.Game.prototype.handleEndOfGame = function()
	{
		var $endOfGameScreenContent       = this.$endOfGameScreen.getElement('.end-of-game-screen-content'),
			$winnerPlayerNameField        = this.$endOfGameScreen.getElement('.winner-player-name'),
			$totalPlayTimeContainer       = this.$endOfGameScreen.getElement('.total-play-time-container'),
			$totalPlayTimeField           = $totalPlayTimeContainer.getElement('.total-play-time'),
			$totalScoreContainer          = this.$endOfGameScreen.getElement('.total-score-container'),
			$totalScoreField              = $totalScoreContainer.getElement('.total-score'),
			highestScore                  = -1,
			playersWithHighestScore       = [],
			playersWithHighestScoreString = '',
			playerIndex;

		// Determine winner
		for (playerIndex = 0; playerIndex < this.players.length; playerIndex++)
		{
			if (this.players[playerIndex].score > highestScore)
			{
				playersWithHighestScore = [ this.players[playerIndex] ];

				highestScore = this.players[playerIndex].score;
			}
			else if (this.players[playerIndex].score == highestScore)
			{
				playersWithHighestScore.push(this.players[playerIndex]);
			}
		}

		// Put winning player's names into the congratulations message
		for (playerIndex = 0; playerIndex < playersWithHighestScore.length; playerIndex++)
		{
			playersWithHighestScoreString += playersWithHighestScore[playerIndex].name;

			if (playerIndex < playersWithHighestScore.length - 1)
			{
				playersWithHighestScoreString += ' and ';

				continue;
			}

			break;
		}

		$winnerPlayerNameField.set('text', playersWithHighestScoreString);
		$totalPlayTimeField.set('text', Math.round((((new Date).getTime() / 1000) - this.startTime) * 100) / 100);
		$totalScoreField.set('text', highestScore);

		this.$endOfGameScreen.setStyle('width' , this.$board.getSize()[0].x);
		this.$endOfGameScreen.setStyle('height', this.$board.getSize()[0].y);
		this.$endOfGameScreen.setStyle('top'   , -(this.$board.getSize()[0].y));

		$endOfGameScreenContent.setStyle('margin-top', (this.$board.getSize()[0].y - $endOfGameScreenContent.getSize()[0].y) / 2);

		new Fx.Tween(this.$endOfGameScreen[0], {
			duration  : 2000,
			transition: 'bounce:out',
			property  : 'top'
		}).start(-this.$board.getSize()[0].y, 0);
	};
})();