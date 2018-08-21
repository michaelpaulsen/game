var Main = function() {

	this.init = function() {
		screen = new _Game.Screen();

		world = new _Game.World(seed);
		world.generate( screen.full, new Coord(0,0) );

		player = new Player();
		player.pos = new Coord( Math.floor( screen.x / 2 ), Math.floor( screen.y / 2 ) );

		screen.draw( world, player );

		// input
		jQuery(document).on('keypress', function(e) {
			var key = 'which' in e ? e.which : e.keyCode;
			var move = false;
			switch ( key )
			{
				case 87:  // W
				case 119: // w
					player.pos.y -= 1;
					move = true;
					break;
				case 65:  // A
				case 97:  // a
					player.pos.x -= 1;
					move = true;
					break;
				case 83:  // S
				case 115: // s
					player.pos.y += 1;
					move = true;
					break;
				case 68:  // D
				case 100: // d
					player.pos.x += 1;
					move = true;
					break;
			}
			if ( move )
			{
				if ( player.pos.x < 0 ) player.pos.x = world.max.x-1;
				if ( player.pos.x > world.max.x-1 ) player.pos.x = 0;
				if ( player.pos.y < 0 ) player.pos.y = world.max.y-1;
				if ( player.pos.y > world.max.y-1 ) player.pos.y = 0;
				screen.draw( world, player );
				move = false;
			}

		} );

	}

};



/* Utility */

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function save() = {
	var saves = window.JSON.parse(localStorage.getItem("saves"));
	saves.push([player.name,player.flags/*and/or player.items */,player.pos]);
	localStorage.setItem("saves,window.JSON.stringify(saves));
}
var game;
(function($){
	$(document).ready( function() {
		game = new Game();
		var seed = parseInt( getParameterByName('seed') );
		if (isNaN(seed)) seed = Math.floor( Math.random() * 10000 );
		game.init(  );
	} );
})(jQuery);

