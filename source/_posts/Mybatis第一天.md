---
title: Mybatis第一天
tags:
  - Mybatis
categories:
  - Mybatis
abbrlink: 26754
date: 2019-05-31 10:02:19
---
## Mybatis

### 准备工作

1. 创建名为`tedu_ums`的数据库；

	CREATE DATABASE tedu_ums;

	USE tedu_ums;

2. 在以上数据库中创建名为`t_user`的数据表，该数据表是使用utf8格式存储数据的，至少包含id、用户名、密码、年龄、手机号码、电子邮箱这6个字段；

	CREATE TABLE t_user (
		id INT AUTO_INCREMENT COMMENT '用户id',
		username VARCHAR(20) UNIQUE NOT NULL COMMENT '用户名',
		password VARCHAR(20) NOT NULL COMMENT '密码',
		age INT COMMENT '年龄',
		phone VARCHAR(20) COMMENT '手机号码',
		email VARCHAR(50) COMMENT '电子邮箱',
		PRIMARY KEY(id)
	) DEFAULT CHARSET=UTF8;

3. 向数据表中插入不少于10条数据；

	INSERT INTO t_user (username, password, age, phone, email) VALUES ('Mike1', '1234', 20, '13800138001', 'mike1@tedu.cn'), 
	('Mike2', '1234', 21, '13800138002', 'mike2@tedu.cn'), 
	('Mike3', '1234', 24, '13800138003', 'mike3@tedu.cn'), 
	('Mike4', '1234', 28, '13800138004', 'mike4@tedu.cn'), 
	('Mike5', '1234', 22, '13800138005', 'mike5@tedu.cn'), 
	('Mike6', '1234', 25, '13800138006', 'mike6@tedu.cn'), 
	('Mike7', '1234', 29, '13800138007', 'mike7@tedu.cn'), 
	('Mike8', '1234', 23, '13800138008', 'mike8@tedu.cn'), 
	('Mike9', '1234', 27, '13800138009', 'mike9@tedu.cn'), 
	('Mike10', '1234', 26, '13800138010', 'mike10@tedu.cn');

4. 删除指定id的数据，例如删除id值为5的数据；

	DELETE FROM t_user WHERE id=5;

5. 一次性删除指定的多个id的数据，例如一次性删除id值为3、6、8的数据；

	DELETE FROM t_user WHERE id IN (3,6,8);

6. 将所有用户的密码全部改为`888888`；

	UPDATE t_user SET password='888888';

7. 修改指定用户的密码，例如将id为7的用户的密码改为`666666`；

	UPDATE t_user SET password='666666' WHERE id=7;

8. 查询所有用户的数据；

	SELECT id,username,password,age,phone,email FROM t_user;

9. 统计当前还有多少条用户的数据；

	SELECT COUNT(id) FROM t_user;

10. 查询指定id的用户的数据，例如查询id值为9的用户的数据。

	SELECT id,username,password,age,phone,email FROM t_user WHERE id=9;

### 1. MyBatis框架的作用

SSM = Spring + SpringMVC + MyBatis

MyBatis框架是持久层框架，持久层指的是项目中负责数据持久化存储的层，它会将数据存储到持久化存储的界质中，例如存储到硬盘中，硬盘中的数据表现为一个个的文件，所以，通常，持久化存储可能会将数据存储到某个文本文件中，也可能存储到某个XML文件中，大多是存储到数据库中。

在没有使用MyBatis之前，使用Java语言开发，希望将数据存储到数据库，可以使用JDBC技术，这种技术在实际使用时，最大的问题是：处理过程和代码的重复程度非常高，无论实现增、删、改、查的哪种功能，在开发时的做法都是：先创建连接以获取Connection对象，然后获取Statement/PreparedStatement对象，并执行SQL指令，执行完成后，可能需要处理ResultSet，当处理完结果后，还应该释放资源。

MyBatis框架可以简化持久层的开发，开发人员只需要定义好：

1. 某功能对应的抽象方法；

2. 配置抽象方法所对应的SQL语句。

### 2. 使用MyBatis开发持久层

#### 2.1. 创建项目

创建Maven Project，Group Id为`cn.tedu.mybatis`，Artifact Id为`MyBatis`，Packaging为`war`。

然后：生成web.xml，添加依赖，添加Tomcat运行环境，复制Spring的配置文件，复制web.xml中关于DispatcherServlet和CharacterEncodingFilter的配置。（以上步骤中，并不是每步都是必要的，但是，推荐完成以上所有配置）。

