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
  socketUrl='http://localhost:8080/',
  courseCid= getVal.cid,
  socket;
  // 发送弹幕
  chatTextarea.on('keydown',function(event){
    if(event.which===13 && event.shiftKey===false){
      if(chatTextarea.val()!==''){
        socket.emit('sendText',{cid:courseCid,message:chatTextarea.val()});
        chatTextarea.val('');
        event.preventDefault();
      }
    }
  });
  chatSubmit.on('click',function(event){
    if(chatTextarea.val()!==''){
      console.log(123);
      socket.emit('sendText',{cid:courseCid,message:chatTextarea.val()});
      chatTextarea.val('');
      event.preventDefault();
    }
  });
  try{
    socket = io.connect(socketUrl);
  }catch(e){
    //set status to warn user
  }
  if(socket!==undefined){
    //加入教室
    socket.emit('joinroom',{cid:courseCid});
    // 输出函数
    socket.on('output',function(data){
      if(data.cid==courseCid){
        message = '<div class="chat-message">'+data.message+'</div></div>';
      }
      //append
      videoShade.append(message);
    });
  }
});