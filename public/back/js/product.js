/**
 * Created by Administrator on 2017/11/1 0001.
 */
$(function () {
     var currentPage=1;
      var pageSize=5;
    var imgArray=[];
    function render() {
        $.ajax({
           type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                // console.log(data);
                $("tbody").html(template("tpl",data));
                
            $("#paginator").bootstrapPaginator({

                bootstrapMajorVersion:3,
                currentPage:currentPage,
                totalPages:Math.ceil(data.total/pageSize),
                size:"small",
                onPageClicked(a,b,c,page){
                    currentPage=page;
                    render();
                }
            });
            }
        });
    }
render();

//点击添加按钮,显示模态框
$(".btn_add").on("click",function () {

    $("#addModal").modal("show");
// 渲染二级分类列表
$.ajax({
    type:"get",
    url:"/category/querySecondCategoryPaging",
    data:{
        page:currentPage,
        pagesize:pageSize,
    },
    success:function (data) {
        console.log(data);
        $(".dropdown-menu").html(template("tpl2",data));
    }
});

});
  //给dropdown 下所有的a标签注册点击事件
    $(".dropdown-menu").on("click","a",function () {
        //获取a标签的文本,设置给dropdown-text
        $(".dropdown-text").text($(this).text());
        $("#brandId").val($(this).data("id"));
        $form.data("bootstrapValidator").updateStatus("brandId","VALID");
    });
    // 初始化产品图片上传
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            // var progress = parseInt(data.loaded / data.total * 100, 10);
            // $('#progress .bar').css('width', progress + '%');
            $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">')
       //数组中存储了上传的所有图片
       imgArray.push(data.result);
       //判断数组的长度,如果长度是3,就可以修改校验状态
       
       if(imgArray.length===3){
        $form.data("bootStrapValidator").updateStatus("productLogo","VALID");
       }else{
        $form.data("bootStrapValidator").updateStatus("productLogo","VALID");
       }

        }
    });

    var $form=$("#form");
    $form.bootstrapValidator({
        exclude:[],
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"请输入一个大于0的"
                    }

                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺码"
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入正确的尺码(30-50)"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入正确的商品原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的折扣价"
                    }
                }
            },
            productLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传3张商品图片"
                    }
                }
            }

        }
    });

    // $form.on("success.form.bv",function(e){
    //     e.preventDefault();
    //     var 
    // }


});
