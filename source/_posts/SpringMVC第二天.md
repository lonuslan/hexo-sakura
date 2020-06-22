---
title: SpringMVC第二天
tags:
  - SpringMVC
categories:
  - SpringMVC
abbrlink: 59371
date: 2019-05-31 09:25:51
---
## SpringMVC

### 1. 接收客户端提交的请求参数

#### 1.1. 【不推荐】 通过HttpServletRequest参数接收请求参数

在处理请求的方法中，添加`HttpServletRequest`类型的参数，在方法体中，调用参数对象的`String getParameter(String name)`方法即可获取请求参数：

	@RequestMapping("handle_reg.do")
	public String handleRegister(HttpServletRequest request) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		Integer age = Integer.valueOf(request.getParameter("age"));
		String phone = request.getParameter("phone");
		String email = request.getParameter("email");
		
		System.out.println("[1] username=" + username);
		System.out.println("[1] password=" + password);
		System.out.println("[1] age=" + (age + 1));
		System.out.println("[1] phone=" + phone);
		System.out.println("[1] email=" + email);
		return null;
	}

这种做法的缺点：使用比较繁琐；默认获取的参数值都是`String`，对于其它类型而言，需要自行转换数据类型；不易于实现单元测试。

#### 1.2. 【推荐】 直接将请求参数声明为处理请求的方法的参数

假设客户端提交了名为`username`的参数，则在服务器端的控制器的处理请求的方法中，也添加名为`username`的参数，即可在方法中获取到请求参数的值，并且，如果希望参数是`String`以外的类型，也可以直接声明，例如客户端提交了名为`age`的参数，在处理请求的方法中，声明`Integer age`即可直接使用：

	@RequestMapping("handle_reg.do")
	public String handleRegister(
			String username, String password, 
			Integer age, String phone, String email) {
		System.out.println("[2] username=" + username);
		System.out.println("[2] password=" + password);
		System.out.println("[2] age=" + (age + 1));
		System.out.println("[2] phone=" + phone);
		System.out.println("[2] email=" + email);
		return null;
	}

需要注意的是：使用这种做法时，必须保证客户端提交的参数名，与处理请求的方法中的参数名是一致的！如果不一致，默认情况下，处理请求的方法中的参数值将是null。

这种做法也是缺点的：如果客户端提交的参数的数量非常多，按照这种做法，就需要在处理请求的方法中添加更多的参数，如果处理请求的方法的参数太多，是非常不合适的！

#### 1.3. 【推荐】 使用封装了多参数的对象接收请求参数

可以将多个请求参数封装到1个自定义的数据类型中，例如：

	public class User {

		private String username;
		private String password;
		private Integer age;
		private String phone;
		private String email;

	}

然后，使用这种类型作为处理请求的参数即可：

	@RequestMapping("handle_reg.do")
	public String handleRegister(User user) {
		System.out.println("[3] user=" + user);
		return null;
	}

这种做法也要求名称的统一，即请求参数的名称，与自定义数据类型中的属性名称保持 一致。

#### 1.4. 小结

当获取请求参数时，如果参数的数量较少，可以优先选取第2种做法，即直接将请求参数声明为处理请求的方法的参数，如果参数的数量较多，则应该优先选取第3种做法，即使用自定义的数据类型作为处理请求的方法的参数！

在选取这些做法时，还应该评估请求参数是否可能发生变化，特别是数量是否可能发生变化，例如“注册”时，即使只有2个参数，但是，随着业务的更新，可能在后续的功能升级时，会变成4个或更多个参数，则应该使用第3种做法，主要原因是不希望调整控制器的方法！反之，在例如“登录”功能中，就可以优先使用第2种做法，因为在这个功能中，参数的数量或参数的意义基本上不会发生变化。

并且，以上的第2种做法和第3种做法可以组合使用！例如注册时还需要验证码，则可以使用`User`和验证码作为处理请求的方法的参数！

### 2. 转发与重定向的选取原则

