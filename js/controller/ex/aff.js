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
		$scope.aff = {
			data : []
		};

		var now = new Date(),arrayHour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],arrayMin=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];

		var nowHour = parseInt($filter('date')(new Date(),'HH'));
		var nowMin = parseInt($filter('date')(new Date(),'mm'));

		$http.get(kaisaApi.getAffList,{params : {} }).then(function(resp){
			$scope.aff.data = resp.data;
			for(var i in $scope.aff.data){
				var o = $scope.aff.data[i];
				o.cnt = 0;
				if(o.hour.length > 0){
					for(var j in o.hour){
						if(o.hour[j] <= nowHour){
							(o.min.length == 0)? o.cnt++ : 0;
							if(o.min[j] <= nowMin){
								for(var k in o.min){
									o.cnt++;
								}
							}
						}
					}
				}
			};
		});

	}]);
})(window,window.angular);