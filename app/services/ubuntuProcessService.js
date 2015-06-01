(function () {
	
	
	var exec = require('child_process').exec;
	var pattern = /^([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.+)/;
	var cmd = 'ps -eo pid,%cpu,%mem,time,stat,nlwp,pri,psr,vsize,args';
	
	angular.module('remo').service('ubuntuProcess', ubuntuProcess);
	
	function ubuntuProcess($q, $log) {
		
		var svc = this;
		
		svc.listProcess = listProcess;
		
		function listProcess() {
			
			var defer = $q.defer();
			
			exec(cmd, function(err, stdout, stderr){
				
				var result = [];
				
				stdout.split('\n').forEach(function(line){
					line.replace(pattern, function(_, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11){
						result.push({ id: $1, pcpu: $2, pmem: $3, time: $4, stat: $5, nlwp: $6, pri: $7, psr: $8, vsize: $9, command: $10, args: $11 });
					});
				});
								
				if (!err) {
					defer.resolve(result);	
				}
				else {

					defer.reject(err);
				}
			});
			
			return defer.promise;
		}
	}
}());

