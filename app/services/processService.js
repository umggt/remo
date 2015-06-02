/// <reference path="../../typings/angularjs/angular.d.ts"/>

(function () {
	
	angular.module('remo').service('process', processService);
	
	/**
	 * Servicio de gestion de procesos.
	 * 
	 * @param {remo.IUbuntuService} ubuntuProcess  asdf
	 */
	function processService(ubuntuProcess, $timeout, $log) {
		
		var lastProcesses = null;
		var lastOutput = null;
		var onProcessChangeHandlers = [];
		var svc = this;
		var refreshTime = 6000;
		
		svc.onProcessChange = onProcessChange;
		svc.removeOnProcessChange = removeOnProcessChange;
		svc.listProcesses = listProcesses;
		
		init();
		
		function init() {
			getProcesses();
		}
		
		function listProcesses() {
			return lastProcesses;
		}
		
		/**
		 * Agrega un nuevo handler que se debe ejecutar cuando ocurre el
		 * evento ProcessChange
		 */
		function onProcessChange(handler) {
			if (onProcessChangeHandlers.indexOf(handler) < 0 && angular.isFunction(handler)) {
				onProcessChangeHandlers.push(handler);
			}
		}
		
		/**
		 * Elimina un handler que se haya agregado con el método onProcessChange.
		 */
		function removeOnProcessChange(handler) {
			var idx = onProcessChangeHandlers.indexOf(handler);
			if (idx >= 0) {
				onProcessChangeHandlers.splice(idx, 1);
			}
		}
		
		function getProcesses() {
			$log.debug('Ejecutando getProcess...');
			ubuntuProcess.listProcess().success(refreshProcessList);
		}
		
		function refreshProcessList(processes, output) {
			
			if (lastOutput !== output) {
				if (!lastProcesses) {
					lastProcesses = processes;
					if (lastProcesses.length > 0) {
						processChange({ addedItems: lastProcesses });
					}
				}
				else {
					compareLists(lastProcesses, processes);
					lastProcesses = processes;
				}
			}
			
			$timeout(getProcesses, refreshTime);	
			
		}
		
		function processChange(data) {
			for (var index = 0; index < onProcessChangeHandlers.length; index++) {
				var handler = onProcessChangeHandlers[index];
				handler(data);
			}
		}
		
		/**
		 * Compara dos arrays
		 * 
		 * @param {Array} original
		 * @param {Array} newone
		 */
		function compareLists(original, newone) {
			
			var newItem = null;
			var originalItem = null;
			var i = 0;
			var j = 0;
			var found = false;
			var itemModified = false;
			var addedItems = [];
			var modifiedItems = [];
			var deletedItems = [];
			var result = null;
			
			// buscando items modificados y nuevos:
			for (i = 0; i < newone.length; i++) {
				newItem = newone[i];
				
				for (j = 0; j < original.length; j++) {
					originalItem = original[j];
					
					if (originalItem.id === newItem.id) {
						found = true;
						break;
					}
				}
				
				if (found) {
					
					for (var prop in originalItem) {
						if (originalItem.hasOwnProperty(prop)) {
							var originalValue = originalItem[prop];
							var newValue = newItem[prop];
							
							if (newValue !== originalValue) {
								itemModified = true;
								break;
							}
						}
					}
					
					if (itemModified) {
						itemModified = false;
						modifiedItems.push({ newItem: newItem, originalItem: originalItem });
					}					
					
					found = false;
				}
				else {
					addedItems.push(newItem);
				}
				
			}
			
			// buscando items eliminados
			for (var i = 0; i < original.length; i++) {
				originalItem = original[i];
				
				for (var j = 0; j < newone.length; j++) {
					originalItem = newone[j];
					
					if (newItem.id === originalItem.id) {
						found = true;
						break;
					}
				}
				
				if (!found) {
					deletedItems.push(originalItem);
				}
				else {
					found = false;
				}
			}
			
			if (addedItems.length > 0) {
				result = {};
				result.addedItems = addedItems;
			}
			
			if (modifiedItems.length > 0) {
				result = result || {};
				result.modifiedItems = modifiedItems;
			}
			
			if (deletedItems.length > 0) {
				result = result || {};
				result.deletedItems = deletedItems;
			}
			
			$log.debug('Result: ', result);
			
			if (result) {
				processChange(result);
			}
		}
	}
}());

