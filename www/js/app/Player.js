define([
	'app/Input',
	'app/Screen',
	'app/Map',
	'app/Item',
	'app/battle'
	], function (Input, Screen, Map, Item,battle) {
	//console.log(item);
	//var item = item;
			var seed = Math.round(Math.random()*Math.pow(10,10));
	var Player = function () {
	
		var input = Input.getInstance();
		var screen = Screen.getInstance();
		var map = Map.getInstance();
		var item = Item.getInstance();

		this.stat = {
			name: 'Michael',
			race: "Human",
			type: "knight",
			gender: "male",
			steps: 0
			
		};
		this.backpack = [];// backpack where you hold all your stuff
		this.moves = []; // battle moves that your player can preform
/*
strength - hit power, weight carrying ability
endurance - exersion over time - (maybe options to enable power attacks/spells (wears off slower for high endurance)
dexterity - percision - accuracy of hits / proper casting of spells
agility - ability to change direction fast / reflexes - block / dodge / counter-attack.
speed - attack/move frequency (compared against speed of other players / enemies)
charisma - charm - haggle in stores, calm enemies, etc.
vitality - total health, poison resistence, rate of healing
wisdom - total magic, object identification/appraisal, rate of magic regeneration
*/

		this.attribute = {
			strength: 1,
			endurance: 1,
			dexterity: 1,
			agility: 1,
			speed: 100,
			charisma: 1,
			vitality: {
				heal : 1,
				maxHp: 10
			},
			wisdom: {
				mana:10,
				rest:10
			},
			level:{
				current:0,
				next:1000 
			}

		};

		this.skill = {
			swords: 0,
			axe: 0,
			archery: 0,
			magic: 0,
			block: 0,
			dodge: 0,
			track: 0,
			tame: 0,
			lockpick: 0,
			appraise: 0,
			bribery: 0,
			haggle: 0
		};

		this.condition = {
			xp: 0,
			health: 10,
			mana: 10,
			poisoned: false,
			sleeping: false,
			cursed: false
		};

		this.hp = this.condition.health;
		this.mp = this.condition.mana;
		var initialPosition = map.findNearestFeature(1,0,0);
		var pos = {
			x: initialPosition.x,
			y: initialPosition.y,
			move: false
		};
		

		this.pos = pos;

		var getTileIdByPlayerPos = function(rx,ry){
			if(document.readyState == "complete") {
				var blockClass = $(".block_"+ (10+rx) +"x"+(10+ry)).attr("class");
				if ( typeof blockClass == "string" ) {
					return blockClass.split(" ")[2];
				}
			}
		};

		var checkInput = function () {
			/** movment code*/
	
			var blockIsInvalid = ((getTileIdByPlayerPos(0,0) == "tile-water") || (getTileIdByPlayerPos(0,0) == "tile-mountain"));
			var upIsVaild = (getTileIdByPlayerPos(0,-1) != "tile-water") && (getTileIdByPlayerPos(0,-1) != "tile-mountain");
			var leftIsVaild = (getTileIdByPlayerPos(-1,0) != "tile-water") && (getTileIdByPlayerPos(-1,0) != "tile-mountain");
			var downIsVaild = (getTileIdByPlayerPos(0,1) != "tile-water") && (getTileIdByPlayerPos(0,1) != "tile-mountain");
			var rightIsVaild = (getTileIdByPlayerPos(1,0) != "tile-water") && (getTileIdByPlayerPos(1,0) != "tile-mountain");
			/*alert("up: " + upIsVaild + " left: " + leftIsVaild + " down: " + downIsVaild + " right: " + rightIsVaild); 
			console.log( input.keys.down );
			console.log( input.keys.last );
			*/
			//console.log( input.keys.down[ 65 ] && input.keys.last === 65 );
			//console.log( input.keys.down[ 65 ] && input.keys.last === 65 );
			/*
			if(blockIsInvalid){
				location.search = "?seed=" + seed;
				// sets tje search val to the current random seed and indonin so reloads the page makeing a new random seed ;)
				//seed++;
				blockIsInvalid = (getTileIdByPlayerPos(0,0) == "tile-water") && (getTileIdByPlayerPos(0,0) == "tile-mountain");
			}
			*/
			//if(this.stat.steps >= 100){
				//this.stat.steps -= 100;
				//screen.console("info", this.stat.steps);
				//screen.console("info", this.stat.steps);
			//}
			if ( ( input.keys.down[ 38 ] && input.keys.last === 38 ) || /** if the key is  (w||W||^)*/
				( input.keys.down[ 87 ] && input.keys.last === 87 )){
				if ( upIsVaild ) {/** and the block one up from you is valid then move up*/
					// UP
					pos.y -=  1;
					
					if ( pos.y < 0 ) {
						pos.y = map.max.y-1;
					}
					pos.move = true;
				}else{
					screen.console("error", "you can not move there");
				}
			}
			if ( ( input.keys.down[ 37 ] && input.keys.last === 37 ) ||
				( input.keys.down[ 65 ] && input.keys.last === 65 )){
				   if( leftIsVaild ) {
					// LEFT
					pos.x -= 1;
					if ( pos.x < 0 ) { pos.x = map.max.x-1; }
						pos.move = true;
					}else{
					screen.console("error", "you can not move there");
				}
			}
			if ( ( input.keys.down[ 40 ] && input.keys.last === 40 ) ||
				( input.keys.down[ 83 ] && input.keys.last === 83 )){
				if( downIsVaild ) {
					// DOWN
					pos.y += 1;
					if ( pos.y > map.max.y-1 ) { pos.y = 0; }
					

					pos.move = true;
				}else{
					screen.console("error", "you can not move there");
				}
			}
			if ( ( input.keys.down[ 39 ] && input.keys.last === 39 ) ||
				( input.keys.down[ 68 ] && input.keys.last === 68 )){
				if( rightIsVaild ) {
					// RIGHT (d|D)
					pos.x += 1;
					if ( pos.x > map.max.x-1 ) { pos.x = 0; }
					pos.move = true;
					

				}else{
					screen.console("error", "you can not move there");
				}
			}
			if ( pos.move )
			{
				pos.move = false;
				//map.setPlayerPosition( pos.x, pos.y );
				screen.drawMap();
				screen.debug( pos.x, pos.y );
			}
		};
/*<<<<<<< HEAD
	
		var inputInt = setInterval(
=======
		console.log(
				'player speed delay',
				300 * ( Math.pow( .95, this.attribute.speed ) + .2 )
		);
*/
		var inputInt =

			setInterval(
//>>>>>>> 0012546a7a410dff8129fa918d483409dae1340b
				checkInput,
				300 * ( Math.pow( .95, this.attribute.speed ) + .2 )
			);
		

	};
	return Player;
});
