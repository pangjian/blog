title: 基于Firebase的Hexo博客实时访问数统计-未完成
date: 2015-02-27 15:12:06
tags: [技术,firebase,hexo]
photos:
- http://7vzqg8.com1.z0.glb.clouddn.com/realtime-count-firebase/firebase.PNG
---

本来想写一个HEXO的搭建过程的，但是在搜索引擎上一搜一大把教程。看到有人评论：“你写这个跟HEXO官方的教程比好在哪？”仔细想想，说的极好。索性也就不写这个人家已经写烂了的东西了。附一个[官方教程链接](http://hexo.io/docs/)。其实在搭建过程中还参考了一个很全面很详细的博客，也附上链接吧，[ibruce不如](http://ibruce.info/2013/11/22/hexo-your-blog/)。
对于像HEXO这种静态博客来讲，想要做到一些动态的功能就必须得靠第三方支持，比如评论可以使用多说、Disqus。虽然我的blog的访问人数少的可怜，但是我还是希望知道有多少访问量的。于是乎发现了FireBase这个神奇的东西，它是一个制作实时应用的框架，用它来统计访问量绰绰有余啦。它可以做到的就像本博客下面的一样，你可以尝试开启两个本博客窗口，然后刷新其中一个，看看另外一个页面，是不是很神奇？另一个页面的访问量也实时增加了！

<!--more-->

##注册Firebase账号

##创建应用

##Firebase基本用法
Firebase使用JSON存储数据，但是Firebase不支持Arrays数组，它会将数组转换成一个Object对象来存储，就像这样。
```javascript
['a', 'b', 'c', 'd', 'e']
```
会被转换成这样存储
```javascript
{0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e'}
```

##在你的HEXO页面上引入Firebase
在页面的head中引入Firebase的js，
```html
<script src='https://cdn.firebase.com/js/client/2.0.4/firebase.js'></script>
```
为了加速，也可以将这个js放到自己的七牛云存储上。

##增加代码调用Firebase来实现记录访问数
先修改页面的footer用来展示访问记录数，就像这样。当然你可以加在页面的任意位置。
```html
<footer id="footer">
  <% if (theme.sidebar === 'bottom'){ %>
    <%- partial('_partial/sidebar') %>
  <% } %>
  <div class="outer">
    <div id="footer-info" class="inner">
      &copy; <%= date(new Date(), 'YYYY') %> <%= config.author || config.title %><br>
      Powered by <a href="http://hexo.io/" target="_blank">Hexo</a>
      .
      <font id="sum_counter"></font>
      <font id="detail_counter"></font>
    </div>
  </div>
</footer>
```

首先new出自己的Firebase
```javascript
var io10blogFirebase = new Firebase("https://io10.firebaseio.com/");
```
然后获取访问总量以及明细
```javascript
// 明细由当前页面的url表示，将反斜线替换成下划线，并将中文decode出来
var current_url = decodeURI(window.location.pathname.replace(new RegExp('\\/|\\.', 'g'),"_"));
// 获取总数，并将总访问量展示在页面上
io10blogFirebase.child("sum").on("value", function(data) {
  var current_counter = data.val();
  if( $("#sum_counter").length > 0  && current_counter >1 ){
      $("#sum_counter").html(
   	   	"&nbsp;|&nbsp;总访问量&nbsp;<font style='color:white'>"+ current_counter +"</font>&nbsp;次"
       );
  };
});
// 获取明细，并将明细也展示在页面上
io10blogFirebase.child("detail/"+current_url).on("value", function(data){
	var detail_counter = data.val();
	if($("#detail_counter").length > 0 && detail_counter > 1){
		$("#detail_counter").html(
			"&nbsp;本页访问量&nbsp;<font style='color:white'>"+ detail_counter +"</font>&nbsp;次"
		);
	}
});
```
将访问数+1，包括总数和明细
```javascript
// 总数+1
io10blogFirebase.child("sum").transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});
// 明细+1
io10blogFirebase.child("detail/"+current_url).transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});
```