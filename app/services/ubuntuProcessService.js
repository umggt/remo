(function () {
	
	
	var exec = require('child_process').exec;
	var pattern = /^\s+?([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.+)$/;
	var cmd = 'ps -eo pid,suser,%cpu,%mem,time,stat,nlwp,pri,psr,vsize,args';
	
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
	
	var prioridades = {
		'extremos': { inferior: -200, superior: 200 },
		'Muy alta': { min: -200, max: -80 },
		'Alta':  { min: -70, max: -30 },
		'Normal':  { min: -20, max: 20 },
		'Baja':   { min: 30, max: 60 },
		'Muy baja':   { min: 70, max: 200 }
	};
	
	angular.module('remo').service('ubuntuProcess', ubuntuProcess);
	
	function ubuntuProcess($q, $log) {
		
		var svc = this;
		
		svc.listProcess = listProcess;
		svc.kill = kill;
		
		function listProcess() {
			
			var defer = $q.defer();
			
			exec(cmd, function(err, stdout, stderr){
				
				var result = [];

				stdout.split('\n').forEach(function(line){
					
					line.replace(pattern, function(_, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) {
						
						var p = {};

						p.id = parseInt($1, 10);    // identificador del proceso
						p.usuario = $2;
						p.cpu = parseFloat($3);     // utilización del cpu (tiempo de cpu/tiempo del proceso)
						p.memoria = parseFloat($4); // porcentaje de memoria utilizado.
						p.tiempo = $5;              // tiempo acumulado de cpu
						
						var estado = $6[0];
						var subEstado = $6.length > 1 ? $6[1] : null;
						p.estado = estados[estado];
						p.subEstado = subEstado ? subEstados[subEstado] : null;
						
						p.threads = parseInt($7, 10);
						var prioridad = parseInt($8, 10);
						
						if (prioridad < prioridades.extremos.inferior) {
							p.prioridad = 'Muy alta';
						} else if (prioridad > prioridades.extremos.superior) {
							p.prioridad = 'Muy baja';
						} else {
							for (var key in prioridades) {
								if (prioridades.hasOwnProperty(key) && key !== 'extremos') {
									var prioridadRef = prioridades[key];
									if (prioridad >= prioridadRef.min && prioridad <= prioridadRef.max) {
										p.prioridad = key;
										break;
									}
								}
							}
						}
						
						p.prioridadValor = prioridad;
						
						p.procesador = parseInt($9, 10);
						p.memoriaVirtual = parseFloat($10);
						p.comando = $11;
						p.parametros = $12;
						p.nombre = p.comando.substr(p.comando.lastIndexOf('/') + 1);
						
						result.push(p);
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
		
		function kill(processId) {
			var defer = $q.defer();
			
			exec('kill ' + processId, function(err, stdout, stderr) {
				if (!err) {
					defer.resolve(stdout);	
				}
				else {

					defer.reject(err);
				}
			});
			
			return defer.promise;
		}
	}
}());