转发与重定向的本质区别在于：在转发过程中，客户端只发出了1次请求，而重定向时，客户端发出了2次请求，在具体的表现中，转发时，客户端浏览器中的地址栏的URL是第1次请求时的URL，重定向时，客户端浏览器的地址栏的URL是第2次请求时的URL。

转发：当客户端提交请求后，会被服务器端的控制器接收到，并进行处理，处理完成后，应该给予响应，可能需要显示某些数据，但是，控制器是Java类，显示却需要通过HTML及相关技术来完成，Java类是不便于做显示的，所以，就出现了JSP技术，从控制器可以将需要显示的数据转发给JSP，由JSP来完成显示！当然，与Java类的不足非常相似，JSP易于实现显示数据，却不适合完成Java代码的编写！所以，控制器与JSP各有不足，转发就是将这2种技术综合起来互补并解决问题的做法！

附：JSP就是用来显示数据的，即使JSP中可以使用`<% ... %>`标签来编写Java代码，但是，是极不推荐的！而且，JSP中显示的数据可能大多来自于控制器的转发，所以，一般也不推荐允许直接访问JSP，而会将JSP放到项目的**WEB-INF**文件夹中，这样就可以防止客户端**直接**访问JSP文件！

重定向：当控制器已经处理完数据，并且，需要用户直接访问下一个界面时，就可以使用重定向的方式进行响应，具体过程是向客户端响应302（大多情况是302），并给出重定向的目标地址，当客户端接收到302响应码时，就会根据目标地址发出第2次请求。

所以，区分的原则可以是：

1. 客户端的浏览器中的URL是否需要发生变化，如果不变，用户刷新是否会是错误的操作；

2. 控制器处理完数据后，是否需要显示相关数据。

### 3. 重定向

在控制器中，使用`String`作为处理请求的方法的返回值类型，并返回`redirect:重定向的目标路径`就可以实现重定向：

	@RequestMapping("handle_reg.do")
	public String handleRegister(User user) {
		System.out.println("[3] user=" + user);
		return "redirect:login.do";
	}

以上重定向的目标路径可以是相对路径，也可以是绝对路径。

### 4. 封装转发的数据

#### 4.1. 【不推荐】 使用HttpServletRequest封装转发数据

在处理请求的方法的参数列表中，添加`HttpServletRequest`类型的参数，当需要转发数据时，调用参数对象的`setAttribute(String name, Object value)`以封装转发数据，最终通过`return`语句执行转发即可，无需自行获取转发器：

	@RequestMapping("handle_reg.do")
	public String handleRegister(User user, HttpServletRequest request) {
		// 假设root用户名已经被占用，不允许注册，其它用户名均可成功注册
		// 失败时使用专门的错误页面显示错误信息
		// 成功时，跳转到登录页
		System.out.println("[3] user=" + user);
		
		if (user.getUsername().equals("root")) {
			// 用户名被占用，注册失败
			// 封装转发的数据
			String message = "您尝试注册的用户名已经被占用！";
			request.setAttribute("errMsg", message);
			// 执行转发
			return "error";
		} else {
			// 注册成功
			return "redirect:login.do";
		}
	}

#### 4.2. 【不推荐】 使用ModelAndView作为处理方法的返回值类型

将处理请求的方法的返回值改成`ModelAndView`，当需要转发时，可以使用该类的`new ModelAndView(String viewName, Map<String, ?> model)`方式来创建对象，其中`String viewName`就是要转发到的视图的名称，`Map<String, ?> model`就是用于封装转发数据的对象：

	@RequestMapping("handle_reg.do")
	public ModelAndView handleRegister(User user) {
		// 假设root用户名已经被占用，不允许注册，其它用户名均可成功注册
		// 失败时使用专门的错误页面显示错误信息
		// 成功时，跳转到登录页
		System.out.println("[3] user=" + user);
		
		if (user.getUsername().equals("root")) {
			// 用户名被占用，注册失败
			// 封装转发的数据
			String message = "[2] 您尝试注册的用户名已经被占用！";
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("errMsg", message);
			ModelAndView mav = new ModelAndView("error", model);
			// 执行转发
			return mav;
		} else {
			// 注册成功
			return null;
		}
	}

