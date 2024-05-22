define([
	'jquery',
	'util',
	'app/Screen',
	'app/MapWorld',
	'app/Player',
	'app/Input'
], function($, util, Screen, MapWorld, Player, Input) {

	var input = Input.getInstance();
	var screen = Screen.getInstance();


	var world = new MapWorld( parseInt( util.getParam( 'seed' ) ) );
	screen.addMap( world.map );
	var player = new Player();
	screen.addPlayer( player );
	screen.drawMap();
	screen.drawPlayers();
	screen.info( 'seed', world.seed );

});
