
$(function(){
 mui(".mui-scroll-wrapper").scroll({
    indicators:true
  })
// mui(".mui-scroll-wrapper").scroll({
// 	deceleration: 0.0005
// });

//1.获取id,渲染商品详情界面
var id=tools.getParam("productId");
$.ajax({
type:"get",
url:"/product/queryProductDetail",
data:{
	id:id
},
success:function(data){
	// console.log(data);
	var t=data.size.split("-");
	var sizeArray=[];
	for(var i=t[0];i<=t[1];i++){
		sizeArray.push(i);
	}
	data.sizeArray=sizeArray;
	$(".mui-scroll").html( template("tpl", data) );

mui('.mui-slider').slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      mui(".mui-numbox").numbox();
    }
});


//2.尺码选择功能
$(".mui-scroll").on("click",".size",function(){
$(this).addClass("now").siblings().removeClass("now");
});

//3.添加到购物车功能
    //获取数据
$(".btn_add_cart").on("click",function(){
	var size=$(".size.now").html();
	var num=$('.mui-numbox-input').val();
if(!size){
	mui.toast("请选择尺码");
	return;
}
		//再发送ajax请求
		$.ajax({
			type:"post",
				url:" /cart/addCart",
				data:{
					productId:id,
					num:num,
					size:size
				},
				success:function(data){
					if(data.success){
						mui.toast("加入购物车成功啦")
					}
					if(data.error===400){
						//跳转到login页面
						location.href = "login.html?retUrl="+location.href;
					}
				}
				});
		})
})




