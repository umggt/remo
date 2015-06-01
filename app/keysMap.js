/* global Mousetrap */
(function () {
	
	var remote = require('remote');
	var map = Mousetrap.bind;
	
	map('f12', toggleDevTools);	
	map('f5', reloadWindowLocation);
	
	function toggleDevTools() {
		var currentWindow = remote.getCurrentWindow();
		currentWindow.toggleDevTools();
	}
	
	function reloadWindowLocation() {
		window.location.reload();
	}
	
}());	
