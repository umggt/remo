(function () {
	
	angular.module('remo').controller('ProcesadorController', ProcesadorController);
	
	function ProcesadorController(process, $log) {
		
		var vm = this;
		
		init();
		
		function init() {
			process.onProcessChange(hanCambiadoLosProcesos);
		}
		
		function hanCambiadoLosProcesos(datos) {
			$log.debug('han cambiado los procesos: ', datos);
		}
		
		
	}
	
}());