---
title: Mybatis第三天
tags:
  - Mybatis
categories:
  - Mybatis
abbrlink: 62593
date: 2019-05-31 10:02:39
---
## Mybatis

### 1. resultMap

在配置MyBatis中的映射时，可以配置`<resultMap>`节点，用于指导MyBatis框架，如何将查询结果封装到对象中。

在一般的查询过程中，其实，并不需要使用`<resultMap>`来配置，因为MyBatis框架会根据查询结果中的列名，匹配返回值对象中的属性名，进行自动的封装。但是，如果涉及1对多的数据查询，查询得到的数据结果可能有多行，但是需要封装到1个对象中，就需要通过`<resultMap>`来指导MyBatis如何进行封装。

目标：查询某个部门的信息，并显示该部门有哪些员工。

首先，应该规范所需要执行的SQL语句：

	SELECT 
		t_department.id, name,
		username, password,
		age, phone,
		email
	FROM 
		t_department 
	LEFT JOIN 
		t_user 
	ON 
		t_department.id=t_user.department_id 
	WHERE 
		t_department.id=?

此次的查询依然需要一个VO类的返回值，所以，需要创建`DepartmentVO`类：

	public class DepartmentVO {
		private Integer id;
		private String name;
		private List<User> users;
	}

然后，此次操作的主体是**部门**数据，则应该先创建`DepartmentMapper`接口，然后，添加此次查询的抽象方法：

	DepartmentVO findById(Integer id);

然后，将原有的`SomeMapper.xml`重命名为`UserMapper.xml`，并复制出一份副本，将副本的文件名改为`DepartmentMapper.xml`，并删除副本中的配置，将其还原为一个空白文件。

最后，配置SQL映射与`<resultMap>`：

	<!-- id：自定义名称 -->
	<!-- type：返回值类型 -->
	<resultMap id="DepartmentVO_Map"
		type="cn.tedu.mybatis.DepartmentVO">
		<!-- id节点：配置主键 -->
		<!-- column：查询结果中的列名 -->
		<!-- property：数据类型中的属性名 -->
		<id column="id" property="id"/>
		<!-- result节点：配置非主鍵 -->
		<result column="name" property="name"/>
		<!-- collection节点：配置1对多的属性 -->
		<!-- ofType属性：集合中的数据类型 -->
		<collection property="users"
			ofType="cn.tedu.mybatis.User">
			<id column="uid" property="id" />
			<result column="username" property="username"/>
			<result column="password" property="password"/>
			<result column="age" property="age"/>
			<result column="phone" property="phone"/>
			<result column="email" property="email"/>
			<result column="department_id" property="departmentId"/>
		</collection>
	</resultMap>
	
	<select id="findById"
		resultMap="DepartmentVO_Map">
		SELECT 
			t_department.id, name,
			t_user.id AS uid, username, 
			password, age, 
			phone, email,
			department_id
		FROM 
			t_department 
		LEFT JOIN 
			t_user 
		ON 
			t_department.id=t_user.department_id 
		WHERE 
			t_department.id=#{id}
	</select>

**注意：必须保证查询结果中的列名都是不冲突的，例如不可以出现2个名为`id`的列名，如果查询本身确实会出现这样的问题，可以通过自定义别名的方式来解决。**

**小结：在没有使用<resultMap>时，可能需要使用自定义别名，来保证查询结果中的列名，与类的属性名保持一致！但是，使用了<resultMap>后，由于会通过<id>或<result>节点显式的配置对应关系，所以，即使名称不一致，也不需要自定义别名！在使用<resultMap>时，仅当查询结果中有多个相同的名称时，才需要自定义别名！**

**注意：在配置<resultMap>时，子级的<id>节点和<result>节点都是用于配置查询结果与属性的对应关系的，从功能方面来看，这2个节点是没有明显的区别的，甚至在使用时，也可以用<result>取代<id>，但是，主键字段的配置推荐使用<id>节点，因为MyBatis框架会对<id>节点配置的内容进行缓存。**

### 2. MyBatis中的占位符

在MyBatis中，有`#{}`和`${}`占位符。

如果需要占位的是某个值，则使用`#{}`，相当于使用JDBC时，可以在SQL语句中写`?`的位置，都使用`#{}`；如果需要占位的不是值，而是SQL语句中的一部分，则需要使用`${}`。

使用`#{}`进行占位时，MyBatis是通过JDBC实现了预编译的，在使用值时，也不需要考虑数据类型的问题，例如某值是字符串类型的，也不需要使用单引号将这个值框住；使用`${}`进行占位时，MyBatis最终处理时，在编译SQL语句之前，会将配置的SQL语句与占位符的值进行拼接（类似于`"select * from t_user where" + "id=5"`），当拼接完成之后，再进行SQL语句的编译。

所以，使用`#{}`是安全的，而使用`${}`是有**SQL注入**风险的！

### -----------------------------------------------

### 附1：缓存查询结果

在查询数据操作中，使用缓存可以大大的提高查询效率！缓存机制在许多技术领域中都会出现，无论是MySQL本身，还是MyBatis框架，都存在缓存机制！甚至，Tomcat也是会缓存对象的，另外，还有一些专门的缓存技术，例如redis等。

缓存的本质是：第1次查询时，通过技术本身去实现查询功能，但是，与此同时，会把查询结果保留下来，后续出现第2次或更多次查询时，如果查询要求得到的结果与前序已经保存的结果是相同的，则不会再次执行查询，而是直接把此前的查询结果给到客户端。

缓存能够带来查询效率提升的同时，也对内存的开销有负面影响，相比没有缓存的做法而言，缓存会额外占用一部分甚至很多内存空间，用于存储此前查询的结果！所以，使用缓存，其实是一种牺牲空间，换取时间的做法。

同时，并不是所有的缓存都是有效的，因为，即使第1次查询出了结果，并保存下来了，但是，在执行第2次查询之前，如果数据发生增、删、改操作，就会导致缓存数据不准确的问题，如果直接把第1次的查询结果给到客户端，则客户端收到的就不是最新的数据了！

所以，并不是所有的缓存做法都是会带来更好的用户体验的！也并不是所有的缓存都是有必要的！