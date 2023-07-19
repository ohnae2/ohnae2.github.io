$(window).load(function(){	
	$("#ch li").click(function(){
		if($(this).hasClass("select")){
			act.list()	
		}else{		
			$("#ch li").removeClass("select");
			$(this).addClass("select");
			$("#ch ul").css({top : $(this).index() * -88},300);		
			$("#list h1 img").attr({"src":"img/tit_"+($(this).index()+1)+".png"});
			$("#info h2 img").attr({"src":"img/tit_"+($(this).index()+1)+".png"});
		}
	});	
	$("#info .scroll li").click(function(){
		$("#info .scroll li").removeClass("select");
		$(this).addClass("select");
	});	
	$("#list li").click(function(){
		$("#list li").removeClass("select");
		$(this).addClass("select");
		$("#list ul").css({top : $(this).index() * -147},300);		
	});	
	
	$("#list ul").css({top : 1 * -147},300);	
	
	var depth = 0;	
	var act = {	
		ch : function(){
			depth = 0;			
			$("#wrap").removeClass("list info ch vod");
			$("#wrap").addClass("ch");				
		},
		list : function(){	
			depth = 1;	
			$("#wrap").removeClass("list info ch vod");
			$("#wrap").addClass("list");			
		},
		info : function(){
			depth = 2;			
			$("#wrap").removeClass("list info ch vod");
			$("#wrap").addClass("info");		
		},
		vod : function(){
			depth = 3;			
			$("#wrap").removeClass("list info ch vod");
			$("#wrap").addClass("vod");			
		}
	}
	$("#info .scroll,#info h2,#vod .control .stop").click(function(){
		act.info()
	});
	$(".btn-back").click(function(){
		if(depth == 1){
			act.ch()
		}else{
			act.list()
		}
	});	
	$(".box-info ul li").click(function(){		
		act.vod()
	});	
	$("#wrap li,.btn_prev,.btn_next,.input,dl").mouseover(function(){
		$("#wrap li,.btn_prev,.btn_next,.input,dl").removeClass("focus");
		$(this).addClass("focus");
	});	
	$(".popup .btn_prev,.popup  .btn_next").mouseout(function(){
		$(this).removeClass("focus");
	});	
	
	$("#vod .menu ul li").click(function(){
		$("#vod .menu ul li").removeClass("on");
		$(this).addClass("on");		
		$("#vod").removeClass("control list chart info");
		$("#vod").addClass($(this).attr("alt"));
	});	
	
	$("#vod .menu ul li").mouseover(function(){
		var i = $(this).index()+1;
		$("#vod .menu").removeClass("m1 m2 m3 m4");
		$("#vod .menu").addClass("m"+i);
	});	
	$("#vod .menu").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
	
	$(".voice_ico,#pop_voice .cancel").click(function(){
		$("#pop_voice").toggle();	
	});	
	$("#vod .list ul li").click(function(){
		$("#vod .list ul li").removeClass("on");
		$(this).addClass("on");		
		$("#vod .list").removeClass("dep1 dep2 dep3");
		$("#vod .list").addClass($(this).attr("alt"));
	});
	$("#global .aside li").click(function(){
		$("#mask,#pop").show();
	});
	$(".popup .cancel").click(function(){
		$("#mask,#pop").hide();
	});	
	$("#global .login").click(function(){
		$("#wrap").removeClass("search");
		$("#wrap").toggleClass("mypage");
	});	
	$("#global .search,#search .btn .cancel").click(function(){
		$("#wrap").removeClass("mypage");
		$("#wrap").toggleClass("search");
	});	
	$("#global .event").click(function(){
		$("#wrap").removeClass("mypage search");
		$("#mask,#event").show();
	});	
	
	
	$("#search .btn .symbol").click(function(){
		$("#search").removeClass("result keypad voice");
		$("#search").addClass("voice");		
	});
	$("#search .btn .submit").click(function(){
		$("#search").removeClass("result keypad voice");
		$("#search").addClass("result");		
	});
	$("#search .input").click(function(){
		$("#search").removeClass("result keypad voice");
		$("#search").addClass("keypad");		
	});	
	$("#mypage .tab li").click(function(){	
		$("#mypage .tab li").removeClass("select");
		$(this).addClass("select");		
		$("#mypage").removeClass("dep1 dep2");
		$("#mypage").addClass($(this).attr("alt"));
	});		
	//pop	
	$("#pop_type li").click(function(){
		var i = $(this).index() + 1;
		$(".popup").removeClass("on");
		$(".ly"+i).addClass("on");		
		$("#pop_type li").removeClass("on");
		$(this).addClass("on");	
		$("#pop_keypad").hide();	
	});
	$(".popup .input").click(function(){
		$("#pop_keypad").show();	
	});
	$(".poll ol li").click(function(){
		$(".poll ol li").removeClass("select");
		$(this).addClass("select");		
	});	
	//event	
	$("#event .tab li").click(function(){
		$("#event .tab li").removeClass("on");
		$(this).addClass("on");
		var i = $(this).index() + 1;
		$("#event").removeClass("dep1 dep2 dep3 result");
		$("#event").addClass("dep"+i);	
		$("#pop_keypad").hide();	
	});
	$("#event .dep3 li").click(function(){
		$("#event").removeClass("dep1 dep2 dep3 result");
		$("#event").addClass("result");
	});
	$("#event .btn").click(function(){
		$("#event,#mask").hide();
	});
	
	
	//trans
	var key = ["key1","key2","key3"]
	var key_idx =0;	
	$(".keypad .trans,#pop_keypad .trans").click(function(){
		key_idx++;
		$(this).parent().parent().removeClass("key1 key2 key3");
		$(this).parent().parent().addClass(key[key_idx]);	
		if (key_idx==2){key_idx=-1;}	
	});
	
	
});