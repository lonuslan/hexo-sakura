---
title: Spring第一天
tags:
  - Spring
categories:
  - Spring
abbrlink: 19330
date: 2019-05-31 09:19:11
---
# Spring

## 什么是框架

框架是软件半成品！ 使用框架可以简化应用软件的开发，提高开发效率。

使用框架必须遵守框架的使用约定！ 

## 什么是Spring框架

由Spring开源社区开发维护的“系列”软件框架。 

其核心组件 IOC/AOP 

## IOC容器

IOC，控制反转： 由外部容器环境创建管理“对象组件” 交给应用程序使用

主动控制：由应用程序控制管理“对象组件”

Spring 最基本的功能就是IOC容器，也称为Spring容器，Spring IOC 容器。

Spring IOC 容器： 控制创建管理“对象组件(Java Bean)”的容器。

## Spring Hello World!

1. 导入Spring IOC 组件包
2. 创建被Spring IOC管理的对象组件 类 
3. 创建配置文件：通知Spring管理哪个对象组件
4. 创建应用程序
	1. 创建Spring容器，读取Spring配置文件
	2. 从Spring容器中获取，被Spring管理的对象（控制反转）
	3. 调用对象的方法（验证）输出HelloWorld!

## Java Bean （爪哇豆子）规范

Bean: 豆子

JavaBean：符合一定规范的Java对象，JavaBean规范不是语法规范，违反不会有编译错误。

1. 需要定义包package。
2. 有无参数构造器
3. 需要实现序列化接口
4. 包含使用 getXxx setXxx 声明的“Bean属性” xxx
	1. Bean属性（Bean Property）就是指 setXxx getXxx 方法
	2. 对象属性（Object Field）是指对象的实例变量。

例子：

	class Person{
		private String name="范传奇"; //实例变量，对象属性

		String getName(){    //Bean属性  name
			return name;
		}
		void setName(String name){    //Bean属性  name
			this.name = name;
		}
		String getLastName(){        //Bean属性  lastName
			return name.substring(0,1);
		}
	}

> Spring 容器也称为 JavaBean容器，Spring建议被IOC容器管理的对象符合JavaBean规范.(实际上可以不遵守！)

# Spring 容器功能

## 使用Spring

使用Junit测试更加方便：

1. 导入Spring和JUnit包：

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>4.3.9.RELEASE</version>
		</dependency>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
		</dependency>

2. 创建 Java Bean类：

		public class Demo {
			public void test() {
				System.out.println("Hello World!");
			}
		}

3. 编写配置文件 applicationContext.xml， 保存到resource文件夹

		<?xml version="1.0" encoding="UTF-8"?>
		<beans xmlns="http://www.springframework.org/schema/beans" 
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xmlns:context="http://www.springframework.org/schema/context" 
			xmlns:jdbc="http://www.springframework.org/schema/jdbc"  
			xmlns:jee="http://www.springframework.org/schema/jee" 
			xmlns:tx="http://www.springframework.org/schema/tx"
			xmlns:aop="http://www.springframework.org/schema/aop" 
			xmlns:mvc="http://www.springframework.org/schema/mvc"
			xmlns:util="http://www.springframework.org/schema/util"
			xmlns:jpa="http://www.springframework.org/schema/data/jpa"
			xsi:schemaLocation="
				http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
				http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.2.xsd
				http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc-3.2.xsd
				http://www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-3.2.xsd
				http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.2.xsd
				http://www.springframework.org/schema/data/jpa http://www.springframework.org/schema/data/jpa/spring-jpa-1.3.xsd
				http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.2.xsd
				http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd
				http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-3.2.xsd">
			
			<!-- 
				class 用于通知Spring，Spring会读取class属性的值
				在Spring内部利用反射创建对象
				id用于标识识别对象，id属性不能重复！
			 -->
			<bean id="demo" class="day01.Demo"></bean>
			 
		</beans>

