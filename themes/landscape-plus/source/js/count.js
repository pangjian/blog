
var io10blogFirebase = new Firebase("https://io10.firebaseio.com/");

// 明细由当前页面的url表示，将反斜线替换成下划线，并将中文decode出来
var current_url = decodeURI(window.location.pathname.replace(new RegExp('\\/|\\.', 'g'),"_"));

// 获取总数，并将总访问量展示在页面上
io10blogFirebase.child("sum").on("value", function(data) {
  var current_counter = data.val();
  if( $("#sum_counter").length > 0  && current_counter >1 ){
      $("#sum_counter").html(
   	   	"总访问量&nbsp;<font style='color:white'>"+ current_counter +"</font>&nbsp;次"
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

// 总数+1
io10blogFirebase.child("sum").transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});


// 明细+1
io10blogFirebase.child("detail/"+current_url).transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});


// 记录最后更新时间
var n = new Date();
var time = n.getFullYear()+'-'+(n.getMonth()+1)+'-'+n.getDate()+'_'+n.getHours()+':'+n.getMinutes()+':'+n.getSeconds()+' '+n.getMilliseconds();
io10blogFirebase.child("lastupdatetime").set({ timer: time, url: current_url });



var io10blogVisitorCounter = new Firebase("https://visitorcount.firebaseio.com/");

var visitorFP = canvasFP.getFP();

io10blogVisitorCounter.child(visitorFP).transaction(function (counter) {
  return (counter || 0) + 1;
});

io10blogVisitorCounter.child(visitorFP).on("value",function(data){
  count_value = data.val();
  if(count_value > 1){
    //这是你第n次访问本站啦
    if($("#welcome_counter").length > 0){
      $("#welcome_counter").html("这是你第&nbsp;"+count_value+"&nbsp;次访问本站啦");
    }
  } else{
    //欢迎你第一次访问本站
    if($("#welcome_counter").length > 0){
      $("#welcome_counter").html("欢迎你第一次访问本站");
    }
  }
});