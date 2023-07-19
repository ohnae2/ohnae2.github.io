(function(window, angular, undefined){
	'use strict';
	var app = angular.module('popup',['common']);
	app.directive('popupTest1',['constant',function(constant){
    	return {
    		templateUrl : '/html/popup/popupTest1.html',
    		replace : true,
    		link: function($scope, el, attrs){}
    	}
    }]);
	app.directive('popupTest2',['constant',function(constant){
    	return {
    		templateUrl : '/html/popup/popupTest2.html',
    		replace : true,
    		link: function($scope, el, attrs){}
    	}
    }]);
	app.directive('popupColumn',['constant',function(constant){
		return {
			templateUrl : '/html/popup/popupColumn.html',
			replace : true,
			link: function($scope, el, attrs){}
		}
	}]);
})(window, window.angular);