---
title: JavaWeb基础11
tags:
  - JavaWeb
catagories:
  - JavaWeb
abbrlink: 14497
date: 2019-06-12 23:54:18
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

