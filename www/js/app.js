// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
	"urlArgs": "ts=" + (new Date()).getTime(),
	"baseUrl": "js/lib",
	"paths": {
		"app": "../app",
		"jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
	},
	"map": {
		// '*' means all modules will get 'jquery-private'
		// for their 'jquery' dependency.
		'*': { 'jquery': 'jquery-private' },

		// 'jquery-private' wants the real jQuery module
		// though. If this line was not here, there would
		// be an unresolvable cyclic dependency.
		'jquery-private': { 'jquery': 'jquery' }
	}
});

// Load the main app module to start the app
requirejs(["app/main"]);
