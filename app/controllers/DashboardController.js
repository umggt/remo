(function () {
	
	angular.module('remo').controller('DashboardController', DashboardController);
	
	function DashboardController(process, $scope) {
		
		var vm = this;
		
		vm.processesCount = 0;
		
		init();
		
		function init() {
			
			vm.processesCount = (process.listProcesses() || []).length;
			
			process.onProcessChange(hanCambiadoLosProcesos);
			
			$scope.$on('$destroy', function(){
				process.removeOnProcessChange(hanCambiadoLosProcesos);
			});
		}
		
		function hanCambiadoLosProcesos(datos) {
			
			if (datos.addedItems) {
				vm.processesCount += datos.addedItems.length;
			}
			
			if (datos.deletedItems) {
				vm.processesCount -= datos.deletedItems.length;
			}
			
		}
		
	}
	
}());