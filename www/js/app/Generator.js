define([], function() {

	var Generator = function(seed)
	{
		if ( !seed || isNaN( seed ) || typeof( seed ) !== "number" ) {
			seed = Math.floor( Math.random() * 10000 );
		}
		this.seed = seed;

		this.random = function(){
			var x = Math.sin(seed+=1) * 10000;
			return x - Math.floor(x);
		};

		this.vary = function( size, variance ) {
			return size + (Math.floor( this.random() * variance*2 ) - variance);
		};

		this.randomAdjacent = function( objMap, x, y ) {
			var direction = Math.floor( this.random() * 4 );
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
			return [x, y];
		}

		var blobSize = 0;
		this.blob = function( objMap, x, y, size, tileId )
		{
			objMap.blocks[y][x] = tileId;
			while (objMap.blocks[y][x] === tileId)
			{
				var coords = this.randomAdjacent( objMap, x, y );
				x = coords[0];
				y = coords[1];
			}
			blobSize += 1;

			if ( blobSize < size )
			{
				this.blob( objMap, x, y, size, tileId );
			} else {
				blobSize = 0;
			}
		};
	};
	return Generator;

});