另外，需要添加一些新的依赖：

	<!-- mybatis -->
	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis</artifactId>
		<version>3.5.1</version>
	</dependency>

	<!-- mybatis整合spring -->
	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis-spring</artifactId>
		<version>2.0.1</version>
	</dependency>

	<!-- spring-jdbc -->
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-jdbc</artifactId>
		<version>4.3.9.RELEASE</version>
	</dependency>

	<!-- mysql-connector -->
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>8.0.16</version>
	</dependency>

	<!-- commons-dbcp -->
	<dependency>
		<groupId>commons-dbcp</groupId>
		<artifactId>commons-dbcp</artifactId>
		<version>1.4</version>
	</dependency>

#### 2.2. 配置数据库连接

在`src/main/resources`下创建`db.properties`文件，以配置数据库连接：

	url=jdbc:mysql://localhost:3306/tedu_ums?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
	driver=com.mysql.cj.jdbc.Driver
	username=root
	password=root
	initialSize=2
	maxActive=10

关于`driver`的值，应该取决于使用的`mysql-connector-java`的版本，对于高版本的jar，可以在**Eclipse**中展开它，找到**META-INF**文件夹，并打开子级的**services**文件夹，在`java.sql.Driver`文件中记录了数据库驱动类的全名：

![](01.png)

然后，需要通过Spring读取以上配置：

	<!-- 读取db.properties -->
	<util:properties
		location="classpath:db.properties"/>

即将使用的数据库连接是DBCP中的对象，则需要在Spring中配置连接的类，将以上读取到的配置值注入到类的属性中，则后续开发时，就可以直接获取连接！

所以，应该先给`<util:properties>`节点指定id，然后再配置`BasicDataSource`，为其6个连接相关的属性注入值：

	<!-- 读取db.properties -->
	<util:properties id="dbConfig"
		location="classpath:db.properties"/>
		
	<!-- 配置数据源 -->
	<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
		<property name="url" value="#{dbConfig.url}" />
		<property name="driverClassName" value="#{dbConfig.driver}" />
		<property name="username" value="#{dbConfig.username}" />
		<property name="password" value="#{dbConfig.password}" />
		<property name="initialSize" value="#{dbConfig.initialSize}" />
		<property name="maxActive" value="#{dbConfig.maxActive}" />
	</bean>

至此，数据库连接已经配置完成，应该在`src/test/java`下创建`cn.tedu.mybatis.Tests`类，用于单元测试：

	public class Tests {
	
		@Test
		public void getConnection() throws SQLException {
			// 加载Spring的配置文件
			ClassPathXmlApplicationContext ac
				= new ClassPathXmlApplicationContext(
					"applicationContext.xml");
			
			// 获取对象
			DataSource dataSource 
				= ac.getBean("dataSource", DataSource.class);
			
			// 测试：通过数据源获取数据库连接对象
			Connection conn = dataSource.getConnection();
			System.out.println(conn);
			
			// 释放资源
			ac.close();
		}
		
	}

#### 2.3. 接口与抽象方法

首先，尝试完成“插入数据”的功能，需要执行的SQL语句例如：

	INSERT INTO t_user (username,password,age,phone,email) VALUES (?,?,?,?,?)

在使用MyBatis时，开发任务中，只需要定义好接口，并在接口中声明抽象方法，然后，配置该抽象方法对应的SQL语句即可，无需编写其它代码。

为了便于处理用户的相关数据，应该先创建`cn.tedu.mybatis.User`实体类，以封装相关属性：

	public class User {

		private Integer id;
		private String username;
		private String password;
		private Integer age;
		private String phone;
		private String email;

		// SET/GET/toString
	}

> 实体类，指的是属性与某数据表相对应的类，这种类的主要作用是描述数据有哪些属性。

创建`cn.tedu.mybatis.UserMapper`接口，并在接口中添加“插入数据”的抽象方法：

	public interface UserMapper {
		
		Integer addnew(User user);
	
	}

完成后，还需要添加配置，使得MyBatis知道持久层接口在哪里，所以，需要配置`MapperScannerConfigurer`以指定接口文件所在的根包：

	<!-- 配置MapperScannerConfigurer -->
	<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
		<!-- 接口文件在哪里 -->
		<property name="basePackage" value="cn.tedu.mybatis" />
	</bean>

关于MyBatis中的抽象方法，设计原则有：

1. 如果尝试执行的是增、删、改，应该将返回值设计为`Integer`类型，表示受影响的行数，如果尝试执行的是查询操作，返回值可以直接设置为预期类型，只要能足以封装查询结果的数据即可；

2. 方法的名称可以自由定义；

3. 参数可以根据即将执行的SQL语句中的变量来决定。

#### 2.4. 配置SQL映射

在完成抽象方法之后，还需要配置该抽象方法对应的SQL语句，该SQL语句是需要配置在指定的XML文件中的（其实也可以通过注解进行配置，但是不推荐），可以从`http://doc.tedu.cn`下载**MyBatis Mapper映射文件 mybatis-mapper.zip**。

