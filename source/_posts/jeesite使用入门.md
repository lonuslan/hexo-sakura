---
title: jeesite使用入门
tags:
  - jeesite
catagories:
 - 技术
 - 转载
photos: 1564555326141.png
abbrlink: 9125
date: 2019-07-31 15:13:12
---
### 1、下载及环境准备

#### 1.1、jeesite介绍

{% asset_img 1564555326141.png 这是一个新的博客的图片的说明 %}
<!--more-->
官网地址：[https://jeesite.gitee.io/](https://jeesite.gitee.io/)



[点击源码下载，跳转到git码云。](https://gitee.com/thinkgem/jeesite4)



将源码clone到本地，打开idea



![1564555602504](1564555602504.png)
{% asset_img 1564555602504.png idea %}



点击open,选择down下来的源码根目录，之后进入idea主界面



![1564555750439](1564555750439.png)
{% asset_img 1564555750439.png 主界面 %}


首先介绍一下jeesite的源码目录结构，也可以自己查看官方提供的**README.MD**文档。



jeesite源码的结构大致说下：

1. ​	common : jeesite工具类在这个包下 . 

2. ​    modules ：包含核心core模块.

3. ​    parent：自己添加的模块需要以此为parent.

4. ​    root：顶级parent 根.

5. ​    web ：自己要做的二次开发可在此模块进行.

将添加进来的jeesite项目，在每个模块的***<u>pom.xml**</u>*文件单机右键选择添加为***<u>maven**</u>*项目：

之后将web模块下db包下面的数据库脚本文件导入数据库，在web模块下resources/config找到配置文件，修改对应的数据库密码，数据库名等。windows下 windows+shift+n 搜索 Appllication.java. 右键运行 run application。



> 浏览器输入: localhost:8080/js  到登录界面



--- 超级管理员：    system           密码：  admin         

--- 普通管理员:       admin            密码:     admin

--- 普通用户:           user(?)            初始密码：123456