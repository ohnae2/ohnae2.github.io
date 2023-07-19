var $toggleFormText = {
	scan : function(o){
		o.find("input").each(function(){
			if(this.value == this.title){
				$(this).removeClass('end');
				this.value = this.title;
			}
			if(this.value == ''){
				$(this).removeClass('end');
				this.value = this.title;
			}
		});
		o.find("input").focus(function(){
			if(this.value == this.title){
				$(this).addClass('end');
				this.value = '';
			}
		});
		o.find("input").blur(function(){
			if(this.value == ''){
				$(this).removeClass('end');
				this.value = this.title;
			} else { 
				$(this).addClass('end');
			}
		});
	},
	toString : function(){
		return "toggleFormText";
	}
};
$(window).load(function(){
	var spx = 500;
	var ani = {
		main : function(){
			$("#wrap").fadeIn(spx,function(){
				$("#main-visual").fadeIn(spx,function(){
					$("#main").animate({"left":712},spx,"easeInOutExpo");
				});
			});
		},
		main_out : function(){			
			$("#main").animate({"left":1312},spx,"easeInOutExpo",function(){
				$("#main-visual").fadeOut(spx,function(){
					$("#sub").fadeIn(spx);					
				});
			});
		},
		next : function(){
			$("#sub1").animate({"left":-1280},spx,"easeInOutExpo",function(){
				$("#sub2").animate({"left":0},spx,"easeInOutExpo");
			});			
		},
		pre : function(){			
			$("#sub2").animate({"left":1280},spx,"easeInOutExpo",function(){
				$("#sub1").animate({"left":0},spx,"easeInOutExpo");
			});
		}
	}	
	$toggleFormText.scan($("body"));	
	$("#load").fadeOut(1000,function(){
		ani.main();
	});
	$(".btn-abb").click(function(){
		$("#sub").fadeOut(spx,function(){
			ani.main();
		});		
	});
	$("#pop-alert .btn").click(function(){
		$("#pop-alert").fadeOut(spx,function(){
			$("#mask").fadeOut(spx);
		});
	});
	$(".btn-ein").click(function(){
		$("#mask").fadeIn(spx,function(){
			$("#pop-alert").fadeIn(spx);
		});		
	});
	$("#main .btn").click(function(){
		ani.main_out();
	});
	$("#sub .btn-next").click(function(){
		ani.next();
	});
	$("#sub .btn-pre").click(function(){
		ani.pre();
	});			
	$(".radio").hover(function(){		
		$(this).addClass("focus");
	},function(){
		$(this).removeClass("focus");
	});
	$(".radio,.check").click(function(){
		$(this).toggleClass("select");
	});
	$(".selet-ly .arrow").click(function(){
		$(this).parent().toggleClass("open");
	});	
});	