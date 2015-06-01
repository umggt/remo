(function () {
	
	angular.module('remo').controller('ProcesadorController', ProcesadorController);
	
	function ProcesadorController(process, $log) {
		
		var vm = this;
		
		vm.procesos = [];
		
		init();
		
		function init() {
			process.onProcessChange(hanCambiadoLosProcesos);
			
			var cpu = 0;
			for (var index = 0; index < 10; index++) {
				
				vm.procesos.push({ id: index + 1, pcpu: index * 3, pmem: index * 4, time: index * 2.5, stat: 'Estado ' + index, nlwp: '', pri: index * 5, psr: cpu++, vsize: index * 6, command: 'comando' + index, args: null });
				
				if (cpu >= 4) {
					cpu = 0;
				}
				
			}
		}
		
		function hanCambiadoLosProcesos(datos) {
			$log.debug('han cambiado los procesos: ', datos);
		}
		
		
	}
	
}());