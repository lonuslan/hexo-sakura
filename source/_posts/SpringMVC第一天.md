---
title: SpringMVC第一天
tags:
  - SpringMVC
categories:
  - SpringMVC
abbrlink: 30609
date: 2019-05-31 09:25:42
---
## SpringMVC

### 1. SpringMVC框架的作用

SpringMVC框架解决了服务器端接收客户端的请求，并给予响应的问题，也可以理解为MVC中V-C之间的交互问题。

使用传统的Servlet作为控制器，存在一些性能与维护方面的问题，例如项目中如果有用户注册功能，则可能需要一个UserRegisterServlet，如果有用户登录功能，则可能需要一个UserLoginServlet，以此类推，如果某个项目中有100个功能，则需要100个Servlet，如果有1000个功能，则需要1000个Servlet！而Servlet过多会引发一系列的问题，例如服务器端的Servlet对象太多，则内存的开销较大，每个Servlet都需要在web.xml中进行配置，就会产生大量的配置信息，进而引发管理和维护难度较高的问题。

### 2. SpringMVC中的核心组件

在SpringMVC中，有5大核心组件：

- DispatcherServlet：前端控制器，用于接收所有请求，并分发；

- HandlerMapping：用于配置请求路径与处理请求的控制器的映射关系；

- Controller：控制器，用于处理请求，并返回处理结果；

- ModelAndView：控制器的处理结果，其中，Model表示处理后的数据，View表示将响应给客户端的视图名称；

- ViewResolver：视图解析器，根据视图名称确定负责显示的视图组件。

具体的执行流程可以参见：

![](01.png)

### 3. SpringMVC HelloWorld

#### 3.1. 案例目标

当将项目部署到Tomcat后，输入`http://localhost:8080/项目名称/hello.do`能够打开某个JSP页面，页面上显示“Hello, SpringMVC!!!”字样即可。

#### 3.2. 创建项目

创建**Maven Project**，在创建时，勾选**Create a simple project**，然后，**Group Id**为`cn.tedu.spring`，**Artifact Id**为`SPRINGMVC-01`，**Packaging**选择`war`。

创建完成后，还需要：

1. 生成**web.xml**文件；

2. 添加Tomcat运行环境；

3. 在此前的项目中复制**spring-webmvc**的依赖到当前项目的**pom.xml**中；

4. 在此前的项目中复制Spring的配置文件(**applicationContext.xml**)到当前项目的`src/main/resources`中。

#### 3.3. 配置DispatcherServlet

首要完成的任务是：使得`DispatcherServlet`能够接收到所有的请求，则需要在**web.xml**中配置它：

	<servlet>
		<servlet-name>SpringMVC</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	</servlet>

	<servlet-mapping>
		<servlet-name>SpringMVC</servlet-name>
		<url-pattern>*.do</url-pattern>
	</servlet-mapping>

由于需要DispatcherServlet接收所有请求，应该使得它是默认加载的，即Tomcat启动时，就应该初始化DispatcherServlet：

	<servlet>
		<servlet-name>SpringMVC</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>

	<servlet-mapping>
		<servlet-name>SpringMVC</servlet-name>
		<url-pattern>*.do</url-pattern>
	</servlet-mapping>

整个SpringMVC项目是基于Spring框架的，则需要在项目刚刚启动时，就直接加载Spring的配置文件，可以通过配置初始化参数来实现：

	<servlet>
		<servlet-name>SpringMVC</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:applicationContext.xml</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>

	<servlet-mapping>
		<servlet-name>SpringMVC</servlet-name>
		<url-pattern>*.do</url-pattern>
	</servlet-mapping>

至此，实现的效果应该是：当把项目部署到Tomcat，并启动Tomcat时，就会初始化DispatcherServlet，然后，DispatcherServlet会自动读取applicationContext.xml，即加载配置文件，获取了Spring的容器。

如果在项目中存在1个被Spring所管理的类，则会直接创建该类的对象！则可以自定义某个类，将类设置为被Spring管理（组件扫描+注解），在类的构造方法中输出某条语句，由于加载Spring配置文件时会创建对象，则构造方法中的输出语句就会被输出到控制台，即添配置组件扫描：

	<context:component-scan 
		base-package="cn.tedu.spring" />

然后创建某个类（必须在以上组件扫描配置的包中），添加注解，并显式的添加构造方法，在构造方法中输出内容：

	@Component
	public class User {
		
		public User() {
			System.out.println("创建了User对象！");
		}
	
	}

最后，将项目部署到Tomcat并启动，在控制台将可以看到以上输出的字符串！

#### 3.4. 在控制器中处理请求

当DispatcherServlet能够正常工作后，当提交`hello.do`请求，就会被DispatcherServlet所接收，接下来，就会找`HandlerMapping`查询`hello.do`应该被哪个控制器所处理！

传统的`HandlerMapping`在处理时，实际使用的类是`SimpleUrlHandlerMapping`，需要在Spring的配置文件中进行配置，由于配置过程比较繁琐，且不易于后期管理，所以，已经被注解的方式取代。

