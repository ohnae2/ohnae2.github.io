(function(window, angular, undefined){
	'use strict';
	var app = angular.module('directive',['common']);
	app.directive('kaisaHeader',[function(){
		return {
			template: '<div>'+
				'<div id="nav" data-ng-click="window.nav()"></div>'+
				'<div id="header">'+
					'<div class="wrap">'+
						'<h1><a href="/"><img data-ng-src="{{image.host}}/img/common/logo.png" alt=""></a></h1>'+
					'</div>'+
				'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('kaisaMenu',[function(){
		return {
			template: '<div id="menu">'+
				'<div class="menu_wrap">'+
					'<div class="wrap">'+
						'<ul>'+
							'<li data-ng-repeat="i in menuList" data-ng-class="{on : page.idx == $index}"><a data-ng-href="{{commonLink({url:i.url,href:true})}}">{{i.title}}</a></li>'+
						'</ul>'+
					'</div>'+
				'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('studyMenu',[function(){
		return {
			template: '<div id="studyMenu">'+
				'<div class="wrap">'+
					'<ul>'+
						'<li data-ng-repeat="i in studyMenu" data-ng-class="{on : i.active}"><a data-ng-href="{{commonLink({url:i.url,href:true})}}">{{i.title}}</a></li>'+
					'</ul>'+
				'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
				$scope.studyMenu = [
					{title:'date', url:'exDate'},
					{title:'dateLayer', url:'exDateLayer'},
					{title:'layer', url:'exLayer'},
					{title:'drag', url:'exDrag'},
					{title:'dictionary', url:'exDictionary'},
					{title:'dto', url:'exDto'},
					{title:'order', url:'exOrder'},
					{title:'swipe', url:'exSwipe'},
					{title:'compare', url:'exCompare'},
					{title:'crawler', url:'exCrawler'},
					{title:'apiMake', url:'exApiMake'},
					//{title:'handlebars', url:'exHandlebars'},
					//{title:'batch', url:'exBatch'},
					//{title:'batchCheck', url:'exBatchCheck'},
					//{title:'siteCheck', url:'exSiteCheck'},
					{title:'encode', url:'exEncode'}
				];
				for(var i in $scope.studyMenu){
					if(location.pathname.match('/'+$scope.studyMenu[i].title+'.html')){
						$scope.studyMenu[i].active = true;
					}
				}
			}
		}
	}]);
	app.directive('kaisaMap',[function(){
		return {
			template: '<div id="contactUs">'+
				'<div class="wrap">'+
					'<h2>찾아오시는 길</h2>'+
					'<div id="map"></div>'+
				    '<ul>'+
					'<li><strong>주소:</strong> 경기도 가평군 가평읍 금대리 305-6 모비딕수상레저</li>'+
					'<li><strong>도로명:</strong> 경기도 가평군 가평읍 북한강변로 536 모비딕수상레저</li>'+
					'<li class="txt_guide"><strong>가평역</strong> 무료 픽업 및 드롭서비스 해드립니다.</li>'+
					'</ul>'+
				'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
				window.initMap = function(){
					var uluru = {
						lat : 37.774083,
						lng : 127.535045
					};
					var map = new google.maps.Map(document.getElementById('map'), {
						zoom : 15,
						gestureHandling: 'cooperative',
						center : uluru
					});
					var marker = new google.maps.Marker({
						position : uluru,
						map : map
					});
				}
				angular.element(el).append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHJZ33ORPXZyNOAz7M6HKBPjHTZ8n6CLs&callback=initMap"></script>');
			}
		}
	}]);
	app.directive('kaisaFooter',[function(){
		return {
			template: '<div>'+
				'<div id="footer">'+
					'<div class="wrap">'+
						'<h1><img data-ng-src="{{image.host}}/img/common/logo.png" alt=""></h1>'+
						'<p>Copyright © 2005 Kaisa. All Rights Reserved<b data-ng-click="admin.layer.open()">..</b><br>Email : 7083620@hanmail.net</p>'+
						'<p data-ng-if="admin.user" class="admin"><span data-ng-click="admin.logout()">관리자 로그아웃</span></p>'+
					'</div>'+
				'</div>'+
				'<div kaisa-unit></div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('kaisaUnit',[function(){
		return {
			templateUrl: '/html/unit.html',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);
	app.directive('onlyNumber',['kaisaRegex',function(kaisaRegex){ //only-number="false" => '.-'
	    return {
	    	require: 'ngModel',
	        link: function($scope, el, attrs, ctrl) {
	        	ctrl.$parsers.push(function (val) {
	                var newVal = val ? ((attrs.onlyNumber == 'true') ? val.replace(/[^\d]/g,'') : val.replace(/[^\d.-]/g,'')) : null;
	                if(attrs.onlyNumber == 'true' && newVal > 0){
	                	newVal = newVal.replace(/^[0]+/,'')
	                }
	                if(newVal != val) {
	                	ctrl.$setViewValue(newVal);
	                	ctrl.$render();
	                }
	                return newVal;
	            });
	        }
	    };
	}]);
	app.directive('maxNumber',['kaisaRegex',function(kaisaRegex){
	    return {
	    	require: 'ngModel',
	        link: function($scope, el, attrs, ctrl) {
	        	if(!attrs.maxNumber){
	        		return false;
	        	}
	        	ctrl.$parsers.push(function (val) {
	        		if(!val){
	        			val = '0'; //input 에 보낼때는 String 으로 보내야함
	        			ctrl.$setViewValue(val);
						ctrl.$render();
	        			return val;
	        		}
	        		if(val.match(' ')){
	        			val = val.replace(/ /gi, '');
	        			ctrl.$setViewValue(val);
						ctrl.$render();
	        			return val;
	        		}
	        		var newVal = val ? val.replace(/[^\d]/g,'') : null;
	                if(newVal > 0){
	                	newVal = newVal.replace(/^[0]+/,'')
	                }
	                if (parseInt(newVal) > parseInt(attrs.maxNumber)) {
						newVal = attrs.maxNumber;
					}
	                if(newVal != val) {
	                	ctrl.$setViewValue(newVal);
	                	ctrl.$render();
	                }
	                return newVal;
	        		/*console.log(val);

	        		if(!val){
	        			val = 0;
	        			ctrl.$setViewValue(val);
						ctrl.$render();
	        			return val;
	        		}
	        		if(val.search(' ')){
	        			val = val.replace(/ /gi, '');
	        			ctrl.$setViewValue(val);
						ctrl.$render();
	        			return val;
	        		}
	        		val = val.trim();
	        		console.log(val);
	        		var newVal = val.replace(/[^\d]/g, '');

	        		if(newVal > 0){
	                	newVal = newVal.replace(/^[0]+/,'')
	                }

					if (parseInt(newVal) > parseInt(attrs.maxNumber)) {
						newVal = attrs.maxNumber;
					}

					if (newVal != val) {
						ctrl.$setViewValue(newVal);
						ctrl.$render();
					}
					return newVal;*/
	            });
	        }
	    };
	}]);
	app.directive('icoHelp',[function(){
    	return {
    		replace : true,
    		link: function($scope, el, attrs){
    			el.on('mousemove',function(e){
    				$scope.help.active = true;
    				$scope.help.html = el.find('.html').html();
    				$scope.help.style = {
    					left : e.pageX,
    					top : e.pageY
    				};
    				$scope.$apply();
    			});
    			el.on('mouseout',function(e){
    				$scope.help.active = false;
    				$scope.$apply();
    			});
    		}
    	}
    }]);
	// ngSrc
	app.directive('ngSrc',[function () {
		return {
			scope : false,
			link: function($scope, el, attrs){
				if(attrs.ngSrc && attrs.ngSrc.search($scope.image.host) < 0){
					console.log('%c ' + attrs.ngSrc + ' %c ( {{image.host}} 를 넣어주세요. )','color:#ffc382;','color:#ff9625;');
				}
				if(!attrs.loader){
					return false;
				}
				var loopCount = 0;
				el.on('error', function() {
					loopCount++;
					if(loopCount > 1){
						el.off('error');
					}
					el.attr('src', $scope.image.host + $scope.image.noImage);
				});
				el.load(function(){
					//
				});
			}
		}
	}]);
	// ngImgLoader
	app.directive('ngImgLoader',[function () {
		return {
			scope : false,
			link: function($scope, el, attrs){
				var img = new Image();
				img.sizeChange = function(loaded, total){
					var per = parseInt((loaded / total) * 100);
					el.parent().find('.bar').width(per + '%');
				}
				img.onload = function(){
					el.append('<img src="'+img.src+'" alt="">');
				}
				img.sizeLoad(attrs.ngImgLoader);
			}
		}
	}]);
})(window, window.angular);