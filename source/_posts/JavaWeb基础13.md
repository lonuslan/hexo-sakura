---
title: JavaWeb基础13
tags:
  - JavaWeb
catagories:
  - JavaWeb
abbrlink: 63776
date: 2019-06-12 23:54:34
---
### 课程回顾
1. jQuery 是一个js语言所写的框架，可以让程序员写的更少 实现的更多
2. 页面加载完成事件  $(function(){})
3. js-jq  var jq = $(js);
4. jq-js  var js = jq[0];
5. 选择器
- 基础选择器 ：  $("div")     #id      .class    div,#id     *
- 层级选择器： div span     div>span   div+span  div~span   
	.siblings("div")   .prev()  .prevAll()   .next()   .nextAll()
- 过滤选择器： div:first/last/even/odd/eq()/lt()/gt()/not()
- 内容选择器： div:has(p)/empty/parent/contains('xxx')
- 可见选择器： div:hidden/visible   .show()  .hide()   .toggle()
- 属性选择器： div[id!='xxx']
- 子元素选择器：  div:first-child  div:last-child div:nth-child(n) 1
- 表单选择器： :input   :password  :radio  :checkbox  :checked  input:checked  :selected
6. 创建元素   var d = $("<div></div>");
7. 添加元素   父元素.prepend()    父元素.append();
8. 插入元素   兄弟元素.before()     兄弟元素.after();
9. 删除元素   被删除的元素对象.remove();
10. 文本相关    .text()      .text("xxxx");
11. html相关   .html()      .html("<xxx>sdfsdf</xxx>");
12. 样式相关   .css("color")    .css("color","red");  .css({"width":"100px","height":"200px"});
13. 属性相关   .attr("class")     attr("class","abc");
14. 获取元素的子元素们    .children()
15. 获取元素的父元素    .parent()

### jQuery事件相关
1. 常见事件
- 鼠标事件： 点击事件 click  鼠标移入事件mouseover  鼠标移出mouseout 鼠标按下mousedown  鼠标抬起mouseup  鼠标移动mousemove
- 键盘事件：  键盘按下 keydown   键盘抬起 keyup
- 状态改变事件：  页面加载完成$(function(){})  获取焦点focus 失去焦点blur 表单提交submit  值改变change  窗口尺寸改变resize
2. 事件模拟 
	元素对象.trigger("事件名");
3. 鼠标移入移出事件合并
	元素对象.hover(鼠标移入执行方法,鼠标移出执行方法);
### 动画相关
			if(this.value=="隐藏"){
				$("img").hide(3000,function(){
					alert('动画做完了');
				});
			}else if(this.value=="显示"){
				$("img").show(2000,function(){
					alert('xxx');
				});
			}else if(this.value=="淡出"){
				 $("img").fadeOut(1000);
			}else if(this.value=="淡入"){
				 $("img").fadeIn(2000);
			}else if(this.value=="上滑"){
				 $("img").slideUp(2000);
			}else if(this.value=="下滑"){
				 $("img").slideDown(2000);
			}else{//自定义
				$("img").animate({"left":"200px"},1000)
					.animate({"top":"200px"},1000)
					.animate({"left":"0px"},1000)
					.animate({"top":"0px"},1000)
					.animate({"width":"200px"},1000)
					.animate({"width":"100px"},1000)
					.fadeOut(3000,function(){
						$("img").remove();
					});
			}
			
		});
	});

### jQuery课程回顾
1. 写的更少 实现的更多
2. js-jq   var jq = $(js)
3. jq-js   var js = jq[0]
4. 选择器
- 基础选择器    div   #id   .class    div,#id     *
- 层级选择器    div span  div>span  div+span    div~span  
	.siblings()     .prev()   .prevAll()   .next()   .nextAll()
- 过滤选择器  div:first/last/even/odd/eq()/lt()/gt()/not()
- 内容选择器  div:has(p)/empty/parent/contains('xxx')
- 可见选择器  div:hidden/visible    .show()  .hide()   .toggle()
- 属性选择器  div[id!='xxx']
- 子元素选择器  div:first-child/last-child/nth-child(n)
- 表单选择器  :input  :radio   :password  :checkbox  :checked  input:checked   :selected
5. 创建元素   var d = $("<div></div>");
6. 添加    .prepend()     .append()
7. 插入    兄弟.before()    兄弟.after()
8. 删除   元素.remove();
9. 文本相关   .text()
10. html相关  .html()
11. 样式    .css("color")   .css("color","red");  .css({"":"","":""})
12. 属性  .attr("属性名","值")
13. 上级元素 parent（）   子元素们 .children()
14. 事件 
- 去掉on
- 事件模拟   元素.trigger("事件名");
- 移入移出合并   元素.hover(function(){},function(){});
15. 动画
	隐藏hide(3000) 显示 show()   淡出fadeOut()  淡入fadeIn()  上滑slideUp()  下滑slideDown()   自定义animate({},时间);

#### 雪花作业
1. 雪花尺寸随机20-40
2. 雪花越小移动速度越快
3. 雪花落地后一秒融化
（淡出 淡出后删除）

	  