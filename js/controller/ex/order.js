(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval','$http',function($scope,$window,$timeout,$interval,$http){
		$scope.page = {
			idx : 2
		};
		/**
		 * 코드 정보
		 */
		$scope.code = {
			country : [
				{value : 1,  name : 'Japan', mark : '￥'},
				{value : 2,  name : 'Australia', mark : 'A$'},
				{value : 3,  name : 'Canada', mark : 'Can$'},
				{value : 4,  name : 'Eu', mark : 'euro'},
				{value : 5,  name : 'United Kingdom', mark : 'GBP'},
				{value : 6,  name : 'Hong Kong', mark : 'HK$'},
				{value : 7,  name : 'Russia', mark : 'PY6'},
				{value : 8,  name : 'Singapore', mark : 'S$'},
				{value : 9,  name : 'Thailand', mark : 'THB'},
				{value : 10, name : 'Taiwan', mark : 'TWD'},
				{value : 11, name : 'USD', mark : '$'},
				{value : 12, name : 'Korea', mark : '원'}
			],
			card : [
				{value : 1, name : '농협'},
				{value : 2, name : '신한'},
				{value : 3, name : '하나'},
				{value : 4, name : '카카오뱅크'}
			],
			simpleCard : [
				{value : 1, name : '롯데카드'},
				{value : 1, name : '신한카드'}
			],
			bank : [
				{value : 1, name : '농협'},
				{value : 2, name : '신한'},
				{value : 3, name : '하나'},
				{value : 4, name : '카카오뱅크'}
			],
			mainPay : [
				{value : 1, name : '국내신용카드', cardCode : 1},
				{value : 2, name : '해외신용카드', countryCode : 1, number : '', year : '',month : ''},
				{value : 3, name : '간편결제', simpleCardCode : 1},
				{value : 4, name : '은련카드(SMS)'},
				{value : 5, name : '실시간계좌이체'},
				{value : 6, name : '카카오페이(카카오머니)'},
				{value : 7, name : '카카오페이(신용카드)'},
				{value : 8, name : '전자지갑', id : ''}
			],
			subPay : [
				{value : 1, name : '쿠폰'},
				{value : 2, name : '일반 적립금'},
				{value : 3, name : '플러스 적립금'},
				{value : 4, name : '보관금'}
			]
		};
		/**
		 * 환율 정보 TO-DO : API
		 * http://finance.daum.net/exchange/exchangeDetail.daum?code=USD
		 */
		$scope.exchange = [
			{name : 'WON', country: '대한민국', price: 1, mark :'원', after : true},
			{name : 'USD', country: '미국', price: 1117.6, mark :'$'},
			{name : 'JPY100', country: '일본', price: 999.87, mark :'￥', after : true}, //JPY100 은 소수점 두자리 앞으로...
			{name : 'CNY', country: '중국', price: 164.04, mark :'¥'},
			{name : 'EUR', country: '유로', price: 1306.08, mark :'euro'},
			{name : 'GBP', country: '영국', price: 1465.68, mark :'GBP'},
			{name : 'CHF', country: '스위스', price: 1127.69, mark :'CHF'},
			{name : 'CAD', country: '캐나다', price: 859.13, mark :'Can$'}
		];
		/**
		 * 상품 정보
		 */
		$scope.product = {
			list : [
				{checked: true, name : '상품', price : 30000, quantity: 1, total : 0},
				{checked: true,  name : '상품', price : 40000, quantity: 2, total : 0},
				{checked: false, name : '상품', price : 25000, quantity: 1, total : 0}
			],
			add : function(){
				this.list.push({checked: true, name : '상품', price : 30000, quantity: 1, total : 0});
			},
			remove : function(){
				if(this.list.length == 1){
					return false;
				}
				this.list.pop(this.list.length - 1);
			}
		};
		/**
		 * 회원 정보
		 */
		$scope.member = {
			subPayUseable : [
				{value : 1, name : '쿠폰', price : 200000},
				{value : 2, name : '일반 적립금', price : 10000},
				{value : 3, name : '플러스 적립금', price : 500},
				{value : 4, name : '보관금', price : 100000}
			],
			subPayUsed : [
				{checked: false, value : 1, price : 1000},
				{checked: true, value : 2, price : 0},
				{checked: false, value : 3, price : 300},
				{checked: false, value : 4, price : 0}
			]
		};
		/**
		 * 결제 정보
		 */
		$scope.payment = {
			price : {
				total : 0,
				sub : 0,
				main : 0
			},
			mainPayCode : 1,
			check : function(idx){ //주문 금액 체크
				if(typeof idx !== 'undefined'){
					var point = $scope.member.subPayUsed[idx].price;
					var surplus = 0; //다른 포인트 사용금액
					for(var i in $scope.member.subPayUsed){ 
						if(i != idx){
							surplus = surplus + parseInt($scope.member.subPayUsed[i].price);
						}
					}
					if(point > $scope.member.subPayUseable[idx].price){
						$scope.member.subPayUsed[idx].price = $scope.member.subPayUseable[idx].price; //회원 사용가능 금액 초과시  max 값으로 세팅
						point = $scope.member.subPayUsed[idx].price;
					}
					if(point > $scope.payment.price.total - surplus){
						$scope.member.subPayUsed[idx].price = $scope.payment.price.total - surplus; //주결제 사용 금액이 초과시 max 값으로 세팅
					}
				}
				var price = 0;
				for(var i in $scope.member.subPayUsed){
					//포인트 전체사용여부
					if($scope.member.subPayUsed[i].checked){
						$scope.member.subPayUsed[i].price = $scope.member.subPayUseable[i].price;
					}
					var sum = price + parseInt($scope.member.subPayUsed[i].price);
					price = sum;
				};
				$scope.payment.price.main = $scope.payment.price.total - price;
				$scope.payment.price.sub = price;
			},
			order : function(){
				if($scope.payment.price.main < 100 && $scope.payment.price.main != 0){
					$scope.alert.open({message : '주결제 수단으로 100원미만은 결제 할 수 없습니다.'});
					return false;
				}
				$scope.alert.open({message : '결제완료.'});
			}
		};
		/**
		 * watcher
		 */
		$scope.$watch('product.list', function(val, oldVal){
			if(val){
				var price = 0;
				for(var i in val){
					if(val[i].checked){
						val[i].total = val[i].price * val[i].quantity
						price = price + val[i].total;
					}
				}
				$scope.payment.price.total = price;
				$scope.payment.price.main = price - $scope.payment.price.sub;
			};
        },true);
		$scope.payment.check();
	}]);
	
})(window,window.angular);