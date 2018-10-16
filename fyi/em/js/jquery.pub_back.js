$(window).load(function(){	
	var lv = 0;	
	var act = {		
		list : function(){
			$("#ch").css({opacity:0.0});
			$("#list,.btn-ch,#info").show();
			$("#global,.btn-pro").hide();
			$("#info").removeClass("act");
		},
		info : function(){
			$("#info").addClass("act")
			$("#list,.btn-ch").hide();
			$(".btn-pro").show();
		},
		ch : function(){
			$("#ch").css({opacity:1});
			$("#list,.btn-ch,#info").hide();
			$("#global").show();
		}
	}
	$("#lv li").click(function(){
		$("#lv li").removeClass("on");
		$(this).addClass("on");
		lv = $(this).index();
	});	
	$("#wrap li").mouseover(function(){
		$("#wrap li").removeClass("focus");
		$(this).addClass("focus");
	});	
	$("#ch li,.btn-pro").click(function(){
		act.list()
	});
	$("#info,#list li").click(function(){
		act.info()
	});
	$(".btn-ch").click(function(){
		act.ch()
	});	
});