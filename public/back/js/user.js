/**
 * Created by Administrator on 2017/10/30 0030.
 */
$(function () {
    // 发送ajax 请求后台数据
    var currentPage=1;
    var pageSize=5;
    function render() {
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                console.log(data);
                var html=template("tpl",data);
                $("tbody").html(html);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(data.total/pageSize),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage=page;
                        render();
                    }
                });
            }
        })
    }
render();
    //点击启用或者禁用按钮,弹出模态框
    //事件委托
    $("tbody").on("click",".btn",function () {
        $("#userModal").modal("show");
        var id=$(this).parent().data("id");
        var isDelete=$(this).parent().data("isDelete");
        isDelete=isDelete===1?0:1;
        $(".btn_confirm").off().on("click",function () {
            //发送ajax请求
           $.ajax({
              type:"post" ,
               url:"/user/updateUser",
               data:{
                   id:id,
                   isDelete:isDelete
               },
               success:function (data) {
                   $("#userModal").modal("hide");
                   render();
               }
           })
        })

    })



})