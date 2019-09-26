(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('api', ['baseConstant']);

	app.service('kaisaApi', ['constant',function(constant) {
		var apiUrl = location.protocol + '//' + 'admin.mobydic.co.kr',
		ext = constant.extension.api;
		this.getTestDictionaryList = '/json/dictionary_list.json'; //test
		this.getDictionaryList = apiUrl + '/api/controller/kaisa/dictionary/getDictionaryList' + ext;
		this.saveDictionaryList = apiUrl + '/api/controller/kaisa/dictionary/saveDictionaryList' + ext;
		this.getCategoryList = apiUrl + '/api/controller/kaisa/category/getCategoryList' + ext;
		this.saveCategoryList = apiUrl + '/api/controller/kaisa/category/saveCategoryList' + ext;
		this.getLogin = apiUrl + '/api/controller/kaisa/user/getLogin' + ext;
		this.getLogout = apiUrl + '/api/controller/kaisa/user/getLogout' + ext;
		this.getLoginCheck = apiUrl + '/api/controller/kaisa/user/getLoginCheck' + ext;
		this.getAffList = '/json/getAffList.json';
		this.getGoodsCnt = 'http://ohnae3.cafe24.com/api/controller/kaisa/crawler/getGoodsCnt.php';
    }]);
})(window, window.angular);