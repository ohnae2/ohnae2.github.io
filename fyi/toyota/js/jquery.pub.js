$(window).load(function(){	
	function seek_set(){
		var idx = $("#seek li.on").index();
		var len = $("#seek li").length;	
		var li_width = $("#seek li").width(); 
		var pos = -li_width * idx;
		$("#seek ul").css({"left":pos});
		var seek = {		
			next : function(){
				if(idx < len - 1){
					idx = idx + 1;
					pos = pos - li_width;
					$("#seek ul").css({"left":pos});
					$("#seek li.on").removeClass("on").next().addClass("on");	
				}
			},
			prev : function(){
				if(idx > 0){
					idx = idx - 1;
					pos = pos + li_width;
					$("#seek ul").css({"left":pos});	
					$("#seek li.on").removeClass("on").prev().addClass("on");	
				}
			}
		}
		$("#main .seek .btn-prev").click(function(){
			seek.prev();
		});
		$("#main .seek .btn-next").click(function(){	
			seek.next();
		});
		$("#seek li").click(function(){	
			idx = $(this).index();
			pos = -li_width * $(this).index();
			$("#seek ul").css({"left":pos});	
			$("#seek li").removeClass("on");
			$(this).addClass("on");	
		});
	}	
	function fav_set(){
		var idx = $("#fav li.on").index();
		var len = $("#fav li").length;	
		var li_width = $("#fav li").width(); 
		var pos = -li_width * idx;
		$("#fav ul").css({"left":pos});
		var fav = {		
			next : function(){
				if(idx < len - 1){
					idx = idx + 1;
					pos = pos - li_width;
					$("#fav ul").css({"left":pos});
					$("#fav li.on").removeClass("on").next().addClass("on");	
				}
			},
			prev : function(){
				if(idx > 0){
					idx = idx - 1;
					pos = pos + li_width;
					$("#fav ul").css({"left":pos});	
					$("#fav li.on").removeClass("on").prev().addClass("on");	
				}
			}
		}
		$("#main .fav .btn-prev").click(function(){
			fav.prev();
		});
		$("#main .fav .btn-next").click(function(){	
			fav.next();
		});
		$("#fav li").click(function(){	
			idx = $(this).index();
			pos = -li_width * $(this).index();
			$("#fav ul").css({"left":pos});	
			$("#fav li").removeClass("on");
			$(this).addClass("on");	
		});
	}	
	function tune_set(){
		var idx = $("#tune li.on").index();
		var len = $("#tune li").length;	
		var li_width = $("#tune li").width(); 
		var pos = -li_width * idx;
		$("#tune ul").css({"left":pos});
		$("#tune li.on").prev().addClass("near");	
		$("#tune li.on").next().addClass("near");	
		var tune = {		
			next : function(){
				if(idx < len - 1){
					idx = idx + 1;
					pos = pos - li_width;
					$("#tune ul").css({"left":pos});
					$("#tune li").removeClass("near");
					$("#tune li.on").removeClass("on").next().addClass("on").prev().addClass("near").next().next().addClass("near");	
				}
			},
			prev : function(){
				if(idx > 0){
					idx = idx - 1;
					pos = pos + li_width;
					$("#tune ul").css({"left":pos});
					$("#tune li").removeClass("near");
					$("#tune li.on").removeClass("on").prev().addClass("on").prev().addClass("near").next().next().addClass("near");	
				}
			}
		}
		$("#main .tune .btn-prev").click(function(){
			tune.prev();
		});
		$("#main .tune .btn-next").click(function(){	
			tune.next();
		});
		$("#tune li").click(function(){	
			idx = $(this).index();
			pos = -li_width * $(this).index();
			$("#tune ul").css({"left":pos});	
			$("#tune li").removeClass("on");
			$(this).addClass("on");	
		});
	}
	
	seek_set();
	fav_set();
	tune_set();
	

	$("#color-btn li").mouseover(function(){
		$("#color-wrap,#setting h2 b").removeClass("color1 color2 color3 color4 color5 color6");
		$("#color-wrap,#setting h2 b").addClass($(this).attr("class"));
	});
	$("#bright-btn li").mouseover(function(){
		$("#bright-wrap").removeClass("bright1 bright2 bright3 bright4 bright5 bright6");
		$("#bright-wrap").addClass($(this).attr("class"));
	});
	$("#setting li").mouseover(function(){
		$(this).parent().find("li").removeClass("on")	
		$(this).addClass("on");
	});
	
	$("#header .btn-tune,#header .btn-fav").click(function(){
		$("#wrap").removeClass("tune fav")	
		$("#wrap").addClass("seek")	;
	});
	$("#header .btn-station").click(function(){
		$("#wrap").removeClass("seek tune");
		$("#wrap").addClass("fav");		
	});
	$("#header .btn-seek").click(function(){
		$("#wrap").removeClass("seek fav");
		$("#wrap").addClass("tune")	;		
	});
	
	$("#footer .btn-scan").click(function(){
		$(this).toggleClass("on");
	});	
	$("#setting").hover(function(){
		$(this).addClass("on");
	},function(){
		$(this).removeClass("on");
	});	
	
});