(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http',function($scope,$window,$timeout,$interval,$http){
		$scope.page = {
			idx : 2
		};

		$scope.table = {
			name : 'OLS_DISP_SHOP_BASE',
			wordType : '10',
			originDirctionary: [],
			dirctionary : [],
			copySource : function(){
				var copyHtml = angular.element('.makeT .textarea').text().replace(/^\s*[\r\n]/gm , '');
				angular.element('#clipboard').val(copyHtml).select();
				if(window.clipboardData){
					window.clipboardData.setData('Text',copyHtml);
				}else{
					document.execCommand('copy');
					console.log('%c' + 'copy','color:#ff5500');
				}
			},
			column : [
				{name : 'LINK_SN', type: 'number' , default : 'OLS_DISP_SHOP_BASE_SQ01.NEXTVAL'},
				{name : 'SITE_NO', type: 'number' , default : 19},
				{name : 'CAT_SCT_CD', type: 'string' , default : '30'},
				{name : 'SITE_CAT_NO', type: 'string' , default : ''},
				{name : 'SITE_CAT_NM', type: 'string' , default : ''},
				{name : 'UPR_CAT_NO', type: 'string' , default : ''},
				{name : 'DPTH_NO', type: 'number' , default : 1},
				{name : 'USE_YN', type: 'string' , default : 'Y'},
				{name : 'DISP_YN', type: 'string' , default : 'Y'},
				{name : 'OUR_DISP_NO', type: 'number' , default : 0},
				{name : 'SITE_GBN_CD', type: 'string' , default : 'Y'},
				{name : 'SYS_REG_DTIME', type: 'string' , default : 'SYSDATE'},
				{name : 'SYS_REGR_ID', type: 'string' , default : 'H001167'},
				{name : 'SYS_MOD_DTIME', type: 'string' , default : 'SYSDATE'},
				{name : 'SYS_MODR_ID', type: 'string' , default : 'H001167'}
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