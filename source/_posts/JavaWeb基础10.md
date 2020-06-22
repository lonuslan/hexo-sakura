---
title: JavaWeb基础10
tags:
  - JavaWeb
catagories:
  - JavaWeb
abbrlink: 63584
date: 2019-06-12 23:54:08
---
### 课程回顾
1. 表单提交事件 'onsubmit'
2. 自定义对象 
		function Person(name,age){
			this.age = age;
			this.name=name;
			this.run = function(){}
		}

		var p = new Person();
		p.run();
		
		var p2 = {
			"name":"xxx",
			"age":18,
			"run":function(){}
		}
3. `DHTML` 动态的`HTML`   `html+css+javascript = DHTML`
4. `DHTML`包括：BOM 浏览器对象模型 `DOM` 文档对象模型
5. `BOM`里面的`window`对象  访问时可以省略`window`.
6. `window`常用的方法
		parseInt/Float()  alert()  confirm()  prompt()  isNaN()
7. `window`里面常用的属性
* location.href 获取和修改浏览器的访问地址
* location.reload()  刷新
8. history当前窗口的历史
* history.back()
* history.forward();
* history.go(n) 
* history.length; 历史页面数量
9. 'screen'屏幕
* screen.width/height  屏幕分辨率
* screen.availWidth/Height  可用分辨率
10. `navigator` 导航、帮助
* navigator.userAgent 得到浏览器的版本信息
11. `window`相关的事件
* 窗口点击事件  onclick
* 页面加载完成事件 onload
* 获取焦点事件  onfocus
* 失去焦点事件  onblur
12. eval方法 可以将字符串以js代码形式执行 
13. 通过js代码给元素添加样式   元素对象.style.样式名称="值";
14. 定时器  `setInterval`(方法,时间间隔);
15. 隐藏图片的两种方式
* display：none 脱离文档流
* visibility：hidden、visible  不脱离文档流
 
#### 第一版轮播图步骤
1. 通过'css'样式让图片全部隐藏 
2. 页面加载完成时取出第一张图片让其显示
* 添加'onload'事件 在事件里面获取所有的图片数组，从数组中取出下标为0的图片，设置`display`属性为`inline-block`让其显示 
3. 开启定时器 每隔1秒 换下一张显示 
* 创建每隔一秒执行的定时器，声明一个全局的变量x用于自增，在定时器里面让x自增并且对其取3的余数  得到的值为图片显示的下标，
* 得到所有图片的数组，遍历数组，如果数组下标为上一步得到的值则设置图片的display样式为inline-block 反之则设置为none

### 停止定时器
		var timer = setInterval(function(){},1000);
		clearInterval(timer);

### 第二版轮播图步骤：
1. 搭建页面，通过css给图片和div设置相同的宽高
2. 修改图片的定位为绝对定位，并且在上级div里添加相对定位
3. 在页面加载完成的时候得到所有的图片数组，遍历数组，让数组里面图片的`left`值为i*200
4. 创建1秒执行100次的定时器 在定时器里面获取所有图片数组，遍历数组，得到当前遍历图片的left值 让其-=2 把新的值再次给到图片
5. 在移动图片时 如果left值`<=-200`时 让`left`值=400
6. 让上级div超出范围不显示
7. 让定时器通过一个moveTimer记录 ，在判断left值<=-200时让定时器停止 
8. 把移动一张 图片定时器的所有代码封装到一个方法中，再开启另外一个定时器，每隔2秒调用次方法
9. 给div添加鼠标悬停事件 悬停时调用`stop方法` 在此方法中停止2秒执行的定时器
10. 给div添加鼠标移出事件 调用`start方法` 在方法中再次开启2秒执行的定时器。
11. 当页面失去焦点时调用 `stop方法`
12. 当页面获取焦点时调用 `start方法` 
13. 在`start方法`中调用`stop方法`为了避免重复开启定时器  

#### 倒计时练习步骤：
1. 给按钮添加点击事件
2. 在事件方法中获取时分秒 然后声明一个全局变量total 值为小时*3600+分钟*60+秒
3. 开启定时器每隔一秒执行
4. 定时器里面让total--
5. 减完之后 通过total除3600 取整得到小时
6. 通过total%3600再除60取整得到分钟
7. 通过total%60 得到秒
8. 最后把得到的时分秒拼接到一起显示到h2里面

### 只执行一次的定时器
* setTimeout(function(){},时间);

### DOM 文档对象模型
#### 查找元素
1. 通过id获取页面元素
	- var d = document.getElementById("d1");
2. 通过标签名获取元素
	- var arr = document.getelementsbytagname("div");
3. 通过class属性值查找元素
	- var arr = document.getElementsByClassName("class");
4. 通过name属性值查找元素
	- var arr = document.getElementsByName("name");
5. 获取body
	- document.body
#### 创建元素对象
	-  var d = document.createElement("div");
#### 添加元素
	- 父元素.appendChild(元素对象);
#### 插入元素
	- 父元素.insertBefore(新元素,弟弟元素);

#### 删除元素
	- 父元素.removeChild(被删除的元素);

#### 代码介绍
	1. low版轮播图
	2. 高级点点的轮播图
	3. 倒计时练习
	4. 通过name和通过class获取元素
	5. 创建、添加、插入元素 删除
	6. 北京上海广州练习

