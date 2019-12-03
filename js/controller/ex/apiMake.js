(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('KaisaApp', [ 'common', 'layerDatePicker' ]);

	app.controller('BodyController', [ '$scope', '$window', '$timeout', '$interval', '$http', 'kaisaApi', '$filter', function($scope, $window, $timeout, $interval, $http, kaisaApi, $filter) {
		$scope.page = {
			idx : 2
		};
		$scope.api = {
			data : null,
			dataArray : [],
			result : ''
		};
		$scope.api.data = `apiCd	O	string
trGrpCd	O	string
trNo	O	string
lrtrNo	O	string
spdLst		array
scatNo	O	string
epdNo	O	string
slTypCd	O	string
pdTypCd	O	string
spdNm	O	string
brdNo		string
mfcrNm		string
oplcCd	O	string
`,
		$scope.api.dataArray = $scope.api.data.split('\n');
		$scope.api.make = function(){
			for(var i in $scope.api.dataArray){
				var str = $scope.api.dataArray[i].split('	');
				if(str[0] && str[2]) {
					$scope.api.result += '<element name="'+str[0]+'" type="'+str[2]+'"></element>\n';
				}
			}
		};
		$scope.api.make();

	} ]);
})(window, window.angular);