//마우스오버 스크립트

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
// 팝업 띄운다
function OpenWindow(url,width,height,scroll)
{
	if(scroll == null) scroll = "no";
	winpos = "left=" + ((window.screen.width-width)/2) + ",top=" + ((window.screen.height-height-28)/2);
	winstyle="width=" + width + ",height=" + height + ",status=no,toolbar=no,menubar=no,location=no,resizable=no,copyhistory=no,scrollbars=" + scroll + "," + winpos;
	window.open(url,'_blank',winstyle);
}
// BPMS
function popProcessMap()
{
	OpenWindow('popProcessMap.html','980','700','1');
}
//Flash URL
function flashAction(param)
{		
	switch(param)
	{
		case "링크1"	:location.href = "#";break;
		case "링크2"	:location.href = "#";break;
		case "링크3"	:location.href = "#";break;
		case "링크4"	:location.href = "#";break;

		default : alert(param);
	}
}
var Menu = new Array("","none");
var i;
i=2;
function viewMenu(){
	view.style.display = Menu[i%2];
	i++;
}
