define(["jquery"], function($) {

	var input = null;

	var Input = function() {

		var objKeys = {
			last: null,
			down: {}
		};
		this.keys = objKeys;


		$(document).on('keydown', function(e)
			{
				var key = 'which' in e ? e.which : e.keyCode;
				if( key != objKeys.last ) {
					for ( var prop in objKeys.down ) {
						objKeys.down[prop] += 1;
					}
					objKeys.last = key;
				}
				objKeys.down[ key ] = 1;
			}
		);
		$(document).on('keyup', function(e)
			{
				var key = 'which' in e ? e.which : e.keyCode;
				for ( var prop in objKeys.down ) {
					if ( objKeys.down[prop] > objKeys.down[key] ) {
						objKeys.down[prop] -= 1;
					}
				}
				delete objKeys.down[ key ];
				for ( var prop in objKeys.down ) {
					if ( objKeys.down[prop] === 1 ) {
						objKeys.last = parseInt( prop );
					}
				}
			}
		);

		var findTargetId = function( $target )
		{
			var id = $target.attr( 'id' );
			if ( typeof id === 'undefined' ) {
				return findTargetId( $target.parent() );
			}
			return id;
		}

		var objMouse = {};
		this.mouse = objMouse;
		$(document).bind('mousewheel DOMMouseScroll', function (e)
			{
				objMouse.targetId = findTargetId( $(e.target) );
				if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
					//up
if ( objMouse.targetId === 'gameConsole' ) {
	$('#gameConsole').scrollTop( $('#gameConsole').scrollTop()-30 );
}
				}
				else {
					//down
if ( objMouse.targetId === 'gameConsole' ) {
	$('#gameConsole').scrollTop( $('#gameConsole').scrollTop()+30 );
}
				}
			}
		);
		$(document).on('click', function (e)
			{
				objMouse.targetId = $(e.target).attr('id');
			}
		);

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
