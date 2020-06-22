---
title: SpringBoot基础
tags:
  - SpringBoot
categories:
 - 技术
 - 转载 
abbrlink: 25912
date: 2019-05-31 09:13:30
---

### 1. SpringBoot框架

SpringBoot框架存在的一部分原因就是因为传统的SSM框架在使用时，都需要添加相同的依赖，并且需要存在大量相同的配置！而使用SpringBoot时，默认就已经添加了绝大部分常用的依赖，并且完成了通用的配置！

### 2. 创建一个SpringBoot项目

打开`https://start.spring.io/`，输入创建项目时的各选项，暂不勾选任何依赖，直接点击下方的**Generate Project**，则会自动生成项目的压缩包，并开始下载。

![](01.png)

> 创建时的包名很重要，将是整个项目的根包，后续在开发过程中，创建的每个类都应该在这个包或其子包中，甚至，组件类（例如控制器类）必须在根包或其子包下！

得到压缩包后，解压出来的文件夹就是项目文件夹，推荐将该文件夹剪切到Workspace中。

打开Eclipse，通过**Import** > **Existing maven projects**来导入项目，在导入之前，务必确保当前计算机是可以连接到Maven服务器的！

导入后，项目会自动更新并下载大量的依赖，这个过程只需要保证网络畅通并等待即可，完成后，项目例如：

![](02.png)

**注意：请使用Oxygen或以上版本的Eclipse，如果使用的是较低版本的Eclipse，例如Mars系列版本，则项目可能会报错，原因是内置的Maven配置版本太低，可以选择在Mars这些低版本的Eclipse中更新Maven配置文件，也可以直接使用更高版本的Eclipse，但是，即使不更新版本，只是一直提示错误而已，并不影响开发和运行。**

> 如果使用的是2.1.5版本提示错误，可以改为2.1.3并更新Maven。

在SpringBoot项目中，默认就已经存在创建时指定的包，并在该包中有`DemoApplication`文件，该文件名随着项目创建时指定的Artiface不同，名称可能不一样，该类中有`main()`方法，当需要启动项目时，运行该`main()`方法即可。

启动时，会自动启动内置的Tomcat，并默认占用8080端口，所以，务必保证该端口及相关端口没有被占用，否则会启动失败！

如果项目能够正常启动，则主要的配置和依赖都是没有问题的！

### 3. 练习

#### 3.1. 目标

使用已有的`tedu_ums`数据库中的`t_user`表，结合此前学习的所有内容，完成用户登录的验证。

#### 3.2. 添加依赖

SpringBoot并不确定每个项目使用哪种数据库、使用哪种持久层框架，所以，默认创建的项目是没有添加这些依赖的，可以在创建项目时就勾选，或者创建完成后再在`pom.xml`中补充。

	<dependency>
		<groupId>org.mybatis.spring.boot</groupId>
		<artifactId>mybatis-spring-boot-starter</artifactId>
		<version>2.0.1</version>
	</dependency>
	
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<scope>runtime</scope>
	</dependency>

当添加以上依赖后，SpringBoot会认为该项目涉及数据库编程，会自动读取数据库连接的相关配置，如果这些配置信息是不存在的，则启动时会报告错误！

在项目的`src/main/resources`下，默认即存在`application.properties`文件，该文件就是SpringBoot项目的配置文件，绝大部分配置都应该配置在该文件中：

![](03.png)

则在该文件中配置数据库连接相关信息：

	spring.datasource.url=jdbc:mysql://localhost:3306/tedu_ums?useUnicode=true&characeterEncoding=utf-8&serverTimezone=Asia/Shanghai
	spring.datasource.username=root
	spring.datasource.password=root

在配置时，不需要配置`driver-class-name`，因为SpringBoot会自动从jar包中读取。

当配置完成后，再次启动项目，则可以成功启动，但是，SpringBoot在启动时只加载以上配置，并不会尝试连接数据库，所以，即使以上配置值是错误的，也不会启动失败！

