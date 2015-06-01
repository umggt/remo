(function () {
	
	
	var exec = require('child_process').exec;
	var pattern = /^\s+?([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.+)$/;
	var cmd = 'ps -eo pid,%cpu,%mem,time,stat,nlwp,pri,psr,vsize,args';
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
	
	angular.module('remo').service('ubuntuProcess', ubuntuProcess);
	
	function ubuntuProcess($q, $log) {
		
		var svc = this;
		
		svc.listProcess = listProcess;
		
		function listProcess() {
			
			var defer = $q.defer();
			
			exec(cmd, function(err, stdout, stderr){
				
				var result = [];

				stdout.split('\n').forEach(function(line){
					
					line.replace(pattern, function(_, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) {
						
						var p = {};

						p.id = parseInt($1, 10);    // identificador del proceso
						p.cpu = parseFloat($2);     // utilización del cpu (tiempo de cpu/tiempo del proceso)
						p.memoria = parseFloat($3); // porcentaje de memoria utilizado.
						p.tiempo = $4;              // tiempo acumulado de cpu
						
						var estado = $5[0];
						var subEstado = $5.length > 1 ? $5[1] : null;
						p.estado = estados[estado];
						p.subEstado = subEstado ? subEstados[subEstado] : null;
						
						p.threads = parseInt($6, 10);
						p.prioridad = parseInt($7, 10);
						p.procesador = parseInt($8, 10);
						p.memriaVirtual = parseFloat($9);
						p.comando = $10;
						p.parametros = $11;
						
						result.push(p);
					});
				});
				
				$log.debug(result);
				
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

