---
title: Hexo-问题解决篇
photos: /postpageImage/4.jpg
description: 在generator带有数学公式的md文件时报错？
tags:
catagories:
 - 技术
 - 转载
 - Hexo 问题解决
abbrlink: 3969682608
date: 2019-11-17 17:11:21
---
### Q1 - 在generator带有数学公式的md文件时报错？
<img src="/postpageImage/4.jpg"/>
<!--more-->
具体报错信息如下：
{% asset_img 2019-11-17160156.jpg 报错信息 %}

可以看到，根据报错信息提示我们前往官网：
<!--more-->
Ok，let's go to see...

{% asset_img 2019-11-17160736.jpg 官网建议解决方法 %}

可以看出，官网描述的意思大概是文章中有一些不能被其识别的字符，叫我们修改配置文件，明显不是这个原因，具体为何，思考.

然后有去看了一遍错误提示，提示是：

```c
Nunjucks Error:  [Line 102, Column 9] expected variable end
    =====               Context Dump               =====
    === (line number probably different from source) ===
```

`Nunjucks Error:  [Line 102, Column 9] expected variable end`大概是需要某个什么结束的标识，不明白，于是尝试百度了一下错误类型：`Nunjucks Error`结果如下：

{% asset_img 2019-11-17161415.jpg 官网建议解决方法 %}

Ok,到这里大概了解是个什么错了，个人猜测可能是hexo的文章渲染使用的是`Nunjucks`，不支持md文件中的数学公式，该怎么办呢？第一点想到的就是找一个支持这种渲染数学公式的渲染器，ok, let's do it！

继续百度：

{% asset_img 2019-11-17161815.jpg 官网建议解决方法 %}

果然网上有类似的解决方案，详细信息如下：

https://blog.csdn.net/u013282174/article/details/80666123

大概步骤如下（我也不知道行不行，但是试试总是知道的）：

#### step1、更换Hexo的markdown渲染引擎

```java
$ npm uninstall hexo-renderer-marked --save
$ npm -g install hexo-renderer-kramed --save
```

#### step2、解决语义冲突

修改node_modules\kramed\lib\rules\inline.js中的第11行：

```javascript
//  escape: /^\\([\\`\*{}\[\]()#$+\-.!_>])/,
escape: /^\\([`*\[\]()#$+\-.!_>])/,
```

以及第20行：

```javascript
//  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
```

#### step3、安装mathjax插件

```javascript
$ npm install hexo-math --save
```

#### step4、在*主题_config.yml*中添加支持mathjax

```javascript
math:
  enable: true
  # Default(true) will load mathjax/katex script on demand
  # That is it only render those page who has 'mathjax: true' in Front Matter.
  # If you set it to false, it will load mathjax/katex srcipt EVERY PAGE.
  per_page: true
  engine: mathjax
  #engine: katex
```

#### step5、在文章的front-matter中添加mathjax: true（这个步骤不知道有没有用）

```
title: Title
mathjax: true
```

#### step6、重新编译部署

```
$ hexo clean
$ hexo generate
$ hexo s
```

好吧，忙活了这么久，还是报错 !

**问题待解决呀!**

Time: 2019/11/17 17:10



解决篇1：

这个问题后来我仔细的想了一下，最终根据翻阅`github`上别人提供的`issues`加上些个人的理解.

高兴啊！

原因：hexo 的文章渲染使用的是 `Nunjucks` ，他会将 **`{% raw %}{{{% endraw %}`** 识别成自己的语法.

注意，只有这个标识，所以在我的md文件中将所有包含 **`{% raw %}{{{% endraw %}`** 的公式用 {% raw %}**`{% raw %}`  `{% endraw %}`**{% raw %} 包围.

比如说你有一个数学公式，因为我是用 'pandoc' 转的，肯定这个数学公式是被 **`$(具体的数学公式)$`** 这样包围的，然后你需要做的就是在他外面包裹一层

类似于：

{% raw %}**`{% raw %}` $(具体的数学公式)$ `{% endraw %}`**{% endraw %}

最然现在 `hexo g` 不会报错了，但是部署后，数学公式却不能正常的显示！

唉。好不容易解决了一个，又遇到新的问题。我也太难了啊！先去吃个饭，之后再试试解决这个问题！

Time: 2019/11/17 18:51



解决篇2：

在解决问题是很开心的，浪费几个小时的时间终于把这个问题解决了；

要想正确的显示数学公式，我解决这个问题的思路如下：

首先，我的md文件中的数学公式是由`pandoc`自动生成的，所以在安装解释插件时，我选择了`hexo-renderer-pandoc`，最开始根据 **step1** ,我装的是`hexo-renderer-kramed`，所以卸载重装。

```java
$ npm uninstall hexo-renderer-kramed --save
$ npm install hexo-renderer-pandoc --save
```

​	然后`pandoc`需要依赖于`mathjax`，所以上述 **step3** 就又错了，卸载重装

```java
$ npm uninstall hexo-math --save
$ npm install hexo-renderer-mathjax --save
```

支持，重新编译发布，问题完美解决！

**Cheers!**

完工，准备把这一系列发布完，然后洗澡，睡觉，**Nice!**

Time: 2019/11/17 21:54

解决篇三：

在本地`hexo s` 发布后，访问博客，数学公式显示正常，但是一旦`hexo d`发布到远程`Pages`上的时候，访问却出现了异常,简单地说就是页面效果不一致！

唉，又是一个异常，解决`bug`真他妈爽，一个接一个！

思考，为什么显示异常了呢？有可能是由于渲染数学公式的`js`没有加载到，于是**F12** `console`，果然发现了猫腻。

![](批注 2019-11-18 140353.jpg)
{% asset_img 2019-11-18140353.jpg 官网建议解决方法 %}

大概意思就是因为我远程访问开启了`https`,相较于`http`，更为安全，于是`https`访问时他不接受`http`请求响应的`response`，提示信息就说文本请求必须使用`https`。

那好吧，于是我就在请求这个`js`的路径上加上前缀`https`，并且配置在根路径下的`_config.yml`中。具体：

```javascript
math:
  engine: mathjax 
# or 'katex'
  mathjax:
    src: 
      https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-AMS-MML_HTMLorMML
      # "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
  config:
# MathJax config
```

本以为这样就万事大吉了，可是还是显示同样的错误。

可能这样的配置无效，怎么办？

直接把他配置在`JS`里不就行了？`Nice`，于是乎进入`I:\blog\themes\archer\layout\_partial`目录，找到`basehead.ejs`,

然后添加一段`js`,就加载需要的那个`js`文件，具体怎么做：

```javascript
<script type="text/javascript"
     src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML">
</script>
```

然后再次`hexo d`, 数学公式能够正常显示了！

**PERFECT**！

Time: 2019/11/18 14:21

### Q2-Hexo 表格显示异常？

问题还未有效解决...