然后，在**src/main/resource**下创建名为**mappers**的文件夹，然后，将下载的压缩包中的XML文件复制到该文件夹下：

![](02.png)

关于该XML文件的配置，首先，需要添加`<mapper>`根节点，且需要配置根节点的`namespace`的属性，用于指定该XML文件对应的接口：

	<!-- namespace：该XML文件对应哪个接口 -->
	<mapper namespace="cn.tedu.mybatis.UserMapper">
	
	</mapper>

然后，添加子级节点配置与抽象方法对应的SQL语句，应该根据需要执行的SQL语句来选择子节点，可以是`<insert>`、`<delete>`、`<update>`、`<select>`中的某个，无论是哪个节点，都必须配置`id`属性，表示该节点对应的抽象方法的名称，在节点内部，再配置抽象方法对应的SQL语句，在SQL语句中的变量部分，可以使用`#{}`格式的占位符：

	<!-- namespace：该XML文件对应哪个接口 -->
	<mapper namespace="cn.tedu.mybatis.UserMapper">
	
		<!-- id：抽象方法的名称 -->
		<insert id="addnew">
			INSERT INTO t_user (
				username,password,
				age,phone,
				email
			) VALUES (
				#{username},#{password},
				#{age},#{phone},
				#{email}
			)
		</insert>
		
	</mapper>

**注意：如果配置的是<select>节点，表示配置查询的SQL语句，则必须在节点中配置resultType/resultMap属性，用于显式的指定返回结果的数据类型！**
	
最终，是由MyBatis框架来执行以上SQL语句的，所以，还需要配置`SqlSessionFactoryBean`，用于指定MyBatis执行时，如何获取数据源，以得到数据库连接并尝试执行SQL语句，另外，还需要指定以上XML文件的位置：

	<!-- 配置SqlSessionFactoryBean -->
	<bean class="org.mybatis.spring.SqlSessionFactoryBean">
		<!-- 指定数据源 -->
		<property name="dataSource" ref="dataSource" />
		<!-- 指定XML文件的位置 -->
		<property name="mapperLocations"
			value="classpath:mappers/*.xml" />
	</bean>

完成后，可以编写并执行单元测试：

	@Test
	public void addnew() {
		// 加载Spring的配置文件
		ClassPathXmlApplicationContext ac
			= new ClassPathXmlApplicationContext(
				"applicationContext.xml");
		
		// 获取对象
		UserMapper userMapper
			= ac.getBean("userMapper", UserMapper.class);
				
		// 测试
		User user = new User();
		user.setUsername("Mybatis");
		user.setPassword("123456");
		Integer rows = userMapper.addnew(user);
		System.out.println("rows=" + rows);
		
		// 释放资源
		ac.close();
	}












### -----------------------------------------------------

### 附1：如何快速的将已知的1000万条数据插入到数据库中

如果仅仅只是实现该功能，不考虑效率问题，就可以直接使用1000万次的循环，每次插入1条数据，即可完成！

首先，在实际应用中，应用服务器（即Tomcat服务器，用于运行Java程序的服务器）与数据库服务器（即MySQL服务器）应该是不同的服务器！在程序执行时，会产生服务器之间的连接，如果每连接1次，只执行1条SQL语句，效率是比较低的，可以使用批处理来解决这个问题，即应用服务器一次性向数据库服务器发送多条SQL语句，然后在数据库服务器中慢慢执行这些SQL语句即可，可以减少连接的次数，达到优化的目的。

每个SQL语句被发送到数据库服务器，在执行之前，都必须经过词法分析、语义分析、编译等过程，才可以被执行，所以，对于插入数据而言，可以将多条数据组织在1条SQL语句中进行插入，例如：

	INSERT INTO 表名 (字段列表) VALUES (值列表1), (值列表2), (值列表3), ... ... (值列表1000); 

使用这种做法可以减少在词法分析、语义分析、编译等过程中的耗时，当然，付出的代价是此前必须花一定的时间去拼接出这样的SQL语句。

所以，综合以上做法，可以：每条SQL语句插入100条数据，使用批处理，每批执行100条SQL语句，并使用1000次循环来完成！

### 附2：关于内存

计算机中的存储设备主要区分为内存（主存）和外存（辅存）。常见的内存只有Cache、ROM、RAM，外存则很多，例如硬盘、U盘、移动硬盘、光盘等。

在开发领域，讨论的内存通常特指RAM，即Random Access Memory，是随机存取存储器，具体表现为内存条。

关于RAM的特性有：

1. 它是整个计算机硬件系统中唯一一个可以直接和CPU交互数据的硬件；

2. 一旦断电，数据将全部丢失；

3. 所有正在执行的程序和数据都是在内存中。
