/**
 * Created by Administrator on 2017/10/31 0031.
 */
$(function () {
    // console.log("haha");
    var currentPage=1;
    var pageSize=5;
    function render() {
        //发送Ajax请求
        $.ajax({
           type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                // console.log(data);
                $("tbody").html(template("tpl",data));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(data.total/pageSize),
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked(a, b, c,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage=page;
                        render()
                    }
                });
            }
        })
    }
    render();


    //点击添加分类按钮调用模态框
    $(".btn_add").on("click",function () {

        $("#addModal").modal("show");
    })

    //给表单做校验
    var $form=$("#form");
    $form.bootstrapValidator({
//1.指定不校验的类型
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        //2.指定校验时的图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 3.指定校验字段
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类名称不能为空"
                    }
                }
            }
        }
    });

    // 验证通过
    $form.on("success.form.bv",function (e) {
        console.log("hah");
        e.preventDefault();
        //发送Ajax请求
        $.ajax({
           type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function(data){
               // 成功了
                console.log(data);
                if(data.success){
                    //1.关闭模态框
                    $("#addModal").modal("hide");
                    //2.重新渲染第一页
                    currentPage=1;
                    render();
                    //3.重置表单
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                }
            }
        })
    })



});