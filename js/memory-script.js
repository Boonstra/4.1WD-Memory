memory_script = function()
{
	var self = {
		cellCountX: 4,
		cellCountY: 4
	};

	/**
	 * Initialize.
	 */
	self.init = function()
	{
		self.$newGameButton = $$('.new-game-button');

		self.$cardViewTimeSlider      = $$('.card-view-time-slider');
		self.$cardViewTimeSliderValue = $$('.card-view-time-slider-value');

		self.$board = $$('.board');

		self.prepareBoard();

		// Listeners
		self.$newGameButton.addEvent('click', function(event){ event.preventDefault(); self.prepareBoard(); });

		self.$board.addEvent('click:relay(.card-container)', function(event, element){ self.handleCardClick(element); });
	};

	/**
	 * Prepare the board for a new game.
	 */
	self.prepareBoard = function()
	{
		var $cardContainer,
			$cardFlipper,
			$cardFront,
			$cardBack,
			cellX,
			cellY,
			alphabet,
			alphabetCharacter,
			alphabetCharacterIndex,
			cardValues,
			cardValuesCharacterIndex;

		alphabet = [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z'
		];

		cardValues = [];

		for (null; cardValues.length < self.cellCountX * self.cellCountY; null)
		{
			alphabetCharacterIndex = Math.floor(Math.random() * alphabet.length);

			alphabetCharacter = alphabet[alphabetCharacterIndex];

			// The same character needs to be added twice
			cardValues.push(alphabetCharacter, alphabetCharacter);

			alphabet.splice(alphabetCharacterIndex, 1);
		}

		self.$board.set('html', '');

		for (cellY = 0; cellY < self.cellCountY; cellY++)
		{
			for (cellX = 0; cellX < self.cellCountX; cellX++)
			{
				cardValuesCharacterIndex = Math.floor(Math.random() * cardValues.length);

				$cardContainer = new Element('div', { 'class': 'card-container' });
				$cardFlipper   = new Element('div', { 'class': 'card-flipper' });
				$cardFront     = new Element('div', { 'class': 'card-front', 'html': '*' });
				$cardBack      = new Element('div', { 'class': 'card-back', 'html': cardValues[cardValuesCharacterIndex] });

				cardValues.splice(cardValuesCharacterIndex, 1);

				$cardFlipper.adopt($cardFront, $cardBack);

				$cardContainer.adopt($cardFlipper);

				self.$board.adopt($cardContainer);
			}

			self.$board.adopt(new Element('div', { 'class': 'clear' }));
		}
	};

	/**
	 * Handles a click on a card.
	 *
	 * @param element
	 */
	self.handleCardClick = function(element)
	{
		var $element = $$(element);

		$element.addClass('flipped');
	};

	window.addEvent('domready', function()
	{
		self.init();
	});
}();

// @codekit-append game/game.constructor.js
// @codekit-append game/game.turn.js
// @codekit-append player/player.constructor.js
