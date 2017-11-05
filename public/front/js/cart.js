$(function () {

  mui(".mui-scroll-wrapper").scroll({
    indicators:false
  });


//下拉刷新功能
mui.init({
  pullRefresh : {
    container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      auto: true,//可选,默认false.首次加载自动下拉刷新一次
      callback :function(){

      		 //渲染购物车功能
					$.ajax({
						type: "get",
						url: "/cart/queryCart",
						success: function(data) {

							//渲染购物车
							// console.log(data);

								setTimeout(function(){
									tools.checkLogin(data);

							$("#OA_task_2").html(template("tpl", {data: data}));
							mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
								},1000);

						}
					});
      }
    }
  }
});


//
// 删除功能

$("#OA_task_2").on("tap",".btn_delete",function(){
	var id=$(this).data("id");
	mui.confirm("确定删除吗?","提示",["否","是"],function(e){
		if(e.index===0){
			mui.toast("操作取消");
		}else{
			$.ajax({
				type:"get",
				url:" /cart/deleteCart",
				data:{
					id:[id]
				},
				success:function(data){
					console.log(data);
					tools.checkLogin(data);
					if(data.success){
						if(data.success){
              //让容器下拉一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
					}

				}

			})


}

 })


});



//编辑功能

$("#OA_task_2").on("tap",".btn_edit",function(){

var data=this.dataset;
var html=template("tpl2",data);
html=html.replace(/\n/g,"");
  mui.confirm(html, "编辑商品", ["确定","取消"], function (e) {
      if(e.index == 0){
        //这里面需要修改商品
        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data:{
            id:data.id,
            size:$(".lt_edit_size span.now").html(),
            num:$(".mui-numbox-input").val()
          },
          success:function (data) {
            //校验是否登录
            tools.checkLogin(data);

            if(data.success){
              //如果成功，重新下拉一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }

          }
        });


      }else{
        mui.toast("操作取消")
      }
    });
  //重新渲染mui数字框,尺码注册点击事件
mui(".mui-numbox").numbox();
$(".lt_edit_size span").on("tap",function(){
 $(this).addClass("now").siblings().removeClass("now");

})

});

//计算总金额
$("#OA_task_2").on("change",".check",function(){
	var total=0;

	$(":checked").each(function(i,e){

		total+=$(this).data("num")*$(this).data("price");

	});

$(".lt_total span").html(total);
});

})
