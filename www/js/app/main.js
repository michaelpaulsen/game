define([
	'jquery',
	'util',
	'app/Screen',
	'app/MapWorld',
	'app/Player',
	'app/Input'
], function($, util, Screen, MapWorld, Player, Input) {

	var input = Input.getInstance();

	var player = new Player();

    var world = new MapWorld( parseInt( util.getParam( 'seed' ) ) );
	
    var screen = new Screen();

    screen.addMap( world );
    screen.addPlayer( player );
//    screen.addNPC( {} );

    screen.drawMap();
    screen.drawPlayers();



	console.log( 'seed', world.seed );
});
