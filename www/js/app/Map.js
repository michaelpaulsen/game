define([
	'app/Generator'
], 
	function(Generator) {

	
		var map = null;

		var Map = function (seed) {

			this.generator = new Generator(seed);
			this.seed = this.generator.seed;
			this.tiles = [];
			this.blocks = [];
			this.max = {};

			this.findLand = function (x, y) {
				/**
				* we could have a filter pramiter that is an array 
				* then do some thing like
				*while(!walkables.includes(this.blocks[x][y])) 
				*also this may not want to be a random walk
				*/
				while (this.blocks[x][y] === 0) {
					var direction = Math.floor(this.generator.random() * 4);

					switch (direction) {
						case 0: y -= 1; break;
						case 1: y += 1; break;
						case 2: x -= 1; break;
						case 3: x += 1; break;
					}

					if (x < 0) { x = this.max.x - 1; }
					if (x > this.max.x - 1) { x = 0; }
					if (y < 0) { y = this.max.y - 1; }
					if (y > this.max.y - 1) { y = 0; }
					if (this.blocks[x][y] !== 0) {
						return {
							x: x,
							y: y
						};
					}
				}
			};


			this.getNearbyTileId = function (objCoord, objDirection) {
				var objDest = {
					x: objCoord.x + objDirection.x,
					y: objCoord.y + objDirection.y
				};
				if (objDest.x < 0) { objDest.x += this.max.x; }
				if (objDest.x > this.max.x - 1) { objDest.x -= this.max.x; }
				if (objDest.y < 0) { objDest.y += this.max.y; }
				if (objDest.y > this.max.y - 1) { objDest.y -= this.max.y; }
				return this.blocks[objDest.x][objDest.y];
			};



			this.findNearestFeature = function (feature, x, y) {
				var found = false
				var Ipos = {
					x: x,
					y: y
				};
				var dx = 0;
				var dy = 0;
				var Ix, Iy;
				var r = {
					min: 1,
					max: 1
				};
				var i = 0;
				while (!found) {
					if (i > 20) {
						break;
					}
					for (dy = 0; dy <= r.max; dy++) {
						if (found) {
							break;
						}
						for (dx = 0; dx <= r.max; dx++) {
							if (found) {
								break;
							}
							Ix = (Ipos.x + dx) % 100;
							Iy = (Ipos.y + dy) % 100;
							if (this.blocks[Iy][Ix] == feature) {
								console.log(Ix, Iy);
								found = true;
								break;
							}
						}
					}
					r.max++;
					i++;
				}
				return {
					x: dx,
					y: dy,
					travelDistance: dx + dy
				}
			};


		};
	
		return {

			getInstance: function (seed) {
				if (map === null) {
					map = new Map(seed);
					window.map = map;
				}
				return map;;
			}

		}
});
