(function () {
	
	angular.module('remo').service('testProcess', testProcess);
	
	function testProcess($q, $log) {
		
		var svc = this;
		svc.listProcess = listProcess;
		svc.kill = kill;
		
		var estados = {
			'D': 'Suspendido (I/O)',
			'R': 'Ejecutando',
			'S': 'Suspendido (Evento)',
			'T': 'Detenido',
			'W': 'Paginando',
			'X': 'Muerto',
			'Z': 'Zombie'
		};
		
		var subEstados = {
			'<': 'Alta prioridad',
			'N': 'Baja prioridad',
			'L': 'Paginas bloqueadas en memoria',
			's': 'Manejador de sesión',
			'l': 'Multi threading',
			'+': 'Proceso en segundo plano'
		};
		
		function obtenerEstado() {
			var indice = (Math.random() * 6);
			var x = 0;
			for (var key in estados) {
				if (estados.hasOwnProperty(key) && indice === x) {
					return estados[key];
				}
				x++;
			}
			
			return null;
		}
		
		function obtenerSubEstado() {
			var indice = (Math.random() * 6);
			var x = 0;
			for (var key in subEstados) {
				if (subEstados.hasOwnProperty(key) && indice === x) {
					return subEstados[key];
				}
				x++;
			}
			
			return null;
		}
		
		function listProcess() {
			
			var defer = $q.defer();
			
			var procesosCount = Math.floor((Math.random() * 75) + 1);
			var procesos = [];
			
			for (var index = 0; index < procesosCount; index++) {
				
				var hh = ("00" + Math.floor(Math.random() * 24)).slice (-2);
				var mm = ("00" + Math.floor(Math.random() * 59)).slice (-2);
				var ss = ("00" + Math.floor(Math.random() * 59)).slice (-2);
				
				var p = { 
					id: Math.floor(Math.random() * 1000), 
					cpu: Math.random() * 60, 
					memoria: Math.random() * 99, 
					tiempo: hh + ':' + mm + ':' + ss, 
					estado: obtenerEstado(), 
					subEstado: obtenerSubEstado(), 
					threads: Math.floor(Math.random() * 10), 
					prioridad: Math.floor(Math.random() * 100), 
					procesador: Math.floor(Math.random() * 4), 
					memoriaVirtual: (Math.random() * 2048), 
					comando: '/usr/sbin -demo', 
					parametros: '-demo', 
					nombre: 'sbin'
				};
				
				procesos.push(p);
			}
			
			defer.resolve(procesos);	
			return defer.promise;
		}
		
		function kill(processId) {
			var defer = $q.defer();
			defer.resolve("ok");	
			return defer.promise;
		}
	}
}());

