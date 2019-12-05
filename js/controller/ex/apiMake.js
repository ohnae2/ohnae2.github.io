(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('KaisaApp', [ 'common', 'layerDatePicker' ]);

	app.controller('BodyController', [ '$scope', '$window', '$timeout', '$interval', '$http', 'kaisaApi', 'kaisaUtil', '$filter', function($scope, $window, $timeout, $interval, $http, kaisaApi, kaisaUtil, $filter) {
		$scope.page = {
			idx : 2
		};
		$scope.api = {
			data : null,
			name : 'productRegistration',
			type : 'Request',
			dataArray : [],
			result : ''
		};
		$scope.api.data = `apiCd	O	string
trGrpCd	O	string
trNo	O	string
lrtrNo	O	string
spdLst		array
scatNo	O	string
epdNo	O	string
slTypCd	O	string
pdTypCd	O	string
spdNm	O	string
brdNo		string
mfcrNm		string
oplcCd	O	string
mdlNo		string
barCd		string
tdfDvsCd	O	string
slStrtDttm	O	string
slEndDttm	O	string
pdItmsInfo		object
pdItmsCd	1	string
pdItmsArtlLst	O	array
pdArtlCd	1	string
pdArtlCnts	O	string
sftyAthnLst		array
sftyAthnTypCd	1	string
sftyAthnNo	1	string
scatAttrLst		array
attrNm	1	string
attrVal	1	string
attrDtlsVal	1	string
attrPrirRnkg	1	string
ecpnInfo	△	object
csrcPblsYn	1	string
useYnCfmWayCd	1	string
athnMgtTypCd	1	string
seTypCd	1	string
fbilPrc	1	string
vldPrdStrtDttm	1	string
vldPrdEndDttm	1	string
rtngPsbDvsCd	1	string
rfndPsbYn	1	string
ecpnRfndTypCd	1	string
autoRfndYn	1	string
issWayCd	1	string
sndWayCd	1	string
sndMnsCd	1	string
useLmtEpn	1	string
atntMatrEpn	1	string
usePlcEpn	1	string
rntlPdTypCd	△	string
rntlPdInfo	△	object
dutyUsePrd	1	number
instCst	1	number
regCst	1	number
cnsmrSlPrc	1	number
mmRntlCst	1	number
vatInclYn	1	string
cnslPsbStrtTm	1	string
cnslPsbEndTm	1	string
cnslTelNo	1	string
jntPurPdYn		string
jntPurPdInfo		object
dealTypCd	1	string
dealDpNm	1	string
dealStrtDttm	1	string
dealEndDttm	1	string
dealAplyStrtTm	1	string
dealAplyEndTm	1	string
dealInfo	1	array
dealStkInfo		object
dealStkQty	1	number
dealStrStkInfo		array
trGrpCd	1	string
trNo	1	string
lrtrNo	1	string
dealStrStkQty	1	number
stkSbtTypCd		string
sndStrtDttm		string
dvRsvDvsCd	O	string
rsvOdInfo		object
rsvOdStrtDttm	1	string
rsvOdEndDttm	1	string
rsvPdSndStrtDttm	1	string
gnrlPdSwitYn	1	string
itypOptYn		string
itypOptTypCd		string
itypOptLst		array
itypOptDvsCd		string
itypOptNm		string
itypOptVal		string
itypEstlIputYn		string
purPsbQtyInfo		object
itmByMinPurPsbQtyYn	1	string
itmByMinPurQty	1	number
itmByMaxPurPsbQtyYn	1	string
maxPurQty	1	number
maxPurNday	1	number
hpPrcEstmAplyYn	O	string
lamtPurDcPdYn	O	string
lamtDcStdQty	△	number
ageLmtCd	O	string
thdyPdYn	O	string
prstPsbYn	O	string
prstPckPsbYn	O	string
prstMsgPsbYn	O	string
prcCmprEpsrYn	O	string
bookCultCstDdctYn	O	string
isbnCd		string
impNm		string
impDvsCd	△	string
cshbltyPdYn	O	string
etvPdYn		string
gftvShpCd		string
dnDvPdYn		string
qrPdYn		string
toysPdYn		string
intgSlPdNo		string
nmlPdYn		string
prmmPdYn		string
otltPdYn		string
bfoInstPdYn		string
prmmInstPdYn		string
brkHmapPkcpPsbYn	O	string
mvCmcoCd		string
ctrtTypCd		string
pdUtInfo		object
pdUtStdQty	1	number
pdUtCd	1	number
pdCapa	1	number
pdSzInfo		object
pdWdthSz	1	number
pdLnthSz	1	number
pdHghtSz	1	number
pdWeit	1	number
pckWdthSz	1	number
pckLnthSz	1	number
pckHghtSz	1	number
pckWeit	1	number
pdStatCd	O	string
dpYn	O	string
ltonDpYn	O	string
pblcStncInfo		object
pblcStnc	1	string
pblcStncHstStrtDttm	1	string
pblcStncHstEndDttm	1	string
scKwdLst		array
pdImgLst		array
imgTypCd	1	string
imgDvsCd	1	string
origImgFileNm		string
rprtImgYn		string
imgEpsrPrirRnkg		number
vdoInfo		object
vdoTypCd	1	string
vdoRteNm	1	string
vdoEpsrPrirRnkg	1	number
epnLst		array
pdEpnTypCd	1	string
pdEpnShpCd	1	string
orglDtlFileNm	1	string
pyMnsExcpLst		List<String>
cnclPsbYn		string
immdCnclPsbYn		string
dmstOvsDvDvsCd	O	string
pstkYn	O	string
dvProcTypCd	O	string
dvPdTypCd	O	string
sndBgtNday	O	number
sndBgtDdInfo	O	object
nldySndCloseTm	1	string
satSndPsbYn	1	string
satSndCloseTm	1	string
dvRgnGrpCd	O	string
dvMthdCdLst	O	array
owhpNo	O	string
hdcCd		string
dvCstPolNo	O	string
adtnDvCstLst	O	array
adtnDvCstTypCd	1	string
adtnDvCst	1	number
cmbnDvPsbYn	O	string
dvCstStdQty	O	number
qckDvUseYn		string
crdayDvPsbYn		string
crdayDvInfo		object
odCloseTm	1	string
spicUseYn	O	string
spicInfo		object
spicTypCdLst	1	array
strPicTypInfo		array
trGrpCd	1	string
trNo	1	string
lrtrNo	1	string
shopPkupYn	1	string
lckPkupYn	1	string
dskPkupYn	1	string
spicEusePdYn		string
spicEusePdTypCd		string
hpDdDvPsbYn		string
hpDdDvPsbPrd		number
saveTypCd		string
shopCnvMsgPsbYn	O	string
rgnLmtPdYn		string
fprdDvPsbYn	O	string
spcfSqncPdYn		string
rtngPsbYn	O	string
xchgPsbYn	O	string
echgPsbYn	O	string
cmbnRtngPsbYn	O	string
rtngHdcCd		string
rtngRtrvPsbYn	O	string
rtrpNo	O	string
rtngDvCst	O	number
xchgDvCst	O	number
stkMgtYn	O	string
itmPrcMgtYn	O	string
itmLst	O	array
eitmNo	1	string
sortSeq	1	string
dpYn	1	string
ltonDpYn	1	string
itmOptLst	O	array
optCd	1	string
optNm	1	string
optValCd	1	string
optVal	1	string
itmImgLst	O	array
imgSeq	1	string
epsrTypCd	1	string
epsrTypDtlCd	1	string
rgbVal	1	string
origImgFileNm	1	string
rprtImgYn	1	string
epsrPrirRnkg	1	number
hstStrtDttm	O	String
hstSndDttm	O	String
slPrc	O	number
itmDcTypCd		string
trCtrtNo		string
supPmct		number
mrgnRt		number
stkQty		number
slrRcPdLst		array
spdNo	1	string
sitmNo	1	string
epsrPrirRnkg	1	number
`,
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