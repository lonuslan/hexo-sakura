---
title: SpringMVC第三天
tags:
  - SpringMVC
categories:
  - SpringMVC
abbrlink: 60306
date: 2019-05-31 09:26:00
---
## SpringMVC

### 1. 关于@RequestParam注解

通过在处理请求的方法的参数之前添加`@RequestParam`注解，可以解决请求参数与处理请求的方法的参数名称不一致的问题，例如：

	public String handleLogin(
			@RequestParam("username") String uname,
			... ...

通过以上配置，客户端提交的参数的名称就应该是`username`，而在服务器端的控制器中处理时，使用的参数名就是`uname`。

以上“别名”是通过配置该属性的`name`或`value`属性实现的。

需要注意：一旦使用了该注解，默认情况下，该参数是必须提交的，如果没有提交，则会出现400错误：

	HTTP Status 400 – Bad Request

之所以必须提交参数，是因为该注解中有以下属性：

	boolean required() default true;

它用于配置该请求参数是否是必须的，且默认值为`true`，所以，如果希望某参数并不是必须的，则可以配置为：
	
	@RequestParam(value="username", required=false) String uname

另外，还可以通过`defaultValue`属性配置该请求参数的默认值，即当客户端没有提交该参数，视为客户端提交了该参数且值为所设定的默认值：

	@RequestParam(value="username", required=false, defaultValue="default_name") String username

当然，在设置`defaultValue`时，需要显式的将`required`设置为`false`。

**小结 - 什么时候需要使用该注解：**

1. 名称不一致时，即客户端提交的请求参数，与服务器端控制器中方法的参数名称不一致时；

2. 强制要求必须提交某些参数时；

3. 允许不提交某些参数，且不提交时指定默认值。

### 2. 拦截器：Interceptor

#### 2.1. 作用

与JavaEE中的过滤器(Filter)相似，拦截器可以在处理请求之前，对请求进行拦截，并尝试进行某些判断或验证，以决定阻止继续处理，或选择放行，例如可以在项目中添加某个“登录拦截器”，对于某些必须登录才可以访问的请求，如果用户是已登录状态，则放行，如果用户是未登录状态，则不允许继续访问。

总的来说，拦截器的作用就是：统一对几乎所有请求进行拦截，并基于拦截器内部的验证机制决定阻止继续处理或者放行。

#### 2.2. 基本使用

所有自定义的拦截器类都必须实现`HandlerInterceptor`接口，例如：

	public class LoginInterceptor implements HandlerInterceptor {

		public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
				throws Exception {
			System.out.println("LoginInterceptor.preHandle()");
			return true;
		}
	
		public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
				ModelAndView modelAndView) throws Exception {
			System.out.println("LoginInterceptor.postHandle()");
			
		}
	
		public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
				throws Exception {
			System.out.println("LoginInterceptor.afterCompletion()");
		}
	
	}

然后，还需要在Spring的配置文件中对拦截器链进行配置：

	<!-- 拦截器链 -->
	<mvc:interceptors>
		<!-- 第1个拦截器 -->
		<mvc:interceptor>
			<!-- 拦截路径 -->
			<mvc:mapping path="/index.do" />
			<!-- 拦截器类 -->
			<bean class="cn.tedu.spring.interceptor.LoginInterceptor" />
		</mvc:interceptor>
		<!-- 第2个拦截器 -->
		<!-- 第3个拦截器 -->
	</mvc:interceptors>

以上配置中，`<mvc:mapping>`节点用于配置需要被拦截的路径，`<bean>`节点用于指定拦截器类。

在拦截器类中，真正起到拦截作用的是`preHandle()`方法，当该方法返回`false`时，表示阻止继续处理，当返回`true`时表示放行，仅当放行后，才会执行拦截器中的`postHandle()`和`afterCompletion()`方法。

所以，关于登录的验证，可以重写`preHandle()`，并在方法中验证Session中有没有必要的信息，如果没有，则视为未登录，应该重定向到登录页，并阻止当次请求的继续处理：

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		System.out.println("LoginInterceptor.preHandle()");
		// 验证登录：判断session中是否有username
		HttpSession session = request.getSession();
		if (session.getAttribute("username") == null) {
			// 未登录
			response.sendRedirect("user/login.do");
			return false;
		}
		return true;
	}
	
