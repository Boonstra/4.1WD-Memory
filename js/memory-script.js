memoryScript = function()
{
	var self = { };

	/**
	 * Initialize.
	 */
	self.init = function()
	{
		$$('.new-game-button').addEvent('click', function(event){ event.preventDefault(); self.startNewGame(); });

		self.startNewGame();
	};

	/**
	 * Starts a new game
	 */
	self.startNewGame = function()
	{
		self.currentGame = new self.Game(4, 4);
	};

	window.addEvent('domready', function()
	{
		self.init();
	});

	return self;
}();

// @codekit-append game/game.constructor.js
// @codekit-append game/game.board.js
// @codekit-append game/game.turn.js
// @codekit-append player/player.constructor.js
