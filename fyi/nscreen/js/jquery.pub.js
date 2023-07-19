$(function(){
	var video = false;
	var audio = false;
	var videoList = false;
	
	var iscroll = new iScroll('slide', {
		snap:false,
		hScrollbar: false,
		vScrollbar: false,
		momentum: true,		
		bounce: true,		
		lockDirection :true
	});	
	
	function scroll_set(){
		var hh =  $("body").height();
		var ww =  $("body").width();		
		if(hh < ww){
			$("#slide .scroll").width($("#slide ul").length * 100+"%");		
			$("#slide ul").width(100/$("#slide ul").length+"%");			
		}
		if(hh > ww){
			$("#slide .scroll").width(100+"%");		
			$("#slide ul").width(100+"%");		
		}
		iscroll.refresh();
		$('.time_control input').slideControl();		
	}		
	scroll_set();
	$(window).resize(function(){
		scroll_set();
	});
	$(".sound_s_ico").click(function(){
		$(this).find("span").toggleClass("on");	
		$(".sound_s").toggle();
	});
	$("#slide li").click(function(){
		$("#slide li").removeClass("on");
		$(this).addClass("on");
		$("#slide ul").removeClass("on");
		$(this).parent().addClass("on");	
		if(video){
			videoList = true;
			$("#footer,#video").show();
			$(".video #slide").hide();
			$("#content").hide();
			$("#bg").css("background-image","none");
			$('.time_control input').slideControl();
		}else if(audio){
			var i = $(this).find("img").attr("src");			
			$("#content .title h2 strong").text($(this).find("h2 b").text());
			$("#content .title p").text($(this).find("h2 span").text());			
			$("#bg").css("background-image","url("+i+")");	
			$('.time_control input').slideControl();			
		}
	});
	
	$("#main li.audio").click(function(){
		audio = true;
		$("body").attr("class","audio");
		$("#main").hide();
		$("#wrap,#footer").show();
		$("#header h1").text("AUDIO");
		scroll_set();		
	});	
	$("#main li.video").click(function(){
		video = true;
		$("body").attr("class","video");
		$("#main,#footer").hide();
		$("#wrap").show();
		$("#header h1").text("VIDEO");
		$("#bg").css("background-image","none");
		scroll_set();
	});
	$("#header .back").click(function(){
		if(videoList){
			$("#footer,#video").hide();
			$(".video #slide").show();
			$("#content").show();
			videoList = false;	
		}else{
			$("body").attr("class","");
			$("#main").show();
			$("#wrap").hide();
			video = false;
			audio = false;
			videoList = false;			
		}		
	});
	
	$(".control-video .play,.control-video .stop").click(function(){
		$(".control-video .play,.control-video .stop").toggle();
	});
	$(".control-video .full-on").click(function(){
		$("#footer,#header").hide();
	});
	$("#video").click(function(){
		$("#footer,#header").show();
	});
	
});