在暂时不考虑`HandlerMapping`的情况下，下一步的处理流程就到了控制器，则需要创建控制器类，该类需要在组件扫描范围之内，并添加注解：

	package cn.tedu.spring;

	import org.springframework.stereotype.Controller;
	
	@Controller
	public class HelloController {
	
	}

然后，在类中添加处理请求的方法，关于方法的声明：

1. 应该使用`public`权限；

2. 返回值暂时统一使用`String`类型；

3. 方法的名称可以自由定义；

4. 方法的参数暂时为空；

5. 在方法之前使用`@RequestMapping("路径")`以配置请求路径与处理请求的方法的映射。

具体代码为：

	@Controller
	public class HelloController {
	
		@RequestMapping("hello.do")
		public String showHello() {
			System.out.println("HelloController.showHello()");
			return null;
		}
		
	}

接下来，可以再次启动Tomcat，在启动过程中，控制台中应该显示所配置的路径（根据使用的Tomcat及框架版本不同，可能并不一定会显示这段内容）：

![](02.png)

然后，打开浏览器，输入`http://localhost:8080/SPRINGMVC-01/hello.do`，页面中会显示404错误，在Eclipse的控制台会显示以上方法中的输出语句，则表示请求已经可以被这个方法进行处理。

### 3.5. 处理视图

当控制器方法返回的是`String`类型数据，且没有添加其它配置时，返回值则表示“视图名称”，则`DispatcherServlet`会与`ViewResolver`进行交互，通过它得到具体的视图组件。

具体使用的`InternalResourceViewResolver`会以**webapp**文件夹为根文件夹，然后根据**前缀 + 视图名称 + 后缀**得到具体的视图组件的位置，即文件在哪里。

可以在**applicationContext.xml**中添加视图解析器的配置：

	<!-- 配置ViewResolver -->
	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<!-- 前缀 -->
		<property name="prefix" value="/WEB-INF/"></property>
		<!-- 后缀 -->
		<property name="suffix" value=".jsp"></property>
	</bean>

如果控制器中的方法返回的字符串是`"welcome"`，则需要在**webapp/WEB-INF/**下创建**welcome.jsp**文件，然后，在该JSP中设计显示的内容。

完成后，打开浏览器，再次访问，即可以看到JSP文件所设计的页面。

### 作业

1. 阅读笔记；

2. 创建新项目，Group Id为`cn.tedu.spring`，Artifact Id为`SPRINGMVC-02`，Packaging为`war`，需要实现：访问`http://localhost:8080/SPRINGMVC-02/reg.do`可以打开注册页面，在注册页面中，至少设计用户名、密码、年龄、手机号码、电子邮箱这5个输入框及提交按钮，访问`http://localhost:8080/SPRINGMVC-02/login.do`可以打开登录页面，在登录页面中，至少设计用户名、密码这2个输入框及提交按钮，访问`http://localhost:8080/SPRINGMVC-02/index.do`可以打开主页，主页显示的内容可以自由定义。提示：同1个控制器类中可以有多个处理请求的方法！

### --------------------------------

### 附1：添加的依赖的文件是损坏的

如果下载的jar包文件是损坏的，或者jar包文件的数量不对，就需要重新下载所依赖的jar包，可以修改所依赖的版本，使得Eclipse重新下载，也可以删除本地仓库，也可以使得Eclipse重新下载。

如果使用删除本地仓库的做法，应该：

1. 关闭Eclise；

2. 删除本地仓库，本地仓库的位置可以在Eclipse的设置中，找到Maven -> User Settings，Local Repository显示的就是本地仓库位置；

3. 打开Eclipse，对项目点右键，选择Maven -> Update Project，并在弹出的对话框中勾选Force Update...并执行更新。

### 附2：Tomcat启动失败

当Tomcat启动失败时，如果弹出对话框，提示内容中包括端口号，则表示Tomcat所需的端口已经被占用，则需要先停止已经运行的Tomcat，比较稳妥的解决方案是切换到Tomcat目录下的bin目录中，执行shutdown命令！（如果不会使用Linux系统中的命令，可以重启电脑）

如果Tomcat启动失败时，是在控制台输出了大量的错误信息，首先，检查这些错误信息中是否包含`ZipException`，如果有，则表示当前项目添加的依赖中，有些jar包文件是损坏的，则需要重新下载这些jar包。

如果只是大量的提示`LifeCycleException`，可以采取的解决方案：

1. 停止Tomcat，在Servers面板中对Tomcat点击右键，选择Clean，完成后再次启动，如果问题仍存在，则尝试下一种解决方案；

2. 在Servers面板中删除当前Tomcat，并重新添加回来，再次尝试运行，如果问题仍存在，则尝试下一种解决方案；

3. 在Servers面板中删除当前Tomcat，在重新添加时，使用另一个Tomcat，可以是版 本相同的，也可以是版本不同，并再次尝试运行。