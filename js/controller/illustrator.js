(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		
		$scope.page = {
			idx : 1
		};
		$scope.illustList = [
			{url : '/img/illust/1.jpg'},
			{url : '/img/illust/2.jpg'},
			{url : '/img/illust/3.jpg'},
			{url : '/img/illust/4.jpg'},
			{url : '/img/illust/5.jpg'},
			{url : '/img/illust/6.jpg'},
			{url : '/img/illust/7.jpg'},
			{url : '/img/illust/8.jpg'},
			{url : '/img/illust/9.jpg'},
			{url : '/img/illust/10.jpg'},
			{url : '/img/illust/11.jpg'}
		];
		// {url : '/img/illust/12.jpg'},
		$scope.illust = {
			idx : -1,
			total : $scope.illustList.length,
			click : function(idx){
				this.idx = idx;
				$scope.dimmed.open();
			},
			prev : function(){
				if(0 < this.idx){
					this.idx--;
				}else{
					this.idx = this.total - 1;
				}
			},
			next : function(){
				if(this.total > this.idx + 1){
					this.idx++;
				}else{
					this.idx = 0;
				}
			}
		}
	}]);
})(window,window.angular);