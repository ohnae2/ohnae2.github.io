(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('url', ['baseConstant']);
	/**
	 * 각 업무카테고리별 '/' 제거 후 카멜표기법으로 값을 생성
	 */
	app.service('kaisaUrl', ['constant',function(constant) {
		var protocol = (constant.host != '') ? 'http://' + constant.host : '',
			protocol_SSL = (constant.host != '') ? 'http://' + constant.host : '', //test https
			ext = constant.extension.link;

		this.main = protocol + '/' + ext;
		this.illustrator = protocol + '/illustrator' + ext;

		//this.reservation = protocol_SSL + '/reservation' + ext;

		//example
		this.exLayer = protocol + '/ex/layer.html';
		this.exDate = protocol + '/ex/date.html';
		this.exDateLayer = protocol + '/ex/dateLayer.html';
		this.exDrag = protocol + '/ex/drag.html';
		this.exSwipe = protocol + '/ex/swipe.html';
		this.exDictionary = protocol + '/ex/dictionary.html';
		this.exDto = protocol + '/ex/dto.html';
		this.exOrder = protocol + '/ex/order.html';
		this.exEncode = protocol + '/ex/encode.html';
		this.exHandlebars = protocol + '/ex/handlebars.html';
		this.exBatch = protocol + '/ex/batch.html';
		this.exBatchCheck = protocol + '/ex/batchCheck.html';
		this.exSiteCheck = protocol + '/ex/siteCheck.html';
		this.exCompare = protocol + '/ex/compare.html';
		this.exCrawler = protocol + '/ex/crawler.html';
		this.exApiMake = protocol + '/ex/apiMake.html';
		this.exMapping = protocol + '/ex/mapping.html';
		this.exColor = protocol + '/ex/color.html';

    }]);
})(window, window.angular);