#### 3.3. 测试数据库连接是否可用

在SpringBoot项目中，在`src/test/java`下默认就已经有根包，及测试类：

![](04.png)

首先，应该执行已有的测试类中的`contextLoads()`测试方法，以检测测试环境是否正常，避免依赖的文件是损坏的。因为目前尚未编写任何代码，空的测试方法应该是可以正常通过单元测试的，如果测试不通过，一定是环境有问题，例如jar包是损坏的。

然后，在测试类中新编写测试方法，以测试数据库连接。由于SpringBoot默认会读取**application.properties**的配置，并将配置值注入到数据源对象中，该数据源对象是由Spring进行管理的，所以，可以通过自动装配的方式得到该对象，然后获取连接对象：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class DemoApplicationTests {
	
		@Test
		public void contextLoads() {
		}
		
		@Autowired
		private DataSource dataSource;
		
		@Test
		public void getConnection() throws SQLException {
			Connection conn = dataSource.getConnection();
			System.err.println(conn);
		}
	
	}

#### 3.4. 开发验证登录的持久层功能

验证用户登录所需要执行的SQL语句大致是：

	select password from t_user where username=?

即：先根据用户名查询用户数据，如果找不到数据，则表示用户名不存在，如果找到，则表示用户名存在，接下来，应该在Java程序中获取返回值，根据用户提交的密码和查询结果中的密码进行`equals()`对比，以验证密码是否正确！

首先，应该创建`cn.tedu.demo.entity.User`实体类，类的结构与数据表保持对应。

然后再创建`cn.tedu.demo.mapper.UserMapper`持久层接口，并在接口中添加抽象方法：

	User findByUsername(String username);

此前，在MyBatis案例中，还需要配置持久层接口的位置，在SpringBoot项目中，也需要做这项配置！可以选择在接口之前添加`@Mapper`注解：

	@Mapper
	public interface UserMapper {
	}

如果使用这种做法，则每个MyBatis的持久层接口都需要添加该注解，使用不太方便，另外，还可以选择在启动类(`DemoApplication`)之前补充添加`@MapperScan`注解并配置持久层接口所在的包：

	@MapperScan("cn.tedu.demo.mapper")
	public class DemoApplication {
	}

使用这种做法就只需要配置1次即可！以上2种做法选择其中1种即可！

然后，还需要配置持久层的SQL映射，与此前的做法相同，先在`src/main/resources`下创建`mappers`文件夹，然后在该文件夹中粘贴一个配置文件，然后在配置文件中配置以上抽象方法对应的SQL语句:

	<mapper namespace="cn.tedu.demo.mapper.UserMapper">
		
		<select id="findByUsername"
			resultType="cn.tedu.demo.entity.User">
			SELECT 
				password 
			FROM 
				t_user 
			WHERE 
				username=#{username}
		</select>
		
	</mapper>

