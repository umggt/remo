(function () {
	
	angular.module('remo')
		.config(decorate$q);
	
	/**
	 * Se decora el servicio $q para que las promesas que se crean con 
	 * el método defer de este contentan los handlers "success" y "error".
	 */
	function decorate$q($provide) {
		
		$provide.decorator('$q', function ($delegate) {
			
			function httpResponseWrapper(fn) {
				return function(res) {
					if (res.hasOwnProperty('data') && res.hasOwnProperty('status') && res.hasOwnProperty('headers') && res.hasOwnProperty('config') && res.hasOwnProperty('statusText')) {
						return fn(res.data, res.status, res.headers, res.config, res.statusText);
					} else {
						return fn(res);
					}
				};
			};
			
			function decorator(promise) {
				promise.success = function(fn) {
					return decorator(promise.then(httpResponseWrapper(fn)));
				};
				
				promise.error = function(fn) {
					return decorator(promise.then(null, httpResponseWrapper(fn)));
				};
				
				return promise;
			};
			
			// Se captura el método defer original, ya que lo que se hace
			// es interceptarlo para que al ejecutar $q.defer() se ejecute
			// el nuevo método acá escrito en lugar del $q.defer original.
			var defer = $delegate.defer;
			
			// nueva implementación del defer
			$delegate.defer = function() {
				var deferred = defer();
				decorator(deferred.promise);
				return deferred;
			};
			
			return $delegate;
		});
	}
	
}());