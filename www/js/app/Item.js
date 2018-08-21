define(["app/player"], function(player){
	var item = function(){
		var addItem = function(){
			player.backpack.push(this);
		};
		this.newItem = function(name, src, amount, code){
			var obj = {
				name: name,
				pre: "./img/",
				src: null,
				amount: amount,
				code: code
			};
			obj.src = "url("+(obj.pre + src)+")";
			addItem(obj);
		};
	};
	return {
		getInstance: function() {

			if (item === null) {
				item = new item();
			}
			return item;
		}
	}
});