#### 4.3. 【推荐】 使用ModelMap封装转发的数据

使用`ModelMap`封装转发的数据，做法与使用`HttpServletRequest`是相同的：

	@RequestMapping("handle_reg.do")
	public String handleRegister(User user, ModelMap modelMap) {
		// 假设root用户名已经被占用，不允许注册，其它用户名均可成功注册
		// 失败时使用专门的错误页面显示错误信息
		// 成功时，跳转到登录页
		System.out.println("[3] user=" + user);
		
		if (user.getUsername().equals("root")) {
			// 用户名被占用，注册失败
			// 封装转发的数据
			String message = "[3] 您尝试注册的用户名已经被占用！";
			modelMap.addAttribute("errMsg", message);
			// 执行转发
			return "error";
		} else {
			// 注册成功
			return null;
		}
	}

#### 4.4. 练习

当用户访问登录页面时（`http://localhost:8080/SPRINGMVC-02/login.do`），暂定为admin/1234是正确的用户名与密码，当用户提交的数据无法登录时，给出对应的错误提示，区分为用户名不存在和密码错误，当用户能够成功登录时，跳转到主页。

	@RequestMapping("handle_login.do")
	public String handleLogin(
			String username, String password,
			ModelMap modelMap) {
		// 假设admin/1234是正确的用户名/密码
		// 准备转发的数据
		String message;
		// 判断用户名
		if ("admin".equals(username)) {
			// 用户名正确
			if ("1234".equals(password)) {
				// 密码正确
				return "redirect:index.do";
			} else {
				// 密码错误
				message = "登录失败！密码错误！";
			}
		} else {
			// 用户名错误
			message = "登录失败！用户名错误！";
		}
		
		// 封装转发的数据
		modelMap.addAttribute("errMsg", message);
		// 执行转发
		return "error";
	}

### 5. 使用Session

#### 5.1. 什么是Session

Http协议是无状态协议，表现为前序请求中产生的数据是不会被留下来，后续的请求无法直接使用前序请求中得到的数据！每次客户端与服务器的交互都是请求与响应，然后就结束了！

Session是应用于服务器端较长时间保存数据的技术，它将数据保存在服务器端的内存中，每个浏览器发出请求时，对应的Session都是唯一的，由于保存的时间较长，所以，可以用于识别用户的身份等。

通常，Session都有15分钟或更长时间的有效期，在此期间内，如果客户端始终与服务器端有交互，则有效期会一直顺延，如果在此期间内没有任何操作，Session会视为超时，即消失，该时间可以由服务器端软件进行设置。

#### 5.2. 什么时候需要使用Session

通常，需要使用Session的应用场景有：

1. 保存用户的身份的唯一标识，例如用户的id；

2. 保存高频率使用的数据，例如用户的用户名和头像等；

3. 不便于使用其它技术或解决方案来传输或存储的数据；

#### 5.3. 使用Session

在控制器中，Session的数据类型是`HttpSession`，使用方式可以完全参数`HttpServletRequest`的使用方式。

### 6. 关于@RequestMapping注解

使用`@RequestMapping`注解可以配置请求路径与处理请求的方法的映射，即某请求路径将由某方法进行处理。

该注解也可以添加在类之前，例如：

	@Controller
	@RequestMapping("user")
	public class UserController {

	}

一旦在类之前添加了该注解，则该类中配置的所有请求路径的左侧都需要添加`user`，即原本`http://localhost:8080/项目名/login.do`的路径就会改为`http://localhost:8080/项目名/user/login.do`。

推荐为每一个控制器类之前都添加`@RequestMapping`，以统一管理该类中各处理请求的方法映射的路径，并解决多种不同类型的数据处理时，设计请求路径时容易发生同名的问题。

在使用`@RequestMapping`配置路径时，不管是添加在类之前的注解，还是添加在方法之前的注解，路径名称的左侧都可以添加`/`符号。所以，在类之前的配置和在方法之前的配置可以例如：

	/user		/login.do
	user		login.do
	/user		login.do
	user		/login.do

