---
title: Ajax基础
tags:
  - ajax
catagories:
  - ajax
abbrlink: 26325
date: 2019-06-12 23:51:58
---
## Ajax基础

### 1. 服务器端的响应方式

目前，服务器端向客户端响应的方式主要是转发或重定向，其中，转发的做法是不推荐的，因为转发是发生在服务器内部的行为，也就意味着服务器端完成了界面显示的所有工作，例如界面的布局、界面中有哪些内容被呈现等，在现今客户端种类比较多样化的情况下，其实，服务器端并不适合处理界面，例如把某个界面直接呈现在Andriod手机端APP中，或呈现在iOS手机端APP中，是极为不合适的，因为手机的屏幕尺寸是相对更小的，另外，同理，还有各种平板电脑等其他智能硬件，不可能把某个页面不作任何调整就直接显示在完全不相同的各种客户端中！这样的做的缺陷主要在于：屏幕大小不一，可能不适合显示大量的内容；一次请求内容过多，产生的各种消耗更大，却不一定有是价值的；最终，导致的用户体验可能不够友好！

现在，主流的做法是：服务器端只负责响应操作结果与对应的数据，完全不处理界面！例如，当用户尝试注册时，服务器端会完成整个注册过程，包括数据的验证、验证通过后写入数据库等，全部完成后，只会向客户端响应必要的少量数据，例如使用1表示操作成功，用0表示操作失败，客户端最终收到的只有1或0这样的数据，然后，不同的客户端根据自身的客户端技术进行界面的处理！

### 2. 关于@ResponseBody注解

可以在处理请求的方法之前添加`@ResponseBody`，表示处理完此次请求后，将向客户端**响应正文**，而不是转发或重定向，同时，处理请求的方法的返回值也就是响应的正文内容！

	@RequestMapping("handle_reg.do")
	@ResponseBody
	public String handleReg(User user) {
		userMapper.addnew(user);
		return "success";
	}

### 3. 响应正文的格式

当服务器端响应正文时，应该使得响应的正文内容是有一定的格式的，否则，客户端收到这些数据，将无法处理，或者处理难度会非常大！

例如，当客户端请求某个用户的信息时，该用户信息包括：用户名、密码、年龄、手机号码、电子邮箱，不可能响应为：

	ajaxajax1111813800138002ajax@qq.com

这样的数据给到客户端是完全没有任何价格，客户端无法从中获取所需的信息！服务器端的响应只能是1个正文，则需要使用特定的格式来组织这个正文的内容！例如使用XML语句来组织：

	<user><username>ajax</username><password>ajax111</password><age>18</age><phone>13800138002</phone><email>ajax@qq.com</email></user>

便于识别的版式是：

	<user>
		<username>ajax</username>
		<password>ajax111</password>
		<age>18</age>
		<phone>13800138002</phone>
		<email>ajax@qq.com</email>
	</user>

当客户端收到这样的正文后，就可以通过XML解析技术，从这段响应正文中获取所需的数据，例如用户名的值，或手机号码的值等等。

使用XML可以很好的组织数据，各客户端也可以解析出所需的数据，但是，这种做法仍一定的缺陷：

1. 解析难度略高；

2. 文本内容略长，进而导致流量略大，传输略慢，用户体验略差。

### 4. JSON数据格式

JSON也是一种组织数据的格式，以上述用户数据为例，使用JSON组织时，格式为：

	{
		"username":"ajax",
		"password":"ajax111",
		"age":18,
		"phone":"13800138002",
		"email":"ajax@qq.com"
	}

相对使用的XML：

	<user>
		<username>ajax</username>
		<password>ajax111</password>
		<age>18</age>
		<phone>13800138002</phone>
		<email>ajax@qq.com</email>
	</user>

可以看到，JSON的语法格式是：

1. 使用`{}`框住整个对象；

2. 对象中可以有若干个属性，各属性的配置之间使用逗号(`,`)进行分隔；

3. 各属性的名称都是字符串，应该使用双引号(`""`)框住，在Javascript语言中，也可以使用单引号；

4. 属性名称与属性值使用冒号(`:`)进行分隔；

5. 如果属性值是字符串类型的，也需要使用双引号框住，如果属性值是数值类型，或布尔类型的，则不需要使用双引号。

内嵌在HTML中的Javascript是天生直接识别JSON数据的，不需要使用额外的解析技术即可获取其中的值！

	<script type="text/javascript">
	var json = {
		"username":"ajax",
		"password":"ajax111",
		"age":18,
		"phone":"13800138002",
		"email":"ajax@qq.com"
	}
		
	console.log(json.username);
	console.log(json.age);
	console.log(json.email);
	</script>

关于JSON的语法，还有：

1. 每个属性的值，也可以是另一个对象，则值应该再使用一对大括号框住，并且，在其中继续使用`"属性名":属性值`的方式组织该对象中的属性配置；

2. 每个属性的值，还可以是数组，则值应该使用中括号(`[]`)框住，在中括号内部，多个值使用逗号进行分隔，可以通过`数组名[下标]`获取某个位置的值，也可以结合循环语法对数组进行循环或遍历；

3. 当属性的值是数组时，数组的各元素也可以是一个个的对象！

当服务器端响应JSON数据时，JSON数据经由网络传输到达客户端，而客户端收到的仅仅只是一个符合JSON语法格式的字符串！在处理之前，需要将该字符串转换为JSON对象，才可以正常使用！在Javascript中，可以通过`var json = JSON.parse(jsonStr)`进行转换！

### 5. 服务器端向客户端响应JSON数据

