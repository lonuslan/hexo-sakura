---
title: Spring第二天
tags:
  - Spring
categories:
  - Spring
abbrlink: 56312
date: 2019-05-31 09:19:40
---
# Spring

Spring 是开源的框架，是软件的半成品

1. 核心功能 IOC/DI 容器
	1. Spring 容器
	2. Spring IOC 容器
	3. Java Bean 容器 
	4. IOC 容器
	5. Bean 容器
2. ICO 容器功能
	1. 创建管理JavaBean对象
		1. 单例、原型（多实例）
		2. 生命周期管理方法
		3. 懒惰初始化
	2. DI 依赖注入，依赖注入可以“解耦”
		1. Bean属性注入
		2. 注入对象
		3. 自动注入
		4. 注入基本类型
		5. 构造器注入（调用有参数构造器创建对象） 

## 利用DI进行解耦

解耦： 解除耦合性，将组件之间的依赖关系减弱，变成松散耦合关系。

案例： 将工人与使用的工具进行解耦：

1. 定义接口

		public interface Tool {
		
			String getName();
			
		}

2. 定义类

		public class Axe implements Tool{
			
			public String getName() {
				return "开天斧";
			}
			
			@Override
			public String toString() {
				return getName(); 
			}
		}

		public class Saw implements Tool {
			
			public String getName() {
				return "屠龙锯";
			}
			
			@Override
			public String toString() {
				return getName(); 
			}
		}
		
3. 配置：

		<!-- 利用DI功能配置组件之间的关系 -->
		<bean id="qiang" class="day02.Worker">
			<property name="tool" ref="axe"></property>
		</bean>
		<bean id="axe" class="day02.Axe"></bean>
		<bean id="saw" class="day02.Saw"></bean>

4. 测试：

		@Test
		public void testTool() {
			/*
			 * 测试利用 Spring DI 进行解耦
			 */
			Worker worker = ctx.getBean("qiang",Worker.class);
			worker.work();
		}

## 自动注入

1. autowire="byName" 根据名字自动注入：根据对象的Bean属性名查找匹配Bean的ID，如果名字一致， 则自动注入Bean属性。 如果注入的对象类型不兼容，则失败。
2. autowire="byType" 根据类型自动注入：根据对象的Bean属性类型查找匹配Bean的类型，如果类型兼容， 则自动注入Bean属性。 如果注入的对象类型不唯一，则出错误。

按照名字自动注入：

1. 配置：

		<!-- 测试按名字自动注入 -->
		<bean id="worker" class="day02.Worker" 
		  autowire="byName"></bean>
		<bean id="tool" class="day02.Saw"></bean>

2. 测试

		@Test
		public void testByName() {
			/*
			 * 测试自动按照名字注入bean属性
			 */
			Worker worker = ctx.getBean("worker", Worker.class);
			worker.work();
		}

按照类型自动注入：

1. 配置
	
		<!-- 测试按照类型自动注入Bean属性 -->
		<bean id="worker" class="day02.Worker"
			autowire="byType">
		</bean>
		<bean id="axe" class="day02.Axe"></bean>

2. 测试

		
		@Test
		public void testByType() {
			/*
			 * 测试 按照类型自动注入Bean属性
			 */
			Worker worker = ctx.getBean("worker", Worker.class);
			worker.work();
		}

## 测试构造器参数注入

测试构造器参数注入，就是调用有参数构造器创建对象

案例：

1. 更新 Worker 添加有参数构造器
		
		public class Worker {
			
			private String name = "光头强";
			private int age;
			
			public Worker() {
			}
			
			public Worker(String name, int age) {
				this.name = name;
				this.age = age;
			}
			
		
		
		
			/*
			 * 接口依赖，是松耦合关系
			 */
			private Tool tool;
			
			public void setTool(Tool tool) {
				this.tool = tool;
			}
			public void work() {
				System.out.println(name+"使用"+tool+"砍树");
			}
		}

2. 配置：

		<!-- 构造器参数注入，就是调用有参数构造器注入属性 -->
		<bean id="xiong" class="day02.Worker" 
			autowire="byType">
			<!-- constructor: 构造器 arg: 参数 -->
			<constructor-arg type="String" value="熊大" />
			<constructor-arg type="int" value="10"/>
		</bean>

