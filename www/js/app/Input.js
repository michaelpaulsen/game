define(["jquery"], function($) {

	var Input = function( objPlayer, objMap, objScreen ) {
		$(document).on('keypress', function(e) {
			var key = 'which' in e ? e.which : e.keyCode;
			var move = false;
			switch ( key )
			{
				case 87:  // W
				case 119: // w
					objPlayer.pos.y -= 1;
					move = true;
					break;
				case 65:  // A
				case 97:  // a
					objPlayer.pos.x -= 1;
					move = true;
					break;
				case 83:  // S
				case 115: // s
					objPlayer.pos.y += 1;
					move = true;
					break;
				case 68:  // D
				case 100: // d
					objPlayer.pos.x += 1;
					move = true;
					break;
			}
			if ( move )
			{
				if ( objPlayer.pos.x < 0 ) { objPlayer.pos.x = objMap.max.x-1; }
				if ( objPlayer.pos.x > objMap.max.x-1 ) { objPlayer.pos.x = 0; }
				if ( objPlayer.pos.y < 0 ) { objPlayer.pos.y = objMap.max.y-1; }
				if ( objPlayer.pos.y > objMap.max.y-1 ) { objPlayer.pos.y = 0; }
				objScreen.drawMap( objMap, objPlayer );
				move = false;
			}

		} );
	};
	return Input;

});
