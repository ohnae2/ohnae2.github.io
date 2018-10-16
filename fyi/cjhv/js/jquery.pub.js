$(window).load(function(){
	var spx = 500;
	var act = true;
	$("#epg .menu li,#slide li").mouseover(function(){
		$("#slide li,#epg .menu li").removeClass("on focus");
		$(this).addClass("on focus");		
	});
	$("#epg .menu li").mouseover(function(){
		$("#slide ul").removeClass("on");
		$("#slide ul").eq($(this).index()).addClass("on");
	})
	$("#slide li").mouseover(function(){
		$("#slide ul").removeClass("on");
		$(this).parent().addClass("on");	
		
		$("#epg .menu li").removeClass("on");
		$("#epg .menu li").eq($(this).parent().index()).addClass("on");
	});
	$("#epg .menu").mouseover(function(){
		$("#epg").addClass("mode-global");
		$("#global").addClass("on");
	});	
	$("#slide").mouseover(function(){
		$("#epg").removeClass("mode-global");
		$("#global").removeClass("on");
	});
	$("#vod .menu").mouseover(function(){
		$("#vod").addClass("mode-global");
		$("#global").addClass("on");
	});	
	$("#vod .list,.loading_mv").mouseover(function(){
		$("#vod").removeClass("mode-global");
		$("#global").removeClass("on");
	});	
	
	$("#slide .bar").each(function(){
		$(this).width($(this).parent().width() - 20);
	});	
	$("#slide li").mouseover(function(){
		$("#slide,#time").stop().animate({scrollLeft:$(this).position().left/2},spx);
	});
	
	$("#slide ul,#epg .menu li").mouseover(function(){
		$("#scroll").stop().animate({scrollTop:$(this).position().top/2},spx);
	});
	
	
	
	$("#mode li").click(function(){
		$("#mode li").removeClass("on");
		$(this).addClass("on");
		
		$("#epg").removeClass("standard silver kids").addClass($(this).attr("class"));
	
		
		
	});
	
	$("#global li").mouseover(function(){
		$("#vod .menu li").removeClass("on")
		$("#global li").removeClass("on");
		$(this).addClass("on");
		$("#epg .menu li").removeClass("focus");
	});
	$("#global li").mouseover(function(){		
		$("#global li").removeClass("select");		
		$(this).addClass("select");		
		$("#wrap").removeClass("epg vod").addClass($(this).attr("alt"));		

	});
	$("#vod .menu li").mouseover(function(){
		$("#global li").removeClass("on");
		$("#vod .menu li").removeClass("on");
		$("#vod .list li").removeClass("focus");	
		$(this).addClass("on");
	});
	$("#vod .menu li").click(function(){		
		$("#vod .menu li").removeClass("select");	
		$(this).addClass("select");
		$("#vod .list li").removeClass("focus");
	});
	$("#vod .list li").mouseover(function(){		
		$("#vod .list li").removeClass("focus");
		$("#vod .menu li").removeClass("on");
		$("#global li").removeClass("on");
		$(this).addClass("focus");
	});
	$("#pop-vod .banner_mv,#pop-vod .btn,#pop-vod .photo li,#pop-vod .next,#pop-vod .prev").mouseover(function(){
		$("#pop-vod .banner_mv,#pop-vod .btn,#pop-vod .photo li,#pop-vod .next,#pop-vod .prev").removeClass("on");	
		$(this).addClass("on");
	});
	$("#pop-vod .more").click(function(){		
		$("#pop-vod .story").toggleClass("on");
		$(this).toggleClass("close");
	});
	$("#pop-vod .back").click(function(){		
		$("#pop-vod").hide();
		$("#wrap").show();
	});
	$("#vod .list li").click(function(){		
		$("#pop-vod").show();
		$("#wrap").hide();
	});
});
