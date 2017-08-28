##鲨鱼辣椒无情对集句系统
####系统背景

从古诗句开始有时候会发现两句诗有异曲同工之妙，觉得很是有趣。比如“胸藏文墨怀若谷，腹有诗书气自华”，“寂寞空庭春欲晚，似曾相识燕归来”，“飞雪连天射白鹿，笑书神侠倚碧鸳”。而网上现在没有一款这样的工具，于是自己设计开发了一套这样的系统。

系统功能包括注册、登录、对诗句的增删改查的操作以及通过给诗句定义属性进行无情对的匹配，还包括每个用户收藏，点赞，评论功能，每个用户的信息存储在不同位置，清除的记录每个用户的偏好以及操作。匹配是根据每个诗句的词性，长短，重复等在数据库中查询符合条件的诗句，组成“无情对”。与传统系统不同的是，集句系统的诗句组合没有特定的id，用户的操作声称不一样的组合，系统完成动态匹配。

####开发过程
整个系统全部独立开发，全部使用原生JavaScript，无任何依赖。前端实现过程中使用了Canvas动画，iconfont，Flex布局，分页等方式进行更好的界面开发。登录注册增删改查数据搜索诗句匹配等信息全部使用原生Ajax+PHP+MySQL异步获取数据,在收藏，赞同，评论，自动登录模块使用了LocalStorage本地存储的方式实现。

####系统展示

* 首先，从网页的背景开始，背景是星空，流星，和行星的动态效果，使用canvas动画效果实现，星球的鼠标滚动渐变使用JavaScript的window.onscroll事件加上CSS3动画效果实现。

<img src="http://imglf0.nosdn.127.net/img/MmQvM3dNRWZieElpRSt6YkRaQ3B0dVhxYlNkdHhsYzgxMExzKzFyYWVqSlg4eEtKcWJOY0hnPT0.png?imageView&thumbnail=1920y949&type=jpg&quality=96&stripmeta=0&type=jpg">

* 网页的小图标使用iconfont字体图标，展示部分使用了flex布局，根据定义的数组随机生成图标。

<img src="http://imglf1.nosdn.127.net/img/MmQvM3dNRWZieEpTYTdJVUlqWUlaNWpidC9SemJKRWVFQm55cWpZenRSY0VUS1lxMFl2WEVRPT0.png?imageView&thumbnail=1920y949&type=jpg&quality=96&stripmeta=0&type=jpg">

* 注册验证部分，通过JavaScript事件代理通过查询用户名与数据库的匹配和与注册规则的匹配。

<img src="http://imglf0.nosdn.127.net/img/MmQvM3dNRWZieElpRSt6YkRaQ3B0dlZqS3kzQlduVFJsK1orVXhyRWFUaWh5THNRWEt1SmlnPT0.png?imageView&thumbnail=1920y949&type=jpg&quality=96&stripmeta=0&type=jpg">

* 登录，通过原生Ajax查询数据库得到账号密码匹配。下次打开网页时自动登录

<img src="http://imglf.nosdn.127.net/img/MmQvM3dNRWZieElpRSt6YkRaQ3B0dUdielhVUDduMWlKOGhEZ24rYWtjQS93a3dZNkRUeUx3PT0.png?imageView&thumbnail=1920y949&type=jpg&quality=96&stripmeta=0&type=jpg">

* 诗句和作者搜索，通过原生Ajax和PHP异步查询用户输入的诗句与MySQL数据库中诗句的属性的匹配，并返回数据在展示区显示出来。

<img src="http://imglf2.nosdn.127.net/img/MmQvM3dNRWZieElpRSt6YkRaQ3B0cTNmMUNSdU5NeDNOQXE3WkRpcXZ0SCtyMUoyQldzM253PT0.png?imageView&thumbnail=1920y949&type=jpg&quality=96&stripmeta=0&type=jpg">

* 收藏夹和点赞。用户对诗句进行收藏和点赞时，系统会产生红色的标识。再次点击取消。用户对诗句的点击通过LocalStorage本地存储存储在浏览器端，在搜索时如果有相同的诗句组合也会有所记录。

<img src="http://imglf1.nosdn.127.net/img/MmQvM3dNRWZieElpRSt6YkRaQ3B0aEFSZ1h1Y3hMQjIzbGRxRDI4TVBUYi9ucjAyNVo2czN3PT0.png?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg">

* 收藏夹查看，用户对自己收藏的无情对的查看和移除。收藏夹的显示与无情对展示区的标识是同步的。

<img src="http://imglf2.nosdn.127.net/img/MmQvM3dNRWZieElpRSt6YkRaQ3B0dklsa01SRlVOVmQrQjdQbTdaTW1LV0V3U1hZS0hDb0x3PT0.png?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg">

* 评论功能，用户的评论同样通过LocalStorage本地存储的方式。用户可以看到不同用户对诗句组合的评论。

<img src="http://imglf0.nosdn.127.net/img/MmQvM3dNRWZieElpRSt6YkRaQ3B0cGN6b1RUanZJalhHazhzcmlPVk55Y2s4ZndESTFBMWd3PT0.png?imageView&thumbnail=1920y949&type=jpg&quality=96&stripmeta=0&type=jpg">

* 分页,在查询数据较多时，分为六条一页。

<img src="http://imglf1.nosdn.127.net/img/MmQvM3dNRWZieElpRSt6YkRaQ3B0blM3WVdxQy9HN1QwTk9KUHF1U3hpV1N2MGlvSXkvVFBRPT0.png?imageView&thumbnail=1920y949&type=jpg&quality=96&stripmeta=0&type=jpg">