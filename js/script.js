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

		self.$board.addEvent('click:relay(.card-container)', function(){ self.handleCardClick(); });
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
			cellY;

		self.$board.set('html', '');

		for (cellY = 0; cellY < self.cellCountY; cellY++)
		{
			for (cellX = 0; cellX < self.cellCountX; cellX++)
			{
				$cardContainer = new Element('div', { 'class': 'card-container' });
				$cardFlipper   = new Element('div', { 'class': 'card-flipper' });
				$cardFront     = new Element('div', { 'class': 'card-front', 'html': 'Front' });
				$cardBack      = new Element('div', { 'class': 'card-back', 'html': 'Back' });

				$cardFlipper.adopt($cardFront, $cardBack);

				$cardContainer.adopt($cardFlipper);

				self.$board.adopt($cardContainer);
			}

			self.$board.adopt(new Element('div', { 'class': 'clear' }));
		}
	};

	/**
	 * Handles a click on a card
	 */
	self.handleCardClick = function()
	{


		console.log('handling card click');
	};

	window.addEvent('domready', function()
	{
		self.init();
	});
}();