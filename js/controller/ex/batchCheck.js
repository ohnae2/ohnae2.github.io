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
		$scope.site = {
			idx : 1,
			base : [
				 {site_no : 1 , site_nm : "11st"}
				,{site_no : 2 , site_nm : "Ebay"}
				,{site_no : 3 , site_nm : "Interpark"}
				,{site_no : 4 , site_nm : "Coupang"}
			],
			cc : [
				 {site_no : 1 , site_nm : "당사", entr_no : "79", entr_contr_no : "198195"}
				,{site_no : 2 , site_nm : "통판_당사닷컴", entr_no : "60", entr_contr_no : "198396"}
				,{site_no : 3 , site_nm : "인터파크", entr_no : "10397", entr_contr_no : "198395"}
				,{site_no : 4 , site_nm : "11번가(백화점)", entr_no : "448187", entr_contr_no : "016171"}
				,{site_no : 5 , site_nm : "11번가(인터넷)", entr_no : "448187", entr_contr_no : "016171"}
				,{site_no : 6 , site_nm : "11번가(TV)", entr_no : "448187", entr_contr_no : "016171"}
				,{site_no : 7 , site_nm : "이베이(지마켓/G9)_백화점", entr_no : "11308", entr_contr_no : "206800"}
				,{site_no : 8 , site_nm : "이베이(지마켓/G9)_인터넷", entr_no : "11308", entr_contr_no : "206800"}
				,{site_no : 9 , site_nm : "이베이(지마켓/G9)_TV", entr_no : "11308", entr_contr_no : "206800"}
				,{site_no : 10 , site_nm : "이베이(옥션)_백화점", entr_no : "11308", entr_contr_no : "206800"}
				,{site_no : 11 , site_nm : "이베이(옥션)_인터넷", entr_no : "11308", entr_contr_no : "206800"}
				,{site_no : 12 , site_nm : "이베이(옥션)_TV", entr_no : "11308", entr_contr_no : "206800"}
				,{site_no : 13 , site_nm : "인터파크(백화점)", entr_no : "10397", entr_contr_no : "198395"}
				,{site_no : 14 , site_nm : "인터파크(인터넷)", entr_no : "10397", entr_contr_no : "198395"}
				,{site_no : 15 , site_nm : "인터파크(TV)", entr_no : "10397", entr_contr_no : "198395"}
				,{site_no : 16 , site_nm : "쿠팡(백화점)", entr_no : "472044", entr_contr_no : "025418"}
				,{site_no : 17 , site_nm : "쿠팡(인터넷)", entr_no : "472044", entr_contr_no : "025418"}
				,{site_no : 18 , site_nm : "쿠팡(eTV상품)", entr_no : "472044", entr_contr_no : "025418"}
			]
		};

	}]);
})(window,window.angular);