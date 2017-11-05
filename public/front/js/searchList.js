
$(function(){
  mui(".mui-scroll-wrapper").scroll({
    indicators:false
  });

//1.获取地址栏的参数,设置到文本框中.
//2.通过地址栏的参数,去查询商品,把商品渲染到页面中.

var data={
	proName:'',
	brandId:'',
	price:'',
	num:'',
	page:1,
	pageSize:5
}

function render(data){
	$.ajax({
type:"get",
url:"/product/queryProduct",
data:data,
success:function(data){
	// console.log(data);
	setTimeout(function(){
		$(".lt_product").html(template("tpl",data));//渲染模板
	},1000);
}
});
}
var key=tools.getParam("key");
$(".search_text").val(key);
data.proName=key;
render(data);

//点击搜索按钮
$(".search_btn").on("click",function(){
$(".lt_sort a").removeClass("now");
$(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
data.price='';
data.num='';

//获取用户输入的内容
var key=$(".search_text").val().trim();
if(key===""){
	mui.toast("请输入搜索的内容");
}
$(".lt_product").html('<div class="loading"></div>');
data.proName=key;
render(data);
});

//排序功能
$(".lt_sort_son").on("click",function(){
var $this=$(this);
var $span=$(this).find("span");
//如果父盒子已经有now这个类,则切换箭头方向
if($this.hasClass("now")){
	$span.toggleClass("fa-angle-down").toggleClass("fa-angle-up")
}else{
	$(this).addClass('now').siblings().removeClass("now");
	$(this).find('span').addClass('now').siblings().removeClass("now");
	$(".lt_sort_son span").removeClass("fa-angle-up").addClass("fa-angle-down");
}

//判断是哪个排序
var type=$this.data("type");
var value=$span.hasClass("fa-angle-down")?2:1;

data[type]=value;
render(data);

});

})
