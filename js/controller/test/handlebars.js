var source = $("#entry-template").html(); 
var template = Handlebars.compile(source); 
var data = {
    	users: [
            { name: "홍길동1", id: "aaa1" },
            { name: "홍길동2", id: "aaa2" },
            { name: "홍길동3", id: "aaa3" },
            { name: "홍길동4", id: "aaa4" },
            { name: "홍길동5", id: "aaa5" }
        ]
}; 
//커스텀 헬퍼 등록 (id를 인자로 받아서 전체 이메일 주소를 반환)
Handlebars.registerHelper('email', function (id) {
  return id + "@daum.net";
});
//핸들바 템플릿에 데이터를 바인딩해서 HTML 생성
var html = template(data);
$('#test .wrap').append(html);