注意：即使已经通过`HttpServletResponse`对象设置了重定向，依然需要`return false;`以阻止继续处理请求，如果是`return true;`，即便已经重定向了，当次请求 仍会继续向后处理，控制器中的方法依然会被执行！

在配置拦截器时，可以通过`<mvc:mapping>`配置需要拦截的路径清单，每个拦截器可以配置若干个该节点，也可以通过`<mvc:exclude-mapping>`配置例外清单，被添加到例外的路径不会被拦截器处理，也可以配置若干个例外。

在配置路径时，可以使用`*`作为通配符，表示匹配任意字符串，例如配置为`/*`时，可以表示`/index.do`、`/hello.do`等，但是，只能匹配1层路径，即不可以匹配到`/user/login.do`这样的路径，如果一定需要匹配多层，则应该配置为`/**`。

通过拦截的路径清单和例外清单可以自由、灵活的配置所需要拦截的路径，至于是拦截的路径清单多一点，还是例外的多一点，可以自行决定。

#### 2.3. 拦截器(Interceptor)与过滤器(Filter)的区别

拦截器是SpringMVC框架中的组件，仅被`DispatcherServlet`处理的请求才有可能被拦截器所处理，而过滤器是JavaEE中的组件；

拦截器真正起到拦截作用的`preHandle()`是执行在`DispatcherServlet`之后，且执行在`Controller`之前的，而过滤器是执行在所有Servlet之前的！

拦截器的配置非常灵活，可以有若干个拦截的路径清单，也可以有若干个例外清单，而过滤器只能通过`<url-pattern>`节点配置1个需要过滤的路径，如果一定要添加例外，也只能在过滤器的类中编写代码进行区分判断，使用相对繁琐！

### 3. SpringMVC项目中默认接收到的请求参数会乱码

在SpringMVC框架中，已经定义好了`CharacterEncodingFilter`过滤器类，在该类中声明了`encoding`属性，并在`doFilter()`方法中，将该属性值设置为请求与响应的字符编码，所以，在开发项目时，应该在**web.xml**文件中配置该类，配置配置它的初始化参数`encoding`值为`utf-8`，以解决接收到的请求参数会乱码的问题：

	<filter>
		<filter-name>CharacterEncodingFilter</filter-name>
		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>utf-8</param-value>
		</init-param>
	</filter>
	
	<filter-mapping>
		<filter-name>CharacterEncodingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>

### 4. SpringMVC中的异常处理

#### 4.1. 异常的体系结构

在Java中，异常的体系结构是：

	Throwable
		Error
			OutOfMemoryError
		Exception
			IOException
				FileNotFoundException
			SQLException
			RuntimeException
				NullPointerException
				ClassCastException
				NumberFormatException
				IndexOutOfBoundsException
					ArrayIndexOutOfBoundsException

#### 4.2. 异常的处理

一旦程序运行出现异常，可能需要在语法中去解决语法错误，常见的解决方案可以是`try...catch`去尝试运行并捕获异常，也可以是通过`throw 异常对象`并在方法的签名中使用`throws`声明抛出。

如果使用`try...catch`则可以捕获到相关异常，在捕获到之后，应该还有一定的措施进行事后补救，甚至给出警示，以降低后续错误操作的可能。

如果某些方法中并不适合处理异常，则应该将异常抛出，由该方法的调用者去决定如何处理！

当然，凡`RuntimeException`及其子孙类异常都不在以上语法约束范围之内，即出现这些异常时，可以不必通过代码显式的进行处理！

#### 4.3. 在SpringMVC中统一处理异常

可以在控制器中添加统一处理异常的方法，该方法应该是：

1. 使用public权限；

2. 返回值的意义与普通处理请求的方法是相同的；

3. 方法的名称是自定义的；

4. 方法的参数列表中，必须有异常类型的参数，且该异常类型必须是包括了所有可能被处理的异常的类型，另外，根据需要，还可以添加`HttpServletRequest`参数，但是，不可以随意添加其它参数；

5. 在方法的声明之前必须添加`@ExceptionHandler注解`。

