(function () {

	angular.module('remo').controller('ProcesadorController', ProcesadorController);
	
	function ProcesadorController(process, $log, $scope, bootbox, toastr) {
		
		var vm = this;
		
		vm.filtro = { nombre: '' };
		vm.procesos = [];
		
		vm.finalizar = finalizar;
		
		init();
		
		function init() {
			
			vm.procesos = process.listProcesses() || [];
			
			process.onProcessChange(hanCambiadoLosProcesos);
			
			$scope.$on('$destroy', function(){
				process.removeOnProcessChange(hanCambiadoLosProcesos);
			});
		}
		
		function finalizar(proceso) {
			var text = '¿Seguro que desea finalizar el proceso ' + proceso.id + ' <strong>' + proceso.nombre + '</strong>?';
			
			bootbox.dialog({
				message: text,
				title: "Finalizar Proceso",
				buttons: {
					si: {
						label: "Si",
						className: "btn-danger",
						callback: function() {
							process.kill(proceso.id)
								.success(function () {
									toastr.success('El proceso ' + proceso.id + ' <strong>' + proceso.nombre + '</strong> se ha finalizado correctamente', 'Proceso finalizado');
								})
								.error(function (msg) {
									toastr.error('Ocurrió un error al finalizar el proceso ' + msg, 'Error');
								});
						}
					},
					no: {
						label: "No",
						className: "btn-default",
						callback: function() {
							// No pasa nada
						}
					}
				}
			});
		}
		
		function hanCambiadoLosProcesos(datos) {

				var index = 0;
				var subIndex = 0;
				var item = null;
				var subItem = null;
				
				for (var index = 0; index < vm.procesos.length; index++) {
					item = vm.procesos[index];
					item.modified = false;
				}
				
				if (datos.addedItems) {
					for (index = 0; index < datos.addedItems.length; index++) {
						item = datos.addedItems[index];
						vm.procesos.push(item);
					}
				}
				
				if (datos.modifiedItems) {
					for (index = 0; index < datos.modifiedItems.length; index++) {
						item = datos.modifiedItems[index].newItem;
						
						for (subIndex = 0; subIndex < vm.procesos.length; subIndex++) {
							subItem = vm.procesos[subIndex];
							if (item.id === subItem.id) {
								
								for (var prop in subItem) {
									if (subItem.hasOwnProperty(prop) && item.hasOwnProperty(prop) && prop !== '$$hashKey') {
										var originalValue = subItem[prop];
										var newValue = item[prop];
										
										if (newValue !== originalValue) {
											subItem[prop] = newValue;
										}
									}
								}
								
								subItem.modified = true;
								break;
							}
						}
					}
				}
				
				if (datos.deletedItems) {
					for (index = 0; index < datos.deletedItems.length; index++) {
						item = datos.deletedItems[index];
						for (subIndex = 0; subIndex < vm.procesos.length; subIndex++) {
							subItem = vm.procesos[subIndex];
							if (item.id === subItem.id) {
								vm.procesos.splice(subIndex, 1);
								break;
							}
						}
					}
				}

						
		}
		
		
	}
	
}());