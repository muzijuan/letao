/**
 * Created by Administrator on 2017/10/29 0029.
 */

$(function () {

    //使用表单校验插件
    var $form=$("#form");
    $form.bootstrapValidator({
        //2. 指定校验时的图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{
                        message:"用户名错误"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '用户密码不能为空'
                    },
                    stringLength:{
                        min:4,
                        max:12,
                        message:"用户密码必须是4-12位"
                    },
                    callback:{
                        message:"用户密码错误"
                    }
                }
            },
        }
    });



    //表单校验初始化后，就会有一个校验实例
    var validator = $form.data("bootstrapValidator");


    //2. 给表单注册一个校验成功的事件
    $form.on("success.form.bv", function (e) {
        //当校验成功的时候执行
        e.preventDefault();



        //发送ajax请求，意味着需要获取到username与password的值
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){
                    location.href = "index.html";
                }else {

                    if(data.error === 1000){
                        //使用js代码让username这个字段校验失败。
                        //第一个参数：name属性
                        //第二个参数：INVALID    VALID
                        //第三个参数：
                        validator.updateStatus("username", "INVALID", "callback");
                    }

                    if(data.error === 1001){
                        validator.updateStatus("password", "INVALID", "callback");
                    }

                }
            }
        })



    });


    //3. 表单重置功能
    $("[type='reset']").on("click", function () {
        //调用插件的重置表单的方法。
        ///获取到表单校验实例，调用了resetForm方法，重置表单。
        validator.resetForm();
    })

});