如果服务器端要向客户端响应JSON数据，首先，不可能自行完成JSON字符串的拼接，因为效率低下，拼接时也容易发生错误！

默认情况下，响应正文时，SpringMVC框架使用的是ISO-8859-1编码，这种编码是不支持中文的，如果响应的正文中包括中文，将无法正确识别！

另外，也希望每次响应的数据格式是有一定规律的，以便于客户端解析，例如注册失败时，希望响应的是：

	{
		"result":"注册失败！用户名被占用！"
	}

如果登录失败，则响应的是：

	{
		"message":"登录失败！用户名不存在！"
	}

如果每次响应时，表示相同意义的属性的名称不同，例如以上的`"result"`和`"message"`，并不利用客户端使用这些响应结果！即以上2种做法中，要么都使用`"result"`，或者都使用`"message"`，即只要属性的意义是相同的，则应该使用相同的属性名称！

所以，通常会约定服务器端会向客户端响应哪些内容，属性的名称分别是什么，例如：

	{
		"state":1,
		"message":"错误时的提示信息",
		"data": xxx
	}

以上3个属性基本上能实现绝大部分请求所需要的结果，其中，`state`使用数值表示操作结果的代号，便于客户端进行分支判断，`message`用于表示操作错误时的提示文字，客户端可以将此段文字直接显示在客户端的界面中，`data`用于表示客户端所需要的数据，例如某个请求的目的本身就是获取多条数据结果，或者当前用户的完整信息等。

如果希望服务器端能够快捷的响应以上格式的结果，在实际使用时，首先，应该自定义某个类，该类中声明以上3个属性：

	public class JsonResult<T> {
	
		private Integer state;
		private String message;
		private T data;

	}

然后，将处理请求的方法的返回值类型改为以上类型：

	@RequestMapping("handle_reg.do")
	@ResponseBody
	public JsonResult<Void> handleReg(User user) {
		userMapper.addnew(user);
		JsonResult<Void> jr = new JsonResult<Void>();
		jr.setState(2);
		jr.setMessage("用户名被占用！");
		return jr;
	}

项目中需要添加`jackson`依赖：

	<!-- jackson -->
	<dependency>
		<groupId>com.fasterxml.jackson.core</groupId>
		<artifactId>jackson-databind</artifactId>
		<version>2.9.8</version>
	</dependency>

这个依赖的作用就是将响应结果转换为JSON数据格式，并且，修改响应头中的**Content-Type**，将使用的字符编码设置为**UTF-8**，使得响应正文中是允许有中文的！

最后，还需要在Spring的配置文件中添加注解驱动：

	<!-- 注解驱动 -->
	<mvc:annotation-driven />

> 当处理请求的方法添加了@ResponseBody注解后，表示响应正文，SpringMVC框架在处理时，会使用到一系列的转换器(Converter)，这些转换器的作用主要是确定某些类型对应的正文是什么样的数据，例如如何将String类型的返回值转换为响应正文，当使用String类型时，使用的转换器是StringHttpMessageConverter，整个处理过程中，这一系列的转换器是有使用优先级的，不同类型的响应结果匹配不同的转换器，当项目中添加了Jackson框架后，如果响应结果的类型是SpringMVC默认不支持的，就会自动使用Jackson框架中的转换器！所以，简单的说，如果希望响应结果能被Jackson处理为JSON格式的字符串，需要响应结果的类型是自定义的类型，或者是其它SpringMVC默认不支持的类型。

### 6. 客户端使用AJAX接收JSON结果并处理

首先，传统的表单提交后，由于URL发生变化，所以，浏览器会使用新的界面来呈现所获取的响应结果，如果响应结果是一段HTML，则可以显示出某个网页，如果响应结果不是HTML格式的，则直接将这段结果显示在浏览器中！

浏览器中页面的呈现，及相关控件的响应，都是由浏览器的主线程来完成的，如果希望页面不会跳转，则不可以使用主线程提交请求并处理响应结果，只能通过子线程发请求，得到响应结果的也是子线程，这样的话，整个请求与响应的过程中，主线程可以完全不参与，则页面就可以不跳转！

要使用子线程发出请求，首先，就不可以使用传统方式提交表单，即不可以使用`<form>`与`<input type="submit">`的组合来提交表单！

然后，原生的AJAX使用比较繁琐，且还需要程序员考虑不同的浏览器的兼容问题，所以，通常推荐使用jQuery来实现，则应该在项目中添加jQuery文件，并在页面中添加引用jQuery：

	<script type="text/javascript" src="jquery-3.4.1.min.js"></script>

通过jQuery中的`$.ajax()`函数即可发出AJAX请求并获取响应结果，以进行处理！

	<script type="text/javascript">
	// 通过jQuery选择器，选中按钮控件，并绑定它的单击事件
	$("#btn-reg").click(function() {
		// 调用$.ajax()发出请求，获取响应结果，并处理响应结果
		// 该函数的参数是一个JSON对象
		// JSON对象至少需要配置5个属性：
		// url：需要将请求提交到哪里去
		// data：提交的请求参数
		// type：请求方式
		// dataType：服务器端响应的结果的类型，取值可以是json、xml、text，取决于服务器端响应头中的ContentType
		// success：响应成功（HTTP响应码是200）时的处理函数，函数的参数就是服务器端响应的数据对象
		var u = $("#username").val();
		var p = $("#password").val();
		$.ajax({
			"url":"user/handle_reg.do",
			"data":"username=" + u + "&password=" + p,
			"type":"post",
			"dataType":"json",
			"success":function(json) {
				if (json.state == 1) {
					alert("注册成功！");
				} else {
					alert(json.message);
				}
			}
		});
	});
	</script>






