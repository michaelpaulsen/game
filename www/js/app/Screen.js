define(["jquery"], function($) {

	var screen = null;

	var Screen = function() {
		var size = {
			width: 21,
			height: 21
		};
        
		var objMap;
		var arrPlayers = [];

		var getFullScreen = function() {
			var screenBlocks = [];
			for (var _y=0; _y < size.height; _y+=1)
			{
				for (var _x=0; _x < size.width; _x+=1)
				{
					screenBlocks.push( {
						x: _x,
						y: _y
					} );
				}
			}
			return screenBlocks;
		};
		this.full = getFullScreen();

		var removeTile = function (index, attClass) {
			return ( attClass.match(/\btile-\S+/g) || [] ).join(' ');
		};
		var removeShore = function (index, attClass) {
			return ( attClass.match(/\bshore-\S+/g) || [] ).join(' ');
		};

		this.addMap = function( objAMap )
		{
			objMap = objAMap;
		}

		this.addPlayer = function( objPlayer )
		{
			arrPlayers.push( objPlayer );
		}

		var drawPlayerOnMap = function()
		{
			// draw player
			var playerScreenPos = {
				x: Math.floor( size.width / 2 ),
				y: Math.floor( size.height / 2 )
			};
			if ( objMap.max.x <= size.width ) {
				playerScreenPos.x = arrPlayers[0].pos.x;
			}
			if ( objMap.max.y <= size.height ) {
				playerScreenPos.y = arrPlayers[0].pos.y;
			}
			$('#mapGrid .cell .player').remove();
			$( '#mapGrid .block_' + playerScreenPos.x + 'x' + playerScreenPos.y )
				.append('<div class="player"></div>');
		};

		var screenCoordToMapCoord = function( objCoord, objMap, objPlayer )
		{
			var mapOffset = {
				x: objPlayer.pos.x - Math.floor( size.width / 2 ),
				y: objPlayer.pos.y - Math.floor( size.height / 2 )
			};
			if ( objMap.max.x <= size.width ) {
				mapOffset.x = 0;
			}
			if ( objMap.max.y <= size.height ) {
				mapOffset.y = 0;
			}
			var mapCoord = {
				x: objCoord.x + mapOffset.x,
				y: objCoord.y + mapOffset.y
			};
			if ( mapCoord.x < 0 ) { mapCoord.x += objMap.max.x; }
			if ( mapCoord.x > objMap.max.x-1 ) { mapCoord.x -= objMap.max.x; }
			if ( mapCoord.y < 0 ) { mapCoord.y += objMap.max.y; }
			if ( mapCoord.y > objMap.max.y-1 ) { mapCoord.y -= objMap.max.y; }

			return mapCoord;
		};

		this.drawPlayers = function()
		{
			for ( playerIdx in arrPlayers )
			{
				var player = arrPlayers[ playerIdx ];
				var hp = 100 *(player.condition.health / player.attribute.vitality.maxHp);
				var mp =  100 * (player.condition.mana / player.attribute.wisdom);
				var h = 12.5;
				var playerDiv = $( '<div id="player' + playerIdx + '"></div>' );
				$( playerDiv ).append( '<div class="player-name">' + player.stat.name + '</div>' );/* displays the name of the player*/
				$( playerDiv ).append( '<div class="max-hp">'+/*health bar out line*/'<div class="current-hp" style="width:'/*health bar */ + hp + '%;"></div><div class="current-hp-text">'+hp+'%</div></div>' );
				$( playerDiv ).append( '<div class="max-mp">'/*magic bar out line*/+'<div class="current-mp" style="width:'/*magic bar*/ +mp+ '%;"></div><div class="current-mp-text">'+mp+'%</div></div>' );
<<<<<<< HEAD
				for(var s = 0; s < player.backpack.length; s++){
					if(player.backpack[s].amount>1){
						$( playerDiv ).append( '<div class="item'+player.backpack[s].name+';  display:inline-block;">' + player.backpack[s].name + ' x:' + player.backpack[s].amount  + '<br> <div class = "'+ (s + 1) + ' " style="background-image:'+player.backpack[s].src + '; width:'+h+'px; height:'+h+'px; background-size:100%; background-repeat: no-repeat; display:inline-block;"></div></div>' );
					}else{
						$( playerDiv ).append( '<div class="item'+player.backpack[s].name+';  ">' + player.backpack[s].name + '<br> <div class = "'+ (s + 1) + ' " style="background-image:'+player.backpack[s].src + '; width:'+h+'px; height:'+h+'px; background-size:100%; background-repeat: no-repeat; display:inline-block;"></div></div>' );
					}
				}
=======

>>>>>>> 0012546a7a410dff8129fa918d483409dae1340b
				$( '#playerBar' ).append( playerDiv );
			}
		};

		var drawMap = function( arrObjCoord_screen )
		{
			if ( typeof( arrObjCoord_screen) === "undefined" )
			{
				arrObjCoord_screen = getFullScreen();
			}
			else if ( !Array.isArray( arrObjCoord_screen ) )
			{
				return;
			}
			var objPlayer = arrPlayers[0];

			drawPlayerOnMap( objMap, objPlayer );

			// update map tiles  // for all items in the array of screen coordinates
			for (var i=0; i<arrObjCoord_screen.length; i+=1)
			{
				var objScreenCoord = arrObjCoord_screen[i];

				var mapCoord =
					screenCoordToMapCoord( objScreenCoord, objMap, objPlayer );

				var tileId = objMap.blocks[ mapCoord.x ][ mapCoord.y ];
				var $block =
					$( '#mapGrid .block_' + objScreenCoord.x + 'x' + objScreenCoord.y );
				$block.removeClass( removeTile );
				$block.addClass( 'tile-' + objMap.tiles[ tileId ] );

				// add layers
				// TBD - see about appending divs instead of adding classes to main cell
				/*
				if ( tileId === 0 )
				{
					$block.removeClass( removeShore );
					if ( objMap.getNearbyTileId( mapCoord, { x: 0, y: 1 } ) > 0 ) {
						$block.addClass( 'shore-s' );
					}
					if ( objMap.getNearbyTileId( mapCoord, { x: 0, y: -1 } ) > 0 ) {
						$block.addClass( 'shore-n' );
					}
					if ( objMap.getNearbyTileId( mapCoord, { x: -1, y: 0 } ) > 0 ) {
						$block.addClass( 'shore-w' );
					}
					if ( objMap.getNearbyTileId( mapCoord, { x: 1, y: 0 } ) > 0 ) {
						$block.addClass( 'shore-e' );
					}
				}

				*/
				/*
				$block.html( mapCoord.x + ',' + mapCoord.y );
				*/
			}

		};
		this.drawMap = function() {
			drawMap();
		}

		var createPlayerBar = function( )
		{
			var playerBar = document.createElement('div');
			$( playerBar ).attr('id', 'playerBar');

			return playerBar;
		};

		var createMapGrid = function( )
		{
			var map = document.createElement('div');
			$( map ).attr('id', 'mapGrid');

			for (var _y=0; _y < size.height; _y+=1)
			{
				var aRow = document.createElement('div');
				$( aRow ).addClass('grid-row grid-row-' + _y);
				for (var _x=0; _x < size.width; _x+=1)
				{
					var aCell = document.createElement('div');
					$( aCell ).addClass('cell block_' + _x + 'x' + _y);
					$( aRow ).append( aCell );
				}
				$( map ).append( aRow );
			}
			return map;
		};

		var createInfoBar = function( )
		{
			var infoBar = document.createElement('div');
			$( infoBar ).attr('id', 'infoBar');

			return infoBar;
		};

		var createConsole = function( )
		{
			var gameConsole = document.createElement('div');
			$( gameConsole ).attr('id', 'gameConsole');

			return gameConsole;
		};

		this.console = function( type, msg )
		{
			var msgDiv = document.createElement('div');
			$( msgDiv ).addClass( type ).html( msg );
			
			$('#gameConsole').append( msgDiv ).scrollTop( $('#gameConsole')[0].scrollHeight );
			/*$('#gameConsole').empty().append( msgDiv );*/

		}
		this.debug = function()
		{
			var args = Array.prototype.slice.call(arguments);
			this.console( 'debug', args.join(' ') );
		}
		this.info = function()
		{
			var args = Array.prototype.slice.call(arguments);
			this.console( 'info', args.join(' ') );
		}

		this.init = function( )
		{
			// prepare screen
			var screen = document.createElement('div');
			$( screen ).attr('id', 'screen');

			$( screen ).append( createPlayerBar() );
			$( screen ).append( createMapGrid() );
			$( screen ).append( createInfoBar() );
			$( screen ).append( createConsole() );

			$( 'body' ).append( screen );

		};
		this.init();

	};

	return {
		getInstance: function() {
			if (screen === null) {
				screen = new Screen();
			}
			return screen;
		}
	};

});
