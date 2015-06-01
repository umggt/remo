/* global Mousetrap */
(function () {
	
	var remote = require('remote');
	var map = Mousetrap.bind;
	
	map('f12', toggleDevTools);	
	
	function toggleDevTools() {
		var currentWindow = remote.getCurrentWindow();
		currentWindow.toggleDevTools();
	}	
	
}());	
