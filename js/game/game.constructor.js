(function()
{
	var self = memory_script;

	/**
	 * Constructor.
	 *
	 * @param cellCountX
	 * @param cellCountY
	 */
	self.Game = function(cellCountX, cellCountY)
	{
		// Variables
		this.cellCountX         = cellCountX;
		this.cellCountY         = cellCountY;
		this.players            = [new self.Player('Player 1'), new self.Player('Player 2')];
		this.currentPlayerIndex = Math.floor(Math.random() * this.players.length);
		this.turnedCardElements = [];

		// Elements
		this.$board            = $$('.board');
		this.$revealTimeSlider = $$('.card-view-time-slider');

		// Events
		this.$board.addEvent('click:relay(.card-container)', (function(event, element){ this.handleCardClick(element); }).bind(this));

		// Start up
		this.prepareBoard(cellCountX, cellCountY);
	};

	/**
	 * Handles a click on a card.
	 *
	 * @param element
	 */
	self.Game.prototype.handleCardClick = function(element)
	{
		var $element = $$(element);

		if (this.turnedCardElements.length >= 2)
		{
			return;
		}

		$element.addClass('flipped');

		this.turnedCardElements.push($element);

		if (this.turnedCardElements.length >= 2)
		{

		}
	};
})();