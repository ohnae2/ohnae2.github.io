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
		$scope.batch = {
			data : [],
			searchParam : {
				text : ''
			},
			search : function(){},
			orderBy : 'BATCH_NM'
		};
		var now = new Date(),arrayHour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],arrayMin=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];
		var nowHour = parseInt($filter('date')(new Date(),'HH'));
		var nowMin = parseInt($filter('date')(new Date(),'mm'));
		$http.get(kaisaApi.getAffList,{params : {} }).then(function(resp){
			$scope.batch.data = resp.data;
			for(var i in $scope.batch.data){
				var o = $scope.batch.data[i];
				o.cnt = 0;
				o.hhArr = o.EXE_CYCL_HH_VAL.split(',');
				o.minArr = o.EXE_CYCL_MIN_VAL.split(',');
				o.hhHtml = '';
				o.minHtml = '';
				if(o.hhArr.length > 0){
					for(var j in o.hhArr){
						if(o.hhArr[0] == '*'){
							for(var ii = 1; ii <= nowHour; ii ++){
								for(var k in o.minArr){
									if(ii == nowHour){
										if(parseInt(o.minArr[k]) <= nowMin){
											(k == 0) ? o.minHtml += '<u>' + o.minArr[k] + '</u>' : o.minHtml += ',<u>' + o.minArr[k] + '</u>';
											o.cnt++;
										}else{
											o.minHtml += ',<span>'+ o.minArr[k]+'</span>';
										}
									}else{
										o.cnt++;
									}
								}
							}
							o.hhHtml += '<b>*</b>';
						}else{
							console.log('----------');
							if(parseInt(o.hhArr[j]) <= nowHour){
								for(var k in o.minArr){
									if(parseInt(o.hhArr[j]) == nowHour){
										if(parseInt(o.minArr[k]) <= nowMin){
											(k == 0) ? o.minHtml += '<u>' + o.minArr[k] + '</u>' : o.minHtml += ',<u>' + o.minArr[k] + '</u>';
											o.cnt++;
										}else{
											o.minHtml += ',<span>'+ o.minArr[k]+'</span>';
										}
									}else{
										o.cnt++;
									}
									//console.log(o.BATCH_SN + ' : ' + parseInt(o.hhArr[j]) + ',' + nowHour + ',' + o.minArr.length + ',' + o.cnt);
								}
								(j == 0) ? o.hhHtml += '<b>' + o.hhArr[j] + '</b>' : o.hhHtml += ',<b>' + o.hhArr[j] + '</b>';
							}else{
								o.hhHtml += ',<span>' + o.hhArr[j] + '</span>';
							}
						}
					}
				}
			};
		});

	}]);
})(window,window.angular);