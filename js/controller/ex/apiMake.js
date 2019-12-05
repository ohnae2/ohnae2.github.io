(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('KaisaApp', [ 'common', 'layerDatePicker' ]);

	app.controller('BodyController', [ '$scope', '$window', '$timeout', '$interval', '$http', 'kaisaApi', 'kaisaUtil', '$filter', function($scope, $window, $timeout, $interval, $http, kaisaApi, kaisaUtil, $filter) {
		$scope.page = {
			idx : 2
		};
		$scope.api = {
			data : '',
			name : 'productRegistration',
			type : 'Request',
			dataArray : [],
			result : ''
		};
		$scope.api.data = angular.element('#dataText').val();

		$scope.api.make = function(){
			$scope.api.dataArray = $scope.api.data.split('\n');
			$scope.api.resultSub  = '';
			$scope.api.result  = '<element name="'+kaisaUtil.firstStringToUpper($scope.api.name)+kaisaUtil.firstStringToUpper($scope.api.type)+'" type="tns:'+kaisaUtil.firstStringToUpper($scope.api.name)+kaisaUtil.firstStringToUpper($scope.api.type)+'VO"></element>\n';
			$scope.api.result += '<complexType name="tns:'+kaisaUtil.firstStringToUpper($scope.api.name)+'VO">\n';
			$scope.api.result += '  <complexContent>\n';
			$scope.api.result += '    <extension base="tns:LtonCommonVO">\n';
			$scope.api.result += '      <sequence>\n';

			var tmpList = [];
			var tmpArray = {
				name : '',
				list : []
			};
			var isPush = false;
			var cnt = 0;
			for(var i in $scope.api.dataArray){
				var str = $scope.api.dataArray[i].split('	');
				if(str[0] && str[2] && str[1] == '1'){
					// console.log(str[0] , str[2] , str[1], cnt++);
					tmpArray.list.push({
						name : str[0],
						type : str[2]
					});
				}else if(str[0] && str[2] && str[1] != '1') {
					if(isPush){
						tmpList.push(tmpArray);
						tmpArray = {
							name : '',
							list : []
						};
						isPush = false;
					}
					switch (str[2]) {
						case 'number':
							$scope.api.result += '        <element name="'+str[0]+'" type="long"></element>\n';
							break;
						case 'array':
							tmpArray.name = kaisaUtil.firstStringToUpper($scope.api.name) + kaisaUtil.firstStringToUpper(str[0]);
							$scope.api.result += '        <element name="'+str[0]+'" type="tns:' + tmpArray.name + 'VO" minOccurs="0" maxOccurs="unbounded"></element>\n';
							isPush = true;
							break;
						case 'object':
							tmpArray.name = kaisaUtil.firstStringToUpper($scope.api.name) + kaisaUtil.firstStringToUpper(str[0]);
							$scope.api.result += '        <element name="'+str[0]+'" type="tns:' + tmpArray.name + 'VO"></element>\n';
							isPush = true;
							break;
						default:
							$scope.api.result += '        <element name="'+str[0]+'" type="'+str[2]+'"></element>\n';
							break;
					}
				}
			}
			$scope.api.result += '      </sequence>\n';
			$scope.api.result += '    </extension>\n';
			$scope.api.result += '  </complexContent>\n';
			$scope.api.result += '</complexType>';
			for(var i in tmpList){
				$scope.api.resultSub += '<complexType name="'+tmpList[i].name+'VO">\n';
				$scope.api.resultSub += '  <complexContent>\n';
				$scope.api.resultSub += '    <extension base="tns:LtonCommonVO">\n';
				$scope.api.resultSub += '      <sequence>\n';
				for(var j in tmpList[i].list){
					switch (str[2]) {
						case 'number':
							$scope.api.resultSub += '        <element name="'+tmpList[i].list[j].name+'" type="long"></element>\n';
							break;
						case 'array':
							$scope.api.resultSub += '        <element name="'+tmpList[i].list[j].name+'" type="tns:' + kaisaUtil.firstStringToUpper($scope.api.name) + kaisaUtil.firstStringToUpper(tmpList[i].list[j].name) + 'VO" minOccurs="0" maxOccurs="unbounded"></element>\n';
							break;
						case 'object':
							$scope.api.resultSub += '        <element name="'+tmpList[i].list[j].name+'" type="tns:' + kaisaUtil.firstStringToUpper($scope.api.name) + kaisaUtil.firstStringToUpper(tmpList[i].list[j].name) + 'VO"></element>\n';
							break;
						default:
							$scope.api.resultSub += '        <element name="'+tmpList[i].list[j].name+'" type="'+tmpList[i].list[j].type+'"></element>\n';
							break;
					}
				}
				$scope.api.resultSub += '      </sequence>\n';
				$scope.api.resultSub += '    </extension>\n';
				$scope.api.resultSub += '  </complexContent>\n';
				$scope.api.resultSub += '</complexType>\n\n';
			}
		};
		$scope.api.make();
	}]);
})(window, window.angular);