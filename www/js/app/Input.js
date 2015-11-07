define(["jquery"], function($) {

	var input = null;

	var Input = function() {

		var keys = {};
		this.objClick = {};
		this.objKeys = keys;

		$(document).on('keydown', function(e) {
			var key = 'which' in e ? e.which : e.keyCode;
			keys[key] = true;
			keys.last = key;
		} );
		$(document).on('keyup', function(e) {
			var key = 'which' in e ? e.which : e.keyCode;
			keys[key] = false;
		} );
	};

	return {
		getInstance: function() {
			if (input === null) {
				input = new Input();
			}
			return input;
		}
	};

});
