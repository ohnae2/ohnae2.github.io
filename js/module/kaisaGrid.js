/**
 * ECBASE Project
 * grid ver 0.0.1
*/

(function(window, angular, undefined){
	'use strict';
	var app = angular.module('grid',['common']);

	app.service('kaisaGrid',['$http','$httpParamSerializerJQLike','$timeout','$filter','constant',function($http,$httpParamSerializerJQLike,$timeout,$filter,constant){
		this.init = function($scope, grid){
			var originData = new Array(),
			defaultOptions = {
				name : null,
				header : new Array(),
				headerSorting : true,
				headerOptions : {
					key : null,
					name : null,
					type : null,
					width : 100,
					minWidth : 50,
					length : 20,
					visible : true,
					disabled : false,
					align : 'left',
					required : false
				},
				wapper : null,
				message : null,
				data : new Array(),
				orderBy : null,
				height: 230,
				allCheck : false,
				total : 0,
				requiredArray : new Array(),
				dateArray : new Array(),
				numberArray : new Array(),
				searchUrl : null,
				searchParam : {
					startDate : $filter('date')(new Date().setMonth(new Date().getMonth() - 1), 'yyyy-MM-dd') + ' 00:00',
					endDate : $filter('date')(new Date(), 'yyyy-MM-dd') + ' 23:59',
					limitPage : '10',
					currentPage : '1'
				},
				search : function(){
					//TO-DO jsonp
					$http.jsonp(this.searchUrl + $scope.jsonpParam(this.searchParam)).success(function(data){
						if(data.success) {
							grid.data = data.items;
							//grid.total = data.total;
							grid.total = data.items.length;
							grid.message = data.message;
						}
						for(var i in grid.data){
							for(var j in grid.data[i]){
								//Datetime format
								for(var k in defaultOptions.dateArray){
									if(j == defaultOptions.dateArray[k].key){
										grid.data[i][j] = $filter('date')(new Date(grid.data[i][j]), (defaultOptions.dateArray[k]['dateFormat']) ? defaultOptions.dateArray[k]['dateFormat'] : constant.dateFormat);
									}
								}
								//Number(for sort)
								for(var h in defaultOptions.numberArray){
									if(j == defaultOptions.numberArray[h].key){
										grid.data[i][j] = parseInt(grid.data[i][j]);
										console.log(grid.data[i][j]);
									}
								}
							}
						}
						originData = angular.copy(grid.data);
						//current
						grid.currentPageArray = [];
						for(var i = 0; i < Math.ceil(grid.total / grid.searchParam.limitPage); i++){
							grid.currentPageArray.push({value : String(i + 1)})
						}
						$scope.loading.active = false;
			        }).error(function(data){
				    	$scope.alert.open({message : 'grid search error'});
				    	$scope.loading.active = false;
				    });
				},
				/**
				 * @util
				 */
				empty : function(o){
					if(o == null || o == '' || typeof o == 'undefined'){
						return true;
					}
					return false;
				},
				/**
				 * @paging
				 */
				currentPageArray : [
					{value : '1'}
				],
				currentChange : function(){
					this.search();
				},
				limitPageArray : [
					{value : '10'},
					{value : '20'},
					{value : '50'},
					{value : '100'},
					{value : '300'}
				],
				limitChange : function(){
					this.searchParam.currentPage = '1';
					this.search();
				},
				reset : function(idx){
					grid.data = angular.copy(originData);
				},
				searchReset: function(idx){
					grid.data = angular.copy(originData);
					grid.orderBy = null;
				},
				valid : function(o){
					var bool = true;
					grid.requiredArray.some(function(k,idx){
						for(var i in o){
							if(! o[k.key] || (k.key == i && grid.empty(o[i]))){
								$scope.alert.open({message:k.name + '을 작성해주세요'});//callback : inValidFocus
								bool = false;
							}
						}
					});
					return bool;
				},
				/**
				 * @save data
				 * */
				saveUrl : null,
				gridData : new Array(),
				save : function(){
					var failBool = false,
						selectedCount = 0;
					grid.gridData = [];
					for(var i in grid.data){
						var o = grid.data[i];
						if(o.SELECTED){
							selectedCount++;
							if(o.CRUD != 'R') {
								if(grid.valid(o)){
									grid.gridData.push(o);
								}else{
									failBool = true;
								}
							}
						}
					};
					if(selectedCount == 0){
						$scope.alert.open({message:'변경사항이 없습니다.'});
						return;
					};
					if(failBool){
						return;
					}else{
						var params = $httpParamSerializerJQLike({params : JSON.stringify(angular.copy(grid.gridData))});
						$http.jsonp(this.saveUrl + $scope.jsonpParam() + params).success(function(data){ //$http.post(this.saveUrl, value, $scope.postConfig).then(function(resp){
							if(data.success) {
								$timeout(function(){
									grid.message = data.message;
									grid.searchParam.currentPage = '1';
									grid.search();
									grid.callBack();
								},300);
							}else{
								$scope.alert.open({message:data.message});
							}
							$scope.loading.active = false;
				        }).error(function(data){
					    	$scope.alert.open({message : 'grid save error'});
					    	$scope.loading.active = false;
					    });
					};
				},
				callBack : function(){},
				colAllCheck : function(){
					if(this.allCheck){
						for(var i in grid.data){
							grid.data[i].SELECTED = true;
						}
					}else{
						for(var i in grid.data){
							grid.data[i].SELECTED = false;
						}
					};
				},
				colCheck : function(){
					for(var i in grid.data){
						if(grid.data[i].SELECTED && grid.data[i].CRUD != '' && grid.data[i].CRUD != 'C'){
							grid.data[i].CRUD = '';
						}
					};
				},
				sorting : function(key){
					if(this.orderBy == key){
						this.orderBy = '-' + key;
						return;
					}
					this.orderBy = '' + key;
				},
				add : function(){
					var o = {};
					for(var i in grid.header){
						o[grid.header[i].key] = (grid.header[i].optionDefault) ? grid.header[i].optionDefault : '';
					}
					o.CRUD = 'C';
					o.SELECTED = 'C';
					grid.data.unshift(o);
				},
				remove : function(){
					for(var i in grid.data){
						if(grid.data[i].SELECTED){
							grid.data[i].CRUD = 'D';
						}
					};
				},
				/**
				 * @grid ststus
				 * */
				key : null,
				col : null,
				row : null,
				value : null,
				selectedKey : null,
				selectedCol : null,
				selectedRow : null,
				selectedValue : null,

				beforeKey : null,
				beforeCol : null,
				beforeRow : null,
				beforeValue : null,
				gridClick : function(e){
					//TO-DO
				},
				/**
				 * @col
				 * */
				layerSelected : {
					left: '-100px',
					top: '-100px',
					width: '100px',
					height: '20px'
				},
				colClick : function(key, col, row){
					var cell = $('.gridT.'+this.name+' td[data-grid-col="'+col+'"][data-grid-row="'+row+'"]');

					var scrollLeft = $('.gridWrap.'+this.name).scrollLeft();

					if(cell.length > 0){
						this.layerSelected.left = cell.position().left - 2 + scrollLeft;
						this.layerSelected.top = cell.position().top -2;
						this.layerSelected.width = cell.find('.switch').width() + 6;
						this.layerSelected.height = cell.find('.switch').height() + 6;
					}
					/*
					this.beforeKey = this.selectedKey;
					this.beforeCol = this.selectedCol;
					this.beforeRow = this.selectedRow;
					this.beforeRow = this.selectedRow;
					this.beforeValue = this.selectedValue;
				    */
					this.selectedKey = key;
					this.selectedCol = col;
					this.selectedRow = row;
					this.selectedValue = this.value;
					/**
					 * TODO : Customer event
					 */
				},
				colMouseOver : function(key, col, row){
					this.key = key;
					this.col = col;
					this.row = row;
					this.value = this.data[this.row][this.key];
				},
				colMouseOut : function(){
				},

				headMouseOver : function(col){
					this.col = col;
				},
				headMouseOut : function(){
				},
				colDoubleClick : function(){
					var cdata = this.data[this.row];
					cdata.SELECTED = true;
					if(cdata.CRUD == 'C'){
						return;
					};
					cdata.CRUD = 'U';
				},
				/**
				 * @colResize event
				 * */
				colResizing : false,
				colResizeIndex : null,
				colResizeStartX : null,
				colResizeStartWidth : null,
				colResizeMousedown : function($event,chead){
					this.colResizing = true;
					this.colResizeStartX = $event.pageX;
					this.colResizeIndex = chead.index;
					this.colResizeStartWidth = chead.width;
				},
				/**
				 * @colMove event
				 * */
				mouseMoveEvent : null,
				mouseMove : function($event){
					this.mouseMoveEvent =$event;
					if(grid.colResizing) {
						var colSize = grid.colResizeStartWidth + ($event.pageX - grid.colResizeStartX);
						if(colSize > 80){
							grid.header[grid.colResizeIndex].width = colSize;
						};
 			        };
				},
				mouseUp : function($event){
					grid.colResizing = false;
					grid.colMoving = false;
				},
				mouseLeave : function($event){
					grid.colResizing = false;
					grid.colMoving = false;
				},
				/**
				 * @datepicker 연결 (시작 검색 날짜 설정)
				 * */
				gridDatepicker : function(key,rowIdx,colIdx,e){
					$scope.gridDatepicker.open({
						scope : this.name,
						startDate : this.name + '.data['+rowIdx+'].' + key,
						dateFormat : this.header[colIdx].dateFormat,
						target : angular.element(e.target).parent()
					});
				},
				/**
				 * @excelExport
				 * */
				excelExport : function(){
					var alertConfirm = confirm('엑셀 다운로드 받겠습니까?');
					if (!alertConfirm) {
					    return;
					};
					var thead = '',tbody = '',arrKey = new Array();
					this.header.forEach(function(o,i){
						if(o.name && o.key != 'CRUD' && o.key != 'SELECTED' && o.visible){
							thead += '<th>' + o.name + '</th>';
							arrKey.push(o.key);
						};
					});
					this.data.forEach(function(o){
						tbody += '<tr>';
						for(var i in arrKey){
							for(var j in o){
								if(j == arrKey[i]){
									tbody += '<td>' + o[j] + '</td>';
								};
							};
						};
						tbody += '</tr>';
					});
					var excelHtml = '<table><thead><tr>'+thead+'</tr></thead><tbody>'+tbody+'</tbody></table>';
					if($scope.browser.ie){
						var excelFrame = eval(this.name+'ExcelFrame');
						excelFrame.document.open("txt/html", "replace");
						excelFrame.document.write(excelHtml);
						excelFrame.document.close();
						excelFrame.focus();
						excelFrame.document.execCommand('SaveAs',true,this.name+'.xls');
					}else{
						window.open('data:application/vnd.ms-excel;charset=utf-8,%EF%BB%BF' + encodeURIComponent(excelHtml));
					};
				}
			};
			grid.header.forEach(function(chead,idx){
				chead.index = idx;
				if(chead.required){
					defaultOptions.requiredArray.push({
						name : chead.name,
						key : chead.key
					});
				}
				switch (chead.type) {
					case 'Date':
						defaultOptions.dateArray.push({
							name : chead.name,
							key : chead.key,
							dateFormat : chead['dateFormat']
						});
						break;
					case 'Number':
						defaultOptions.numberArray.push({
							name : chead.name,
							key : chead.key
						});
						break;
					default:
						break;
				}
			});
			grid = angular.extend(defaultOptions, grid);
			return grid;
		};
	}]);
	app.directive('kaisaGrid',[function(){
    	return {
    		templateUrl : '/html/grid/grid.html',
    		scope : {
	        	model : '=',
	        	page : '='
	        },
    		replace : true,
    		link : function($scope, el, attrs){
    		}
    	}
    }]);
	app.directive('kaisaGridPaging',[function(){
    	return {
    		templateUrl : '/html/grid/gridPaging.html',
    		scope : {
	        	model : '=',
	        	page : '='
	        },
    		replace : true,
    		link : function($scope, el, attrs){}
    	}
    }]);
	app.filter('CRUD',['$sce',function($sce){
		return function(value){
			switch (value) {
			case 'C':
				return '쓰기(C)';
				break;
			case 'U':
				return '수정(U)';
				break;
			case 'D':
				return '삭제(D)';
				break;
			default:
				return '읽기(R)';
				break;
			}
		}
	}]);
})(window, window.angular);