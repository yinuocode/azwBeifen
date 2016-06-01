//让ie9支持createContextualFragment
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment) {
  Range.prototype.createContextualFragment = function(html) {
    var frag = document.createDocumentFragment(),div = document.createElement("div");
    frag.appendChild(div);
    div.outerHTML = html;
    return frag;
  };
}
$(function(){
  // 定义变量
  var chatTextarea=$('.chat-textarea'),
  iconList=$('#iconlist'),
  chatMessages=$('.chat-messages'),
  chatSubmit=$('.chat-submit'),
  icon=$('#icon'),
  flower=$('#flower'),
  status = $('.chat-status span'),
  chatName = $('.chat-name'),
  statusDefault = status.text(),
  adminJson=JSON.parse(isAdmin),
  arrAdminT=[],
  bannedArr=[],
  $bannedState=$('.banned-state'),
  searchText=$('.chat-search'),
  kickingBox=$('#kicking-box'),
  _range,
  socket;
  // 获取管理员的数组
  for(var i in adminJson) {
    arrAdminT.push(adminJson[i].member_id);
  }
  console.log(arrAdminT);
  // 搜索具体学员
  $('.chat').on('input','.chat-search',function() {
    if($(this).val()===''){
      $('.clear-text').hide();
      kickingBox.find('li').show();
    }else{
      $('.clear-text').show();
      getStorage($(this).val());
    }
  });
  $('.chat').on('click','.clear-text',function(){
    searchText.val('').focus();
    kickingBox.find('li').show();
    $(this).hide();
  });
  function getStorage(key){
    kickingBox.find('li').each(function(i,e){
      var unameText=$(this).find('.uname').text();
      if(unameText.indexOf(key)==-1){
        $(this).hide();
      }else{
        $(this).show();
      }
    });
  }
  // 获取当前鼠标在输入框位置
  function saveRange() {
    var selection = window.getSelection ? window.getSelection() : document.selection;
    range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
    _range = range;
  }
  //锁定编辑器中鼠标光标位置。。
  function _insertimg(str) {
    saveRange();
    var selection=window.getSelection ? window.getSelection() : document.selection;
    if (!window.getSelection) {
      chatTextarea.focus();
      range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
      range.pasteHTML(str);
      range.collapse(false);
      range.select();
    } else {
      chatTextarea.focus();
      selection.addRange(_range);
      range = _range;
      // var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
      range.collapse(false);
      var hasR = range.createContextualFragment(str);
      var hasR_lastChild = hasR.lastChild;
      while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
        var e = hasR_lastChild;
        hasR_lastChild = hasR_lastChild.previousSibling;
        hasR.removeChild(e);
      }
      range.insertNode(hasR);
      if (hasR_lastChild) {
        range.setEndAfter(hasR_lastChild);
        range.setStartAfter(hasR_lastChild);
      }
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  // 光标变化时重新获取位置
  chatTextarea.bind({
    keyup:saveRange,
    mouseup: saveRange,
    change: saveRange
  });
  $('#iconlist img').on('click',function(event){
    chatTextarea.focus();
    _insertimg('<img src="'+$(this).attr("src")+'"/>');
    iconList.hide();
  });
  var setStatus = function(s){
    status.text(s);
    if(s!==statusDefault){
      var delay = setTimeout(function(){
        setStatus(statusDefault);
        clearInterval(delay);
      },3000);
    }
  };
  //加入教室
  var joinroom = function(cid,uid,uname,isman,isNo,_index){
    socket.emit('joinroom',{uid:uid,uname:uname,cid:cid,isman:isman,isNo:isNo,_index:_index});
  };
  var updateinfo = function(cid){
    socket.emit('updateinfo',{cid:cid});
  };
  //离开教室
  var leaveroom = function(cid,uid){
    socket.emit('leaveroom',{uid:uid,cid:cid});
  };
  //获取教室人数
  var showcount = function(data){
    console.log(data);
  };
  // 触发ppt改变时间
  galleryList.on('click','li',function(){
    console.log('传出成功');
    var _index=$(this).index();
    var imgSite =$('#gallery_list li').eq(_index).find('img').attr('src').replace('thumb','source');
    joinroom(courseCid,userMid,userName,dataService,1,imgSite);
  });
  // 触发学员离开房间
  $(window).on('beforeunload',function(){
    leaveroom(courseCid,userMid);
  });
  //setStatus('Testing.');
  try{
    socket = io.connect(socketUrl);
  }catch(e){
    //set status to warn user
  }
  console.log(socket);
  var cid = courseCid;
  if(socket!==undefined){
    joinroom(courseCid,userMid,userName,dataService,0,0);
    socket.on('showcount',function(data){
      $('#count').html(data);
    });
    socket.on('showmember',function(data){
      console.log('触发showmember');
      var str = '';
      if(data.length){
        bannedArr=[];
        //loop throuth restults
        for(var x=0,len=data.length;x<len;x++){
          //禁言给样式
          var bannedMake='';
          var kickedRoom='';
          if(data[x].sstatus=='1'){
            bannedArr.push(data[x].uid);
            bannedMake='<a class="banned" href="javascript:;" data-status="'+data[x].sstatus+'" data-uid="'+data[x].uid+'" style="color:red">取消禁言</a>';
          }else{
            bannedMake='<a class="banned" href="javascript:;" data-status="'+data[x].sstatus+'" data-uid="'+data[x].uid+'">禁言</a>';
          }
          if(data[x].kstatus=='1'){
            kickedRoom ='<a class="black_out" href="javascript:;" data-kstatus="'+data[x].kstatus+'" data-duid="'+data[x].uid+'" style="color:red">加入房间</a>';
          }else{
            kickedRoom ='<a class="black_out" href="javascript:;" data-kstatus="'+data[x].kstatus+'" data-duid="'+data[x].uid+'">踢出房间</a>';
          }
          if($.inArray(data[x].uid,arrAdminT)!=-1){
            bannedMake='';
            kickedRoom='管理员';
          }
          // 是否是自己
          if(data[x].uid==userMid){
            dUname='<span class="lf uname current"><input type="text" mid="'+data[x].uid+'" id="amend-name" value="'+data[x].uname+'"></span>';
          }else{
            dUname='<span class="lf uname">'+data[x].uname+'</span>';
          }
          if($.inArray(userMid,arrAdminT)!=-1){
            str +='<li class="clearfix">'+dUname+'<span class="kicking rf">'+bannedMake+'&nbsp;&nbsp;&nbsp;&nbsp;'+kickedRoom+'</span></li>';
          }else{
            str +='<li class="clearfix">'+dUname+'</li>';
          }
        }
      }
      kickingBox.html(str);
      getStorage(searchText.val());
      //禁言
      $('.banned').click(function(event){
        var self = event.target;
        var cid = courseCid;
        var uid = $(self).attr('data-uid');
        if($(self).attr('data-status')==1){
          socket.emit('republish',{uid:uid,cid:cid});
        }else{
          socket.emit('nopublish',{uid:uid,cid:cid});
        }
        event.preventDefault();
      });
      //踢人
      $('.black_out').click(function(event){
        var self = event.target;
        var cid = courseCid;
        var uid = $(self).attr('data-duid');
        if($(self).attr('data-kstatus')==1){
          socket.emit('allowmember',{cid:cid,uid:uid});
        }else{
          socket.emit('deletemember',{cid:cid,uid:uid});
        }
        event.preventDefault();
      });
    });
    // 同步ppt
    socket.on('syncPpt',function(imgSite){
      console.log('数据返回成功');
      //$('#gallery_list li').eq(_index).css('opacity','1').siblings().css('opacity','0.67');
      //var imgSite =$('#gallery_list li').eq(_index).find('img').attr('src').replace('thumb','source');
      //var imgSite =$('#gallery_list li').eq(_index).find('img').attr('src').replace('thumb','source');
      console.log(imgSite);
      if($('.image-wrapper.current').get(0)){
        $('.advance-link img').attr('src',imgSite);
      }else{
        $('#slideshow').append('<span class="image-wrapper current" style="opacity: 1;"><a class="advance-link" rel="history" title="">&nbsp;<img alt="" src="'+imgSite+'"></a></span>');
      }
    });
    socket.on('updatestatus',function(data){
      $('[data-uid="'+data.uid+'"]').css({'background-color':'red'});
    });
    socket.on('kicks',function(data){
      if(userMid==data){
        location.href='/';
      }
    });
    socket.emit('getdata',{cid:courseCid});
    //listen for output
    socket.on('output',function(data){
      console.log(data);
      if(data.length){
        //loop throuth restults
        for(var x=0;x<data.length;x++){
          var message = '';
          if(data[x].cid==cid){
          if(data[x].name==chatName.val()){
            message = '<div class="chat-message"><div class="chat-username active">'+data[x].name+'</div><div class="chat-usertext">'+data[x].message+'</div></div>';
          }else{
            message = '<div class="chat-message"><div class="chat-username">'+data[x].name+'</div><div class="chat-usertext">'+data[x].message+'</div></div>';
          }
          //append
          chatMessages.append(message);
        }
        }
      }
      chatMessages.scrollTop(chatMessages[0].scrollHeight);
    });
    //listen for a status
    socket.on('status',function(data){
      setStatus((typeof data==='object')?data.message:data);
      if(data.clear===true){
        chatTextarea.html('');
      }
    });
    //listen for keydown
    chatTextarea.on('keydown',function(event){
      var self = this,name=chatName.val();
      if(event.which===13 && event.shiftKey===false){
        if(!bannedJudge()){
          bannedHint();
        }else{
          socket.emit('input',{name:name,cid:courseCid,uid:userMid,message:$(self).html()});
          event.preventDefault();
        }
      }
    });
    chatSubmit.on('click',function(event){
      if(!bannedJudge()){
        bannedHint();
      }else{
        if(chatTextarea.html()!==''){
          socket.emit('input',{name:userName,cid:courseCid,uid:userMid,message:chatTextarea.html()});
          event.preventDefault();
        }
      }
    });
    flower.on('click',function(event){
      if(!bannedJudge()){
        bannedHint();
      }else{
        socket.emit('input',{name:userName,cid:courseCid,uid:userMid,message:'<img src="http://139.196.195.238/OBSWebClient/imgs/flower.png"/>'});
        event.preventDefault();
      }
    });
  }
  // 判断是否禁言
  function bannedJudge(){
    for(var i=0,arr=bannedArr.length;i<arr;i++){
      if(userMid==bannedArr[i]){
        return false;
      }
    }
    return true;
  }
  // 禁言提示
  function bannedHint(){
    $bannedState.fadeIn();
    setTimeout(function() {
      $bannedState.fadeOut();
    },2000);
  }
  // 点击显示隐藏表情
  icon.on('click',function(event){
    iconList.toggle();
  });
  setTimeout(function(){
    updateinfo(courseCid);
  },1200);
  kickingBox.on('blur','#amend-name',function(){
    var uid=$(this).attr('mid');
    var uname=$(this).val();
    $.ajax({
      type: 'POST',
      url: updateNameUrl,
      data: {id:uid,name:uname},
      success: function(){
        console.log('修改成功！');
      }
    });
  });
});