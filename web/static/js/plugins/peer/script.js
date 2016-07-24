// 是否开麦
// var isMike=false;
// 兼容性垫片
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// PeerJS对象
// var peer = new Peer({ key: 'peerjs', debug: 3});
var peer = new Peer({host:'139.196.195.238',port:9000,path:'/',key:'peerjs',debug:1,config:{'iceServers':[{url:'stun:139.196.195.238:3478'},{url:'turn:139.196.195.238:3478','username':'diti','credential':'123'}]}});
peer.on('open', function(){
  $('#my-id').text(peer.id);
});
// 收到一个视频请求
peer.on('call', function(call){
  // 自动调用流
  call.answer(window.localStream);
  step3(call);
});
peer.on('error', function(err){
  alert(err.message);
  // 如果发生错误,返回步骤2
  step2();
});
// 发言完毕
// $('.main-play').on('click','#end-speak',function(){
//   // isMake=false;
//   window.existingCall.close();
//   step2();
// });
// 如果 getUserMedia 失败重试
$('#step1-retry').click(function(){
  $('#step1-error').hide();
  step1();
});
// 事件开始
step1();
function step1 () {
  // 得到音频/视频流
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    // 设置你的视频显示器
    $('#my-video').prop('src', URL.createObjectURL(stream));
    window.localStream = stream;
    step2();
  }, function(){$('#step1-error').show(); });
}
function step2 () {
  $('#step1').hide();
}
function step3 (call) {
  // 挂在一个现有的电话如果存在
  if (window.existingCall) {
    window.existingCall.close();
  }
  // 等待流调用,然后设置对等视频显示
  call.on('stream', function(stream){
    $('#their-video').prop('src', URL.createObjectURL(stream));
  });
  // UI的东西
  window.existingCall = call;
  $('#their-id').text(call.peer);
  call.on('close', step2);
  $('#step1').hide();
}