4. 编写测试类：

		public class TestCase {
			ClassPathXmlApplicationContext ctx; //实例变量
			@Before // init() 会在测试案例之前执行
			//一般用于初始化测试案例的环境，如：初始化Spring容器
			public void init() {
				ctx=new ClassPathXmlApplicationContext(
						"applicationContext.xml");
			}
			@After // destroy 销毁，在测试案例执行以后执行
			//用于回收系统资源。
			public void destroy() {
				ctx.close();
			}
			@Test
			public void testDemo() {
				/**
				 * Spring Hello World！
				 */
				Demo demo = (Demo)ctx.getBean("demo");
				demo.test();
			}
			
		}
## Spring支持对象别名

在Spring配置文件中可以为Java Bean对象定义别名，别名与ID功能一样：

	<!-- alias: 别名，曾用名 -->
	<alias name="demo" alias="demo1"/>

测试：


	@Test
	public void testAlias(){
		/*
		 * 测试 在Spring中为 Java Bean对象声明别名
		 */
		Demo demo = (Demo) ctx.getBean("demo1");
		demo.test();
	}

## bean标签的id和name属性功能一样

配置文件：

	<!-- bean 标签上的 id 属性和name属性功能一样
	  大多数使用 id 属性！id属性值不能重复 -->
	<bean name="demo2" class="day01.Demo"></bean> 

测试:

	@Test
	public void testName() {
		/**
		 * 测试使用name属性声明JavaBean对象
		 */
		Demo demo=(Demo) ctx.getBean("demo2");
		demo.test();
	}

## 重载的getBean方法

Spring 容器提供了 重载的getBean方法， 可以自动完成类型转换，不用写强制转型

	@Test
	public void testGetBean() {
		/*
		 * Spring 容器提供了 重载的getBean方法，
		 * 可以自动完成类型转换，不用写强制转型
		 */
		// 第一个参数是 Bean 的ID，第二个参数Bean对象的类型
		Demo demo = ctx.getBean("demo", Demo.class);
		demo.test();
	}

## Spring Bean对象作用域（Scope） 

1. Spring 容器默认情况下按照“单例”管理对象。
	1. 单例：在软件中对象是唯一的一个实例现象
	2. 多次调用getBean获得的是同一个的对象的引用
2. Spring使用bean标签的scope属性可以指定多例
3. Spring默认情况下单例方式可以提高性能。

单例案例：

	@Test
	public void testSingleton() {
		/*
		 * 默认情况下 Spring 按照单例规则管理对象
		 * 使用同一个ID多次调用 getBean获得的引用是
		 * 同一个对象的引用。
		 */
		Demo d1 = ctx.getBean("demo", Demo.class);
		Demo d2 = ctx.getBean("demo", Demo.class);
		System.out.println(d1==d2); //true
	}

多例案例

1. 配置：

		<!-- scope 属性声明“原型prototype”创建多个实例
		每次调用getBean时候都会创建一个新实例 -->
		<bean id="myBean" class="day01.Demo" 
			scope="prototype"/>

2. 测试：

		@Test
		public void testPrototype() {
			/*
			 * 使用scope="prototype"创建多个对象实例
			 * 每次调用getBean方法都会创建一个对象实例
			 */
			Demo d1 = ctx.getBean("myBean", Demo.class);
			Demo d2 = ctx.getBean("myBean", Demo.class);
			System.out.println(d1==d2);
		}

## bean 对象生命周期管理方法

1. init-method 用于设定 初始化方法，创建对象以后立即执行
2. destroy-method 用于设定 销毁方法，关闭容器销毁对象时候执行
	1. 仅对单例对象有效，多例对象上设置无效。

单例对象生命周期管理案例:

1. 创建Bean类型
		
		public class LogTool {
			String fileName="demo.log";
			PrintWriter out;
			public void open() throws IOException{
				out = new PrintWriter(
						new FileOutputStream(fileName,true));
				System.out.println("打开文件");
			}
			public void write(String log) {
				out.println(log);
				out.flush();
			}
			public void close() {
				out.close();
				System.out.println("关闭文件");
			}
		}

2. 配置：

		<!-- init-method 设置创建对象以后执行的方法
		  destroy-method 设置关闭容器销毁对象时候
	           执行的方法 -->
		<bean id="logTool" class="day01.LogTool"
			init-method="open" 
			destroy-method="close" lazy-init="true"/>
	 
