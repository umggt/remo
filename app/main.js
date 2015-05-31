(function () {
	
	angular.module('remo', ['ui.router'])
		.config(configureRoutes);
	
	/**
	 * Configura todas las rutas de la aplicación
	 */
	function configureRoutes($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider
			.when('', '/dashboard')
			.otherwise('/error/404');
		
		$stateProvider
			.state('error', {
				url: '/error',
				template: '<div ui-view></div>',
				abstract: true 
			})
			.state('error.404', {
				url: '/404',
				templateUrl: 'templates/error-404.html'
			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'templates/dashboard.html'
			})
			.state('procesador', {
				url: '/procesador',
				templateUrl: 'templates/procesador.html' 
			})
			.state('memoria', {
				url: '/memoria',
				templateUrl: 'templates/memoria.html'
			})
			.state('disco', {
				url: '/disco',
				templateUrl: 'templates/disco.html'
			});
	}
	
}());