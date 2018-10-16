(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http',function($scope,$window,$timeout,$interval,$http){
		$scope.page = {
			idx : 2
		};

		$scope.table = {
			name : 'MBR',
			wordType : '10',
			originDirctionary: [],
			dirctionary : [],
			wordTypeChange : function(){
				if(this.wordType == '20'){
					for(var i in $scope.table.column){
						var arr = $scope.table.column[i].name.split('_');
						var columnName = '';
						for(var j in arr){
							var exist = false;
							for(var h in $scope.table.dirctionary){
								if($scope.table.dirctionary[h].ABB == arr[j]){
									columnName += $scope.table.dirctionary[h].EN + '_';
									exist = true;
								}
							}
							if(!exist){
								console.log('"' + arr[j] + '"가 용어사전에 없습니다.');
								columnName += arr[j] + '_';
							}
						}
						$scope.table.column[i].name = columnName.slice(0,-1);
					}
				}else{
					for(var i in $scope.table.column){
						var arr = $scope.table.column[i].name.split('_');
						var columnName = '';
						for(var j in arr){
							var exist = false;
							for(var h in $scope.table.dirctionary){
								if($scope.table.dirctionary[h].EN == arr[j]){
									columnName += $scope.table.dirctionary[h].ABB + '_';
									exist = true;
								}
							}
							if(!exist){
								console.log('"' + arr[j] + '"가 용어사전에 없습니다.');
								columnName += arr[j] + '_';
							}
						}
						$scope.table.column[i].name = columnName.slice(0,-1);
					}
				}
			},
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
				{name : 'MBR_NO'},
				{name : 'MBR_NM'},
				{name : 'MBR_INST_PSC'}
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
							name : arr[i]
						});
					}
				}
				$scope.popup.close({target : 'popupColumn'});
				
				this.wordType = '10';
				
			},
			model : {
				dumpColumn : `AUTH_GRP_NO
AUTH_GRP_NM
SYS_CD
USE_YN
NOTE
REG_DTIME
REGR_ID
REG_PGM_ID
MOD_DTIME
MODR_ID
MOD_PGM_ID`
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