在此前使用时，也需要配置这些XML文件的位置，在SpringBoot项目，仍需要自行配置这一项，则在**application.properties**中添加配置：

	mybatis.mapper-locations=classpath:mappers/*.xml

至此，开发任务完成！应该及时编写并执行单元测试：

	@Autowired
	private UserMapper userMapper;
	
	@Test
	public void findByUsername() {
		String username = "root";
		User user = userMapper.findByUsername(username);
		System.err.println(user);
	}

#### 3.5. 使用控制器接收请求并处理

创建`cn.tedu.demo.controller.UserController`控制器类，添加`@RestController`注解，添加`@RequestMapping("user")`，具体代码为：

	@RestController
	@RequestMapping("user")
	public class UserController {
	}

> 创建项目时指定了Group和Artifact，值为cn.tedu和demo，则SpringBoot会自动的设置组件扫描为`cn.tedu.demo`，所以，控制器类及其它组件类必须放在这个根包或其子包中！否则，将无法被组件扫描到，也就无法被Spring管理。

SpringBoot框架推荐服务器端不必关心页面的处理，在处理请求时，应该响应正文，在对控制器类添加注解时，可以使用`@RestController`，这个注解既能起到`@Controller`的作用，还能表示该控制器类所有的方法都是响应正文的！也就是说，使用了这个注解，该类中每个方法都相当于添加了`@ResponseBody`注解！如果一定需要转发或重定向，则不可以使用`@RestController`，只能继续使用`@Controller`注解！

为了保证服务器端可以响应客户端响应JSON数据，需要`cn.tedu.demo.util.JsonResult`自定义响应结果的类型：

	public class JsonResult<T> {
		private Integer state;
		private String message;
		private T data;
	}

由于在控制器类中还需要通过持久层对象实现查询功能，所以，需要在`UserController`中添加持久层对象：

	@Autowired
	private UserMapper userMapper;

然后，需要在控制器类中添加处理**登录**请求的方法：

	// user/login
	@RequestMapping("login")
	public JsonResult<Void> login(String username, String password) {
		// 创建JsonResult类型的对象，作为此次的返回值
		// 根据参数username调用持久层对象查询数据
		// 判断查询结果是否为null
		// 是：用户名不存在：state=2, message="用户名不存在"
		// 否：用户名存在，则判断参数password和查询结果中的密码是否一致
		// -- 是：登录成功：state=1
		// -- 否：密码不匹配：state=3, message="密码错误"
		// 返回
	}

具体实现为：

	@RequestMapping("login")
	public JsonResult<Void> login(String username, String password) {
		// 创建JsonResult类型的对象，作为此次的返回值
		JsonResult<Void> result = new JsonResult<>();
		// 根据参数username调用持久层对象查询数据
		User user = userMapper.findByUsername(username);
		// 判断查询结果是否为null
		if (user == null) {
			// 是：用户名不存在：state=2, message="用户名不存在"
			result.setState(2);
			result.setMessage("用户名不存在");
		} else {
			// 否：用户名存在，则判断参数password和查询结果中的密码是否一致
			if (user.getPassword().equals(password)) {
				// 是：登录成功：state=1
				result.setState(1);
			} else {
				// 否：密码不匹配：state=3, message="密码错误"
				result.setState(3);
				result.setMessage("密码错误");
			}
		}
		// 返回
		return result;
	}

在SpringBoot项目中，默认已经配置了`DispatcherServlet`，并且映射的路径是`/*`，即所有的请求都会被SpringMVC处理！

完成后，应该及时测试以上控制器是否能正确的处理请求，则可以先启动项目，然后打开浏览器，输入`http://localhost:8080/user/login?username=mybatis&password=1234`。

与传统的SSM项目不同，SpringBoot项目是有内置的Tomcat的，当启动时项目时，会启动内置的Tomcat，并且将当前项目部署上去，且部署的上下文路径为空，所以，请URL中并不需要输入项目的名称！

在SpringMVC中，还有`@GetMapping`和`@PostMapping`这些注解，其中，`@GetMapping`相当于`@RequestMapping(method=RequestMethod.GET)`，同理，`@PostMapping`相当于`@RequestMapping(method.RequestMethod.POST)`

#### 3.6. 处理界面

在SpringBoot项目中，**src/main/resources**下的**static**文件夹就是用于存放静态资源的，例如html、css、js或图片文件等：

![](05.png)

所以，当需要添加页面时，推荐先在**static**文件夹下创建名为**web**的专门用于存放html文件的文件夹，然后，再在这个文件夹中创建**index.html**页面文件：

![](06.png)

然后，自行设计登录页面，要求必须有2个输入框，且`name`的值分别是`username`和`password`，另使用1个`button`类型的按钮，整个表单使用1个`<form>`框住。

完成后，通过`http://localhost:8080/web/index.html`即可访问该页面。







