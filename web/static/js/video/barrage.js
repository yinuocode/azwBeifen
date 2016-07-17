// 获取get参数
function getArgs(){
  var args = {};
  var match = null;
  var search = decodeURIComponent(location.search.substring(1));
  var reg = /(?:([^&]+)=([^&]+))/g;
  while((match = reg.exec(search))!==null){
    args[match[1]] = match[2];
  }
  return args;
}
var getVal=getArgs();
$(function(){
  // 定义变量
  var chatTextarea = $('.chat-textarea'),
  videoShade = $('#video-shade'),
  chatSubmit=$('.chat-submit'),
  socketUrl='http://139.196.195.238:8089/',
  courseCid= getVal.cid,
  socket;
  // 发送弹幕
  chatTextarea.on('keydown',function(event){
    if(event.which===13 && event.shiftKey===false){
      if(chatTextarea.val()!==''){
        socket.emit('sendText',{cid:courseCid,uid:userMid,message:chatTextarea.val()});
        chatTextarea.val('');
        event.preventDefault();
      }
    }
  });
  chatSubmit.on('click',function(event){
    if(chatTextarea.val()!==''){
      socket.emit('sendText',{cid:courseCid,uid:userMid,message:chatTextarea.val()});
      chatTextarea.val('');
      event.preventDefault();
    }
  });
  try{
    socket = io.connect(socketUrl);
  }catch(e){
    //set status to warn user
  }
  var colorArr=['red','blue','green','#fff','yellow'];
  if(socket!==undefined){
    //加入教室
    socket.emit('joinroom',{cid:courseCid});
    // 输出函数
    socket.on('output',function(data){
      var color=Math.floor((Math.random()*colorArr.length));
      if(data.cid==courseCid){
        message = '<div class="chat-message chat-message'+data.uid+data.i+'" style="color:'+colorArr[color]+'">'+data.message+'</div></div>';
        videoShade.append(message);
        var setMsgs='setMsg'+data.uid+data.i;
        newThread(setMsgs,data);
      }
      //append
    });
  }
  // 开启一个新线程
  function newThread(setMsgs,data){
    var i=0;
    setMsgs=setInterval(function() {
      i+=3;
      if(i<videoShade.width()-100){
        $('.chat-message'+data.uid+data.i).css('margin-right',i+'px');
      }else{
        // 关闭线程
        clearInterval(setMsgs);
        $('.chat-message'+data.uid+data.i).remove();
      }
    }, 50);
  }
});