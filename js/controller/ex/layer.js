(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		$scope.page = {
			idx : 2
		};

		/*
		 * TEST callback
		 * */
		$scope.callback = function(){
			console.log('callback');
		}
		$scope.cancelCallback = function(){
			console.log('cancel callback');
		}
		/*
		 * TEST tab
		 * */
		$scope.tabTest = 1;
		/*
		 * TEST popup
		 * */
		$scope.popupTest1 = function(){
			$scope.popup.open({
				target : 'popupTest1',
				dim : true,
				dimClick : true
			});
		}
		$scope.popupTest2 = function(){
			$scope.popup.open({
				target : 'popupTest2',
				dim : true,
				dimClick : true
			});
		}
		/*
		 * TEST ALERT
		 * */
		$scope.alert1 = function(){
			$scope.alert.open({
				message:'경고창!'
			});
		}
		$scope.alert2 = function(){
			$scope.alert.open({
				title : 'title',
				message : '경고창!',
				callback : $scope.callback
			});
		}
		$scope.alert3 = function(){
			$scope.alert.open({
				message:'confirm and callback!',
				confirm : true,
				callback : $scope.callback,
				cancelCallback : $scope.cancelCallback
			});
		}
		$scope.alert4 = function(){
			$scope.alert.open({
				message:'confirm 창!',
				confirm : true,
				button :  {ok : 'ok!!' ,cancel : 'cancel!!' }
			});
		}
		$scope.alert5 = function(){
			$scope.alert.open({
				title : '사이즈 조절',
				style : {
					width: '500px',
					height: '500px',
					margin: '-250px 0 0 -250px'
				},
				message:'confirm and callback!',
				confirm : true,
				callback : $scope.callback,
				cancelCallback : $scope.cancelCallback,
				button :  {ok : 'ok!!' ,cancel : 'cancel!!' }
			});
		}
		$scope.alert6 = function(){
			$scope.alert.open({
				type : 'html',
				message:'html <strong>message</strong>'
			});
		}
		
	}]);
	
})(window,window.angular);