3. 测试

		@Test 
		public void testConstructorArg() {
			/*
			 * 测试构造器参数注入，就是调用有参数构造器创建对象
			 */
			Worker worker = ctx.getBean("xiong", Worker.class);
			worker.work();
		}

## Bean属性参数注入

Spring 支持各种类型参数注入：

1. 编写测试类：

		public class DemoBean {
			private int num;
			private double price;
			private boolean test;
			private String name;
			
			//List集合
			private List<String> city;
			//数组
			private String[] arr;
			//Set集合
			private Set<String> names;
			//对象集合
			private List<Tool> tools;
			
			/*
			 * Spring 支持基本类型Bean属性注入 
			 */
			public int getNum() {
				return num;
			}
			public void setNum(int num) {
				this.num = num;
			}
			public double getPrice() {
				return price;
			}
			public void setPrice(double price) {
				this.price = price;
			}
			public boolean isTest() {
				return test;
			}
			public void setTest(boolean test) {
				this.test = test;
			}
			public String getName() {
				return name;
			}
			public void setName(String name) {
				this.name = name;
			}
			public List<String> getCity() {
				return city;
			}
			public void setCity(List<String> city) {
				this.city = city;
			}
			public String[] getArr() {
				return arr;
			}
			public void setArr(String[] arr) {
				this.arr = arr;
			}
			public Set<String> getNames() {
				return names;
			}
			public void setNames(Set<String> names) {
				this.names = names;
			}
			public List<Tool> getTools() {
				return tools;
			}
			public void setTools(List<Tool> tools) {
				this.tools = tools;
			}
			@Override
			public String toString() {
				return "DemoBean [num=" + num + ", price=" + price + ", test=" + test + ", name=" + name + ", city=" + city
						+ ", arr=" + Arrays.toString(arr) + ", names=" + names + ", tools=" + tools + "]";
			}
			
		}

2. 配置

		<!-- Spring 可以为Bean对象注入各种类型的"Bean属性" -->
		<bean id="demoBean" class="day02.DemoBean">
			<!-- 使用vaule属性注入基本值（基本类型和字符串） -->
			<property name="num" value="58"/>
			<property name="price" value="88.8"/>
			<property name="name" value="Tom"/>
			<property name="test" value="true"/>
			
			<!-- 使用 array 子元素注入数组 -->
			<property name="arr">
				<array>
					<value>黄</value>
					<value>品</value>
					<value>青</value>
					<value>黑</value>
				</array>
			</property>
			<!-- list子元素注入集合 -->
			<property name="city">
				<list>
					<value>魔都</value>
					<value>帝都</value>
					<null></null> <!-- 注入 null 值 -->
				</list>
			</property>
			<!-- set子元素注入set集合 -->
			<property name="names">
				<set>
					<value>熊大</value>
					<value>熊二</value>
				</set>
			</property>
			<!-- 注入对象集合, list 元素和 bean 元素配合实现-->
			<property name="tools">
				<list>
					<bean class="day02.Axe"></bean>
					<bean class="day02.Saw"></bean>
					<!-- ref 用于引用Spring容器中的Bean对象 -->
					<ref bean="axe"/>
				</list>
			</property>
		</bean>

3. 测试
	
		@Test
		public void testBeanProperty() {
			/*
			 *  Spring 可以为Bean对象注入各种类型的"Bean属性" 
			 *  DI 功能很强大！
			 */
			DemoBean bean=ctx.getBean("demoBean", DemoBean.class);
			System.out.println(bean); 
		}

## 利用Spring 管理数据库连接池

利用Spring的ICO和DI功能，管理DBCP数据库连接池。

1. 导入数据库连接池和数据库驱动

		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.6</version>
		</dependency>
		<dependency>
			<groupId>commons-dbcp</groupId>
			<artifactId>commons-dbcp</artifactId>
			<version>1.4</version>
		</dependency>

2. 配置

		<!-- Bean属性注入的用途：利用Spring管理数据库连接池 -->
		<bean id="dataSource"
			class="org.apache.commons.dbcp.BasicDataSource">
			<!-- 利用DI功能注入String类型的基本值 -->
			<property name="driverClassName" 
				value="com.mysql.jdbc.Driver"/>
			<property name="url" 
				value="jdbc:mysql:///db1"/>
			<property name="username" value="root"/>
			<property name="password" value="root"/>
			<property name="maxActive" value="10"/>
		</bean>
	
