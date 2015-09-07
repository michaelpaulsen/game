define([
	'app/Generator'
], function(Generator) {

	var Map = function( seed )
	{
		this.generator = new Generator( seed );

		this.seed = this.generator.seed;

		this.tiles = [];
		this.blocks = [];

		this.findLand = function( objMap, x, y )
		{
			while ( objMap.blocks[y][x] === 0 )
			{
				var direction = Math.floor( this.generator.random() * 4 );
				switch (direction) {
					case 0: y-=1; break;
					case 1: y+=1; break;
					case 2: x-=1; break;
					case 3: x+=1; break;
				}
				if (x<0) { x=objMap.max.x-1; }
				if (x>objMap.max.x-1) { x=0; }
				if (y<0) { y=objMap.max.y-1; }
				if (y>objMap.max.y-1) { y=0; }
			}
		};

		/*
		this.getNearbyTileId = function( objCoord, objDirection ) {
			var objDest = {
				x: objCoord.x + objDirection.x,
				y: objCoord.y + objDirection.y
			};
			if ( objDest.x < 0 ) { objDest.x += world.max.x; }
			if ( objDest.x > world.max.x-1 ) { objDest.x -= world.max.x; }
			if ( objDest.y < 0 ) { objDest.y += world.max.y; }
			if ( objDest.y > world.max.y-1 ) { objDest.y -= world.max.y; }
			return this.blocks[ objDest.x ][ objDest.y ];
		};
		*/
	};
	return Map;

});
