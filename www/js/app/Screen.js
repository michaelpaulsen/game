define(["jquery"], function($) {

	var Screen = function() {
		var size = {
			width: 21,
			height: 21
		};

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

		this.drawPlayer = function( objMap, objPlayer )
		{
			// draw player
			var playerScreenPos = {
				x: Math.floor( size.width / 2 ),
				y: Math.floor( size.height / 2 )
			};
			if ( objMap.max.x <= size.width ) {
				playerScreenPos.x = objPlayer.pos.x;
			}
			if ( objMap.max.y <= size.height ) {
				playerScreenPos.y = objPlayer.pos.y;
			}
			$('#mapGrid .cell .player').remove();
			$( '#mapGrid .block_' + playerScreenPos.x + 'x' + playerScreenPos.y )
				.append('<div class="player"></div>');
		};

		this.screenCoordToMapCoord = function( objCoord, objMap, objPlayer )
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

		this.drawPlayers = function( arrPlayers )
		{
            
            for ( playerIdx in arrPlayers )
            {
                var player = arrPlayers[ playerIdx ];
                var playerDiv = $( '<div id="player' + playerIdx + '"></div>' );
                $( playerDiv ).append( '<div class="player-name">' + player.stat.name + '</div>' );
                $( playerDiv ).append( '<div class="max-hp"><div class="current-hp" style="width:' + 100 * (player.condition.health / player.attribute.vitality) + '%;"></div><div class="current-mp-text">'+player.condition.health+'/'+ player.attribute.vitality+'</div></div>' );
                $( playerDiv ).append( '<div class="max-mp"><div class="current-mp" style="width:' + 100 * (player.condition.mana / player.attribute.wisdom) + '%;"></div><div class="current-mp-text">'+player.condition.mana+'/'+ player.attribute.wisdom+'</div></div>' );
                $( '#playerBar' ).append( playerDiv )
;
            }
        };

		this.drawMap = function( objMap, objPlayer, arrObjCoord_screen )
		{
			if ( typeof( arrObjCoord_screen) === "undefined" )
			{
				arrObjCoord_screen = this.full;
			}
			else if ( !Array.isArray( arrObjCoord_screen ) )
			{
				return;
			}

			this.drawPlayer( objMap, objPlayer );

			// update map tiles  // for all items in the array of screen coordinates
			for (var i=0; i<arrObjCoord_screen.length; i+=1)
			{
				var objScreenCoord = arrObjCoord_screen[i];

				var mapCoord =
					this.screenCoordToMapCoord( objScreenCoord, objMap, objPlayer );

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

				//$block.html( mapCoord.x + ',' + mapCoord.y );
			}

		};

		var getPlayerBar = function( )
		{
			var playerBar = document.createElement('div');
			$( playerBar ).attr('id', 'playerBar');

			return playerBar;
		};

		var getMapGrid = function( )
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

		var getInfoBar = function( )
		{
			var infoBar = document.createElement('div');
			$( infoBar ).attr('id', 'infoBar');

			return infoBar;
		};

		var getConsole = function( )
		{
			var gameConsole = document.createElement('div');
			$( gameConsole ).attr('id', 'gameConsole');

			return gameConsole;
		};

		this.init = function( )
		{
			// prepare screen
			var screen = document.createElement('div');
			$( screen ).attr('id', 'screen');

			$( screen ).append( getPlayerBar() );
			$( screen ).append( getMapGrid() );
			$( screen ).append( getInfoBar() );
			$( screen ).append( getConsole() );

			$( 'body' ).append( screen );

		};

		console.log( 'init' );
		this.init();

	};


	return Screen;
});