3. 测试
	
		@Test
		public void testDataSource() throws Exception{
			/*
			 * Bean属性注入的用途：利用Spring管理数据库连接池
			 */
			// DBCP 的 BasicDataSource 类实现了 
			// javax.sql.DataSource 接口，所以可以利用DataSource
			// 接口定义变量引用 BasicDataSource实例
			DataSource ds = ctx.getBean("dataSource",
					DataSource.class);
			Connection conn = ds.getConnection();
			String sql = "select 'Hello World!' as s";
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery(sql);
			while(rs.next()) {
				System.out.println(rs.getString("s"));
			}
			conn.close();
		}

## Spring 读取 Properties

Spring支持读取Properties文件功能，用于获取配置文件参数。

案例：

1. 编写配置文件 resource/jdbc.properties

		driver=com.mysql.jdbc.Driver
		url=jdbc:mysql://localhost:3306/db1?useUnicode=true&characterEncoding=UTF-8
		username=root
		password=root
		maxActive=10

2. 使用Spring 读取：

		<!-- 读取 Properties -->
		<util:properties id="jdbc" 
			location="classpath:jdbc.properties"/>

3. 测试

		@Test
		public void testProperties() {
			/*
			 * 读取 Properties 文件
			 */
			Properties cfg = ctx.getBean("jdbc",
					Properties.class);
			System.out.println(cfg);
		}

## Spring 表达式 

可以读取 Java Bean 属性，读取数组、List、Map、Properties等数据

假设 Bean 的 ID 是 demoBean 和 jdbc 

1. 读取"Bean属性"
	1. #{demoBean.num} 
	2. #{demoBean.name}
	3. #{demoBean['price']}
2. 读取数组
	1. #{demoBean.arr[0]}
	2. #{demoBean.city[1]}
3. 读取Map、Properties
	1. #{jdbc.driver}
	2. #{jdbc['url']}

案例： 利用Spring表达式读取属性，注入到 testBean 中

1. 编写 TestBean

		public class TestBean {
			
			int value;
			String str;
			String driver;
			String city;
			
			public int getValue() {
				return value;
			}
			public void setValue(int value) {
				this.value = value;
			}
			public String getStr() {
				return str;
			}
			public void setStr(String str) {
				this.str = str;
			}
			public String getDriver() {
				return driver;
			}
			public void setDriver(String driver) {
				this.driver = driver;
			}
			public String getCity() {
				return city;
			}
			public void setCity(String city) {
				this.city = city;
			}
			@Override
			public String toString() {
				return "TestBean [value=" + value + ", str=" + str + ", driver=" + driver + ", city=" + city + "]";
			}
			
			
		}

2. 配置

		<!-- 利用Spring表达式读取信息，注入到TestBean -->
		<bean id="testBean" class="day02.TestBean">
			<property name="value" value="#{demoBean.num}"/>
			<property name="city" 
			 	value="#{demoBean.city[0]}"></property>
			<property name="str" value="#{demoBean.arr[0]}"/>
			<property name="driver" value="#{jdbc.driver}"/>
		</bean>	
		
3. 测试：
	
		@Test
		public void testSpringEx() {
			/*
			 * 测试：使用Spring表达式读取Bean属性
			 */
			TestBean bean = ctx.getBean("testBean",
					TestBean.class);
			System.out.println(bean); 
		}

使用Spring 表达式配置 DBCP 连接池

1. 配置

		<!-- 使用 Properties 文件 + Spring表达式配置
		DataSource 连接池 -->
		<bean id="ds" 
			class="org.apache.commons.dbcp.BasicDataSource">
			<property name="driverClassName"
				value="#{jdbc.driver}"/>	
			<property name="url" 
				value="#{jdbc.url}"/>
			<property name="username"
				value="#{jdbc.username}"/>
			<property name="password"
				value="#{jdbc.password}"/>
			<property name="maxActive"
				value="#{jdbc.maxActive}"/>
		</bean>

