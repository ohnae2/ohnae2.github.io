(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);
	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','$filter','kaisaApi',function($scope,$window,$timeout,$interval,$http,$filter,kaisaApi){
		$scope.page = {
			idx : 2
		};
		/**
		 * 제휴
		 */
		$scope.site = {

		};
	}]);
})(window,window.angular);