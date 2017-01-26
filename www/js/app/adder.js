define([
'app/player'
], function (Input, Screen, Map) {
	var addfunction = function(type){
		if(type == 1){
			Player.stat.health += Player.attribute.vitality-9;
			consel.log(Player.stat.health);	
		}else if (type == 2){
			Player.stat.magic += Player.attribute.wisdom;
		}else {
			console.log(type,"is undifind \n did you mean health or magic ")	
		}
	}
	setInterval(addfuncoin(1),1000);
	addfunction(1);
}