2. 测试

		@Test
		public void testDS() throws Exception{
			/*
			 * Spring 表达式配置JDBC连接池
			 */
			DataSource ds = ctx.getBean("ds",
					DataSource.class);
			Connection conn = ds.getConnection();
			String sql = "select 'Hello World!' as s";
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery(sql);
			while(rs.next()) {
				System.out.println(rs.getString("s"));
			}
			conn.close();
		}

## 基于注解扫描的IOC组件管理

Spring 提供了基于注解扫描的组件管理，支持Java EE标准注解。

1. 导入包：

		<dependency>
			<groupId>javax.annotation</groupId>
			<artifactId>jsr250-api</artifactId>
			<version>1.0</version>
		</dependency>

		<dependency>
			<groupId>javax.inject</groupId>
			<artifactId>javax.inject</artifactId>
			<version>1</version>
		</dependency>

2. 配置XML

		<!-- 开启注解扫描功能，扫描day02包以及子包 -->
		<context:component-scan base-package="day02"/>

3. 编写Bean组件类

		@Component
		public class HelloBean {
			@Override
			public String toString() {
				return "Hello World!";
			}
		}

4. 测试

		@Test
		public void testHelloBean() {
			/*
			 * 测试注解组件扫描方式创建Bean对象
			 */
			HelloBean bean = ctx.getBean("helloBean",
					HelloBean.class);
			System.out.println(bean); 
		}

## Spring 支持多种注解创建Bean组件

这些注解功能基本相同：
	
	@Component
	@Named
	@Service
	@Repository
	@Controller

案例 @Repository 声明组件：

1. 定义Bean组件

		@Repository
		public class MyBean {
			@Override
			public String toString() {
				return "myBean";
			}
		}

2. 测试

		@Test
		public void testRepository() {
			/*
			 * 测试注解 Repository
			 */
			MyBean bean=ctx.getBean("myBean", MyBean.class);
			System.out.println(bean); 
		}

## 注解可以自定义Bean ID 

案例：

1. 编写Bean

		@Component("example")
		public class ExampleBean {
			@Override
			public String toString() {
				return "ExampleBean";
			}
		}

2. 测试:
	
		@Test
		public void testExampleBean() {
			/*
			 * 测试自定义注解Bean ID
			 */
			ExampleBean bean=ctx.getBean("example",
					ExampleBean.class);
			System.out.println(bean); 
		}

## 注解支持 创建多个Bean实例

默认情况下 注解管理的Bean也是单例的。 使用@Scope 可以设为多个实例：

1. 类

		@Component
		@Scope("prototype") //原型属性，会创建多个实例
		public class ExampleBean2 {
			
			@Override
			public String toString() {
				return "ExampleBean2";
			}
		}

2. 测试

		@Test
		public void testScope() {
			/*
			 * 设定 @Scope("prototype") 创建多个实例
			 */
			ExampleBean2 bean1 = ctx.getBean("exampleBean2",
					ExampleBean2.class);
			ExampleBean2 bean2 = ctx.getBean("exampleBean2",
					ExampleBean2.class);
			System.out.println(bean1==bean2); //false
		}

## 管理Bean组件生命周期和懒惰初始化

@PostConstruct 声明在构造器执行以后执行的方法
@PreDestroy 声明在容器关闭销毁对象时候执行的方法，单例时候有效
@Lazy 声明Bean组件是懒惰加载方式，第一次使用时候创建Bean对象

案例：

1. 声明Bean类

		@Component
		@Lazy
		public class LogTool {
			String fileName="demo.log";
			PrintWriter out;
			@PostConstruct
			public void open() throws IOException{
				out = new PrintWriter(
						new FileOutputStream(fileName,true));
				System.out.println("打开文件");
			}
			public void write(String log) {
				out.println(log);
				out.flush();
			}
			@PreDestroy
			public void close() {
				out.close();
				System.out.println("关闭文件");
			}
		}

2. 测试

		@Test
		public void testLifeCycle() {
			/*
			 * 使用注解支持生命周期管理方法
			 */
			LogTool tool = ctx.getBean("logTool",LogTool.class);
			tool.write("Hello World!");
			tool.write("By Spring!");
			System.out.println("OK");
		}