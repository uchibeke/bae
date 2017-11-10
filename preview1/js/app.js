"use strict";

var myApp = angular.module('myApp', ['ngRoute', 'MainController']);

myApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/asset/:id/:owner/:receiver/', {
			templateUrl: 'views/main.html',
			controller: 'Controller'
		}).when('/asset/', {
			templateUrl: 'views/main.html',
			controller: 'Controller'
		}).otherwise({
			redirectTo: '/asset/'
		});
	}]);
myApp.run(['$rootScope', '$location', function ($rootScope, $location) {

	$rootScope.$on('$routeChangeStart', function (event, currRoute, prevRoute) {
	});
}]);
