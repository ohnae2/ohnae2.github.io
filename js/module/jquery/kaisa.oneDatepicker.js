/*date Picker
 * 
 * 
div.datePicker li,
div.datePicker span,
div.datePicker strong {transition:0s all linear;} 
div.datePicker {width:100%; overflow:hidden; padding:15px; border:1px solid #ddd; text-align:center; line-height:40px; position:relative;}
div.datePicker h5 {text-align:center; font-size:15px; padding:0px 0 10px 0;}
div.datePicker ol,
div.datePicker ul {width:100%; font-size:0; line-height:0; text-align:left; margin-left:0.6%; padding:0;}
div.datePicker li {width:14.2%; display:inline-block; height:40px; border:1px solid #e9e9e9; text-align:center; vertical-align:top; margin:-1px 0 0 -1px; padding:0; font-size:12px; line-height:40px;}
div.datePicker li:nth-child(7n) {color:blue;}
div.datePicker li:nth-child(7n+1) {color:red;}
div.datePicker li.today {font-weight:bold; background:#fcfcfc;}
div.datePicker li.on {font-weight:bold; background:#777; color:#fff;}
div.datePicker ol li {background:#f9f9f9;}
div.datePicker ul {height:240px;}
div.datePicker ul li.day {cursor:pointer;}
div.datePicker ul li.off {color:#ccc; cursor:default;}
div.datePicker .prev {position:absolute; left:15px; width:40px;height:40px;top:15px; background:url(/img/common/sp.png) no-repeat -80px 0; cursor:pointer; overflow:hidden; text-indent:-9999px;}
div.datePicker .next {position:absolute; right:15px; width:40px;height:40px;top:15px; background:url(/img/common/sp.png) no-repeat -120px 0; cursor:pointer; overflow:hidden; text-indent:-9999px;}


<h2>one-datepicker(jquery - with : getParam/format)</h2>
<div class="datePicker" id="datePicker">
	<span class="prev">Prev</span>
	<span class="next">Next</span>
	<h5><strong class="year"></strong> 년 <strong class="month"></strong> 월</h5>
	<ol>
		<li>일</li>
		<li>월</li>
		<li>화</li>
		<li>수</li>
		<li>목</li>
		<li>금</li>
		<li>토</li>
	</ol>
	<ul></ul>
</div>
<br />
<input readonly="readonly" tabindex="1" autocomplete="off" type="text" name="EXDATE">
 * 
 * 
 * 
 * */
Date.prototype.format = function(f) {
	if (!this.valueOf()) return " ";
	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;
	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).addZero(2);
			case "MM": return (d.getMonth() + 1).addZero(2);
			case "dd": return d.getDate().addZero(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().addZero(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).addZero(2);
			case "mm": return d.getMinutes().addZero(2);
			case "ss": return d.getSeconds().addZero(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};
function getParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.addZero = function(len){return "0".string(len - this.length) + this;};
Number.prototype.addZero = function(len){return this.toString().addZero(len);};
var datePicker = function(option){
	var base = {
		el : $('#datePicker'),
		today : new Date(),
		target : null,
		date : new Date(),
		firstDay : function(year, month){ 
			return new Date(year, month, 1).getDay();
		},
		lastDay : function(year, month){
			return new Date(year, month + 1, 0).getDate();
		},
		draw : function(){
			var self = this;
			self.el.find('h5 .year').html(self.date.format('yyyy'));
			self.el.find('h5 .month').html(self.date.format('MM'));
			var firstMonth = false;
			if(self.date.getMonth() == self.today.getMonth()){
				self.el.find('.prev').hide();
				firstMonth = true;
			}else{
				self.el.find('.prev').show();
			}			
			if(self.date.getMonth() == 11){
				self.el.find('.next').hide();
			}else{
				self.el.find('.next').show();
			}
			var str = '';
			for(var i = 1; i <= self.firstDay(self.date.getFullYear(),self.date.getMonth()); i ++) {
				str += '<li></li>';
			}
			for(var i = 1; i <= self.lastDay(self.date.getFullYear(),self.date.getMonth()); i ++) {
				if(i == self.date.getDate()){
					str += '<li class="day on">'+i+'</li>';
				}else{
					str += '<li class="day">'+i+'</li>';
				}
			}
			self.el.find('ul').html(str).find('li').on('click',function(){
				var date = $(this).text();
				if($(this).hasClass('off')){
					return false;
				}
				if(date){
					option.date.setDate(date);
					self.el.find('ul li').removeClass('on');
					$(this).addClass('on');
					self.val();
				}
			});
			self.val();
		},
		val : function(){
			this.target.val(this.date.format('yyyy-MM-dd'));
		}
	}
	option = $.extend(base, option);
	option.draw();
	option.el.find('.prev').on('click',function(){
		option.date.setMonth(option.date.getMonth()-1);
		option.draw();
	});
	option.el.find('.next').on('click',function(){
		option.date.setMonth(option.date.getMonth()+1);
		option.draw();
	});
}
$(function(){
	datePicker({
		target : $('input[name="EXDATE"]')
	});
});