(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$filter','kaisaGrid','kaisaApi',function($scope,$window,$timeout,$interval,$filter,kaisaGrid,kaisaApi){
		$scope.page = {
			idx : 2
		};
		$scope.dicGrid = kaisaGrid.init($scope,{
			name : 'dicGrid',
			header : [
				 {key:'ROW', 				name:'INDEX',		type:'Number',    width:50,  length:8,  visible:true,	disabled:true,	align:'center'}
			    ,{key:'CRUD', 				name:'CRUD',		type:'String',    width:50,  length:8,  visible:true,	disabled:true,	align:'center'}
				,{key:'SELECTED', 			name:'선택',		 	type:'Checkbox',  width:50,   length:5,  visible:true,	disabled:false,	align:'center'}
				,{key:'DICTIONARY_NUMBER',	name:'사전번호',		type:'Number',    width:100,  length:90, visible:true,	disabled:true,	align:'right'}
				,{key:'ABB',				name:'약어',			type:'String',    width:150,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'EN',					name:'영문',			type:'String',    width:150,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'KO',					name:'국문',			type:'String',	  width:150,  length:20, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'DESCRIPTION',		name:'설명',	 		type:'String',    width:150,  length:90, visible:true,	disabled:false,	align:'left', required:true}
				,{key:'CREATE_DATE',		name:'등록일시',  		type:'Date',	  width:170,  length:30, visible:true,	disabled:false,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm'}
				,{key:'UPDATE_DATE',		name:'수정일시',	  	type:'Date',	  width:200,  length:30, visible:true,	disabled:false,	align:'left', dateFormat: 'yyyy-MM-dd hh:mm:ss'} // , sort:true
			],
			headerSorting : true,
			searchUrl : kaisaApi.getDictionaryList,
			saveUrl   : kaisaApi.saveDictionaryList,
			callBack : function(){
				console.log('end query');
			},
			searchParam : {
				ABB : null,
				EN : null,
				KR : null,
				NOTE : null,
				limitPage : '10',
				currentPage : '1'
			}
		});
		$scope.dicGrid.search();
	}]);
	
})(window,window.angular);