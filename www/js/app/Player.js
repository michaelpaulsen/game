define([
    'app/Input'
], function(Input) {

	var Player = function() {

        this.stat = {
            name: 'Simon',
            race: "Human", 
            class: "knight",  /*this wont work class is a reserved word */ 
            gender: "male"
        };

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
            speed: 1,
            charisma: 1,
            vitality: 10 ,/*when desisding how often to heal /10 */
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

		var pos = {
			x: 0,
			y: 0,
            move: false
		};
        this.pos = pos;

        var input = Input.getInstance();
        var checkInput = function() {
            if ( input.objKeys.last == 38 || input.objKeys.last == 87 || input.objKeys.last == 119 )
			{
                // UP
                pos.y -=  1;
				pos.move = true;
            }
            if ( input.objKeys.last == 37 || input.objKeys.last == 65 || input.objKeys.last == 97 )
			{
                // LEFT
                pos.x -= 1;
                pos.move = true;
            }
            if ( input.objKeys.last == 40 || input.objKeys.last == 83 || input.objKeys.last == 115 )
			{
                // DOWN
                pos.y += 1;
                pos.move = true;
            }
            if ( input.objKeys.last == 39 || input.objKeys.last == 68 || input.objKeys.last == 100 )
			{
                // RIGHT (d|D)
                pos.x += 1;
                pos.move = true;
			}
            input.objKeys.last = 0;
        };
        var inputInt =
            setInterval(
                checkInput,
                300/(this.attribute.speed)
                /*the ()'s are if you want to add an equaion here so that it dose it frist */
            );

    };
	return Player;

});
