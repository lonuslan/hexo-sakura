---
title: Spring第三天
tags:
  - Spring
categories:
  - Spring
abbrlink: 55169
date: 2019-05-31 09:19:53
---
### Spring

#### 主要作用

Spring的主要作用是创建和管理对象。

#### 通用注解

在Spring中的通用注解有：@Component、@Controller、@Service、@Repository，这4个注解的使用方式与作用是完全相同的！当需要Spring管理某个类的对象时，需要将类添加到组件扫描的包下，并添加以上注解中的任意一个即可。通常，应该根据语义进行区分使用，即控制器类应该使用@Controller注解，业务类应该使用@Service，持久层的类应该使用@Repository，而其它定位的组件类应该使用@Component。

#### 管理Bean的相关注解

使用@Scope可以配置是否单例，例如@Scope("prototype")就是非单例的，默认是@Scope("singleton")表示单例。

使用@Lazy可以配置懒加载，即懒汉式的单例模式，默认为@Lazy(false)，如果希望是懒加载的，则配置为@Lazy(true)。

使用@PostConstruct和@PreDestroy配置生命周期方法，前者是初始化方法，后者是销毁时的方法，这2个注解是JavaEE环境中的，需要添加Tomcat环境才可以使用这2个注解。

#### 自动装配的注解

假设在UserServlet类中依赖了UserDao，这2个类都是由Spring框架进行管理的（组件扫描+注解），则需要自动装配值时，在属性之前添加@Autowired注解即可：

	@Controller
	public class UserServlet {
		
		@Autowired
		private UserDao userDao;
		
		public void reg() {
			System.out.println("UserServlet.reg()");
			userDao.reg();
		}
	
	}

这种自动装配方式并不是使用SET注入来实现的，所以，对应的属性不需要有SET方法，框架在实现时是通过反射机制直接为属性赋值的。

由于是通过反射机制实现的，所以，被自动装配的属性也不需要给出公开的访问权限，使用private修饰属性即可。

另外，使用@Resource注解也可以实现相同的效果，该注解是JavaEE环境中的，在使用之前，必须保证当前项目添加了Tomcat环境。

@Resource注解是优先byName来装配，如果失败，则byType来装配，如果也失败，则抛出异常。@Autowired注解是优先byType的，且并不会在第一时间就完成装配，而是判断匹配类型的对象有多少个，如果有且仅有1个类型匹配的对象，则直接装配，如果超过1个，则尝试byName来装配，如果无法根据byName来装配，则会抛出异常。

在实际使用时，选取以上2个注解中的任意一个均可！



	
