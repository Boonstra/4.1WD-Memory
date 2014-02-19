(function()
{
	var self = memory_script;

	/**
	 * Prepares the board for a game.
	 *TODO Add element variables to Game class to be used in this function.
	 * @param cellCountX
	 * @param cellCountY
	 */
	self.Game.prototype.prepareBoard = function(cellCountX, cellCountY)
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
})();