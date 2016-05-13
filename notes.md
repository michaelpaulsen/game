#notes
### monster spawning
drawMonster = funcion(x,y,width,monsterId){ 


?draw a batle seen
?with may change for diferent monsters
?and check to see if player is farer than width block a way 
check monsterId and change Ap/Hp/Mp for instince a spider may have 10Ap 20Hp and 100Mp
display in info bar on left side of screen
?"and say you incounterd a" + monsterId on the botom of the screen 

}
var tile = get the tile Id 

if(tile is "monster"){ 

drawMonster()

}

### drops

have it so that it drops left over magic when a mob dides 
(if a spider has 50 mp left than it would drop 50 mp when it dies)

### time 

var time = seconds played 

if (time % time in a day => time in a day /8 && time % time in a day =< time in a day /6 ){

than shade the blocks light blue 

}
if (time % time in a day => time in a day /6 && time % time in a day =< time in a day /4 ){

than set the blocks to what thy are now 

}
if (time % time in a day => time in a day /4 && time % time in a day =< time in a day /2 ){

than set the blocks to blue

}
if (time % time in a day => time in a day /2 && time % time in a day =< time in a day /1 ){
set it darker
}

### qests.
have a monster that has no Ap for villigers 
have it so that there needs to be a villige in 10m (1 "block" = 1 m) from where the villiger spawns
have it so you could talk to these villigers and get quests from them 

addQuestScreen(){

would be called every time the player preses a buttion

}

addToQuests(changId){

checks chang id 
gets change id and changes the quests baced off of what the change id is

}

addQuest(qName,qObgective1,qObgective2,qObgective3){

check if the obgectives have been done if done than conplete the quest 
add new obgectives as you go along in a quest 

}

this would be in a while(playing)
if(villiger1.talkedTo && hasQuest){

addQuest()

}


### items
make Items that you could pick up. 
have some things that have spechal powers 
have a hoe of growing that makes a forest when you use it
have apples that restore 50% hp (see apples)


### apples 
have you pick them up randomly (1:100 chance) 
restore hp by 50% 
restore mp by 50%

### pies
made with apples (mabe have pumpickin pie to)
restore hp by 60% 
restore mp by 100%
kills all enimes in 10 blocks
can be bought in inns