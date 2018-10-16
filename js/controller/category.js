(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$filter','kaisaGrid','kaisaApi',function($scope,$window,$timeout,$interval,$filter,kaisaGrid,kaisaApi){
		$scope.page = {
			idx : 4
		};
		$scope.categoryGrid = kaisaGrid.init($scope,{
			name : 'categoryGrid',
			header : [
				 {key:'ROW', 				name:'INDEX',		type:'Number',    width:50,   length:8,  visible:true,	disabled:true,	align:'center'}
				,{key:'CRUD', 				name:'CRUD',		type:'String',    width:100,  length:8,  visible:true,	disabled:true,	align:'center'}
				,{key:'SELECTED', 			name:'선택',		 	type:'Checkbox',  width:50,   length:5,  visible:true,	disabled:false,	align:'center'}
				,{key:'CATEGORY_NUMBER',	name:'카테고리번호',	type:'Number',    width:100,  length:90, visible:true,	disabled:true,	align:'left'}
				,{key:'HIGH_NUMBER',		name:'상위번호',		type:'Number',    width:150,  length:20, visible:true,	disabled:false,	align:'left', required:true, maxNumber:10000}
				,{key:'CATEGORY_NAME',		name:'카테고리명',		type:'String',    width:150,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'LEAF_YN',			name:'하위존재여부',	type:'Combo',	  width:150,  length:1,  visible:true,	disabled:false,	align:'left', required:true, options:[{value:'Y',name:'있음'},{value:'N',name:'없음'}], optionDefault : 'Y'}
				,{key:'PRIORITY',			name:'우선순위',	 	type:'Number',    width:150,  length:90, visible:true,	disabled:false,	align:'center', required:true, optionDefault : 1}
				,{key:'USE_YN',				name:'사용여부',	 	type:'Combo',  	  width:150,  length:1,  visible:true,	disabled:false,	align:'left', required:true, options:[{value:'Y',name:'사용'},{value:'N',name:'사용안함'}], optionDefault : 'Y'}
				,{key:'CREATE_DATE',		name:'등록일시',  		type:'Date',	  width:170,  length:30, visible:true,	disabled:false,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm:ss'}
				,{key:'UPDATE_DATE',		name:'수정일시',	  	type:'Date',	  width:200,  length:30, visible:true,	disabled:false,	align:'left'}
			],
			headerSorting : true,
			searchUrl : kaisaApi.getCategoryList,
			saveUrl   : kaisaApi.saveCategoryList,
			callBack : function(){
				console.log('end query');
			},
			searchParam : {
				CATEGORY_NUMBER : null,
				limitPage : '10',
				currentPage : '1'
			}
		});
		$scope.categoryGrid.search();
	}]);
	
})(window,window.angular);