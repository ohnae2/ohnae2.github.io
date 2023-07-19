$(function(){
	var menuArr = ["input","live","vod","cp","apps","web"];		
	var right_con = $("#liveWrap,#vodWrap,#appWrap");			
	var container_left = $("#container_left");
	var menu = $("#menu");
	var fav = $("#fav");
	var container_right = $("#container_right");	
	var livetvWrap = $("#livetvWrap");
	var vodWrap = $("#vodWrap");
	var appWrap = $("#appWrap");
	var livetv = $("#livetv");
	var ch_browser = $("#ch_browser");
	var epg_box = $("#epg_box");
	var nav_bofore = $(".nav_bofore");
	var nav_next = $(".nav_next");	
	var btnWrap = $("#btnWrap");
	var spx = 500;
	var lefx = 158; 
	var rigx = 1550;	
	$("#global span").click(function(){
		$(this).parent().parent().find("span").removeClass("on");
		$(this).addClass("on");
	});		
	var cont = {
		con_left : function(){		
			container_left.animate({left:0});
			container_right.animate({left:367});
			btnWrap.animate({left:367});
			fav.css({"background-color":"#3d414f"});
			fav.find("div").css({"opacity":1});
			fav.stop().animate({"left":0},function(){
				fav.stop().css({"transform":"rotateY(0) translateZ(0)"});
			});
		},
		con_right : function(){			
			container_left.animate({left:-367});
			container_right.animate({left:0});	
			btnWrap.animate({left:0});
			fav.find("div").css({"opacity":0.8});
			fav.css({"background-color":"#171a24"});
			fav.stop().animate({"left":-215},function(){
				fav.stop().css({"transform":"rotateY(-60deg) translateZ(-370px)"})
			});
		}				
	}
	fav.click(function(){
		cont.con_left();		
	});
	var anit = {
		main : function(id) {			
			btnWrap.hide();
			cont.con_right();			
			switch (id) {
				case "input" : anit.input(); break;
				case "live" : anit.live(); break;
				case "vod" : anit.vod(); break;
				case "cp" : anit.cp(); break;
				case "apps" : anit.apps(); break;
				case "web" : anit.web(); break;
				default : alert("default"); break;
			}
		},	
		input : function() {	
			appWrap.stop().animate({left:rigx},spx);
			vodWrap.stop().animate({left:rigx},spx);
			livetvWrap.stop().animate({left:rigx},spx,function(){		
				act = true;	
				state = now;
			});		
		},
		live : function() {
			vodWrap.stop().animate({left:rigx},spx);
			appWrap.stop().animate({left:rigx},spx,function(){				
				livetvWrap.stop().animate({left:lefx},spx,function(){
					btnWrap.show();	
					act = true;	
					state = now;									
				});
			});			
			nav_next.click(function(){
				epg_box.find("div").css({"opacity":1});
				ch_browser.find("div").css({"opacity":0.8});
				ch_browser.css("background-color","#171a24");
				epg_box.css("background-color","#3d414f");
				livetv.stop().css({"transform":"rotateY(-37deg) translateZ(-355px)"});
				livetv.stop().animate({left:-1015},200);
				nav_bofore.show();
				nav_next.hide();
			});	
			nav_bofore.click(function(){
				epg_box.find("div").css({"opacity":0.8});
				ch_browser.find("div").css({"opacity":1});
				epg_box.css("background-color","#171a24");
				ch_browser.css("background-color","#3d414f");
				livetv.stop().animate({left:0},200).bind("webkitTransitionEnd",function(){
					livetv.stop().css({"transform":"rotateY(0) translateZ(0)"}).unbind("webkitTransitionEnd");		
				});	
				nav_next.show();	
				nav_bofore.hide();				
			});			
		},
		vod : function() {	
			appWrap.stop().animate({left:rigx},spx);
			livetvWrap.stop().animate({left:rigx},spx,function(){					
				vodWrap.stop().animate({left:lefx},spx,function(){		
					act = true;	
					state = now;
				});		
			});			
		},
		cp : function() {
			appWrap.stop().animate({left:rigx},spx);
			vodWrap.stop().animate({left:rigx},spx);
			livetvWrap.stop().animate({left:rigx},spx,function(){		
				act = true;	
				state = now;
			});	
		},
		apps : function() {
			vodWrap.stop().animate({left:rigx},spx);			
			livetvWrap.stop().animate({left:rigx},spx,function(){					
				vodWrap.stop().animate({left:lefx},spx,function(){		
					act = true;	
					state = now;	
				});					
			});				
		},
		web : function() {	
			appWrap.stop().animate({left:rigx},spx);
			vodWrap.stop().animate({left:rigx},spx);
			livetvWrap.stop().animate({left:rigx},spx,function(){		
				act = true;	
				state = now;
			});				
		}		
	};
	var state = 100;
	var now = 0;
	var act = true;	
	var clickHandler = function(){		
		if(act){
			now = $(this).index();
		}		
		if($(this).index() != state & act){	
			act = false;		
			$(this).parent().find("span").removeClass("on");
			$(this).find("span").addClass("on");
			anit.main(menuArr[$(this).index()]);			
			return;
		}
	};
	$("#menu li").bind("click",clickHandler);
		
	$("#container_right .list_box li").click(function(){
		$(this).parent().parent().parent().parent().find("li").removeClass("focus on");
		$(this).addClass("focus on");	
	});
	$("#container_right .sub_list li").click(function(){
		$(this).parent().parent().parent().parent().find("li").removeClass("focus on");
		$(this).addClass("focus on");	
	});
	$(".program_list li").click(function(){
		$(this).parent().parent().parent().parent().find("li").removeClass("focus");
		$(this).addClass("focus");	
	});
	
});