(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('KaisaApp', [ 'common', 'layerDatePicker' ]);

	app.controller('BodyController', [ '$scope', '$window', '$timeout', '$interval', '$http', 'kaisaApi', '$filter', function($scope, $window, $timeout, $interval, $http, kaisaApi, $filter) {
		$scope.page = {
			idx : 2
		};
		$scope.crawler = {
			data : null,
			date : {
				startDate : new Date(),
				active : false,
				toggle : function() {
					(this.active) ? this.active = false : this.active = true;
				}
			},
			getGoodsCnt : function() {
				$http.jsonp(kaisaApi.getGoodsCnt + $scope.jsonpParam(null)).success(function(data) {
					if (data.success) {
						// for ( var i in data.items) {
						// console.log(i,data.items[i]); }
						$scope.crawler.data = data.items;
					} else {
						$scope.alert.open({
							message : '크롤링 조회 실패.'
						});
					}
				}).error(function(data) {
					$scope.alert.open({
						message : '예약할 수 없는 날짜 입니다.'
					});
					$scope.loading.active = false;
				});
			}
		}
	} ]);
})(window, window.angular);