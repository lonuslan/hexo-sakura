---
title: JavaWeb基础12
tags:
  - JavaWeb
catagories:
  - JavaWeb
abbrlink: 14817
date: 2019-06-12 23:54:26
---
### 课程回顾
1. 查找元素
- 通过id查找
	var d = document.getElementById("id");
- 通过标签名查找
	var arr = document.getElementsByTagName("标签名");
- 通过class查找
	var arr = document.getElementsByClassName("class");
- 通过name查找
	var arr = document.getElementsByName("name");
- 获取body	
	document.body;
2. 创建元素
	var div  = document.createElement("div");
3. 添加元素
	父元素.appendChild(新元素);
4. 插入元素
	父元素.insertBefore(新元素,弟弟元素);
5. 删除元素
	父元素.removeChild(被删除的元素);
6. 获取和修改元素的样式
	元素对象.style.样式名称
	元素对象.style.样式名称 = "值";
7. 获取和修改元素的文本内容
	元素对象.innerText
	元素对象.innerText = "xxx";
8. 获取和修改元素的HTML内容
	元素对象.innerHTML
	元素对象.innerHTML = "<div>xxx</div>";

### 获得窗口尺寸
- 宽度：
	document.body.parentElement.clientWidth
- 高度：
	document.body.parentElement.clientHeight

### js中事件相关内容
onclick  onblur  onfocus  onload  onsubmit onchange onmouseover 
- 什么是事件： 指一些特定的时间点，事件包括：状态改变事件、鼠标事件、键盘事件
#### 事件分类
- 鼠标事件：点击事件onclick   鼠标移入事件onmouseover  鼠标移出事件onmouseout  鼠标按下事件onmousedown  鼠标抬起onmouseup 鼠标移动onmousemove  
	可以通过event.clientX/Y 获取鼠标的坐标（坐标相对于窗口）
- 键盘事件： onkeydown键盘按下事件    onkeyup 键盘抬起事件
- 状态改变事件： onload页面加载完成事件 onchange值发生改变事件 onblur失去焦点事件  onfocus获取焦点事件 onsubmit表单提交事件  onresize窗口尺寸改变事件 
#### 事件的绑定
1. 在标签内部添加事件属性
	在事件方法中this代表的是window对象
2. 动态绑定事件，通过js代码给元素添加事件
	在事件方法中的this代表的是事件源对象
 
#### 事件的取消
- 在事件中执行return false; 可以取消掉当前的事件
#### 事件对象event
- 该对象保存着和事件相关的信息
1. 鼠标事件中保存鼠标点击的坐标  event.clientX/clientY;
2. 键盘事件中保存着键盘的编码  event.keyCode  String.fromCharCode(65);
3. 在任何事件中都可以通过event对象得到事件源
	var obj = event.target || event.srcElement; 
#### 事件传递（事件冒泡儿） 
- 如果同一个范围有多个元素的事件需要响应则响应顺类似气泡儿，从最底层元素往上级元素传递 
- 如果一个范围需要有多个元素添加相同的事件 则可以把事件添加到这几个元素共同的上级元素上 
	obj.nodeName 得到元素名

### jQuery
- 什么jQuery： 
1. 是一个js框架
2. 可以让程序员写的更少，但是实现的更多
3. jQuery本身就是通过js语言写的一个 js文件
4. 作用就是为了简化js代码
5. 可以像css一样获取页面中的元素
6. 可以像css一样批量修改元素样式
7. 可以解决部分兼容性问题
### 引入jQuery框架
- 由于jQuery就是一个普通的js文件所以直接用script标签的src属性引入即可
### js对象和jq对象互相转换
1. js对象转jq对象
	var jq = $(js);
2. jq对象转js对象
- jq对象实际上就是数组， 对数组进行了扩展
	var js = jq[0];
### 选择器
#### 基础选择器
1. 标签名选择器   $("div")
2. id选择器		$("#id")
3. 类选择器		$(".class")
4. 分组选择器    $("div,#id,.class")
5. 任意元素选择器   $("*")
#### 层级选择器
1. $("div span") 匹配div里面所有的span元素
2. $("div>span") 匹配div里面所有的span子元素
3. $("div+span") 匹配div的弟弟元素span
4. $("div~span") 匹配div的弟弟们span元素
- 层级方法
1. 获取元素的所有兄弟元素
	$("#abc").siblings(?"div");
2. 获取元素的哥哥元素
	$("#abc").prev(?"div");
3. 获取元素的哥哥们元素
	$("#abc").prevAll(?"div");
4. 获取元素的弟弟元素
	$("#abc").next(?"div");
5. 获取元素的弟弟们元素
	$("#abc").nextAll(?"div");  
### 过滤选择器
1. $("div:first")  匹配第一个div元素
2. $("div:last") 匹配最后一个div元素
3. $("div:even") 匹配所有div中下标为偶数的div元素  从0开始
4. $("div:odd") 匹配所有div中下标为奇数的div元素 从0开始
5. $("div:eq(n)") 匹配下标为n的div元素 
6. $("div:lt(n)") 匹配下标小于n的div元素
7. $("div:gt(n)") 匹配下标大于n的div元素
8. $("div:not(.abc)") 匹配class值不为abc的所有div
### 内容选择器
1. $("div:has(p)")  匹配所有包含p子元素的div
2. $("div:empty") 匹配空的div
3. $("div:parent") 匹配非空的div
4. $("div:contains('xxx')") 匹配包含xxx文本的div
### 可见选择器
1. $("div:hidden") 匹配所有隐藏的div
2. $("div:visible") 匹配所有显示的div
- 显示隐藏相关的方法
	1. 让隐藏元素显示
		$("div:hidden").show();
	2. 让显示的元素隐藏
		$("div:visible").hide();
	3. 隐藏显示切换
		$("#abc").toggle();
