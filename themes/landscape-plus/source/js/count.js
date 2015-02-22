// 总数
var io10blogFirebase = new Firebase("https://io10.firebaseio.com/");
io10blogFirebase.child("sum").on("value", function(data) {
  var current_counter = data.val();
  if( $("#counter").length > 0  && current_counter >1 ){
      $("#counter").html(
   	   	"&nbsp;|&nbsp;本站总访问量&nbsp;<font style='color:white'>"+ current_counter +"</font>&nbsp;次"
       );
  };
});

io10blogFirebase.child("sum").transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});

// 明细
var current_url = decodeURI(window.location.pathname.replace(new RegExp('\\/|\\.', 'g'),"_"));

io10blogFirebase.child("detail/"+current_url).transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});

var n = new Date();
var time = n.getFullYear()+'-'+(n.getMonth()+1)+'-'+n.getDate()+'_'+n.getHours()+':'+n.getMinutes()+':'+n.getSeconds()+' '+n.getMilliseconds();
io10blogFirebase.child("lastupdatetime").set({ timer: time, url: current_url });
