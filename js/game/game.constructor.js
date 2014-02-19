(function()
{
	var self = memory_script;

	/**
	 * Constructor.
	 */
	self.Game = function()
	{
		this.players            = [new self.Player('Player 1'), new self.Player('Player 2')];
		this.currentPlayerIndex = Math.floor(Math.random() * players.length);
	};
})();