(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		$scope.page = {
			idx : 2
		};
		
		$scope.swipeList = [
			{name : 'swipe1'},
			{name : 'swipe2'},
			{name : 'swipe3'},
			{name : 'swipe4'}
		];
		
		$scope.swipeMenuList = [
			{name : 'swipe menu 1'},
			{name : 'swipe menu 2'},
			{name : 'swipe menu 3'},
			{name : 'swipe menu 4'},
			{name : 'swipe menu 5'},
			{name : 'swipe menu 6'},
			{name : 'swipe menu 7'},
			{name : 'swipe menu 8'},
			{name : 'swipe menu 9'}
		];
		
	}]);
	
	app.directive('kaisaSwipe',['$timeout',function($timeout){
		return {
			replace : true,
			link: function($scope, el, attrs){
				var swipeCnt = 0;
				if(! $scope.$last){
					return;			
				}
				$timeout(function(){
					var set = {
						el        : el.parent(),
						elLi      : el.parent().find('li'),
						elLength  : el.parent().find('li').length,
						elWrap    : el.parent().parent(),
						elPaging    : el.parent().parent().find('.paging'),
						elPage    : el.parent().parent().find('.page'),
						elTotal   : el.parent().parent().find('.total'),
						elPrev    : el.parent().parent().find('.prev'),
						elNext    : el.parent().parent().find('.next'),
						elOl      : el.parent().parent().find('ol'),
						swipeIdx  : 1,
						swipeDef  : 70, //스와이프 감도
						swipeSpeed : '0.2s',
						swipeMotion : 'linear',
						swipePos  : 0
					}
					var eventName = '.swipe' + swipeCnt,
						start = 'touchstart' + eventName + ' mousedown' + eventName,
						move = 'touchmove' + eventName + ' mousemove' + eventName,
						end = 'touchend' + eventName + ' mouseup' + eventName,
						cancel = 'touchcancel' + eventName + ' drop' + eventName,
						posStart,
						posLast,
						posX,
						posY,
						posChkX,
						posChkY,						
						transitionLeft = 'transition:left 0.2s ' + set.swipeMotion + ';-moz-transition:left ' + set.swipeSpeed + ' ' + set.swipeMotion + ';-webkit-transition:left ' + set.swipeSpeed + ' ' + set.swipeMotion + ';-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;backface-visibility:hidden;',
						swipeBool = true,
						oriEl = set.el[0],
						oriElLi = el[0],
						elWrap = set.elWrap[0],
						pageLength = Math.floor(elWrap.offsetWidth / oriElLi.offsetWidth), 
						swipLength = set.elLength - pageLength,
						lastEmpty = true;  //마지막 공간 허용 않할때...
						
					//bullet
					for(var i = 0; i < set.elLength; i++){
						set.elOl.append('<li></li>');
					}
					set.elOl.find('li').eq(0).addClass('on');
					
					//get
					var getXY = function(e){
	    				var touches = e.touches && e.touches.length ? e.touches : [e],
	    					ev = (e.changedTouches && e.changedTouches[0]) || (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) || touches[0].originalEvent || touches[0];
	    				return {x:ev.clientX, y:ev.clientY};
					}			
					//set
					var setSwipePosition = function(){
							set.swipePos = parseInt(-(oriElLi.offsetWidth * (set.swipeIdx - 1)));
													
							set.elOl.find('li').removeClass('on');
							set.elOl.find('li').eq(set.swipeIdx - 1).addClass('on');
							if(set.swipeIdx <= 1){
								set.elPrev.hide();
							}else if(set.swipeIdx >= set.elLength){
								set.elNext.hide();
							}else{
								set.elPrev.show();
								set.elNext.show();
							}
							if(lastEmpty && set.swipeIdx > swipLength){
								set.elNext.hide();
							}
						},
						setElPosition = function(){
							oriEl.style.cssText = 'left:' + set.swipePos + 'px;' + transitionLeft;
						},
						setElPositionMove = function(pos){
							oriEl.style.cssText = 'left:' + parseInt((pos.x + set.swipePos) - posStart.x) + 'px;';
						},
						swipeLeft = function(){
							if(set.swipeIdx <= 1){
								set.swipeIdx = 1;
							}else{
								set.swipeIdx--;
							}
							setSwipePosition();
							setElPosition();
							set.elPage.html(set.swipeIdx);	
						},
						swipeRight = function(){
							if(lastEmpty && set.swipeIdx > swipLength){
								set.swipeIdx = swipLength + 1
							}else{
								
								if(set.swipeIdx >= set.elLength){
									set.swipeIdx = set.elLength;
								}else{
									set.swipeIdx++;
								}	
							}
							setSwipePosition();
							setElPosition();
							set.elPage.html(set.swipeIdx);												
						}				
						setSwipePosition();
						
					//event handler
					set.elPrev.on('click' + eventName, function(e){
						swipeLeft();
	    			});
					set.elNext.on('click' + eventName, function(e){
						swipeRight();
	    			});
					set.el.on(start, function(e){
	    				posStart = getXY(e);
	    				posChkX = 0;
	    				posChkY = 0;
	    			});
					set.el.on(move, function(e){
						if(!swipeBool){
	    					return;
	    				}
	    				var pos = getXY(e);
	    				posChkX += Math.abs(pos.x - posStart.x);
						posChkY += Math.abs(pos.y - posStart.y);
	    				if(posChkX > posChkY){
	    					setElPositionMove(pos);
	    				}else{
	    					swipeBool = false;
	    				}
	    				e.preventDefault(); //for Android
	    			});
					set.el.on(end, function(e){
						if(!swipeBool){
	    					return swipeBool = true;
	    				}
	    				posLast = getXY(e);
	    				var def = posStart.x - posLast.x;
	    				if(Math.abs(def) > set.swipeDef){	    					
	    					if(def > 0){	
	    						swipeRight();
	    					}else{
	    						swipeLeft();
	    					}
	    					$timeout(function(){
	        					swipeBool = true;
	        				},3000);
	    					return;
	    				}
	    				setElPosition();
	    			});    			
					set.el.on(cancel, function(e){
						console.log('cancel');
						setElPosition();
	    			});
					swipeCnt++;
					
					set.elPage.html(set.swipeIdx);	
					set.elTotal.html(set.elLength);	
					set.elPaging.show();
					
				},300);
			}
		}
	}]);
	
	
	app.directive('kaisaSwipeLoop',['$timeout','$window',function($timeout,$window){
		return {
			replace : true,
			link: function($scope, el, attrs){
				if(! $scope.$last){
					return;			
				}
				var swipeLoopCnt = 0;
				$timeout(function(){
					var set = {
						el          : el.parent(),
						elLi        : el.parent().find('li'),
						elImg       : el.parent().find('img'),
						elLength    : el.parent().find('li').length,
						elWidth     : el.width(),
						elWrap      : el.parent().parent(),
						elPage      : el.parent().parent().find('.page'),
						elTotal     : el.parent().parent().find('.total'),
						elPrev      : el.parent().parent().find('.prev'),
						elNext      : el.parent().parent().find('.next'),
						elOl        : el.parent().parent().find('ol'),
						swipeIdx    : 1,
						swipeDef    : 70, //스와이프 감도
						swipeSpeed  : '0.2s',
						swipeMotion : 'linear',
						liArr       : [],
						liImgArr    : [],
						idxArr      : []
					}
					var	eventName = '.swipe' + swipeLoopCnt,
						start = 'touchstart' + eventName,
						move = 'touchmove' + eventName,
						end = 'touchend' + eventName,
						cancel = 'touchcancel' + eventName + ' drop' + eventName,
						posStart,
						posLast,
						posX,
						posY,
						posChkX,
						posChkY,						
						transitionLeft = 'transition:left 0.2s ' + set.swipeMotion + ';-moz-transition:left ' + set.swipeSpeed + ' ' + set.swipeMotion + ';-webkit-transition:left ' + set.swipeSpeed + ' ' + set.swipeMotion + ';-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;backface-visibility:hidden;',
						swipeBool = true,
						oriEl = set.el[0],
						oriElLi = el[0];
					
					//bullet
					for(var i = 0; i < set.elLength; i++){
						set.elOl.append('<li></li>');
						set.liArr.push(set.elLi[i]);
						set.liImgArr.push(set.elImg[i]);
					}
					
					set.elOl.find('li').eq(0).addClass('on');
					//factory
					var getXY = function(e){
		    				var touches = e.touches && e.touches.length ? e.touches : [e],
		    					ev = (e.changedTouches && e.changedTouches[0]) || (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) || touches[0].originalEvent || touches[0];
		    				return {x:ev.clientX, y:ev.clientY};
						},
						setListArr = function(){	
							var idx = set.swipeIdx -1;
							set.idxArr = [];
							if((idx - 1) < 0){
								set.idxArr.push(set.elLength - 1);
							}
							if((idx - 1) >= 0){
								set.idxArr.push(idx - 1);
							}
							set.idxArr.push(idx);
							if((idx + 1) < set.elLength){
								set.idxArr.push(idx + 1);
							}
							if((idx + 1) >= set.elLength){
								set.idxArr.push(0);
							}
						},
						drawSwipe = function(){	
							set.el.html('').append(set.liArr[set.idxArr[0]]).append(set.liArr[set.idxArr[1]]).append(set.liArr[set.idxArr[2]]);
							//for ie
							if($scope.browser.ie){
								set.el.find('li').eq(0).html(set.liImgArr[set.idxArr[0]]);
								set.el.find('li').eq(1).html(set.liImgArr[set.idxArr[1]]);
								set.el.find('li').eq(2).html(set.liImgArr[set.idxArr[2]]);
							}
							set.el.css({'left': -(set.elWidth) + 'px'});
						},
						setSwipePosition = function(){	
							setListArr();							
							set.elOl.find('li').removeClass('on');
							set.elOl.find('li').eq(set.swipeIdx - 1).addClass('on');
						},
						setElPosition = function(){
							oriEl.style.cssText = 'left:' + (-(set.elWidth)) + 'px;' + transitionLeft;
						},
						setElPositionMove = function(pos){
							oriEl.style.cssText = 'left:' + parseInt((pos.x - set.elWidth) - posStart.x) + 'px;';
						},
						swipeLeft = function(){
							if(set.swipeIdx <= 1){
								set.swipeIdx = set.elLength;
							}else{
								set.swipeIdx--;
							}							
							set.el.animate({'left':'0px'},200,function(){
								drawSwipe();
							});														
							setSwipePosition();
							set.elPage.html(set.swipeIdx);
						},
						swipeRight = function(){
							if(set.swipeIdx >= set.elLength){
								set.swipeIdx = 1;
							}else{
								set.swipeIdx++;
							}	
							set.el.animate({'left': -(set.elWidth * 2) + 'px'},200,function(){
								drawSwipe();
							});
							setSwipePosition();
							set.elPage.html(set.swipeIdx);												
						}				
						setSwipePosition();
						drawSwipe();
						
					//event handler
					set.elPrev.on('click' + eventName, function(e){
						swipeLeft();
	    			});
					set.elNext.on('click' + eventName, function(e){
						swipeRight();
	    			});
					set.el.on(start, function(e){
	    				posStart = getXY(e);
	    				posChkX = 0;
	    				posChkY = 0;
	    			});
					set.el.on(move, function(e){
						if(!swipeBool){
	    					return;
	    				}
	    				var pos = getXY(e);
	    				posChkX += Math.abs(pos.x - posStart.x);
						posChkY += Math.abs(pos.y - posStart.y);
	    				if(posChkX > posChkY){
	    					setElPositionMove(pos);
	    				}else{
	    					swipeBool = false;
	    				}
	    				e.preventDefault(); //for Android
	    			});
					set.el.on(end, function(e){
						if(!swipeBool){
	    					return swipeBool = true;
	    				}
	    				posLast = getXY(e);
	    				var def = posStart.x - posLast.x;	    				
	    				if(Math.abs(def) > set.swipeDef){	    					
	    					if(def > 0){	    						
	    						swipeRight();
	    					}else{
	    						swipeLeft();
	    					}
	    					$timeout(function(){
	        					swipeBool = true;
	        				},3000);
	    					return;
	    				}
	    				setElPosition();
	    			});    			
					set.el.on(cancel, function(e){
						console.log('cancel');
						setElPosition();
					});	
					swipeLoopCnt++;
				},300);
			}
		}
	}]);
	
	app.directive('kaisaSwipeMenu',['$timeout',function($timeout){
		return {
			replace : true,
			link: function($scope, el, attrs){
				if(! $scope.$last){
					return;			
				}
				var swipeMenuCnt = 0;
				$timeout(function(){
					var set = {
						el        : el.parent(),
						elLi      : el.parent().find('li'),
						elLength  : el.parent().find('li').length,
						elWrap    : el.parent().parent(),
						swipeSpeed : '0.2s',
						swipeMotion : 'linear', //ease-in-out
						swipePos  : 0,
						snap : 0
					}
					var eventName = '.swipe' + swipeMenuCnt,
						start = 'touchstart' + eventName,
						move = 'touchmove' + eventName,
						end = 'touchend' + eventName,
						posStart,
						posLast,
						posX,
						posChkX,					
						transitionLeft = 'transition:left 0.2s ' + set.swipeMotion + ';-moz-transition:left ' + set.swipeSpeed + ' ' + set.swipeMotion + ';-webkit-transition:left ' + set.swipeSpeed + ' ' + set.swipeMotion + ';-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;backface-visibility:hidden;',
						oriEl = set.el[0],
						oriElLi = el[0],
						elWrap = set.elWrap[0],
						widthChk = set.el.width() - set.elWrap.width();
					//get
					var getXY = function(e){
	    				var touches = e.touches && e.touches.length ? e.touches : [e],
	    					ev = (e.changedTouches && e.changedTouches[0]) || (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) || touches[0].originalEvent || touches[0];
	    				return ev.clientX;
					}
					//set
					set.el.on(start, function(e){
						posX = getXY(e) - set.swipePos;
						posStart = getXY(e);
	    			});
					set.el.on(move, function(e){
	    				var pos = getXY(e);
	    				oriEl.style.cssText = 'left:' + parseInt(pos - posX) + 'px;';
	    				set.swipePos = parseInt(pos - posX);
	    				posLast = parseInt(pos);
	    				e.preventDefault(); //for Android
	    			});
					set.el.on(end, function(e){
						if(set.swipePos > 0){//left max
							set.swipePos = 0;
						}
						if(widthChk < Math.abs(set.swipePos)){//right max
							set.swipePos = -(widthChk);
						}						
						if((posStart - posLast) < 0){//left,right Yn
							oriEl.style.cssText = 'left:' + (set.swipePos + (set.swipePos != 0 ? set.snap : 0)) + 'px;' + transitionLeft;
						}else{
							oriEl.style.cssText = 'left:' + (set.swipePos - (set.swipePos != -(widthChk) ? set.snap : 0)) + 'px;' + transitionLeft;
						}
	    			});
					set.elLi.on('click',function(){
						set.elLi.removeClass('on');
						$(this).addClass('on');
						var thisWith = angular.element(this).width() / 2,	//자신 넓이 / 2
							nowPos = angular.element(this).position().left, //현재 위치
							half = set.elWrap.width() / 2,					//전체 절반 넓이
							halfMax = set.el.width() - half; 				//전체 넓이 - 절반 (최대값)
						
						if(nowPos < half){
							set.swipePos = 0;
						}else if(nowPos > halfMax){
							set.swipePos = -(widthChk);
						}else{
							set.swipePos = -((nowPos - half) + thisWith);
						}
						oriEl.style.cssText = 'left:' + set.swipePos + 'px;' + transitionLeft;
					});
					swipeMenuCnt++;
				},300);
			}
		}
	}]);
	
})(window,window.angular);