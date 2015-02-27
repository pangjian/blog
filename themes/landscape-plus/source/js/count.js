
var io10blogFirebase = new Firebase("https://io10.firebaseio.com/");

// 获取总数，并将总访问量展示在页面上
io10blogFirebase.child("sum").on("value", function(data) {
  var current_counter = data.val();
  if( $("#counter").length > 0  && current_counter >1 ){
      $("#counter").html(
   	   	"&nbsp;|&nbsp;本站总访问量&nbsp;<font style='color:white'>"+ current_counter +"</font>&nbsp;次"
       );
  };
});

// 总数+1
io10blogFirebase.child("sum").transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});

// 明细由当前页面的url表示，将反斜线替换成下划线，并将中文decode出来
var current_url = decodeURI(window.location.pathname.replace(new RegExp('\\/|\\.', 'g'),"_"));

// 明细+1
io10blogFirebase.child("detail/"+current_url).transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});


// 记录最后更新时间
var n = new Date();
var time = n.getFullYear()+'-'+(n.getMonth()+1)+'-'+n.getDate()+'_'+n.getHours()+':'+n.getMinutes()+':'+n.getSeconds()+' '+n.getMilliseconds();
io10blogFirebase.child("lastupdatetime").set({ timer: time, url: current_url });
