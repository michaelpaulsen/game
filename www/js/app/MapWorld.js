define([
	'app/Map'
], function(Map) {

	var MapWorld = function( seed )
	{
		this.map = Map.getInstance( seed ); // need to deal with seed param
		this.map.max = { x: 100, y: 100 };

		this.seed = this.map.seed;


		this.map.tiles = this.map.tiles.concat(
			[ "water", "grass", "forest", "mountain", "cave", "lighthouse","town","temple","monster" ]
		);
		this.blocks = this.map.blocks;

		this.generateWorld = function()
		{
			var genCoord;

			// start with all water
			for (var y = 0; y < this.map.max.y; y+=1 )
			{
				var row = [];
				for (var x = 0; x < this.map.max.x; x+=1 )
				{
					 //row.push(  Math.floor( this.map.generator.random() * this.tiles.length ) );
					 row.push( 0 );
				}
				this.blocks.push( row );
			}
            var amuont = 8;
            var i = 10;
			// add land
			var continents = this.map.generator.vary( 5, 2 );
			for ( var i=1; i<=continents; i+=1 )
			{
				genCoord = {
					x: Math.floor( this.map.generator.random() * this.map.max.x ),
					y: Math.floor( this.map.generator.random() * this.map.max.y )
				};
				var blobSize = this.map.generator.vary( 300, 100 );
				this.map.generator.blob( this.map, genCoord.x, genCoord.y, blobSize, 1 ); // grass
				this.map.generator.blob( this.map, genCoord.x, genCoord.y, blobSize/4, 2 ); // forest
				this.map.generator.blob( this.map, genCoord.x, genCoord.y, blobSize/12, 3 ); // mountain
				this.map.generator.blob( this.map, genCoord.x, genCoord.y, 1, 4 ); // cave
// need to make sure x / y coordinates are within min/max
//				this.map.generator.blob( this.map, genCoord.x+i, genCoord.y+i, 1, 5 ); // light houses?
//				this.map.generator.blob( this.map, genCoord.x+10, genCoord.y+5, 1, 6 ); // towns
//				this.map.generator.blob( this.map, genCoord.x+7, genCoord.y+2, 2, 7 ); // temple
	this.map.generator.blob( this.map, genCoord.x, genCoord.y, 15, 8 ); /*monsters*/		}

			// add mountains
			genCoord = {
				x: Math.floor( this.map.generator.random() * this.map.max.x ),
				y: Math.floor( this.map.generator.random() * this.map.max.y )
			};
			this.map.findLand( genCoord.x, genCoord.y );
			// place castle and then wander and start mountain

		};
		this.generateWorld();

	};
	return MapWorld;

});
