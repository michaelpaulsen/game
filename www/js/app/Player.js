define([
	'app/Input',
	'app/Screen',
	'app/Map',
	'app/Item'
	], function (Input, Screen, Map, Item) {
	//console.log(item);
	//var item = item;
	var Player = function () {
	
		this.stat = {
			name: 'Michael',
			race: "Human",
			type: "knight",
			gender: "male",
			
		};
		this.backpack = [];

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
			wisdom: 10
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
		var pos = {
			x: 0,
			y: 0,
			move: false
		};

		this.pos = pos;
		var input = Input.getInstance();
		var screen = Screen.getInstance();
		var map = Map.getInstance();
		var item = Item.getInstance();
		var getTileIdByPlayerPos = function(rx,ry){
			return ($(".block_"+ (10+rx) +"x"+(10+ry)).attr("class").split(" "))[2];
		}
		var checkInput = function () {
		//console.log( );
			var blockIsWater = getTileIdByPlayerPos(0,0) == "tile-water";
			//console.log(blockIsWater );
			//console.log( input.keys.down );
			//console.log( input.keys.last );
			//console.log( input.keys.down[ 65 ] && input.keys.last === 65 );
			if(blockIsWater){
				location.reload();
			}
			if ( (( input.keys.down[ 38 ] && input.keys.last === 38 ) ||
				( input.keys.down[ 87 ] && input.keys.last === 87 ))){
				if (getTileIdByPlayerPos(0,-1) != "tile-water" ) {
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
			if ( (( input.keys.down[ 37 ] && input.keys.last === 37 ) ||
				( input.keys.down[ 65 ] && input.keys.last === 65 ))){
			    if(getTileIdByPlayerPos(-1,0) != "tile-water") {
					// LEFT
					pos.x -= 1;
					if ( pos.x < 0 ) { pos.x = map.max.x-1; }
					pos.move = true;
				}else{
					screen.console("error", "you can not move there");
				}
			}
			if ( (( input.keys.down[ 40 ] && input.keys.last === 40 ) ||
				( input.keys.down[ 83 ] && input.keys.last === 83 ))){
				if(getTileIdByPlayerPos(0,1) != "tile-water" ) {
					// DOWN
					pos.y += 1;
					if ( pos.y > map.max.y-1 ) { pos.y = 0; }
					pos.move = true;
				}else{
					screen.console("error", "you can not move there");
				}
			}
			if ( (( input.keys.down[ 39 ] && input.keys.last === 39 ) ||
				( input.keys.down[ 68 ] && input.keys.last === 68 ))){
				if(getTileIdByPlayerPos(1,0) != "tile-water" ) {
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
	
		var inputInt = setInterval(
				checkInput,
				300 * ( Math.pow( .95, this.attribute.speed ) + .2 )
			);
		

	};
	return Player;
});
