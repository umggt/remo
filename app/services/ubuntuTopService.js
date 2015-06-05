/*(function () {
	
	var spawn = require('child_process').spawn;
	var exec = require('child_process').exec;
	
	angular.module('remo').service('ubuntuTopService', ubuntuTopService);
	
	function ubuntuTopService($log) {
		
		init();
		
		function init() {
			
			var top = spawn('top', ['-b']);
			
			top.stdout.on('data', function (data) {
				console.log('stdout: ' + data);
			});
			
			top.stderr.on('data', function (data) {
				console.log('stderr: ' + data);
			});
			
			top.on('close', function (code) {
				console.log('child process exited with code ' + code);
			});
		}
		
		function dataReceived(data) {
			var txt = new Buffer(data).toString('utf8', 0, data.length);
			console.log('stdout: ' + txt);
		}
	}
	
}());*/