/// <reference path="../typings/angularjs/angular.d.ts"/>
(function () {	
	angular.module('remo', ['ui.router'])
		.config(configureRoutes);
	
	/**
	 * Configura todas las rutas de la aplicación
	 */
	function configureRoutes($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider
			.when('', '/')
			.otherwise("/error/404");
		
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'templates/home.html'
			})
			.state('error', {
				url: '/error',
				template: '<div ui-view></div>',
				abstract: true 
			})
			.state('error.404', {
				url: '/404',
				templateUrl: 'templates/error-404.html'
			});
	}
	
}(angular));