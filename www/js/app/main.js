define([
	'jquery',
	'util',
	'app/Screen',
	'app/MapWorld',
	'app/Player',
	'app/Input'
], function($, util, Screen, MapWorld, Player, Input) {

	var screen = new Screen();
    
	var players = [ (new Player()) ];
	screen.drawPlayers( players );

    var world = new MapWorld( parseInt( util.getParam( 'seed' ) ) );
	world.generateWorld();
	screen.drawMap( world, players[0] );

	var input = new Input( players[0], world, screen );

	console.log( 'seed', world.seed );
});