3. 测试

		@Test
		public void testLogTool() {
			/*
			 * 测试对象生命周期管理方法
			 * init-method 设置创建对象以后执行的方法
			 * destroy-method 设置关闭容器销毁对象执行的方法
			 */
			LogTool tool = ctx.getBean(
					"logTool",LogTool.class);
			
			tool.write("这是一个测试！");
			tool.write("再试试！"); 
			
		}

多例对象生命周期管理案例:

1. 创建Bean类

		/**
		 * 测试Spring创建多少实例时候，关闭容器不会执行destroy-method
		 */
		public class DemoBean {
			
			public void init() {
				System.out.println("Call init()");
			}
			
			public void destroy() {
				System.out.println("Call destroy()"); 
			}
		}

2. 配置：

		<!-- Spring作为多例管理的对象，不会执行destroy-method -->
		<bean id="demoBean" class="day01.DemoBean"
			scope="prototype"
			init-method="init"
			destroy-method="destroy"/> 

3. 测试:
	
		@Test
		public void testDestroy() {
			/*
			 * scope="prototype"
			 * 多个实例情况下Spring不会执行destroy-method
			 * 每次创建对象，都会执行对象的init-method
			 */
			DemoBean bean = ctx.getBean("demoBean",
					DemoBean.class);
			System.out.println(bean); 
			DemoBean bean2 = ctx.getBean("demoBean",
					DemoBean.class);
			System.out.println(bean2); 
		}

## 懒惰初始化

Spring默认情况下单例对象是立即初始化的，也就是Spring容器在启动时候立即创建单例对象的实例。

在bean标签上设置 lazy-init 之后就会采用懒惰初始化（延迟实例化）方式，也就是在第一次调用getBean方法时候才创建对象的实例。

对于很少使用的单例对象，可以设置懒初始化，这样可以最大化的节省内存的好用。

案例：

1. 配置：

		<!-- 设置单例对象懒惰式加载，Spring会在第一次使用对象时候
		创建对象， 如果不使用对象，就不会创建对象 -->
		<bean id="demoBean1" class="day01.DemoBean" 
			lazy-init="true" init-method="init" /> 

2. 测试：

		@Test
		public void testLazyInit() {
			/*
			 * 测试单例对象的懒得加载方式：在第一次调用getBean
			 * 方法时候创建对象。如果不调用getBean方法就不会
			 * 创建Bean对象
			 */
			DemoBean bean = ctx.getBean("demoBean1",
					DemoBean.class);
			DemoBean bean1 = ctx.getBean("demoBean1",
					DemoBean.class);
			System.out.println("LazyInit");
		}

## DI 依赖注入

IOC容器不仅可以管理对象，还可以利用DI功能为对象注入Bean属性。

对象的依赖？一个对象在执行功能期间需要使用另外一个对象，称为对象的依赖

属性注入？ 将一个对象作为属性注入给另外对象


案例原理：

![](di.png)

案例步骤：

1. 编写Bean类
		
		public class Axe {
			@Override
			public String toString() {
				return "金斧子"; 
			}
		}

		public class Worker {
			private String name="光头强";
			private Axe axe; //光头强依赖斧子
			
			public void setAxe(Axe axe) { //Bean属性 axe
				this.axe = axe;
			}
			
			public void work() {
				//     字符串连接时候自动调用了axe的toString方法！
				System.out.println(name+"使用"+axe+"砍树！"); 
			}
		}
		
2. 配置：

		<!-- 利用property 注入依赖的对象 -->
		<bean id="qiang" class="day01.Worker">
			<!-- 将斧子Bean对象注入到Bean属性中 -->
			<property name="axe" ref="axe1"></property>
		</bean>
		<bean id="axe1" class="day01.Axe"></bean>

3. 测试：

		@Test
		public void testQiang() {
			/*
			 * 测试Spring提供的DI功能
			 */
			Worker qiang=ctx.getBean("qiang", Worker.class);
			qiang.work();
			
		}