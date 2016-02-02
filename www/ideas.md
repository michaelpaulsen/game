this is a text flie for michael's iedas:
===

###this a consept for the code for poisoned
var a = 1.5
...
if ( player.condition.poisoned ){
var hp = player.condition.health;
hp -=a;
player.condition.health = hp;
};



###this a consept for the code for cursed
var a = 1.5
var b = (a+5)+( math.random()*10);
....
if ( player.condition.cursed ){
var hp = player.condition.health;
hp -=a*2;
player.condition.health = hp;
var mp = player.condition.magic;
mp-= b;
};

mabe these should be in there own file (effects.js maybe)

###this is old code but the same apicion is here ( as in the new code)

	switch ( key )
			{
				case 87:  // W
				case 119: // w
					objPlayer.pos.y -= player.attribute.speed;
					move = true;
					break;
				case 65:  // A
				case 97:  // a
					objPlayer.pos.x -= player.attribute.speed;
					move = true;
					break;
				case 83:  // S
				case 115: // s
					objPlayer.pos.y += player.attribute.speed;
					move = true;
					break;
				case 68:  // D
				case 100: // d
					objPlayer.pos.x += player.attribute.speed;
					move = true;
					break;
			}