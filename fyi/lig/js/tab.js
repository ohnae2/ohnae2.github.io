//tab 메뉴가 들어간 부분에서만 불러옴

var selected_num = 1;

function ViewTab(num) //오늘의할일
{
	var tab, con;
	
	tab = document.getElementById("tab" + selected_num);
	tab.src = "../images/officeWork/tab0" + selected_num + "off.gif";
	tab.state = 0;
	
	tab = document.getElementById("tab" + num);
	tab.src = "../images/officeWork/tab0" + num + "on.gif";
	tab.state = 1;
	
	con = document.getElementById("con" + selected_num);
	con.style.display = "none";
	
	con = document.getElementById("con" + num);
	con.style.display = "";
	
	selected_num = num;
}

function WorkTab(num) //팝업 결재선 지정
{
	var tab, con;
	
	tab = document.getElementById("tab" + selected_num);
	tab.src = "../images/popup/tab_work0" + selected_num + "off.gif";
	tab.state = 0;
	
	tab = document.getElementById("tab" + num);
	tab.src = "../images/popup/tab_work0" + num + "on.gif";
	tab.state = 1;
	
	con = document.getElementById("con" + selected_num);
	con.style.display = "none";
	
	con = document.getElementById("con" + num);
	con.style.display = "";
	
	selected_num = num;
}
var maintab1_num = 1; //메인 최근게시물 1
function maintab1View(num)
{
	var main1tab, main1con;
	
	main1tab = document.getElementById("main1tab" + maintab1_num);
	main1tab.src = "../images/main/main1_tab0" + maintab1_num + "off.gif";
	main1tab.state = 0;
	
	main1tab = document.getElementById("main1tab" + num);
	main1tab.src = "../images/main/main1_tab0" + num + "on.gif";
	main1tab.state = 1;
	
	main1con = document.getElementById("tab010" + maintab1_num);
	main1con.style.display = "none";
	
	main1con = document.getElementById("tab010" + num);
	main1con.style.display = "";
	
	maintab1_num = num;
}
var maintab2_num = 1; //메인 최근게시물 1
function maintab2View(num) 
{
	var main2tab, main2con;
	
	main2tab = document.getElementById("main2tab" + maintab2_num);
	main2tab.src = "../images/main/main2_tab0" + maintab2_num + "off.gif";
	main2tab.state = 0;
	
	main2tab = document.getElementById("main2tab" + num);
	main2tab.src = "../images/main/main2_tab0" + num + "on.gif";
	main2tab.state = 1;
	
	main2con = document.getElementById("tab020" + maintab2_num);
	main2con.style.display = "none";
	
	main2con = document.getElementById("tab020" + num);
	main2con.style.display = "";
	
	maintab2_num = num;
}
var selected_num = 1; //메인검색
function searchConView(num)
{
	var tab, con;
	
	tab = document.getElementById("tab" + selected_num);
	tab.src = "../images/main/tab_searchBox0" + selected_num + "off.gif";
	tab.state = 0;
	
	tab = document.getElementById("tab" + num);
	tab.src = "../images/main/tab_searchBox0" + num + "on.gif";
	tab.state = 1;
	
	con = document.getElementById("searchCon" + selected_num);
	con.style.display = "none";
	
	con = document.getElementById("searchCon" + num);
	con.style.display = "";
	
	selected_num = num;
}
var menuNum = new Array("none","");
var stateNum  = new Array("0","1");
var i;
i=1;
function functionMenuView(){
	functionMenuLayer.style.display = menuNum[i%2];
	functionMenuBtn.state = stateNum[i%2];
	i++;	
}
function show(){
	showLayer.style.display = menuNum[i%2];
	i++;
	if(i=1){
	newMemoBtn.style.display="none";
	}
}
function hidden(){
	showLayer.style.display = "none";
	newMemoBtn.style.display="";
}

function showBpmsLayer(){
	showLayer.style.display = menuNum[i%2];
	i++;
}
function showFaq(){
	showLayer.style.display = menuNum[i%2];
	i++;
}
function faqOld(id)
{
	if(document.getElementById('faq'+id).style.display=='none')
	{
		document.getElementById(id).style.fontWeight ='bold';
		document.getElementById(id).style.fontSize ='13px';
		document.getElementById('faq'+id).style.display='';
	}
	else
	{
		document.getElementById(id).style.fontWeight ='normal';
		document.getElementById(id).style.fontSize ='12px';
		document.getElementById('faq'+id).style.display='none';
	}
	return;
}

/////////////////////////

function faq(num){
	var totalNum = "10";
	totalNum = "5";

	for (i=1;i<= totalNum ;i++) 	{
		menu=eval("document.getElementById('faq'+i).style");
		if (num==i)	{
			if (menu.display=="block"){
				menu.display="none";
			}else {
				menu.display="block";
			}
		}else{
			menu.display="none";
		}
	}
}






