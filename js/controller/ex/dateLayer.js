(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','layerDatePicker']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$filter',function($scope,$window,$timeout,$interval,$filter){
		$scope.page = {
			idx : 2
		};

		$scope.TEST = {
			active : false,
			toggle : function(){
				(this.active) ? this.active = false : this.active = true;
			},
			date : new Date(),
			visitDate : '2019-02-02'
		};
	}]);
	
})(window,window.angular);