/// <reference path="../typings/angularjs/angular.d.ts"/>
(function () {

	angular.module('remo', ['ui.router'])
		.constant('bootbox', window.bootbox)
		.constant('toastr', window.toastr)
		.config(configureRoutes);
	
	/**
	 * Configura todas las rutas de la aplicación
	 */
	function configureRoutes($stateProvider, $urlRouterProvider) {
		
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
			.state('home', {
				url: '/',
				controller: function ($state) {
					$state.transitionTo('dashboard');
				}
			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'templates/dashboard.html',
				controller: 'DashboardController',
				controllerAs: 'vm'
			})
			.state('procesador', {
				url: '/procesador',
				templateUrl: 'templates/procesador.html',
				controller: 'ProcesadorController',
				controllerAs: 'vm'
			});
			
		$urlRouterProvider
			.when('', '/dashboard')
			.otherwise('/error/404');
	}
	
}());