### 属性选择器
1. $("div[id]") 匹配包含id属性的div元素
2. $("div[id='xxx']") 匹配id值为xxx的div元素
3. $("div[id!='xxx']") 匹配id值不为xxx的div元素
### 子元素选择器
1. $("div:first-child") 匹配是第一个子元素的div元素
2. $("div:last-child")  匹配是最后一个子元素的div元素
3. $("div:nth-child(n)") 匹配是第n个子元素的div元素  从1开始
### 表单选择器
1. $(":input") 匹配表单中的所有控件
2. $(":password") 匹配密码框
3. $(":radio") 匹配单选
4. $(":checkbox") 匹配多选
5. $(":checked") 匹配所有选中的单选、多选、下拉选
6. $("input:checked") 匹配所有选中的单选、多选
7. $(":selected") 匹配所有选中的下拉选
#### 选择器回顾
1. 基础选择器
- 标签名      div
- id         #id
- 类         .class
- 分组      div,span
- 任意元素   *
2. 层级选择器
- div span
- div>span
- div+span
- div~span
- .siblings("div")
- .prev()
- .prevAll()
- .next()
- .nextAll()
3. 过滤选择器
- div:first
- div:last
- div:even
- div:odd
- div:eq()
- div:lt()
- div:gt()
- div:not()
4. 内容选择器
- div:has(span)
- div:empty
- div:parent
- div:contains('xxx')
5. 可见选择器
- div：visible
- div:hidden
- .show()
- .hide()
- .toggle()
6. 属性选择器
- div[id]
- div[id='xxx']
- div[id!='xxx']
7. 子元素选择器
- div:first-child
- div:last-child
- div:nth-child(n) 从1开始
8. 表单选择器
- :input
- :password
- :radio
- :checkbox
- :checked
- input:checked
- :selected

### 创建和添加元素
1. 创建元素对象
	var d = $("<div id='d1' class='c1'>abc</div>");
2. 添加元素
	父元素.append(d);  //添加到最后
	父元素.prepend(d); //添加最前面
#### 插入元素
	js:父元素.insertBefore(新元素,弟弟元素);
	兄弟元素.before(新元素);  添加到兄弟元素的前面
	兄弟元素.after(新元素);  添加到兄弟元素的后面
#### 删除元素
	js： 父元素.removeChild(被删除的元素);
	
	被删除的元素.remove();
#### 获取和修改元素的文本内容
	元素对象.text(); //获取
	元素对象.text("abc"); //修改
#### 获取和修改元素的html内容
	元素对象.html();//获取
	元素对象.html("<h1>xxx</h1>"); //修改
#### 获取和修改元素的css样式
	元素对象.css("color"); //获取color样式的值
	元素对象.css("color","red"); //修改
	元素对象.css({"width":"100px","height":"200px"});
#### 获取和修改元素的属性    attr = attribute(属性)
	元素对象.attr("id"); 获取元素的id属性值
	元素对象.attr("id","abc"); 设置id值为abc

### 课程回顾
1. jQuery  用于简化js代码
2. 引入方式 就是引入普通js文件的方式
3. 页面加载完成事件
	$(function(){}) 
4. js对象和jq对象互相转换
- js转jq    var jq = $(js);
- jq转js     var js = jq[0];
5. 选择器
- 基础选择器
	1.  div
	2.  #id
	3.  .class
	4.  div,span,#id
	5.  *
- 层级选择器
	1. div span
	2. div>span
	3. div+span
	4. div~span
	-层级方法
	1.   .siblings()
	2.   .prev()
	3.   .prevAll()
	4.   .next()
	5.   .nextAll()
	6.   .children()
	7.   .parent()
- 过滤选择器
	1. div:first
	2. div:last
	3. div:even
	4. div:odd
	5. div:eq()
	6. div:lt()
	7. div:gt()
	8. div:not(.one)
- 内容选择器
	1. div:has(p)
	2. div:empty
	3. div:parent
	4. div:contains('xxx')
- 可见选择器
	1. div:hidden
	2. div:visible
	-方法：
	1.  .show()
	2.  .hide()
	3.  .toggle()
- 属性选择器
	1. div[id]
	2. div[id='xx']
	3. div[id!='xx']
- 子元素选择器
	1. div:first-child
	2. div:last-child
	3. div:nth-child(n)  n从1开始
- 表单选择器
	1.  :input
	2.  :password
	3.  :radio
	4.  :checkbox
	5.  :checked
	6.  input:checked
	7.  :selected

6. 创建元素
	var d = $("<div id='xxx'>xxxx</div>");
7. 添加 
	父元素.append(d); 最后
	父元素.prepend(d); 最前面
8. 插入
	兄弟元素.before(d);
	兄弟元素.after(d);
9. 删除
	元素.remove();
10. 文本相关
	 div.text()
11. html相关
	div.html();
12. css相关	
	div.css("color","red");
	div.css({"":"","":""});
13. 属性相关
	div.attr("id","xxx");


