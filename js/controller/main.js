(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		$scope.page = {
			idx : 0
		};
		$scope.workList = [
			{
				title : 'allthat',
				date : '2021.11 ~ 2022.04',
				desc : '신한올댓',
				link : 'https://allthat.shinhancard.com/',
				img : ['allthat']
			},
			{
				title : 'goodchoice',
				date : '2020.08 ~ 2021.11',
				desc : '여기어때',
				link : 'http://www.goodchoice.kr/',
				img : ['goodchoice']
			},
			{
				title : 'lotteon',
				date : '2020.05 ~ 08',
				desc : '롯데온',
				link : 'http://www.lotteon.com/',
				img : ['lotteon']
			},
			{
				title : 'lotteimall',
				date : '2018.10 ~ now',
				desc : '롯데홈쇼핑',
				link : 'http://www.lotteimall.com',
				img : ['lotteimall']
			},
			{
				title : 'lottedfs',
				date : '2018.05 ~ 08',
				desc : '롯데면세점',
				link : 'http://kor.lottedfs.com/kr',
				img : ['lottedfs']
			},
			{
				title : 'mobydic - 모비딕 수상레저',
				date : '2018.02 ~ ',
				desc : '우리형네 빠지',
				link : 'http://mobydic.co.kr',
				img : ['mobydic']
			},
			{
				title : 'Lfmall',
				date : '2017.02 ~ 2018.04.20',
				desc : 'Lfmall',
				link : 'http://www.lfmall.co.kr',
				img : ['lfmall']
			},
			{
				title : 'ETBS',
				date : '2016.11 ~ 2017.02',
				desc : '이제너두 선택적 복지몰 시스템 재구축',
				link : 'http://www.etbs.co.kr',
				img : ['etbs']
			},
			{
				title : 'Ftzkorea',
				date : '2016.03 ~ 2016.11',
				desc : '중국 자유무역지구 韓流中心 한국경제',
				link : 'http://www.ftzkorea.com/',
				img : ['ftzkorea']
			},
			{
				title : 'lotte',
				date : '2015.06 ~ 2015.11',
				desc : '롯데닷컴 모바일',
				link : 'http://www.lotte.com',
				img : ['lotte']
			},
			{
				title : 'Imarket',
				date : '2014.06 ~ 2014.11',
				desc : '아이마켓코리아 쇼핑몰 구축 ',
				link : 'http://imarket.co.kr',
				img : ['imarket']
			},
			{
				title : 'CES',
				date : '2012.08 ~ 2013.12',
				desc : 'CES Automotive webapp ',
				link : '/fyi/ces/',
				img : ['ces']
			},
			{
				title : 'eplatz',
				date : '2012.08 ~ 2013.12',
				desc : 'eplatz',
				link : 'http://eplatz.co.kr/',
				img : ['eplatz']
			},
			{
				title : 'CJ E&M',
				date : '2012.08 ~ 2013.12',
				desc : 'CES Automotive webapp ',
				link : '/fyi/em/',
				img : ['em']
			},
			{
				title : 'CJ HV',
				date : '2012.08 ~ 2013.12',
				desc : 'CJ 헬로비전 webapp ',
				link : '/fyi/cjhv/',
				img : ['cjhv']
			},
			{
				title : 'LG',
				date : '2012.08 ~ 2013.12',
				desc : 'LG TV webapp',
				link : '/fyi/lg/',
				img : ['lg']
			},
			{
				title : 'GER',
				date : '2012.08 ~ 2013.12',
				desc : '독일  webapp',
				link : '/fyi/ger/',
				img : ['ger']
			},
			{
				title : 'IWA',
				date : '2012.08 ~ 2013.12',
				desc : 'IWA',
				link : '/fyi/iwa/',
				img : ['iwa']
			},
			{
				title : 'Toyota',
				date : '2012.08 ~ 2013.12',
				desc : 'Toyota webapp',
				link : '/fyi/toyota/',
				img : ['toyota']
			},
			{
				title : 'NScreen',
				date : '2012.08 ~ 2013.12',
				desc : 'NScreen webapp',
				link : '/fyi/nscreen/',
				img : ['nscreen']
			},
			{
				title : 'Interpark',
				date : '2009.05 ~ 2012.08',
				desc : '인터파크',
				link : 'http://interpark.co.kr',
				img : ['interpark']
			},
			{
				title : 'LIG',
				date : '2007.02 ~ 2007.11',
				desc : 'LIG손해보험 차세대',
				link : '/fyi/lig/styleGuide/list.html',
				img : ['lig']
			},
			{
				title : 'Webha, IBmax, Free',
				date : '2005.10 ~ 2006.10',
				desc : 'Webha 카페, 웹에이젼시, 건설사 웹사이트 구축',
				link : 'http://cafe.naver.com/gowebdi',
				img : ['webha']
			}
		];
		$scope.work = {
			idx : -1,
			active : false,
			total : $scope.workList.length,
			img : function(idx){
				$('#work_clone').find('dt').html($('#work dl').eq(idx).find('.img').html());
			},
			close : function(){
				$scope.work.active = false;
			},
			click : function(idx){
				this.active = true;
				this.idx = idx;
				this.img(idx);
				$scope.dimmed.open({callback : $scope.work.close});
			},
			prev : function(){
				if(0 < this.idx){
					this.idx--;
				}else{
					this.idx = this.total - 1;
				}
				this.img(this.idx);
			},
			next : function(){
				if(this.total > this.idx + 1){
					this.idx++;
				}else{
					this.idx = 0;
				}
				this.img(this.idx);
			}
		}

	}]);
})(window,window.angular);