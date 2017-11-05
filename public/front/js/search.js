/**
 * Created by HUCC on 2017/11/1.
 */
mui(".mui-scroll-wrapper").scroll({
  indicators:false
});


//获取缓存中的数据,转换成数组,返回
function getHistory(){
	var search_history=localStorage.getItem("lt_search_history")||"[]";
	var arr=JSON.parse(search_history)//转换成数组
return arr;
}
function render(){
	var arr=getHistory();
	// console.log(arr);
	$(".lt_history").html(template("tpl",{arr:arr}));
}
render();

//1.清空功能
// 给"清空记录"按钮注册点击事件(由于是动态生成,所以需要事件委托)
$(".lt_history").on("click",".icon_empty",function(){
localStorage.removeItem("lt_search_history");
render();
});
//2.删除功能
    // 1.点击删除按钮(委托)

$(".lt_history").on("click",".fa-close",function(){
	var btnArray=["是","否"];
		console.log($(this));
	mui.confirm("你确定要删除这条记录吗?","警告",btnArray,function(data){
		if(data.index==0){
			var arr=getHistory();
			// console.log(arr);
			var index=$(this).data("index");

			arr.splice(index,1);
			localStorage.setItem("lt_search_history",JSON.stringify(arr));
			render();
			mui.toast("操作成功");
		}else{
			mui.toast("操作取消");
		}
	});
});




$(".search_btn").on("click",function(){
		var key=$(".search_text").val().trim();
		if(key===""){
			mui.alert("亲,侬想买啥","温馨提示")
			return;
		}

//1.先从缓存中把数组获取到
var arr=getHistory();

//2.获取拿到的key在arr中的索引,如果索引是-1,说明没
var index=arr.indexOf(key);
if(index>-1){
	arr.splice(index,1);
}
//如果数组的长度>=10,删除最后一条
if(arr.length>=10){
	arr.pop();
}
//把key存到数组的第一条
arr.unshift(key);
//存储到缓存中
localStorage.setItem("lt_search_history",JSON.stringify(arr));
//页面跳转
location.href="searchList.html?key="+key;
})

