define([
	'app/Map'
], function(Map) {

	var MapWorld = function( seed )
	{
		this.map = new Map( seed );

		this.seed = this.map.seed;

		this.max = { x: 100, y: 100 };

		this.tiles = this.map.tiles.concat(
			[ "water", "grass", "forest", "mountain", "cave" ]
		);
		this.blocks = this.map.blocks;

		this.generateWorld = function()
		{
			var genCoord;

			// start with all water
			for (var y = 0; y < this.max.y; y+=1 )
			{
				var row = [];
				for (var x = 0; x < this.max.x; x+=1 )
				{
					 //row.push(  Math.floor( this.map.generator.random() * this.tiles.length ) );
					 row.push( 0 );
				}
				this.blocks.push( row );
			}

			// add land
			var continents = this.map.generator.vary( 5, 2 );
			for ( var i=1; i<=continents; i+=1 )
			{
				genCoord = {
					x: Math.floor( this.map.generator.random() * this.max.x ),
					y: Math.floor( this.map.generator.random() * this.max.y )
				};
				var blobSize = this.map.generator.vary( 300, 100 );
				this.map.generator.blob( this, genCoord.x, genCoord.y, blobSize, 1 ); // grass
				this.map.generator.blob( this, genCoord.x, genCoord.y, blobSize/4, 2 ); // forest
				this.map.generator.blob( this, genCoord.x, genCoord.y, blobSize/12, 3 ); // mountain
				this.map.generator.blob( this, genCoord.x, genCoord.y, 1, 4 ); // cave
			}

			// add mountains
			genCoord = {
				x: Math.floor( this.map.generator.random() * this.max.x ),
				y: Math.floor( this.map.generator.random() * this.max.y )
			};
			this.map.findLand( this, genCoord.x, genCoord.y );
			// place castle and then wander and start mountain

		};
        this.generateWorld();

	};
	return MapWorld;

});