以上各种配置都是正确的！在实际使用时，推荐选取第1种或第2种做法，即保证编写的代码的风格是统一的！

关于`@RequestMapping`注解，详细的配置应该是例如：

	@RequestMapping(value="reg.do")
	public String showRegister() {
		return "reg";
	}

该注解的`value`属性的声明是：

	String[] value() default {};

表示该注解可以配置名为`value`的属性，配置时，属性值是`String[]`数组类型的，在配置注解时，如果值是某类型的数组，则值可以直接使用该类型的某个对象，或数组类型的对象，例如：

	@RequestMapping(value="reg.do")

或

	@RequestMapping(value={"reg.do", "register.do"})

可以看到，`value`属性是用于配置请求路径的，如果配置多个值，则表示无论使用哪个路径，都是对应接下来的这个方法的。

在`@RequestMapping`注解中，还可以配置`method`属性，以限制请求方式，例如：

	@RequestMapping(path="handle_reg.do", method=RequestMethod.POST)

即表示该请求路径只能接收POST请求，如果一定以GET方式向该路径发出请求，则会出现405错误：

	HTTP Status 405 – Method Not Allowed

### 作业

1. 阅读`@RequestParam`注解的源代码；

2. 复习：异常；

3. 复习：JavaEE中的过滤器(Filter)。

### ---------------------------------------------

### 附1：枚举

假设需要项目中处理用户的性别，并对某个用户的性别进行判断，可以使用`String`来描述性别的值，即`"男"`或`"女"`。

事实上，并不需要使用`String`，而且使用`String`也不一定符合当前项目的使用需求，如果当前项目是一个幼儿类的APP，最终在界面上显示的可能是`男宝宝`或`女宝宝`，不同的APP对于性别的显示文字都是不同的，所以，直接存储`"男"`或`"女"`并没有太多的事实意义，而且字符串的处理相对更加繁琐。

所以，可以使用数值来表示性别，例如约定好使用1表示男性，使用0表示女性，例如：

	int gender = 1;
	if (gender == 1) {
		System.out.println("男生");
	} else {
		System.out.println("女生");
	}

如果还是使用`String`，则做法就是：

	String gender = "男";
	if ("男".equals(gender)) {
		System.out.println("男生");
	} else {
		System.out.println("女生");
	}

所以，使用数值来表示性别，在处理时比使用`String`更加简便。

在使用时，也并不一定是需要用1表示男性，或必须使用0表示女性，只要整个项目都约定相同的规则，值是多少并不重要，例如约定为100表示男性：

	int gender = 100;
	if (gender == 100) {
		System.out.println("男生");
	} else {
		System.out.println("女生");
	}

如果直接使用数值，并不易于理解代码，更加推荐使用某个量来表示：

	int gender_male = 100;

并在使用时：

	int gender = 100;
	if (gender == gender_male) {
		System.out.println("男生");
	} else {
		System.out.println("女生");
	}

在这个做法中，更关注的就不再是100这个数字，而是`gender_male`这个名称对应的意义。

这个量很可能需要多处使用，为了便于统一使用、一次创建反复使用、常驻内存随时使用，可以：

	public static int gender_male = 100;

由于多处都可以使用这个量，万一某个位置对该量的值进行修改，就会导致程序错误！就会：

	public static final int GENDER_MALE = 100;

这种量可能存在于某个类中，而项目中如果有多个类似用途的量，反复这样声明，语法表现得非常繁琐，为了提高编码效率，可以使用接口，就可以省去声明语句中的`public static final`部分：

	public interface Gender {
		int GENDER_MALE = 100;
		int GENDER_FEMALE = 200;
	}

同时，由于并不关心其数据类型，也关心具体的值是多少，只需要多个值都不同即可，所以，就出现了枚举类型：

	public enum Gender {
		GENDER_MALE, GENDER_FEMALE
	}

枚举类型可以保证其中每个的值都是不冲突，即以上代码中的`GENDER_MALE`和`GENDER_FEMALE`的值一定不同，至于具体是多少，可以不必关心，这些类的类型都是枚举的`Gender`类型。