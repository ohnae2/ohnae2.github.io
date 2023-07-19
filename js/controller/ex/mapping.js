(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http',function($scope,$window,$timeout,$interval,$http){
		$scope.page = {
			idx : 2
		};
		$scope.getArray = function(num) {
			if(num > 99) {
			    return new Array(num);
			}
		    return new Array(num);
		};
		$scope.table = {
			name : 'OLS_DISP_SHOP_BASE',
			wordType : '10',
			originDirctionary: [],
			dirctionary : [],
			length : 0,
			generate : function() {
				for(var i in $scope.table.column){
					if(!$scope.table.column[i].default && $scope.table.column[i].text){
						var length = $scope.table.column[i].text.split('\n').length;
						if(length > $scope.table.length){
							$scope.table.length = length;
						}
						$scope.table.column[i].array = $scope.table.column[i].text.split('\n');
						console.log($scope.table.column[i].name + '는 %c' + length + '%c개의 데이터가 있습니다.','color:#ff0000; font-weight:bold;','color:#333;');
					}
				}
			},
			copySource : function(){
				var copyHtml = angular.element('.source').text().replace(/^\s*[\r\n]/gm , '');
				angular.element('#clipboard').val(copyHtml).select();
				if(window.clipboardData){
					window.clipboardData.setData('Text',copyHtml);
				}else{
					document.execCommand('copy');
					console.log('%c' + 'copy','color:#ff5500');
				}
			},
			column : [
				{name : 'LINK_SN', type: 'number' , default : 'OLS_DISP_SHOP_BASE_SQ01.NEXTVAL', text: ''},
				{name : 'SITE_NO', type: 'number' , default : '19', text: ''},
				{name : 'CAT_SCT_CD', type: 'string' , default : '30', text: ''},
				{name : 'SITE_CAT_NO', type: 'string' , default : '', text: 'BN50000040\nBN50000050\nBN50000060\nBN50000070\nBN50000080\nBN50000080\nBN50000090'},
				{name : 'SITE_CAT_NM', type: 'string' , default : '', text: '과즙망\n스낵컵\n식기세트\n유아식판\n이유식전용식기\n접시\n이유식냉동용기\n이유식보관용기\n이유식저장팩\n이유식저장팩\n죽통/푸드자\n수유브라\n'},
				{name : 'UPR_CAT_NO', type: 'string' , default : '0', text: '0'},
				{name : 'DPTH_NO', type: 'number' , default : '1', text: ''},
				{name : 'USE_YN', type: 'string' , default : 'Y', text: ''},
				{name : 'DISP_YN', type: 'string' , default : 'Y', text: ''},
				{name : 'OUR_DISP_NO', type: 'number' , default : '0', text: ''},
				{name : 'SITE_GBN_CD', type: 'string' , default : 'Y', text: ''},
				{name : 'SYS_REG_DTIME', type: 'string' , default : 'SYSDATE', text: ''},
				{name : 'SYS_REGR_ID', type: 'string' , default : 'H001167', text: ''},
				{name : 'SYS_MOD_DTIME', type: 'string' , default : 'SYSDATE', text: ''},
				{name : 'SYS_MODR_ID', type: 'string' , default : 'H001167', text: ''}
			],
			columnFull : [],
			delColumn : function(){
				if(this.column.length != 1){
					this.column.pop(this.column.length - 1);
				}
			},
			addColumn : function(){
				this.column.push({
					name : ''
				});
			},
			addDumpColumn : function(){
				this.column = [];
				var arr = this.model.dumpColumn.split('\n');
				for(var i in arr){
					if(arr[i]){
						this.column.push({
							name : arr[i],
							type : (arr[i].match('TEXT')) ? 'string' : 'number',
							array : ''
						});
					}
				}
				$scope.popup.close({target : 'popupColumn'});
				this.wordType = '10';
			},
			model : {
				dumpColumn : 'TEXT1\nTEXT2\nTEXT3\nTEXT4\nTEXT5\nTEXT6\nTEXT7\nTEXT8\nTEXT9\nNUM1\nNUM2\nNUM3\nNUM4\nNUM5\nNUM6\nNUM7\nNUM8\nNUM9'
			},
			popupColumn : function(){
				$scope.popup.open({
					target : 'popupColumn',
					dim : true,
					dimClick : true
				});
			}
		};
		$http.get('/json/dictionary_object.json').then(function(resp){
			$scope.table.dirctionary = resp.data.items;
		});
	}]);
})(window,window.angular);