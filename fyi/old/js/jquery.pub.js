$(window).load(function(){
	var brow = false;
	if($.browser.webkit){
		brow = true;
	}
	var btn_before = $("#about .btn_before");
	var btn_next = $("#about .btn_next");
	var mask = $("#mask");
	var pop_mail = $("#pop_mail");
	var about_sec = $("#about .section");
	var btn_gnb = $("#header ul li span");
	var num = 0;
	var gnb = 0;
	var lb = 0;
	var tb = 0;
	var spx = 200;
	var now = false;
	var img = "";
	var ani = {
		header : function(){
			$(".load").fadeOut(1000,function(){
				$("#container").fadeIn(1000,function(){
					$("#header").animate({height:60},function(){						 
						var x = 120;
						$("#header ul li").each(function(){
							$(this).animate({left: x + 'px'},500,"easeOutExpo");
							x = x + 120;
							if(x == 600){								
								ani.footer();
							}
							return;	
						});
					});
				});
			});
		},
		footer : function(){
			$("#footer .facebook span").animate({top:0},200,function(){
				$("#footer .twitter span").animate({top:0},200,function(){
					$("#footer p").animate({top:0},200,function(){
						$("#header ul li:eq("+page+") span").animate({top:-26},function(){
							now = true;
							ani.init();
							if(brow){
								$("#color").fadeIn();
							}
						});
					});
				});
			});
		},
		init : function(){
			if(now){	
				$("#work .con ul li").click(function(){
					$(this).append("<div class='symbol load'><span>1</span></div>");		
					now = false;
					lb = $(this).position().left;
					tb = $(this).position().top;
					img = $(this).find("img").attr("alt");
					$("#work .con img").removeClass("now");
					$(this).find("img").addClass("now");
					$("#work .clon").css({left:lb,top:tb});
					$("#work .clon").show();			
					if(brow){
						$("#work .clon").load("img/project/big/"+ img +".jpg", function(){					
							$("#work .load").remove();				
							$("#work .clon").html("<img src='img/project/big/"+ img +".jpg' alt=''>");
							$("#work .content").css({"transform":"rotateY(340deg) rotateX(20deg) translateZ(500px)",opacity:0}).bind('webkitTransitionEnd',function(){
								$("#work .content").hide().unbind('webkitTransitionEnd');
								$("#work .clon").animate({left:10,top:-150},function(){
									$("#work .clon img").animate({width:900},function(){//height:540
										$("#work .close").show().animate({left:910});	
										now = true;												
									});
								});
							});
						});
					}else{
						$("#work .clon").load("img/project/big/"+ img +".jpg", function() {
							$("#work .load").remove();
							$("#work .clon").html("<img src='img/project/big/"+ img +".jpg' alt=''>");
							$("#work .content").fadeOut(1000,function(){
								$("#work .clon").animate({left:10,top:-150},function(){
									$("#work .clon img").animate({width:900},function(){
										$("#work .close").show().animate({left:910});
										now = true;
									});
								});
							});
						});
					}			
				});		
				$("#work .close").click(function(){
					now = false;
					$("#work .close").animate({left:540},function(){
						$("#work .close").hide()
						$("#work .clon img").animate({width:140},function(){
							if(brow){
								$("#work .content").show();
								$("#work .clon").animate({left:lb,top:tb},function(){							
									$("#work .content").css({"transform":"rotateY(0deg) rotateX(0deg) translateZ(0px)",opacity:1}).bind('webkitTransitionEnd',function(){
										$("#work .content").unbind('webkitTransitionEnd');
										$("#work .clon").hide();
										$("#work .con img").removeClass("now");
										$("#work .clon").html("");
										now = true;								
									});
								});	
							}else{						
								$("#work .clon").animate({left:lb,top:tb},function(){
									$("#work .content").fadeIn(1000,function(){
										$("#work .clon").hide();
										$("#work .con img").removeClass("now");
										$("#work .clon").html("");
										now = true;
									});	
								});
							}					
						});
					});
				});
			}	
		}
	}
	ani.header();
	
	$("#pop_mail button").click(function(){
		pop_mail.fadeOut(300,function(){
			mask.fadeOut(300);
			$('textarea#message').val("").focus();
		});	
	});	
	btn_gnb.click(function(){	
		var nav = $(this).parent().attr("class");		
		var idx = $(this).parent().index();	
		if(gnb != idx & now){
			now = false;
			$("#header ul li span").eq(gnb).animate({top:0});			
			$(this).animate({top:-26},200,function(){
				$("#container .sec").eq(gnb).animate({top:50},spx).fadeOut(spx,function(){				
					$("#container .sec").eq(idx).fadeIn(spx).animate({top:0},spx,function(){
						now = true;
						gnb = idx;
					});
				});
			});			
		}
	});
	$("#work .clon").hover(function(){
		$("#work .clon_btn").show();
	});
	btn_before.click(function(){
		if(num < 1){
			num = about_sec.length -1;
		}else{
			num--;	
		}
		if(brow){
			$("#box").css({"transform":"rotateY("+(num * -90)+"deg)"});	
			about_sec.hide(1000);
			about_sec.eq(num).show(1000);	
		}else{
			about_sec.hide();
			about_sec.eq(num).show();	
		}			
	});
	btn_next.click(function(){
		if(num > about_sec.length -2){
			num = 0;
		}else{
			num++;	
		}
		if(brow){
			$("#box").css({"transform":"rotateY("+(num * -90)+"deg)"});	
			about_sec.hide(1000);
			about_sec.eq(num).show(1000);
		}else{
			about_sec.hide();
			about_sec.eq(num).show();
		}		
	});
	$("#work .menu li").click(function(){			
		$("#work .menu li").removeClass("on")
		$(this).addClass("on")
		$("#work .con").hide();
		$("#work .con").eq($(this).index()).show();			
	});
	$(".scrollWrap").each(function(){
		var ul_width = $(this).find("ul").find("li").width() * $(this).find("ul li").length;
		$(this).find("ul").width(ul_width);
	});
	$(".scrollWrap ol li").mouseover(function(){
		var ww = $(this).parent().parent().find("ul li").width();
		var nn = $(this).index() * ww;
		$(this).parent().parent().find(".scroll").stop().animate({scrollLeft:nn},400,"easeInOutBack");
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
	});
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
    // form submit
    $('#mailform').submit(function() {
		$('.error').hide();
        var message = $('textarea#message').val();
        if(message == '') {
            $('.error_message').show();
            $('textarea#message').focus();
            var errors = 'true';
        }
        var email = $('input#email').val();
		var email_class = $('input#email').hasClass("focus");
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
            $('.error_email').show();
            $('input#email').focus();
            var errors = 'true';
        }
		if (!email_class) {
            $('.error_email').show();
            $('input#email').focus();
            var errors = 'true';
        }
		
        var sender = $('input#sender').hasClass("focus");
        if(!sender) {
            $('.error_name').show();
            $('input#sender').focus();
            var errors = 'true';
        }		
        if(errors) {
            return false;
        } else {
            var dataString = 'sender='+ $('input#sender').val() + '&email=' + $('input#email').val() + '&message=' + message;
            $.ajax({
                type: "POST",
                url: "php/mail.php",
                data: dataString,
                success: function() {
               		pop_mail.fadeIn(300,function(){
						mask.fadeIn(300);
					});	
                }
            });
        }
        return false;
    });
	$("#color li").mouseover(function(){
		$("#wrap").removeClass("color1 color2 color3 color4 color5 color6");
		$("#wrap").addClass($(this).attr("class"));
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
	});
	
	
	
	
	
});