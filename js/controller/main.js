(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		$scope.page = {
			idx : 0
		};
		$scope.workList = [
			{
				title : 'eplatz - Lfmall',
				date : '2018.05 ~ 08',
				desc : '롯데면세점  결제 시스템(전자지갑) 추가 개발',
				link : 'http://kor.lottedfs.com/kr',
				img : ['lottedfs']
			},
			{
				title : 'mobydic - 가평수상레저',
				date : '2018.02 ~ ',
				desc : '홈페이지 제작',
				link : 'http://mobydic.co.kr',
				img : ['mobydic']
			},
			{
				title : 'eplatz - Lfmall',
				date : '2017.02 ~ ',
				desc : '쇼핑몰 운영 (㈜LFmall)',
				link : 'http://www.lfmall.co.kr',
				img : ['lfmall']
			},
			{
				title : 'eplatz - ETBS',
				date : '2016.11 ~ 2017.02',
				desc : '이제너두 선택적 복지몰 시스템 재구축 (㈜이제너두)',
				link : 'http://www.etbs.co.kr',
				img : ['etbs']
			},
			{
				title : 'eplatz - Ftzkorea',
				date : '2016.03 ~ 2016.11',
				desc : '중국 자유무역지구 韓流中心 (㈜한국경제)',
				link : 'http://www.ftzkorea.com/',
				img : ['ftzkorea']
			},
			{
				title : 'eplatz - lotte',
				date : '2015.06 ~ 2015.11',
				desc : '롯데닷컴 모바일 (㈜롯데닷컴)',
				link : 'http://www.lotte.com',
				img : ['lotte']
			},
			{
				title : 'eplatz - Imarket',
				date : '2014.06 ~ 2014.11',
				desc : '아이마켓코리아 쇼핑몰 구축 (㈜아이마켓코리아)',
				link : 'http://imarket.co.kr',
				img : ['imarket']
			},
			{
				title : 'Obigo - CES',
				date : '2012.08 ~ 2013.12',
				desc : 'CES Automotive webapp (㈜Obigo)',
				link : '/fyi/ces/',
				img : ['ces']
			},
			{
				title : 'Obigo - CJ E&M',
				date : '2012.08 ~ 2013.12',
				desc : 'CES Automotive webapp (㈜Obigo)',
				link : '/fyi/em/',
				img : ['em']
			},
			{
				title : 'Obigo - CJ HV',
				date : '2012.08 ~ 2013.12',
				desc : 'CJ 헬로비전 webapp (㈜Obigo)',
				link : '/fyi/cjhv/',
				img : ['cjhv']
			},
			{
				title : 'Obigo - LG',
				date : '2012.08 ~ 2013.12',
				desc : 'LG TV webapp (㈜Obigo)',
				link : '/fyi/lg/',
				img : ['lg']
			},
			{
				title : 'Obigo - GER',
				date : '2012.08 ~ 2013.12',
				desc : '독일 webapp (㈜Obigo)',
				link : '/fyi/ger/',
				img : ['ger']
			},
			{
				title : 'Obigo - IWA',
				date : '2012.08 ~ 2013.12',
				desc : 'IWA 홈페이지 (㈜Obigo)',
				link : '/fyi/iwa/',
				img : ['iwa']
			},
			{
				title : 'Obigo - Toyota',
				date : '2012.08 ~ 2013.12',
				desc : 'Toyota webapp (㈜Obigo)',
				link : '/fyi/toyota/',
				img : ['toyota']
			},
			{
				title : 'Obigo - NScreen',
				date : '2012.08 ~ 2013.12',
				desc : 'NScreen webapp (㈜Obigo)',
				link : '/fyi/nscreen/',
				img : ['nscreen']
			},
			{
				title : 'Interpark',
				date : '2009.05 ~ 2012.08',
				desc : '인터파크 웹사이트 운영 (㈜인터파크INT)',
				link : 'http://interpark.co.kr',
				img : ['interpark']
			},
			{
				title : 'LIG',
				date : '2007.02 ~ 2007.11',
				desc : 'LIG손해보험 차세대 전산 시스템 구축 (㈜LIG손해보험)',
				link : '/fyi/lig/styleGuide/list.html',
				img : ['lig']
			},
			{
				title : 'Webha, IBmax, Free',
				date : '2005.10 ~ 2006.10',
				desc : 'Webha 카페, 아이비맥스(웹에이젼시) 건설사 웹사이트 구축 (㈜아이비맥스)',
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