var World = function(seed)
{
	if ( typeof( seed) == "undefined" )
		seed = Math.floor( Math.random() * 10000 );

	this.max = new Coord(100, 100);

	this.tiles = [ "water", "grass", "forest", "mountain", "cave"];
	this.blocks = new Array();

	var random = function()
	{
		var x = Math.sin(seed++) * 10000;
		return x - Math.floor(x);
	}

	var vary = function( size, variance )
	{
		return size + (Math.floor( random() * variance*2 ) - variance);
	}

	var blobSize = 0;
	this.blob = function( x, y, size, tileId )
	{
		this.blocks[y][x] = tileId;
		while (this.blocks[y][x] == tileId) {
			var direction = Math.floor( random() * 4 );
			switch (direction) {
				case 0: y-=1; break;
				case 1: y+=1; break;
				case 2: x-=1; break;
				case 3: x+=1; break;
			}
			if (x<0) x=this.max.x-1;
			if (x>this.max.x-1) x=0;
			if (y<0) y=this.max.y-1;
			if (y>this.max.y-1) y=0;
		}
		blobSize++;

		if ( blobSize < size )
			this.blob( x, y, size, tileId );
		else
			blobSize = 0;
	}

	this.findLand = function( objCoord )
	{
		while (this.blocks[objCoord.x][objCoord.y] == 0) {
			var direction = Math.floor( random() * 4 );
			switch (direction) {
				case 0: objCoord.y-=1; break;
				case 1: objCoord.y+=1; break;
				case 2: objCoord.x-=1; break;
				case 3: objCoord.x+=1; break;
			}
			if (objCoord.x<0) objCoord.x=this.max.x-1;
			if (objCoord.x>this.max.x-1) objCoord.x=0;
			if (objCoord.y<0) objCoord.y=this.max.y-1;
			if (objCoord.y>this.max.y-1) objCoord.y=0;
		}
	}

	this.generate = function()
	{
		var genCoord;
		var size, variance;

		// start with all water
		for (var y = 0; y < this.max.y; y++ )
		{
			var row = new Array();
			for (var x = 0; x < this.max.x; x++ )
			{
				 //row.push(  Math.floor( random() * this.tiles.length ) );
				 row.push( 0 );
			}
			this.blocks.push( row );
		}

		// add land
		size = 5;
		variance = 2;
		var continents = vary( size, variance );
		for ( var i=1; i<=continents; i++ )
		{
			genCoord = new Coord( Math.floor( random() * this.max.x ), Math.floor( random() * this.max.y ) );
			size = 300;
			variance = 100;
			var blobSize = vary( size, variance );
			this.blob( genCoord.x, genCoord.y, blobSize, 1 ); // grass
		}

		this.blob( genCoord.x, genCoord.y, blobSize/4, 2 ); // forest
		this.blob( genCoord.x, genCoord.y, blobSize/12, 3 ); // mountain
		this.blob( genCoord.x, genCoord.y, 1, 4 ); // cave

		// add mountains
		genCoord = new Coord( Math.floor( random() * this.max.x ), Math.floor( random() * this.max.y ) );
		this.findLand( genCoord );
		// place castle and then wander and start mountain

	}

	this.getNearbyTileId = function( objCoord, objDirection ) {
		var objDest = new Coord( objCoord.x + objDirection.x, objCoord.y + objDirection.y );
		if ( objDest.x < 0 ) objDest.x += world.max.x;
		if ( objDest.x > world.max.x-1 ) objDest.x -= world.max.x;
		if ( objDest.y < 0 ) objDest.y += world.max.y;
		if ( objDest.y > world.max.y-1 ) objDest.y -= world.max.y;
		return this.blocks[ objDest.x ][ objDest.y ];
	}
}
