define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
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
  // 变量
  var gid=getVal.gid;
  $('#group-id').val(gid);
  // 组聊天使用
  var userMid,userName;
  // 分页
  var pageVal=1;
  // 获取组及当前用户信息
  main.postAjaxDatas('/group/into-chat',{gid:gid},function(datas){
    $('#group-name').html(datas.gname.group_name);
    userMid=datas.user_id;
    userName=datas.uname;
    groupChat();
  });
  // 获取组成员信息
  main.postAjaxDatas('/group/group-member',{gid:gid},function(datas){
    $('#group-name').html(datas.name);
    var memberList = template('memberList',{list:datas});
    $('#member-list').html(memberList);
  });
  // 群聊
  function groupChat(){
    // 定义变量
    var chatTextarea = $('.chat-textarea'),
    chatMessages = $('#chat-messages'),
    chatSubmit=$('.chat-submit'),
    socketUrl='http://localhost:8080/',
    iconList = $('#iconlist'),
    flower = $('#flower'),
    socket;
    //让ie9支持createContextualFragment
    if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment) {
      Range.prototype.createContextualFragment = function(html) {
        var frag = document.createDocumentFragment(),div = document.createElement("div");
        frag.appendChild(div);
        div.outerHTML = html;
        return frag;
      };
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
    // 点击显示隐藏表情
    $('.chatbox').on('click','#face',function(event){
      iconList.toggle();
    });
    try{
      socket = io.connect(socketUrl);
    }catch(e){
      //set status to warn user
    }
    if(socket!==undefined){
      //加入教室
      socket.emit('joinGroupRoom',{gid:gid});
      // 输出函数
      socket.on('revealTxt',function(data){
        if(data.gid==gid){
          if(data.name==userName){
            message = '<div class="chat-message"><div class="chat-username hot">'+data.name+'</div><div class="chat-usertext">'+data.message+'</div></div>';
          }else{
            message = '<div class="chat-message"><div class="chat-username">'+data.name+'</div><div class="chat-usertext">'+data.message+'</div></div>';
          }
          //append
          chatMessages.append(message);
        }
        chatMessages.scrollTop(chatMessages[0].scrollHeight);
      });
      // 发送消息
      chatTextarea.on('keydown',function(event){
        if(event.which===13 && event.shiftKey===false){
          if(chatTextarea.html()!==''){
            socket.emit('input',{name:userName,gid:gid,uid:userMid,message:chatTextarea.html()});
            event.preventDefault();
            chatTextarea.html('');
          }
        }
      });
      chatSubmit.on('click',function(event){
        if(chatTextarea.html()!==''){
          socket.emit('input',{name:userName,gid:gid,uid:userMid,message:chatTextarea.html()});
          event.preventDefault();
          chatTextarea.html('');
        }
      });
      // 发送鲜花
      flower.on('click',function(event){
        socket.emit('input',{name:userName,gid:gid,uid:userMid,message:'<img src="http://139.196.195.238/OBSWebClient/imgs/flower.png"/>'});
        event.preventDefault();
      });
    }
  }
  // 获取群动态
  function dynamicList(){
    main.postAjaxDatas('/topic/topic-list',{group_id:gid,page:pageVal},function(datas){
      var groupTalk = template('groupTalk',datas);
      $('#group-talk').html(groupTalk);
      if(datas.topic.length<pageVal*10){
        swit=false;
      }
    });
  }
  dynamicList();
  // 评论
  $('.home-content').on('click','.publish-comment-btn',function(){
    $(this).parent().parent().next().slideToggle();
    var _index=$(this).attr('data-i');
    $('.comment-form'+_index).validate({
      onsubmit:true,// 是否在提交时验证
      submitHandler: function(form){
        var data = $('.comment-form'+_index).serialize();
        $.ajax({
          url : '/topic/inst-topic-comt',
          type : 'post',
          data : data,
          dataType :'json',
          success : function(data){
            if(data.status==1){
              dynamicList();
            }else{
              alert(data.msg);
            }
          }
        });
      }
    });
  });
  // 点赞
  $('.home-content').on('click','.praise-btn',function(){
    var tid=$(this).attr('data-pid');
    main.postAjaxDatas('/topic/inst-like',{tid:tid},function(datas){
      if(datas.status==1){
        dynamicList();
      }else{
        alert(datas.msg);
      }
    });
  });
  // 取消点赞
  $('.home-content').on('click','.cancel-praise-btn',function(){
    var tid=$(this).attr('data-pid');
    main.postAjaxDatas('/topic/del-like',{tid:tid},function(datas){
      if(datas.status==1){
        dynamicList();
      }else{
        alert(datas.msg);
      }
    });
  });
  // 删除话题
  $('.home-content').on('click','.delete-btn',function(){
    var tid=$(this).attr('data-pid');
    if(confirm("确认删除此条动态吗?")){
      main.postAjaxDatas('/topic/del-topic',{tid:tid},function(datas){
        if(datas.status==1){
          dynamicList();
        }else{
          alert(datas.msg);
        }
      });
    }
  });
  // 删除评论
  $('.home-content').on('click','.delete-comment',function(){
    var mid=$(this).attr('data-mid');
    if(confirm("确认删除此条评论吗?")){
      main.postAjaxDatas('/topic/del-comment',{comm_id:mid},function(datas){
        if(datas.status==1){
          dynamicList();
        }else{
          alert(datas.msg);
        }
      });
    }
  });
  // 动态初始化
  // 上传图片
  uploadImg();
  // 发表说说
  $('#publish-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#publish-form').serialize();
      $.ajax({
        url : '/topic/inst-topic',
        type : 'post',
        data : data,
        dataType :'json',
        success : function(data){
          if(data.status==1){
            $('#publish-form')[0].reset();
            $('#fileList,#input-img').html('');
            dynamicList();
          }else{
            alert(data.msg);
          }
        }
      });
    }
  });
  // 上传图片
  function uploadImg(){
    var $list = $('#fileList'),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 260 * ratio,
        thumbnailHeight = 146 * ratio,
    // 初始化Web Uploader
    uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '/static/js/plugins/webupload/Uploader.swf',
        // 文件接收服务端。
        server: "/static/js/plugins/webupload/fileupload.php",
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: $('#filePicker'),
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        fileNumLimit: 2,
        thumb: {
            width: 260,
            height: 146,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 70,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,
            // 是否允许裁剪。
            crop: false,
            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            type: 'image/jpeg'
        }
    });
    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        var $li = $(
                '<li id="' + file.id + '" class="file-item thumbnails">' +
                    '<img>' +
                    '<div class="file-panel"><span class="cancel">删除</span></div>'+
                '</li>'
                ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $list.append( $li );
        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr( 'src', src );
        }, thumbnailWidth, thumbnailHeight );
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress span');
        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo( $li )
                    .find('span');
        }
        $percent.css( 'width', percentage * 100 + '%' );
    });
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file,resporse ) {
        $( '#'+file.id ).addClass('upload-state-done');
        $('#input-img').append('<input type="hidden" name="attach[]" value="'+main.imgPath+'/'+resporse.date+'/'+file.name+'">');
    });
    // 文件上传失败，显示上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');
        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }
        $error.text('上传失败');
    });
    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
    });
  }
  // 删除图片
  $('.home-content').on('click','.cancel',function(){
    var _index=$(this).parent().parent().index();
    $(this).parent().parent().remove();
    $('#input-img input').eq(_index).remove();
  });
  // 滚动条滚动到底部获取数据
  var swit=true;
  $(window).bind('scroll', function() {
    if(swit){
      if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
        pageVal++;
        dynamicList();
      }
    }
  });
});