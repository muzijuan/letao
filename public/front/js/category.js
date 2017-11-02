
//开启左侧区域滚动

var sc = mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,
  indicators:false
});
//渲染一级分类
$.ajax({
type:"get",
url:"/category/queryTopCategory",
success:function(data){
	console.log(data);
	$(".aside").html(template("tpl",data));

//一级渲染完成后,渲染第一个一级分类对应的二级分类

renderSecond(data.rows[0].id);
}

});


//渲染二级分类的方法
//参数:一级分类的id
function renderSecond(id){
$.ajax({
	type:"get",
	 url:"/category/querySecondCategory",
	 data:{
	 	id:id
	 },
	 success:function(data){
	 		//渲染二级分类
	 		console.log(data);
	 		 $(".lt_category_r ul").html(template("tpl2", data) );

	 }
});
}

$(".aside").on("click","li",function(){
$(this).addClass("now").siblings().removeClass("now");
var id=$(this).data("id");
renderSecond(id);
sc[1].scrollTo(0,0,500);



})
