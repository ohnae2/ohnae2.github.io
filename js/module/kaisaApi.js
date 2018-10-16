(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('api', ['baseConstant']);

	app.service('kaisaApi', ['constant',function(constant) {
		var apiUrl = location.protocol + '//' + 'admin.mobydic.co.kr',
		ext = constant.extension.api;

		this.getTestDictionaryList = '/json/dictionary_list.json'; //test

		this.getDictionaryList = apiUrl + '/api/controller/kaisa/dictionary/getDictionaryList' + ext; //admin
		this.saveDictionaryList = apiUrl + '/api/controller/kaisa/dictionary/saveDictionaryList' + ext; //admin

		this.getCategoryList = apiUrl + '/api/controller/kaisa/category/getCategoryList' + ext; //admin
		this.saveCategoryList = apiUrl + '/api/controller/kaisa/category/saveCategoryList' + ext; //admin

		this.getLogin = apiUrl + '/api/controller/kaisa/user/getLogin' + ext; //admin
		this.getLogout = apiUrl + '/api/controller/kaisa/user/getLogout' + ext; //admin
		this.getLoginCheck = apiUrl + '/api/controller/kaisa/user/getLoginCheck' + ext; //admin

		this.getAffList = '/json/getAffList.json'; //admin

    }]);
})(window, window.angular);