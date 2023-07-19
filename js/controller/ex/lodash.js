(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http',function($scope,$window,$timeout,$interval,$http){
		$scope.page = {
			idx : 2
		};
		$scope.model = {
			method : ''
		};
		console.log(_.chunk(['a', 'b', 'c', 'd'], 2));
	}]);
})(window,window.angular);