$(function(){
	//test
	var global_html = "<li>테스트 URL :</li>"
		+"<li class=btn_pop_type alt=login>로그인</li>"
		+"<li class=btn_pop_type alt=join>회원가입</li>"
		+"<li><a href=index.html>메인페이지</a></li>"
		+"<li><a href=detail.html>상세페이지</a></li>"
		+"<li><a href=board.html>게시판</a></li>"
		+"<li><a href=list.html>리스트페이지</a></li>"
		+"<li><a href=admin.html>관리자</a></li>"		
		+"<li>/ &nbsp; <a href= ad.html>광고서버 메인</a></li>"
		+"<li><a href= ad_ad.html>광고주</a></li>"
		+"<li><a href= ad_dev.html>개발자</a></li>"
		+"<li><a href= ad_guide.html>가이드</a></li>"
		+"<li><a href= ad_cust.html>고객지원</a></li>";	
	$("#global").append(global_html)	
	//메인배너
	$(".main_slide").each(function(){
		var li = $(this).find("li");
		var ul = $(this).find("ul");
		var prev = $(this).find(".prev");
		var next = $(this).find(".next");		
		var box = $(this).find(".box");
		var pos = 0;
		var li_width = li.width();
		var box_width = box.width();
		var speed = 300;
		var totalWidth = li.width() * li.length;		
		ul.width(totalWidth);	
		next.click(function(){			
			if (pos == li.length - 2) {
				pos = 0;
				box.stop().animate({scrollLeft: li.eq(pos).position().left},speed);			
			}
			pos++;
			box.stop().animate({scrollLeft: li.eq(pos).position().left},speed);			
		});	
		prev.click(function(){
			if (pos == 0) {
				pos = li.length - 2;
				box.stop().animate({scrollLeft: li.eq(pos).position().left},speed);		
			}
			pos--;
			box.stop().animate({scrollLeft: li.eq(pos).position().left},speed);			
		});		
	});	
	//팝업	
	if($("#container").height() < $("body").height()){
		$("#top").hide();
		$("#mask").height($("#body").height());			
	}else{
		$("#mask").height($("#container").height());
	}	
	$(".pop_type .close").click(function(){
		$(this).parent().stop().fadeOut(500,function(){
			$("#mask").stop().fadeOut(500);
		});
	});	
	//app제목이 길면 레이어로 띄움
	$("h4").mousemove(function(e) {
		if($(this).text().length > 10){
			$('#help').css({"top": e.pageY+"px","left": e.pageX+20+"px","display":"block"});
			$('#help').html($(this).html());
		}
	});
	$("h4").mouseout(function() {
		$('#help').css({"display":"none"});
	});
	//capture
	$(".capture dd img").mouseover(function() {
		$(this).parent().parent().find("img").removeClass("on");
		$(this).addClass("on");
		var src = $(this).attr("src");	
		$(this).parent().parent().find("dt img").attr("src",src);
	});	
	$(".btn_pop_type").click(function(){
		var tit = $(this).attr("alt");
		$("#mask").stop().fadeIn(300,function(){
			$("#"+tit).stop().fadeIn(300);
		});
	});
	//인기,추천,신규
	$(".tab li").mouseover(function(){
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
	});
	//top
	$("#top").click(function(){
		$("body,html").stop().animate({scrollTop:0},1000,"easeInOutExpo");
	});
	//input 
	var $toggleFormText = {
		scan : function(o){
			o.find("input").each(function(){
				if(this.value == this.title){
					$(this).removeClass('focus');
					this.value = this.title;
				}
				if(this.value == ''){
					$(this).removeClass('focus');
					this.value = this.title;
				}
			});
			o.find("input").focus(function(){
				if(this.value == this.title){
					$(this).addClass('focus');
					this.value = '';
				}
			});
			o.find("input").blur(function(){
				if(this.value == ''){
					$(this).removeClass('focus');
					this.value = this.title;
				} else { 
					$(this).addClass('focus');
				}
			});
		},
		toString : function(){
			return "toggleFormText";
		}
	};
	$(document).ready(function(){
		$toggleFormText.scan($("body"));
	});	
	
	
	
	
	
	
	$(function(){
		var slide = $("#banner")
		var li = slide.find("li");
		var ul = slide.find("ul");
		var left = slide.find(".before");
		var right = slide.find(".next");		
		var scroll = slide.find(".scroll");
		var pos = 0;
		var li_width = 130;
		var totalWidth = li.width() * li.length;
		ul.width(totalWidth);		
		right.click(function(){
			if (pos == totalWidth-scroll.width()) {
				pos = 0;
				scroll.stop().animate({scrollLeft: pos},300);
			}
			pos += li_width;
			scroll.stop().animate({scrollLeft: pos},300);
		});
		left.click(function(){
			if (pos == 0) {
				pos = totalWidth-scroll.width();
				scroll.stop().animate({scrollLeft: pos},300);			
			}
			pos -= li_width;
			scroll.stop().animate({scrollLeft: pos},300);
		});
	});
		
	
	
	
	
	
	
	
});