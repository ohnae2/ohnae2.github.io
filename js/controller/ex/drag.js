(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','kaisaParam',function($scope,$window,$timeout,$interval,kaisaParam){
		$scope.page = {
			idx : 2
		};
		/* ux */
		$scope.ux = {
			model : {
				planNo: '',
				planTpCd: '1',  //1: html , 2: json
				planDvcCd: '1', //1: pc   , 2:mobile
				planHtml: '',
				planDesc: '',
				guideYn: false, //유의사항				
				connerYn: false,
				connerImages: [],
				connerImagesYn: true,
				floatingYn: false,
				floatingHeight: '110px',
				planCtns: [
					{
						btn : [{
							style: {
								top: '0',
								left: '0',
								width: '100px',
								height: '50px'
							}
						}]
					}
				]
			},
			idxCtns : 0,
			idxBtn : 0,
			clickPlanCtns : function(idx){
				this.idxCtns = idx;
			},
			clickBtn : function(idx){
				this.idxBtn = idx;
			},
			btnClose : function(idxCtns,idxBtn){
				$scope.alert.open({
					message : '정말 버튼을 삭제하시겠습니까?',
					confirm : true,
					callback : function(){						
						$scope.ux.model.planCtns[idxCtns].btn.splice(idxBtn,1);
						if(idxBtn != 0){
							$scope.ux.idxBtn = (idxBtn - 1);
						};
					}
				});
			}
		};
	}]);
	var kaisaDragHandler = '.kaisaDragHandler',
		kaisaDragCloneHandler = '.kaisaDragCloneHandler',
	 	drag = {
		dragging: false,
		startX: null,
		startY: null,
		offsetX: null,
		offsetY: null,
		minWidth: 100,
		minHeight: 50,
		success : false,
		space: 0
	};
	app.directive('kaisaDragClone',['$timeout',function($timeout){
		return function($scope, el, attr){
			var element = {
				win: angular.element(document)
			}
			angular.element('body').append('<div id="kaisaDragClone" class="' + attr.kaisaDragClone + '"></div>');
			var kaisaDragClone = angular.element('#kaisaDragClone');
			var ctnsArray = [];
			var dragCnt = 0;
			var eventHandler ={
				start : 'mousedown' + kaisaDragCloneHandler + 'touchstart' + kaisaDragCloneHandler,
				move : 'mousemove' + kaisaDragCloneHandler + 'touchmove' + kaisaDragCloneHandler,
				end : 'mouseup' + kaisaDragCloneHandler + 'touchend' + kaisaDragCloneHandler,
				cancel : 'drop' + kaisaDragCloneHandler + ' touchcancel' + kaisaDragCloneHandler
			}
			
			el.on(eventHandler.start,function(e){
				drag.dragging = true;
				kaisaDragClone.show().css({
					left: el.offset().left,
					top: el.offset().top
				});
				drag.offsetX = e.offsetX;
				drag.offsetY = e.offsetY;
				drag.startX = e.screenX - el.offset().left;
				drag.startY = e.screenY - el.offset().top;
				ctnsArray = [];
				angular.element('.ctns').each(function(){
					ctnsArray.push({
						top: $(this).position().top,
						left: $(this).position().left,
						width: $(this).width(),
						height: $(this).height()
					});
				});
				element.win.on(eventHandler.move,function(e){
					if(drag.dragging){
						kaisaDragClone[0].style.left = (e.screenX - drag.startX) + 'px';
						kaisaDragClone[0].style.top = (e.screenY - drag.startY) + 'px';
					}
				});
				element.win.on(eventHandler.end,function(e){
					drag.dragging = false;
					kaisaDragClone.hide();
					element.win.off(eventHandler.move);
					var increaseHeight = 0 + $('.kaisaCanvas').offset().top;
					for(var i in ctnsArray){
						increaseHeight += ctnsArray[i].height;
						var boxX = e.pageX - drag.offsetX - $('.kaisaCanvas').offset().left; //TO-DO kaisaCanvas left
						var boxY = e.pageY - drag.offsetY;
						var condition = {
							a : (ctnsArray[i].top <= (e.pageY - drag.offsetY)),
							b : (ctnsArray[i].left <= (e.pageX - drag.offsetX)),
							c : (increaseHeight - drag.minHeight >= boxY),
							d : (ctnsArray[i].width - drag.minWidth >= boxX)
						}
						if(condition.a && condition.b && condition.c && condition.d){
							drag.success = true;
							$scope.ux.model.planCtns[i].btn.push({ //btn structure
								url: '#',
								fun: null,
								funType : '1',
								type: '1',
								slideName : null,
								slide : null,
								youtube : 'http://youtube.com/embed/DyEtpaj77-I?autoplay=1',
								style: {
									top: (boxY - (increaseHeight - ctnsArray[i].height)) + 'px',
									left: boxX + 'px',
									width: drag.minWidth + 'px',
									height: drag.minHeight + 'px'
								},
								input : { //if type 5
									placeholder : '',
									value : '',
									name : '',
									style : ''
								}
							});
							$scope.ux.idxCtns = i;
							$scope.ux.idxBtn = $scope.ux.model.planCtns[i].btn.length - 1;
							$scope.$apply();
						}
					}
					if(!drag.success){
						//console.log('%c' + '드래그 공간이 잘못되었습니다.','text-shadow:3px 3px 3px rgba(0,0,0,0.2); color:#2bb835;');
					}
					drag.success = false;
					element.win.off(eventHandler.end);
				});
			});
		};
	}]);
	app.directive('kaisaDrag',['$timeout',function($timeout){
		return {
			template : '<div>'+
			'<span class="area"></span>'+
			'<span class="close" data-ng-click="ux.btnClose(idxCtns,idxBtn)"></span>'+
			'<span class="resize top_left" data-where="top_left"></span>'+
			'<span class="resize top" data-where="top"></span>'+
			'<span class="resize left" data-where="left"></span>'+
			'<span class="resize right" data-where="right"></span>'+
			'<span class="resize bottom_left" data-where="bottom_left"></span>'+
			'<span class="resize bottom" data-where="bottom"></span>'+
			'<span class="resize bottom_right" data-where="bottom_right"></span>'+
			'<iframe class="youtube" data-ng-if="b.type == \'3\'" data-ng-src="{{b.youtube | trustUrl}}" frameborder="0" allowfullscreen></iframe>'+
			'<div class="slide_prev" data-ng-if="b.type == \'4\'">'+
			'	<p>&lt;</p>'+
			'</div>'+
			'<div class="slide_next" data-ng-if="b.type == \'4\'">'+
			'	<p>&gt;</p>'+
			'</div>'+
			'<ul class="slide_list" data-ng-if="b.type == \'4\'">'+
			'	<li data-ng-repeat="ii in b.slide"><img data-ng-src="{{image.plan}}/{{ux.model.planNo}}/{{ii.url}}" alt="" /></li>'+
			'</ul>'+
			'<div class="inputBox" data-ng-if="b.type == \'5\'">'+
			'	{{b.input.placeholder}}'+
			'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attr){
				var element = {
					resize: el.find('span.resize'),
					close: el.find('span.close'),
					area: el.find('span.area'),
					win: angular.element(document)
				}
				var temp = {
					idxBtn: attr.idxBtn,
					idxCtns: attr.idxCtns,
					elStyle: {}
				};
				var setTemp = function(el){
					temp.elStyle = {
						top: el[0].style.top,
						height: el[0].style.height,
						left: el[0].style.left,
						width: el[0].style.width
					}
					$scope.ux.model.planCtns[temp.idxCtns].btn[temp.idxBtn].style = temp.elStyle;
					$scope.$apply();
				}
				element.area.on('mousedown' + kaisaDragHandler,function(e){
					drag.dragging = true;
					drag.startX = e.screenX - el.position().left;
					drag.startY = e.screenY - el.position().top;
					element.win.on('mousemove' + kaisaDragHandler,function(e){
						var elCanvas = $('.kaisaCanvas');
						if(drag.dragging && (e.screenX - drag.startX) >= 0 + drag.space && (e.screenX - drag.startX) <= (elCanvas.width() - el.width() - drag.space) && (e.screenY - drag.startY) >= 0 + drag.space && (e.screenY - drag.startY) <= (el.parent().parent().height() - el.height() + drag.space)){
							el[0].style.left = (e.screenX - drag.startX) + 'px';
							el[0].style.top = (e.screenY - drag.startY) + 'px';
							setTemp(el);
						}else{
							return false;
						}
					});
				});
				element.resize.on('mousedown' + kaisaDragHandler,function(e){
					drag.dragging = true;
					drag.startY = e.screenY - el.position().top;
					drag.startX = e.screenX - el.position().left;
					var startPosY = el.position().top;
					var startPosX = el.position().left;
					var startHeight = el.height();
					var startWidth = el.width();
					var where = $(this).attr('data-where');
					element.win.on('mousemove' + kaisaDragHandler,function(event){
						/*
						TO-DO 사이즈 오버
						if(el.offset().top + el.height() >= 590){
							return false;
						}
						*/
						if(drag.dragging){
							switch(where){
							case 'top_left':
								el[0].style.top = (event.screenY - drag.startY) + 'px';
								el[0].style.height = (startHeight + (startPosY - el.position().top)) + 'px';
								el[0].style.left = (event.screenX - drag.startX) + 'px';
								el[0].style.width = (startWidth + (startPosX - el.position().left)) + 'px';
								break;
							case 'top':
								el[0].style.top = (event.screenY - drag.startY) + 'px';
								el[0].style.height = (startHeight + (startPosY - el.position().top)) + 'px';
								break;
							case 'left':
								el[0].style.left = (event.screenX - drag.startX) + 'px';
								el[0].style.width = (startWidth + (startPosX - el.position().left)) + 'px';
								break;
							case 'right':
								el[0].style.width = (startWidth - (startPosX - (event.screenX - drag.startX))) + 'px';
								break;
							case 'bottom_left':
								el[0].style.left = (event.screenX - drag.startX) + 'px';
								el[0].style.width = (startWidth + (startPosX - el.position().left)) + 'px';
								el[0].style.height = (startHeight - (startPosY - (event.screenY - drag.startY))) + 'px';
								break;
							case 'bottom':
								el[0].style.height = (startHeight - (startPosY - (event.screenY - drag.startY))) + 'px';
								break;
							case 'bottom_right':
								el[0].style.height = (startHeight - (startPosY - (event.screenY - drag.startY))) + 'px';
								el[0].style.width = (startWidth - (startPosX - (event.screenX - drag.startX))) + 'px';
								break;
							default:
								break;
							}
							setTemp(el);
						}
					});
				});
				element.win.on('mouseup' + kaisaDragHandler,function(){
					element.win.off('mousemove' + kaisaDragHandler);
					drag.dragging = false;
				});
			}
		};
	}]);
	
})(window,window.angular);