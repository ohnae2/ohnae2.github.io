(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		$scope.page = {
			idx : 2
		};

		$scope.text1 = angular.element('#text1').val();
		$scope.text2= angular.element('#text2').val();
		$scope.text3 = '';
		$scope.text4 = '';
		$scope.arr1 = $scope.text1.split('\n'),
		$scope.arr2 = $scope.text2.split('\n');
		$scope.textCompare = function(){
			$scope.loading.active = true;
			$scope.arr1 = $scope.text1.split('\n'),
			$scope.arr2 = $scope.text2.split('\n');
			$timeout(function(){
				$scope.text3 = '';
				$scope.text4 = '';
				for(var i in $scope.arr1){
					for(var j in $scope.arr2){
						if($scope.arr1[i] == $scope.arr2[j]){
							$scope.text3 += $scope.arr1[i] + '\n';
							break;
						}
						if(j == $scope.arr2.length-1){
							$scope.text4 += $scope.arr1[i] + '\n';
						}
					}
				}
				$scope.arr1 = $scope.text1.split('\n'),
				$scope.arr2 = $scope.text2.split('\n');
				$scope.arr3 = $scope.text3.split('\n');
				$scope.arr4 = $scope.text4.split('\n');
				$scope.loading.active = false;
			},100);

		};
	}]);
})(window,window.angular);