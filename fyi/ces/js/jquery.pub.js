/* jaeho */
$(function(){	
	//iscroll	
	var ascroll = new iScroll('musicWrap', {snap: true, hScrollbar: false,vScrollbar: false});
	var bscroll = new iScroll('videoWrap', {snap: true, hScrollbar: false,vScrollbar: false});
	var cscroll = new iScroll('radioWrap', {snap: true, hScrollbar: false,vScrollbar: false});
	var con_scroll = new iScroll('contentWrap', {
		snap: true,
		momentum: false,
		hScrollbar: false,
		vScrollbar: false,
		onScrollEnd: function() {
			$('#footer li span').each(function(i, node) {
				if(i === con_scroll.currPageX) {
					$(node).addClass('on');
				} else {
					$(node).removeClass('on');
				}
			});
		}
	});
	$("#footer li").click(function(){
		con_scroll.scrollToPage($(this).index());
		$('#footer li span').each(function(i, node) {
			if(i === con_scroll.currPageX) {
				$(node).addClass('on');
			} else {
				$(node).removeClass('on');
			}
		});
	});
	//common	
	$(".close").click(function(){
		$(this).toggleClass("active");		
	});
	$(".btn_pop").click(function(){		
		$("#mask").show();
		$("#"+$(this).attr("title")).show();		
	});	
	$(".pop_type .close").click(function(){		
		$("#mask").hide();
		$(this).parent().hide();
	});
	//web
	$("#web .back").click(function(){
		$(this).toggleClass("active");		
	});	
	$("#web .menu li").click(function(){
		$(this).parent().find("span").removeClass("on");	
		$(this).find("span").addClass("on");			
	});	
	$("#web_list .list li span.link").click(function(){
		$(this).parent().parent().parent().find("span.link").removeClass("on");	
		$(this).addClass("on")			
	});	
	$("#web .menu .arrow").click(function(){		
		var mm = $("#web .menu");
		if(mm.position().left == -171){
			mm.animate({"left":0},500);			
			$("#web .menu .arrow span").animate({rotate:"0deg"});			
		}else if(mm.position().left == 0){
			mm.animate({"left":-171},500);			
			$("#web .menu .arrow span").animate({rotate:"180deg"});				
		}
	});	
	//video
	$("#videoWrap .control .min").click(function(){
		$(this).toggleClass("max");		
	});
	$("#videoWrap .control .play").click(function(){
		$(this).toggleClass("pause");		
	});
	$("#videoWrap .btn li span").click(function(){
		$(this).parent().parent().find("span").removeClass("active");	
		$(this).addClass("active");		
	});
	$("#videoWrap .list li,#musicWrap .list li").click(function(){
		$(this).parent().find("li").removeClass("active");	
		$(this).addClass("active");		
	});
	//music
	$("#music .control li").click(function(){
		$(this).parent().find("li").removeClass("active");	
		$(this).addClass("active");		
	});
	$("#music .control .pause").click(function(){
		$(this).toggleClass("pause");	
	});	
	//radio
	$("#radioWrap .play").click(function(){
		$(this).toggleClass("pause");		
	});
	$("#radioWrap .list li").click(function(){
		var src = $(this).find("img").attr("src");
		var txt = $(this).find("p").text();
		$(this).parent().find(".select p").text(txt);
		$(this).parent().find(".select img").attr("src",src);
	});
	$("#radioWrap .menu li,#radioWrap .list li").click(function(){
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
	});	
	$("#radioWrap .control li").click(function(){
		$(this).parent().find("li").removeClass("active");	
		$(this).addClass("active");		
	});	
	//home
	$("#wrap .control .play").click(function(){
		$(this).toggleClass("pause");		
	});	
	$("#wrap .list dt span").click(function(){
		$(this).toggleClass("active");		
	});	
	$("#media .menu li,#vehicle .menu li").click(function(){
		$(this).parent().find("li").removeClass("active");	
		$(this).addClass("active");		
	});
	$("#apps .list dt,#store .list dt").click(function(){
		$(this).parent().parent().find("dt").removeClass("active");	
		$(this).addClass("active");		
	});	

	$("#wrap .wind li").click(function(){
		$(this).find("span").toggleClass("on");
	});
	$("#wrap .menu ul li").click(function(){
		$(this).parent().find("li").removeClass("on");	
		$(this).addClass("on");	
	});	
	$("#wrap .play").click(function(){
		$(this).toggleClass("pause");		
	});
	//home ani
	function ani_seat(){		
		$(".ly_ico span.seat3").fadeIn(500);
		$(".ly_ico span.seat3").animate({marginTop:20},500).fadeOut(1000).animate({marginTop:0},500);
	}
	setInterval(ani_seat,1100);	
	function ani_aircon(){			
		$(".aircon_ico .ico1 img,.aircon_ico .ico5 img").stop().fadeIn(600).fadeOut(600);
		$(".aircon_ico .ico2 img,.aircon_ico .ico6 img").stop().fadeIn(800).fadeOut(800);
		$(".aircon_ico .ico3 img,.aircon_ico .ico7 img").stop().fadeIn(1000).fadeOut(1000);
		$(".aircon_ico .ico4 img,.aircon_ico .ico8 img").stop().fadeIn(1200).fadeOut(1200);
	}
	setInterval(ani_aircon,3500);
	function ani_front(){		
		$(".ly_ico span.front").fadeIn(700);
		$(".ly_ico span.front").animate({marginTop:-20},500).fadeOut(1000).animate({marginTop:0},500);
	}
	setInterval(ani_front,1600)
	function ani_rear(){		
		$(".ly_ico span.rear").fadeIn(700);
		$(".ly_ico span.rear").animate({marginTop:0},500).fadeOut(1000).animate({marginTop:0},500);
	}
	setInterval(ani_rear,1200)
	function ani_auto(){		
		$(".ly_ico span.auto1").fadeIn(600);
		$(".ly_ico span.auto1").animate({marginLeft:-10},500).fadeOut(1000).animate({marginLeft:0},500);
		$(".ly_ico span.auto2").fadeIn(600);
		$(".ly_ico span.auto2").animate({marginLeft:10},500).fadeOut(1000).animate({marginLeft:0},500);
	}
	setInterval(ani_auto,1300);
	
	//driving
	var ease_driving = "easeInOutExpo";
	//$("#driving .info_t").animate({top:60},300,ease_driving);
	//$("#driving .info_b").animate({bottom:60},800,ease_driving);
	//$("#speed").animate({left:140},1300,ease_driving);
	//$("#rpm").animate({right:140},1800,ease_driving);	
	
	//$("#driving .gear").delay(1200).fadeIn(1300,"easeInOutBounce");		
	$("#driving .gear li").click(function(){
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");	
	});
	$("#driving .ico li").click(function(){
		$(this).find("span").toggleClass("on");	
	});	
	var driving = {	
		increase : function() {				
			num+=5;
			if(num < 241){
				$("#speed h1").text(Math.round(num/3*2));	
				$("#speed .bar,#speed .gra,#speed .gra_red").css({rotate:num+"deg"});	
				$("#rpm .bar,#rpm .gra,#rpm .gra_red").css({rotate:num*0.7+"deg"});	
				$("#speed .gra,#rpm .gra").css({opacity:"0." + num/10});			
				if(num < 100){
					$("#speed h1").removeClass("sm");														
				}else if(num > 180){
					$("#speed .gra_red").css({opacity:1});	
					$("#rpm .gra").css({opacity:1});
					$("#speed h1").text(160);	
				}else{				
					$("#speed h1").addClass("sm");		
					$("#speed .gra,#rpm .gra").css({opacity:1});
					$("#speed .gra_red").css({opacity:0});	
				}
				$("#speed li").eq(Math.round(num/30)).css({fontSize:30,opacity:1});
				$("#speed li").eq(Math.round(num/30)).next().css({fontSize:20,opacity:0.8});
				$("#speed li").eq(Math.round(num/30)).prev().css({fontSize:20,opacity:0.8});	
				$("#speed li").eq(Math.round(num/30)).prev().prev().css({fontSize:16,opacity:0.5});	
				$("#speed li").eq(Math.round(num/30)).next().next().css({fontSize:16,opacity:0.5});			
				$("#rpm li").eq(Math.round(num/30*0.7)).css({fontSize:30,opacity:1});
				$("#rpm li").eq(Math.round(num/30*0.7)).next().css({fontSize:20,opacity:0.8});
				$("#rpm li").eq(Math.round(num/30*0.7)).prev().css({fontSize:20,opacity:0.8});
				$("#rpm li").eq(Math.round(num/30*0.7)).prev().prev().css({fontSize:16,opacity:0.5});
				$("#rpm li").eq(Math.round(num/30*0.7)).next().next().css({fontSize:16,opacity:0.5});			
			}else if(num > 241){
				clearInterval(start);	
				state = 1;
			}
		},
		decrease : function() {	
			num-=2;
			if(num == 0){
				clearInterval(end);				
				state = 0;
				num = 0;
				$("#speed h1").text(0);				
			}else if(num > 0){
				$("#speed h1").text(Math.round(num/3*2));	
				$("#speed .bar,#speed .gra,#speed .gra_red").css({rotate:num+"deg"});	
				$("#rpm .bar,#rpm .gra,#rpm .gra_red").css({rotate:num/3*2+"deg"});	
				$("#speed .gra,#rpm .gra").css({opacity:"0." + num/10});			
				if(num < 100){
					$("#speed h1").removeClass("sm");											
				}else if(num > 180){
					$("#speed .gra_red").css({opacity:1});	
					$("#rpm .gra").css({opacity:1});
				}else{				
					$("#speed h1").addClass("sm");		
					$("#speed .gra,#rpm .gra").css({opacity:1});
					$("#speed .gra_red").css({opacity:0});	
				}
				$("#speed li").eq(Math.round(num/30)).css({fontSize:30,opacity:1});
				$("#speed li").eq(Math.round(num/30)).next().css({fontSize:20,opacity:0.8});
				$("#speed li").eq(Math.round(num/30)).prev().css({fontSize:20,opacity:0.8});	
				$("#speed li").eq(Math.round(num/30)).prev().prev().css({fontSize:16,opacity:0.5});	
				$("#speed li").eq(Math.round(num/30)).next().next().css({fontSize:16,opacity:0.5});			
				$("#rpm li").eq(Math.round(num/30*0.7)).css({fontSize:30,opacity:1});
				$("#rpm li").eq(Math.round(num/30*0.7)).next().css({fontSize:20,opacity:0.8});
				$("#rpm li").eq(Math.round(num/30*0.7)).prev().css({fontSize:20,opacity:0.8});
				$("#rpm li").eq(Math.round(num/30*0.7)).prev().prev().css({fontSize:16,opacity:0.5});
				$("#rpm li").eq(Math.round(num/30*0.7)).next().next().css({fontSize:16,opacity:0.5});	
			}else{
				num = 0;
				$("#speed h1").text(0);	
				clearInterval(end);	
				clearInterval(start);
			}
		}
	}
	var state = 0;
	var num = 0;
	$("#test").mouseover(function(){
		if(state == 1){
			clearInterval(end);	
			state = 0;			
		}		
		start = setInterval(driving.increase,20);
	});
	$("#test").mouseout(function(){	
		state = 1;
		clearInterval(start);
		end = setInterval(driving.decrease,30);	
	});
	//hvac
	$("#hvac .btn_ud ul li").hover(function(){		
		$(this).addClass("active");
	},function(){
		$(this).removeClass("active");
	});	
	$("#hvac .btn ul li.front span").click(function(){
		$(this).toggleClass("on");
		$("#hvac .ly_pop").show();
		$("#hvac .ly_pop span").hide();
		$("#hvac .ly_pop span.front").show();
		$("#hvac .ly_ico span.front").toggle();		
	});
	$("#hvac .btn ul li.rear span").click(function(){
		$(this).toggleClass("on");		
		$("#hvac .ly_pop").show();
		$("#hvac .ly_pop span").hide();
		$("#hvac .ly_pop span.rear").show();
		$("#hvac .ly_ico span.rear").toggle();	
	});
	$("#hvac .btn ul li.auto span").click(function(){
		$(this).toggleClass("on");
		$("#hvac .ly_pop").show();
		$("#hvac .ly_pop span").hide();
		$("#hvac .ly_pop span.auto").show();
		$("#hvac .ly_ico span.auto").toggle();
	});
	$("#hvac .btn ul li.aircon span").toggle(function(){		
			$(this).addClass("on");
			$("#hvac .btn ol li:eq(0)").addClass("on");		
			$("#hvac .ly_ico span.aircon_ico").show();			
			$("#hvac .ly_pop").show();
			$("#hvac .ly_pop span").hide();
			$("#hvac .ly_pop span.aircon").show();				
		},function(){
			$(this).removeClass("on");
			$("#hvac .btn ol li").removeClass("on");
			$("#hvac .ly_ico span.aircon_ico").hide();				
		}
	);	
	$("#hvac .seat span").toggle(function(){		
			$(this).attr("class","lv1");
			$("#hvac .ly_pop").show();
			$("#hvac .ly_pop span").hide();
			$("#hvac .ly_pop span.seat1").show();			
			$("#hvac .ly_ico span.seat1,#hvac .ly_ico span.seat2,#hvac .ly_ico span.seat3").hide();			
			$("#hvac .ly_ico span.seat1").show();		
			
		},function(){
			$(this).attr("class","lv2");
			$("#hvac .ly_pop span").hide();
			$("#hvac .ly_pop span.seat2").show();	
			$("#hvac .ly_ico span.seat1,#hvac .ly_ico span.seat2,#hvac .ly_ico span.seat3").hide();			
			$("#hvac .ly_ico span.seat2").show();
		},function(){
			$(this).attr("class","lv3");
			$("#hvac .ly_pop span").hide();
			$("#hvac .ly_pop span.seat3").show();	
			$("#hvac .ly_ico span.seat1,#hvac .ly_ico span.seat2,#hvac .ly_ico span.seat3").hide();			
			$("#hvac .ly_ico span.seat3").show();
		},function(){
			$(this).attr("class","lv0");
			$("#hvac .ly_pop span").hide();
			$("#hvac .ly_ico span.seat1,#hvac .ly_ico span.seat2,#hvac .ly_ico span.seat3").hide();	
		}
	);
	$("#hvac .btn ol li").click(function(){
		$("#hvac .btn ol li,#hvac .aircon span").addClass("on");
		$("#hvac .btn ol li:gt("+$(this).index()+")").removeClass("on");		
	});	
	$("#hvac .ly_f .fan").click(function(){
		$(this).parent().toggleClass("off");
	});
	$("#hvac .ly_f li").mouseover(function(){
		var v = Math.abs($(this).index() - 8);
		$(this).parent().parent().removeClass("off");
		$(this).parent().parent().removeClass("lv0").removeClass("lv1").removeClass("lv2").removeClass("lv3").removeClass("lv4").removeClass("lv5").removeClass("lv6").removeClass("lv7").removeClass("lv8");		
		$(this).parent().parent().addClass("lv"+v);
	});	
	function ani_seat(){		
		$(".ly_ico span.seat3").fadeIn(500);
		$(".ly_ico span.seat3").animate({marginTop:20},500).fadeOut(1000).animate({marginTop:0},500);
	}
	setInterval(ani_seat,1100);	
	function ani_aircon(){			
		$(".aircon_ico .ico1 img,.aircon_ico .ico5 img").stop().fadeIn(600).fadeOut(600);
		$(".aircon_ico .ico2 img,.aircon_ico .ico6 img").stop().fadeIn(800).fadeOut(800);
		$(".aircon_ico .ico3 img,.aircon_ico .ico7 img").stop().fadeIn(1000).fadeOut(1000);
		$(".aircon_ico .ico4 img,.aircon_ico .ico8 img").stop().fadeIn(1200).fadeOut(1200);
	}
	setInterval(ani_aircon,3500);
	function ani_front(){		
		$(".ly_ico span.front").fadeIn(700);
		$(".ly_ico span.front").animate({marginTop:-20},500).fadeOut(1000).animate({marginTop:0},500);
	}
	setInterval(ani_front,1600)
	function ani_rear(){		
		$(".ly_ico span.rear").fadeIn(700);
		$(".ly_ico span.rear").animate({marginTop:0},500).fadeOut(1000).animate({marginTop:0},500);
	}
	setInterval(ani_rear,1200)
	function ani_auto(){		
		$(".ly_ico span.auto1").fadeIn(600);
		$(".ly_ico span.auto1").animate({marginLeft:-10},500).fadeOut(1000).animate({marginLeft:0},500);
		$(".ly_ico span.auto2").fadeIn(600);
		$(".ly_ico span.auto2").animate({marginLeft:10},500).fadeOut(1000).animate({marginLeft:0},500);
	}
	setInterval(ani_auto,1300);
});