例如：

	@ExceptionHandler
	public String handleException(Throwable e, HttpServletRequest request) {
		String errMsg = null;
		
		if (e instanceof NullPointerException) {
			errMsg = "操作错误！尝试使用的对象为Null！";
		} else if (e instanceof ArrayIndexOutOfBoundsException) {
			errMsg = "操作错误！使用的下标超出了界限！";
		} else {
			errMsg = "操作错误！请联系系统管理员！";
		}
		
		request.setAttribute("errMsg", errMsg);
		
		return "error";
	}

一旦添加以上方法之后，该控制器类中其它处理请求的方法就可以不必再处理相关异常，即便代码可能抛出异常，也会被以上方法进行处理！

关于`@ExceptionHandler`注解，也可以添加更多的配置，例如：

	@ExceptionHandler(RuntimeException.class)

则表示只有`RuntimeException`及其子孙类异常才会被接下来的这个方法进行处理，如果项目中出现其它例如`IOException`或`FileNotFoundException`，就不会被该方法进行处理！

以上配置的属性值其实是数组类型，其源代码是：

	Class<? extends Throwable>[] value() default {};

所以，如果需要处理多种类型不同的异常，可以配置为：

	@ExceptionHandler(value={RuntimeException.class, IOException.class})

### 作业

#### 1. 复习JDBC、DBCP的基本概念

#### 2. 数据库相关操作

1. 创建名为`tedu_ums`的数据库；

2. 在以上数据库中创建名为`t_user`的数据表，该数据表是使用utf8格式存储数据的，至少包含id、用户名、密码、年龄、手机号码、电子邮箱这6个字段；

3. 各数据表中插入不少于10条数据；

4. 删除指定id的数据，例如删除id值为5的数据；

5. 一次性删除指定的多个id的数据，例如一次性删除id值为3、6、8的数据；

6. 将所有用户的密码全部改为`888888`；

7. 修改指定用户的密码，例如将id为7的用户的密码改为`666666`；

8. 查询所有用户的数据；

9. 统计当前还有多少条用户的数据；

10. 查询指定id的用户的数据，例如查询id值为9的用户的数据。

















### ---------------------------------------------------

### 附1：乱码问题

编码：计算机能够处理的数据都是二进制数，在二进制数的世界只，永远只有0或1的存在，即便是一些比较大的数值，也都是由0和1组成的序列；而程序员便于理解和使用的是十进制数，并且还有很多符号，这些都不是计算机可以直接识别并处理的，所以，就出现了编码，它记录了每个数字、符号转换为二进制的对应关系，例如字母`a`对应的就是`110 0001`，最早期的编码就是ASCII码。

在ASCII码中，记录了可以直接由键盘输入的所有字符（不通过其它输入法）与二进数的对应关系，例如所有字母（含大写和小写）、数字、符号、控制型按键，并且，ASCII码只使用1个字节，所以，无法存储其它语言中的字符，例如中文。

由于1个字节中除去最高位的符号位，有效使用位数只有7位，可以有128种不同的组合，也就最多表示128种不同的字符，而中文汉字的数量较多，1个字节是无法存储的，至少需要2个字节。

支持中文的编码有许多种，常见的例如：GB2312、GBK、UTF8等，不同的编码中，编码规则是不同的，汉字的对应关系也是不同的，假设在GB2312中，“**程**”字的编码可能是`?000 1101 1110 1111`，但是，在GBK中，却是`?010 1111 1010 0011`，即同一个汉字，在不同的编码中对应的二进制的序列是不相同的，反之，同样的1个二进制序列，尝试使用不同的编码还原为汉字，得到的结果也会不同，甚至得到的内容是无法被识别的，所以，如果使用A编码存储汉字，然后使用B编码去读取汉字，多半将得到的是无法识别的内容，也就是乱码！

当然，如果在存储和读取时，使用的是完全一致的编码，则一定不会出现乱码！

所以，在开发项目时，有一个非常简单的原则：凡是能够指定编码的位置，全部显式的指定同样的编码，就可以解决乱码问题！常见的需要指定编码的有：项目的源代码、数据的传输过程、显示数据的界面、存储数据的位置等。

	url=jdbc:mysql://localhost:8080/db_name?useUnicode=true&characterEncoding=utf-8

	request.setCharacterEncoding("utf-8")



