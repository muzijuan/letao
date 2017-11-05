/**
 * Created by Administrator on 2017/10/31 0031.
 */
$(function () {
    var currentPage=1;
    var pageSize=5;
    //渲染数据并分页
    function render() {
       $.ajax({
         type:"get",
           url:"/category/querySecondCategoryPaging",
           data:{
                page:currentPage,
                pageSize:pageSize,
           },
           success:function (data) {
                //渲染数据
               // console.log(data);
               $("tbody").html(template("tpl",data));
              //分页
               $("#paginator").bootstrapPaginator({
                   bootstrapMajorVersion: 3,
                   currentPage: currentPage,
                   totalPages: Math.ceil(data.total / pageSize),
                   size: "small",
                   onPageClicked(a, b, c, page){
                       currentPage = page;
                       render();
                   }
               });
        }

       })

    }
  render();
    
   // 点击添加按钮显示模态框
    $(".btn_add").on("click",function () {
        $("#addModal").modal("show");
        //获得一级分类的数据
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function (data) {
                console.log(data);
                $(".dropdown-menu").html(template("tpl2",data))
            }
        })
    });
    //点击下拉框,让某个选中
    $(".dropdown-menu").on("click","a",function () {
        $(".dropdown-text").text($(this).text());
        $("#categoryId").val($(this).data("id"));
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })
    //初始文件上传
    $("#fileupload").fileupload({
        dataType:"json",
        //当文件上传成功时，会执行这个回调函数
        done:function (e, data) {
            //获取文件上传结果
            //给默认图片设置src
            $(".img_box img").attr("src", data.result.picAddr);
            $("#brandLogo").val( data.result.picAddr );
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

 var $form = $("#form");
  $form.bootstrapValidator({
    //默认不校验的配置
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }
  });
   $form.on("success.form.bv",function(e){
       e.preventDefault();
       $.ajax({
           type:"post",
           url:"/category/addSecondCategory",
           data:$form.serialize(),
           success:function (data) {
               if(data.success){
                   $("#addModal").modal("hide");
                   currentPage=1;
                   render();
                   //3.重置表单
                   $form[0].reset();
                   $form.data("bootstrapValidator").resetForm();
                   $(".dropdown-text").text("请选择一级分类");
                   $(".img_box img").attr("src","images/none.png");
               }
           }
       })


   })

});
