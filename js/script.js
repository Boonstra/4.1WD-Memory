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
		self.$newGameButton = $$('.new-game-button')

		self.$cardViewTimeSlider      = $$('.card-view-time-slider');
		self.$cardViewTimeSliderValue = $$('.card-view-time-slider-value');

		self.$board = $$('.board');

		self.prepareBoard();



		// Listeners
//		self.
		self.$board.addEvent("click:relay(.card)", function(){ self.handleCardClick(); });
	};

	/**
	 * Prepare the board for a new game.
	 */
	self.prepareBoard = function()
	{
		var cellX = 0,
			cellY = 0;

		self.$board.set('html', '');

		for (cellY; cellY < self.cellCountY; cellY++)
		{
			cellX = 0;

			for (cellX; cellX < self.cellCountX; cellX++)
			{
				self.$board.adopt(new Element('div', {
					'class': 'card',
					'html' : '*'
				}));
			}

			self.$board.adopt(new Element('div', { 'class': 'clear' }));
		}
	};

	/**
	 * Handles a click on a card
	 */
	self.handleCardClick = function()
	{

	};

	window.addEvent('domready', function()
	{
		self.init();
	});
}();