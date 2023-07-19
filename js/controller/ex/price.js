(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http','$filter','kaisaApi',function($scope,$window,$timeout,$interval,$http,$filter,kaisaApi){
		$scope.page = {
			idx : 2
		};
		/**
		 * 가격
		 */
		$scope.price = {
			histStart : `2017/06/15 오후 8:04:18
2014/08/21 오후 3:03:14
2014/06/30 오후 7:57:20
2014/06/23 오후 5:44:30
2014/04/01 오후 2:17:56
2013/12/03 오후 2:04:57
2013/09/05 오후 5:15:11
2013/09/05 오후 5:14:22
2013/09/02 오후 3:58:19
2013/08/26 오후 4:34:43
2013/08/16 오후 2:59:26
2013/06/17 오후 2:52:18
2013/06/10 오후 1:26:32
2013/05/30 오후 2:57:30`,
			histEnd : `9999/12/31 오후 11:59:59
2017/06/15 오후 8:04:18
2014/08/21 오후 3:03:14
2014/06/30 오후 7:57:20
2014/06/23 오후 5:44:30
2014/04/01 오후 2:17:56
2013/12/03 오후 2:04:57
2013/09/05 오후 5:15:11
2013/09/05 오후 5:14:22
2013/09/02 오후 3:58:19
2013/08/26 오후 4:34:43
2013/08/16 오후 2:59:26
2013/06/17 오후 2:52:18
2013/06/10 오후 1:26:32`,
			arrStart : [],
			arrEnd : [],
			init : function(price){
				var line = price.split('\n');
				var arr = [];
				for(var i in line){
					console.log(line[i]);
					var time = line[i].replace(/[/:]/gi,'').split(' ');
					if(time[1] == '오후'){

					}
				}
			}
		};
		$scope.price.init($scope.price.histStart);
		$scope.price.init($scope.price.histEnd);


	}]);




})(window,window.angular);