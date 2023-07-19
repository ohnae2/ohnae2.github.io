(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','oneDatepicker']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$filter',function($scope,$window,$timeout,$interval,$filter){
		$scope.page = {
			idx : 2
		};


		/*
		 * date
		 * */
		$scope.date = {
			start : null
		}
		$scope.date.startDate = $filter('date')(new Date(),'yyyy-MM-dd')

		//test
		$scope.RESERVATION = {
			NAME: '',
			DATE: '',
			TIME: '7',
			PERSONNEL: '2',
			PHONE: '',
			EMAIL: '',
			NOTICE: '',
			PASSWORD: '',
			PASSWORD2: '',
			CAPTCHA: ''
		};
		$scope.option = {
			time : [
				{id: '7', name: '7시'},
				{id: '8', name: '8시'},
				{id: '9', name: '9시'},
				{id: '10', name: '10시'},
				{id: '11', name: '11시'},
				{id: '12', name: '12시'},
				{id: '13', name: '13시'},
				{id: '14', name: '14시'},
				{id: '15', name: '15시'},
				{id: '16', name: '16시'},
				{id: '17', name: '17시'},
				{id: '18', name: '18시'}
		    ]
		};

		$scope.$watch('reservationDate.start.date', function(val){
			if(val){
				$scope.date.startDate = $filter('date')(val,'yyyy-MM-dd');
				$scope.RESERVATION.DATE = $filter('date')(val,'yyyy-MM-dd');
			}
        },true);
	}]);

})(window,window.angular);