---
title: Mybatis第二天
tags:
  - Mybatis
categories:
  - Mybatis
abbrlink: 63736
date: 2019-05-31 10:02:28
---
## Mybatis

### 1. 在MyBatis中使用多个参数

默认情况下，在MyBatis中的抽象方法中，最多只允许有1个参数，如果使用了多个参数，会报告错误，例如：根据用户的id，修改密码为某个变量值，需要执行的SQL语句应该是：

	UPDATE t_user SET password=? WHERE id=?

则抽象方法应该是：

	Integer updatePasswordById(Integer id, String password);

**注意：在MyBatis的接口中，各抽象方法的名称不允许出现重载！**

MyBatis框架在处理时，确实始终只能支持1个参数的抽象方法，如果有多个，则无法识别，至于报错时，指示某参数找不到，也是正常的，因为当Java文件编译成class文件后，就会丢失所有局部变量的变量名，也就包括了参数的名称，也就是说，假设某抽象方法中有参数名称叫做`id`，在编译后，该参数名也就不存在了！

如果一定要使用多个参数，则可以自定义的数据类型封装这些参数，然后，抽象方法的参数就可以只使用自定义的数据类型这1个参数，或者，也可以使用`Map`类型的参数，并把所需要的多个参数全部封装到这个`Map`中！

但是，无论是使用自定义的数据类型，还是使用`Map`，在最终调用方法时，都是极不方便的！例如使用`User`这样的自定义数据类型作为参数，方法的调用者可以创建出`User`类型的对象，却可能并不知道需要向`User`对象中封装哪些属性！使用`Map`时也有这样的问题，方法的调用者甚至不知道应该使用什么名称的`key`来封装数据！

推荐的解决方案是在每一个参数之前添加`@Param`注解，并在注解中配置参数的名称：

	Integer updatePasswordById(
			@Param("id") Integer id, 
			@Param("password") String password);

当调用该方法时，MyBatis会根据注解中的名称作为`key`，调用时给出的值作为`value`，从而将多个参数封装到1个Map中，最终完成对应的数据操作。

**注意：凡在MyBatis的接口中的抽象方法，如果方法的参数超过1个，必须使用`@Param`注解，并且，在配置的映射中，`#{}`占位符中的名称就必须是注解中使用的名称！**

### 2. 动态SQL

MyBatis中的动态SQL指的是：在配置SQL映射时，可以使用某些特定的标签，实现简单的判断、循环等操作，使得最终执行的SQL语句是可以由参数不同而发生变化的。

以“批量删除”为例，被删除的数据有几条，id值分别是多少，都是未知的，在设计抽象方法时，可以设计为：

	Integer deleteByIds(List<Integer> ids);

> 对于若干个id，可以使用数组类型，也可以使用List类型，来封装这些id的值。

在配置映射时，可以使用`<foreach>`节点来遍历抽象方法中的参数，以动态的生成SQL语句：

	<delete id="deleteByIds">
		DELETE FROM t_user
		WHERE id IN (
			<foreach collection="list"
				item="id" separator=",">
				#{id}
			</foreach>
		)
	</delete>

在配置`<foreach>`节点时，各属性的配置：

- collection：被遍历的对象，当抽象方法的参数只有1个时，如果参数是List类型，则取值为`list`，如果参数是数组类型，则取值为`array`，当抽象方法的参数超过1个时，参数必然是添加了`@Param`注解的，此处取值就必须是注解中配置的名称；

- item：遍历过程中使用的变量名，以JAVA中的增强for循环为例，可能写成`for (Student stu : students)`，其中的`stu`就是遍历过程中使用的变量名，在MyBatis的动态SQL中，这个`item`属性的取值就相当于`stu`，并且，在`<foreach>`节点内部，使用占位符时，也应该使用这个名称来进行占位；

- seperator：分隔符，在`IN`语句中，分隔符就是逗号(`,`)；

- open / close：整个遍历产生的代码的最左侧字符串和最右侧字符串，例如，当配置IN语法时没有写括号，可以配置为`open="(" close=")"`。

### 使用MyBatis实现关联表查询

首先，创建**部门信息表：t_department**，该表中包含id和部门名称(name)，并向该表中插入不少于3条数据：

	CREATE TABLE t_department (
		id INT AUTO_INCREMENT COMMENT 'id',
		name VARCHAR(20) NOT NULL COMMENT '部门名称',
		PRIMARY KEY (id)
	) DEFAULT CHARSET=UTF8;

	INSERT INTO t_department (name) VALUES ('软件研发部'), ('人力资源部'), ('财务部');

然后，修改**用户信息表**，添加**部门id**字段，并为每个用户分配部门：

	ALTER TABLE t_user ADD COLUMN department_id INT;

	UPDATE t_user SET department_id=1 WHERE id IN (2,6,8);

	UPDATE t_user SET department_id=2 WHERE id IN (10,12);

	UPDATE t_user SET department_id=3 WHERE id IN (5,14);

**需求**：根据id查询某用户的信息，要求显示该用户所归属的部门的名称。

需要执行的SQL语句大致是：

	select * from t_user left join t_department on t_user.department_id=t_department.id where t_user.id=8;

此前的查询结果可以很好的封装到`User`类型的对象中，是因为查询结果中的列名与`User`类中的属性名是完全一致，所以，MyBatis框架可以根据名称对应的方式，将查询结果封装起来！

目前，使用了关联表查询，很显然，`User`类中的属性并不足以封装此次查询结果中的所有数据，通常，像`User`这样的实体类是根据某张数据表的结构来设计，也就意味着只要是关联查询，一定没有匹配的实体类可以封装结果！在这种情况下，应该自定义VO(Value Object)类，用于匹配查询结果，并封装查询结果。

VO类的编写方式与实体类几乎一致，只不过，实体类是对应某数据表的，而VO类是对应查询结果的，这2种类型的类，在语法和内容上相似度极高，只是定位不同而已。

则在`UserMapper`接口中添加抽象方法：

	UserVO findUserById(Integer id);

MyBatis要求**查询结果中的列名（注意：不是数据表的字段名）**与**返回值类型中的属性名**保持一致，所以，当名称不一致时，应该在查询的字段列表中取别名：

	<select id="findUserById"
		resultType="cn.tedu.mybatis.UserVO">
		SELECT 
			t_user.id, username,
			password, age,
			phone, email,
			department_id AS departmentId, 
			name AS departmentName
		FROM 
			t_user 
		LEFT JOIN
			t_department 
		ON 
			t_user.department_id=t_department.id 
		WHERE 
			t_user.id=#{id}
	</select>











