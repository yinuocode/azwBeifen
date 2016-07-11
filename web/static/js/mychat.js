//让ie9支持createContextualFragment
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment) {
  Range.prototype.createContextualFragment = function(html) {
    var frag = document.createDocumentFragment(),div = document.createElement("div");
    frag.appendChild(div);
    div.outerHTML = html;
    return frag;
  };
}
if(navigator.userAgent.indexOf('Firefox')==-1){
  alert('为了更好地使用麦序功能，请使用火狐浏览器打开页面');
}
$(function(){
  // 定义变量
  var chatTextarea = $('.chat-textarea'),
  iconList = $('#iconlist'),
  chatMessages = $('#chat-messages'),
  chatSubmit=$('.chat-submit'),
  face = $('#face'),
  flower = $('#flower'),
  status = $('.chat-status span'),
  statusDefault = status.text(),
  // adminJson = JSON.parse(isAdmin),
  // arrAdminT = [],
  bannedArr = [],
  $bannedState = $('.banned-state'),
  $searchText = $('#chat-search'),
  $studentList = $('#student-list'),
  $giftNum = $('#gift-num'),
  _range,
  socket;
  // 获取管理员的数组
  // for(var i in adminJson) {
  //   arrAdminT.push(adminJson[i].member_id);
  // }
  // 麦序排序按钮
  $('.lecturer-list').on('click','.point-icon',function(){
    $(this).toggleClass('point-icon-off');
  });
  // console.log(arrAdminT);
  // 搜索具体学员
  $searchText.on('input',function() {
    if($(this).val()===''){
      $studentList.find('li').show();
    }else{
      getStorage($(this).val());
    }
  });
  function getStorage(key){
    $studentList.find('li').each(function(i,e){
      var unameText=$(this).find('.username').text();
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
  // 表情输出
  var docFragment = document.createDocumentFragment();
  for (var i = 69; i > 0; i--) {
    var emojiItem = document.createElement('img');
    emojiItem.src = '/static/img/lecture/emoji/' + i + '.gif';
    emojiItem.title = i;
    docFragment.appendChild(emojiItem);
  }
  $('#iconlist').html(docFragment);
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
  var randomId='';
  // 如果是学员页面
  if($('#is-index').val()==1){
    // 我要发言
    var meSpeak = function(cid,uid,uname){
      socket.emit('meSpeak',{cid:cid,uid:uid,uname:uname});
    };
    // 发言完毕
    var endSpeak = function(cid,uid,uname){
      socket.emit('endSpeak',{cid:cid,uid:uid,uname:uname});
    };
    // 触发我要发言
    $('.main-play').on('click','#me-speak',function(){
      if(navigator.userAgent.indexOf('Firefox')!=-1){
        var _this=$(this);
        runMake();
        setTimeout(function() {
          // if(call){
          _this.attr('id','end-speak').addClass('end-speak-stat');
          meSpeak(courseCid,userMid,userName);
          // }
        }, 6000);
      }else{
        alert('请使用火狐浏览器操作麦序');
      }
    });
    // 触发发言完毕
    $('.main-play').on('click','#end-speak',function(){
      $(this).attr('id','me-speak').removeClass('end-speak-stat');
      window.existingCall.close();
      step2();
      endSpeak(courseCid,userMid,userName);
    });
  }else{
    // console.log('讲师页面');
    // 开麦
    var openMake = function(cid,val){
      socket.emit('openMake',{cid:cid,val:val});
    };
    // 禁麦
    var endMake = function(cid){
      socket.emit('endMake',{cid:cid});
    };
    // 麦序控制
    var $iconSpeak=$('.icon-speak'),
    $iconSpeakState=$('.icon-speak-state');
    $('.icon-speak-state,.icon-speak').on('click',function(){
      if(navigator.userAgent.indexOf('Firefox')!=-1){
        if($iconSpeak.toggleClass('icon-speak-off').hasClass('icon-speak-off')){
          // 禁麦
          $iconSpeakState.html('开麦');
          endMake(courseCid);
        }else{
          // 开麦
          runMake();
          setTimeout(function() {
            $iconSpeakState.html('禁麦');
            var _val=$('#my-id').html();
            openMake(courseCid,_val);
          }, 500);
        }
      }else{
        alert('请使用火狐浏览器操作麦序');
      }
    });
  }
  // 礼物
  var showGift=function(cid,uid,uname,gnr,num,gtitle){
    socket.emit('showGift',{cid:cid,uid:uid,uname:uname,gnr:gnr,num:num,gtitle:gtitle});
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
    // console.log(data);
  };
  // 触发ppt改变时间
  $('.thumbs').on('click','li',function(){
    // console.log('传出成功');
    var _index=$(this).index();
    var imgSite =$('#gallery_list li').eq(_index).find('img').attr('src').replace('thumb','source');
    joinroom(courseCid,userMid,userName,dataService,1,imgSite);
  });
  // 触发学员离开房间
  $(window).on('beforeunload',function(){
    leaveroom(courseCid,userMid);
  });
  setStatus('Testing.');
  try{
    socket = io.connect(socketUrl);
  }catch(e){
    //set status to warn user
  }
  // console.log(socket);
  var cid = courseCid;
  if(socket!==undefined){
    joinroom(courseCid,userMid,userName,dataService,0,0);
    socket.on('showcount',function(data){
      $('#count').html(data);
    });
    socket.on('showmember',function(data){
      console.log('触发showmember');
      console.log('-----------------------------------');
      console.log(data);
      var str = '';
      if(data.length){
        bannedArr=[];
        //loop throuth restults
        for(var x=0,len=data.length;x<len;x++){
          //禁言给样式
          var bannedMake='';
          var kickedRoom='';
          var kickedRoom1='';
          if(data[x].sstatus=='1'){
            bannedArr.push(data[x].uid);
            bannedMake='<span class="icon-banned iconfont icon glare" title="取消禁言" data-status="'+data[x].sstatus+'" data-uid="'+data[x].uid+'"></span>';
          }else{
            bannedMake='<span class="icon-banned iconfont icon" title="禁言" data-status="'+data[x].sstatus+'" data-uid="'+data[x].uid+'"></span>';
          }
          if(data[x].kstatus=='1'){
            kickedRoom ='<span class="icon-kicking iconfont icon glare" title="加入房间" data-kstatus="'+data[x].kstatus+'" data-duid="'+data[x].uid+'"></span>';
          }else{
            kickedRoom ='<span class="icon-kicking iconfont icon" title="踢出房间" data-kstatus="'+data[x].kstatus+'" data-duid="'+data[x].uid+'"></span>';
          }
          // 判断是否是管理员
          if(data[x].isman!='0'){
            bannedMake='';
            kickedRoom=kickedRoom1='管理员';
          }
          // 是否是自己
          if(data[x].uid==userMid){
            dUname='<span class="username current"><input type="text" mid="'+data[x].uid+'" id="amend-name" value="'+data[x].uname+'"></span>';
          // }else if(data[x].uid<200){// 是否是会员
          //   dUname='<span class="username" mid="'+data[x].uid+'" title="'+data[x].uname+'">'+data[x].uname+'</span>';
          }else{
            dUname='<span class="username hot" mid="'+data[x].uid+'" title="'+data[x].uname+'">'+data[x].uname+'</span><span class="icon-grade iconfont icon hot">&#xe642;</span>';
          }
          // 判断当前用户是否是管理员
          // console.log(userMid);
          // console.log(userMid.toString()+","+arrAdminT);
          if($.inArray(userMid.toString(),arrAdminT)!=-1){
            str +='<li class="clearfix"><img src="http://placehold.it/32x32" alt="用户名" class="avatar">'+dUname+'<div class="banned-kick rf">'+bannedMake+'&nbsp;&nbsp;'+kickedRoom+'</div></li>';
          }else{
            str +='<li class="clearfix"><img src="http://placehold.it/32x32" alt="用户名" class="avatar">'+dUname+'<div class="rf">'+kickedRoom1+'</div></li>';
          }
        }
      }
      $studentList.html(str);
      getStorage($searchText.val());
      //禁言
      $('#student-list').on('click','.icon-banned',function(event){
        var cid = courseCid;
        var uid = $(this).attr('data-uid');
        if($(this).attr('data-status')==1){
          socket.emit('republish',{uid:uid,cid:cid});
        }else{
          socket.emit('nopublish',{uid:uid,cid:cid});
        }
        event.preventDefault();
      });
      //踢人
      $('#student-list').on('click','.icon-kicking',function(event){
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
    // 我要发言处理
    socket.on('onMeSpeak',function(data){
      $('.lecturer-list').append('<li class="username'+data.uid+'"><span class="username" data-uid="'+data.uid+'">'+data.uname+'</span></li>');
      if(userMid==$('.lecturer-list>li:first-child>.username').attr('data-uid')){
        var call = peer.call(randomId, window.localStream);
        step3(call);
      }
    });
    // 发言完成处理
    socket.on('onEndSpeak',function(data){
      $('.lecturer-list .username'+data.uid).remove();
      window.existingCall.close();
      if($('.lecturer-list>li:first-child>.username').attr('data-uid')==userMid){
        var call = peer.call(randomId, window.localStream);
        step3(call);
      }
    });
    // 如果是学员页面
    if($('#is-index').val()==1){
      // console.log('进入学员页面');
      // 开麦处理
      socket.on('onOpenMake',function(val){
        $('#me-speak,#end-speak').show();
        randomId=val;
      });
      // 关闭麦克
      socket.on('onEndMake',function(){
        $('#me-speak,#end-speak').hide();
      });
      // 礼物显示
      socket.on('onShowGift',function(data){
        // console.log(1234);
        $('#real-satte-span').hide().html(data.uname+'送了'+data.gnr+data.num+'个'+data.gtitle).fadeIn('1000');
      });
    }else{
      // console.log('进入讲师页面');
    }
    // 同步ppt
    socket.on('syncPpt',function(imgSite){
      // console.log('数据返回成功');
      //$('#gallery_list li').eq(_index).css('opacity','1').siblings().css('opacity','0.67');
      //var imgSite =$('#gallery_list li').eq(_index).find('img').attr('src').replace('thumb','source');
      //var imgSite =$('#gallery_list li').eq(_index).find('img').attr('src').replace('thumb','source');
      // console.log(imgSite);
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
      // console.log(data);
      if(data.length){
        //loop throuth restults
        for(var x=0;x<data.length;x++){
          var message = '';
          if(data[x].cid==cid){
          if(data[x].name==userName){
            message = '<div class="chat-message"><div class="chat-username hot">'+data[x].name+'</div><div class="chat-usertext">'+data[x].message+'</div></div>';
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
      var self = this,name=userName;
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
    // 发公告
    $('#notice').on('click',function(event){
      // socket.emit('input',{name:userName,cid:courseCid,uid:userMid,message:'<div class="inform">'+noticeNr+'</div>'});
      socket.emit('input',{name:userName,cid:courseCid,uid:userMid,message:'<div class="inform">'+chatTextarea.html()+'</div>'});
      event.preventDefault();
    });
    // 送礼物
    $('#gift-send').on('click',function(){
      var num=$giftNum.val();
      var lid=$('#lecturer-id').val();
      if(Number(num)!==0){
        if (Number(num)<500) {
          // ajax post 方法
          postAjaxDatas('/broadcasting/send-gift',{gid:giftId,quantity:num,to_user_id:lid},function(datas){
            if(datas.status==1){
              var giftNrs='';
              for(var i=0;i<num;i++){
                giftNrs+=giftNr;
              }
              showGift(courseCid,userMid,userName,giftNr,num,giftTitle);
              socket.emit('input',{name:userName+'<span class="hot">送了'+num+'个'+giftTitle+'</span>',cid:courseCid,uid:userMid,message:giftNrs});
              event.preventDefault();
            }else{
              // console.log(12222222);
              $('#pay-popup').removeClass('hide');
            }
          });
        }else{
          alert('土豪，礼物数不能大于500个，请分批送礼');
        }
      }else{
        alert('最少也要送一个吧');
      }
    });
    // var admire=['你很牛，我看好你','讲的不错，学到了不少东西','拿去花，不谢','有钱，任性'];
    // 打赏 socket.io
    $('#enjoy-btn').on('click',function(){
      var money=$('#enjoy-val').val();
      var lid=$('#lecturer-id').val();
      if(Number(money)!==0){
        postAjaxDatas('/broadcasting/reward',{money:money,to_user_id:lid},function(datas){
          if(datas.status==1){
            // var index=Math.floor((Math.random()*admire.length));
            $('.enjoy-box').hide();
            $('#enjoy-effect').show().animate({
              bottom:'50%',
              fontSize:30
            },4000,function(){
              $('#enjoy-effect').fadeOut(1000,function(){
                $(this).css({
                  'bottom':'4px',
                  'font-size':'16px',
                  'display':'none'
                });
              });
            });
            // showGift(courseCid,userMid,userName,giftNr,num,giftTitle);
            socket.emit('input',{name:userName,cid:courseCid,uid:userMid,message:'<span class="hot">给讲师打赏了'+money+'元'+'</span>'});
          }else{
            $('#pay-popup').removeClass('hide');
          }
        });
      }else{
        alert('最起码打赏一元吧');
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
  face.on('click',function(event){
    iconList.toggle();
  });
  setTimeout(function(){
    updateinfo(courseCid);
  },1200);
  $studentList.on('blur','#amend-name',function(){
    var uid=$(this).attr('mid');
    var uname=$(this).val();
    $.ajax({
      type: 'POST',
      url: '/index.php?r=broadcasting%2Fupbase',
      data: {id:uid,name:uname},
      success: function(){
        // console.log('修改成功！');
      }
    });
  });
});