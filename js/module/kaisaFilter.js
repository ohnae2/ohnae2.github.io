(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('filter', []);
	// trustHtml
	app.filter('trustHtml',['$sce',function($sce){
		return function(value){
			return value ? $sce.trustAsHtml(value.replace(/\n/g,'<br>')) : '';
		}
	}]);
	app.filter('trustUrl',['$sce',function($sce){
		return function(url){
			return $sce.trustAsResourceUrl(url);
		}
	}]);
	app.filter('toFixed',function(){
		return function(a, b){
			return a.toFixed(b);
		}
	});
	app.filter('trustUrl',['$sce',function($sce){
		return function(url){
			return $sce.trustAsResourceUrl(url);
		}
	}]);
	app.filter('checkHour',['$filter',function($filter){
		return function(hour){
			var now = new Date();
			var nowHour = parseInt($filter('date')(new Date(),'HH'));
			for(var i in hour){
				if(hour[i] <= nowHour){
					hour[i] = '<b>'+hour[i]+'</b>'
				}
			}
			return hour + '';
		}
	}]);
	app.filter('checkMin',['$filter',function($filter){
		return function(min){
			var now = new Date();
			var nowMin = parseInt($filter('date')(new Date(),'mm'));
			return min;
		}
	}]);
	// 유니크 items
	app.filter('unique',[function(){
		return function(data, propertyName){
			if(angular.isArray(data) && angular.isString(propertyName)){
				var results = [];
				var keys = {};
				for(var i in data){
					var val = data[i][propertyName];
					if(angular.isUndefined(keys[val])){
						keys[val] = true;
						results.push(data[i]);
					}
				}
				return results;
			}else{
				return data;
			}
		}
	}]);
	// highlight
	app.filter('highlight',['$sce',function($sce){
		return function(text, search){
			search = search.split(/[\s~!@#\$%\^\-_+=\|,\.\?\/\\`&*'"\.,:;(){}<>\[\]]+/);
			for( var i in search){
				if(search[i] == ''){
					search.splice(i,1);
				}
			}
			if(text && search){
				return $sce.trustAsHtml(text.replace(new RegExp(search,'gi'),'<b>$&</b>'));
			}
		}
	}]);
	// 바이트수 반환
	app.filter('checkByteToNumber',[function(){
		return function fnGetByteLen(str){
			var ibyte = 0;
			if(str != null){
				for(var i = 0;i < str.length;i++){
					var tmp = escape(str.charAt(i));
					if(tmp.length == 1)
						ibyte++;
					else if(tmp.indexOf("%u") != -1)
						ibyte += 3;
					else if(tmp.indexOf("%") != -1)
						ibyte += tmp.length / 3;
				}
			}
			return ibyte;
		}
	}]);
	// maxlen으로 문자열 자름.
	app.filter('cutByteLenth',[function(){
		return function(s, maxlen){
			if(!s){
				return;
			}
			var len = 0;
			var clen = 0;
			for(var i = 0;i < s.length;i++){
				var c = escape(s.charAt(i));
				if(c.length == 1){
					len++;
				}else if(c.indexOf("%u") != -1){
					len += 3;
				}else if(c.indexOf("%") != -1){
					len += c.length / 3;
				}
				if(len <= maxlen){
					clen = i + 1;
				}
			}
			if(len > maxlen){
				s = s.substring(0,clen);
			}
			return s;
		}
	}]);
	// 가격 - currency string 응용
	app.filter('toCurrency',['$filter','$locale',function(filter, locale){
		var currencyFilter = filter('currency');
		var formats = locale.NUMBER_FORMATS;
		return function(amount, num, symbol){
			var value = currencyFilter(amount,'',0) + '원';
			return value;
		};
	}]);
	// 가격 - currency html binding
	app.filter('toHtmlCurrency',['$filter','$locale','$sce',function(filter, locale, $sce){
		var currencyFilter = filter('currency');
		var formats = locale.NUMBER_FORMATS;
		return function(amount, num, symbol){
			var value = currencyFilter(amount,'',2);
			return $sce.trustAsHtml('<strong>' + value + '</strong> <em>¥</em>');
		};
	}]);
	// 숫자 콤마
	app.filter('toComma',['$filter','$locale',function(filter, locale){
		var currencyFilter = filter('currency');
		var formats = locale.NUMBER_FORMATS;
		return function(amount, num, symbol){
			var value = currencyFilter(amount,'',0);
			return value;
		};
	}]);
	// 글자자르기 (...) (limitTo)
	app.filter('cutString',[function(){
		return function(str, len){
			var reStr = '';
			if(str){
				if(str.length <= len){
					reStr = str;
				}else{
					reStr = str.substring(0,len) + '...';
				}
			}
			return reStr;
		}
	}]);
	// trustBrHtml
	app.filter('trustBrHtml',['$sce',function($sce){
		return function(value){
			return value ? $sce.trustAsHtml(value.replace(/\n/g,'<br>')) : '';
		}
	}]);
	// to number
	app.filter('int',[function(){
		return function(n){
			return parseInt(n);
		}
	}]);
	// 소수점 올림
	app.filter('ceil',[function(){
		return function(n){
			return Math.ceil(n);
		}
	}]);
	// pc = 'px' , mobile = '%' (수수점2자리)
	app.filter('pxPer',[function(){
		return function(px, idxCtns, idxBtn, device, where){
			if(device == '1'){
				return px;
			}else{
				try{
					var height = angular.element('#planning .ctns').eq(idxCtns).height();
					var per = (parseInt(px.replace(/[A-za-z]/g,'')) / 640) * 100;
					if(where == 'height' || where == 'top'){
						per = (parseInt(px.replace(/[A-za-z]/g,'')) / height) * 100;
					}
					return per.toFixed(2) + '%';
				}catch(e){
				}
			}
		}
	}]);
	// 소수점 반올림
	app.filter('round',[function(){
		return function(n){
			return Math.round(n);
		}
	}]);
	// 소수점 내림
	app.filter('floor',[function(){
		return function(n){
			return Math.floor(n);
		}
	}]);
	// 공통 상품 아이콘
	app.filter('iconArea',['$sce',function($sce){
		return function(arr, type){
			if(!arr){
				return;
			}
			arr = arr.split(',');
			var str = '';
			for(val in arr){
				switch(val){
				case '01':
					str += '<span class="tag_best">tag_best</span> ';
					break;
				case '02':
					str += '<span class="tag_new">tag_new</span> ';
					break;
				case '03':
					str += '<span class="tag_md">tag_md</span> ';
					break;
				case '04':
					str = '<span class="tag_notax">tag_notax</span> ' + str;
					break; // 순서상 보세상품이 첫번째 아이콘
				default:
					break;
				}
			}
			return $sce.trustAsHtml(str);
		};
	}]);
	// editor로 작성된 HTML
	app.filter("stringToHtml",['$sce',function($sce){
		return function(htmlCode, host){
			if(!htmlCode){
				return;
			}
			// 이미지 경로 변경.
			var RegExpAll = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/img;
			var matches = htmlCode.match(RegExpAll);
			if(matches){
				for(var i = 0;i < matches.length;i++){
					var index = matches[i].indexOf('src');
					var repalceText = matches[i].substring(0,index + 5) + host + "/" + matches[i].substring(index + 6,matches[i].length);
					htmlCode = htmlCode.replace(matches[i],repalceText);
				}
			}
			return $sce.trustAsHtml(htmlCode);
		}
	}]);
	// 번호 히든처리 (86102*****16) //Param : arr = '*' 처리의 시작과 끝자리
	app.filter("numberHidden",[function(){
		return function(str, arr){
			if(!str || !arr){
				return;
			}
			var numFirst = str.substring(0,arr[0]), numLast = str.substring(arr[1],str.length), numHide = str.substring(arr[0],arr[1]), start = '';
			for(var i = 0;i < numHide.length;i++){
				start += '*';
			}
			return numFirst + start + numLast;
		}
	}]);
	// 들어온 문자열을 첫 번째 엔터까지 잘라 반환
	app.filter("cutFirstLine",[function($sce){
		return function(str){
			var line = str.split("\n");
			for( var i in line){
				if(line[i] != ""){
					return line[i];
				}
			}
		}
	}]);
	// camelCase
	app.filter("camelCase",[function($sce){
		return function(str){
			var arr = str.split('_');
			var newStr = '';
			for(var i in arr){
				if(i != 0){
					newStr += arr[i].charAt(0).toUpperCase() + arr[i].substr(1).toLowerCase();
				}else{
					newStr += arr[i].toLowerCase();
				}
			}
			return newStr;
		}
	}]);
	// titleCase
	app.filter("titleCase",[function($sce){
		return function(input){
			input = input || '';
			return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	}]);

})(window, window.angular);