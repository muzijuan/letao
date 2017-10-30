
//校验用户是否登录
if(location.href.indexOf("login.html")<0){
    $.ajax({
        type:"get",
        url:"/employee/employeeLogin",
        success:function (data) {
            if(data.error===400){
                location.href="login.html";
            }
        }
    });
}
$(document).ajaxStart(function () {
      NProgress.start();
});
$(document).ajaxStop(function () {
   setTimeout(function () {
       NProgress.done();
   },500);
});

// 点击分类管理，显示隐藏的二级标题
$(".child").prev().on("click",function () {
    $(this).next().slideToggle();
//    显示和隐藏的切换
})

//显示/隐藏侧边栏
$(".icon_menu").on("click",function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
})

//公用的退出功能
$(".icon_logout").on("click",function () {
    $('#logoutModal').modal("show");
});
$(".icon_logout").on("click",function () {
    $('#logoutModal').modal("show");
})
//点击确定退出登录,提交Ajax请求,清除session
$(".btn_logout").on("click",function () {
    //发送一个ajax请求，告诉服务器我要退出了，服务器会清空你的session
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function (data) {
            if(data.success){
                window.location.href = "login.html";
            }
        }
    })
})






