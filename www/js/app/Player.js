define([], function() {

	var Player = function() {

        this.stat = {
            name: 'Simon',
            race: "Human", 
            class: "knight",
            gender: "male"
        };

        this.attribute = {
            strength: 0,
            dextarity: 0,
            vitality: 10,
            wisdom: 0,
            charisma: 0
        };

        this.skill = {
            lockpicking: 0,
            magic: 0,
            swordsmanship: 0,
            archery: 0,
            bribery: 0
        };

        this.condition = {
            xp: 0,
            health: 8,
            mana: 0,
            poisoned: false,
            sleeping: false,
            cursed: false
        };
            
        
        
		this.pos = {
			x: 0,
			y: 0
		};

    };
	return Player;

});
