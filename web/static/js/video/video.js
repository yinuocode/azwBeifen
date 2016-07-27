define(function(require,exports,module){
  // 引入主要模块模块
  // var search=window.location.search;
  // var ret = search.split('=')[1];
  // 获取get传值
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
  // 封装方法
  function postAjaxDatas(_url,_datas,fSuccess){
    $.ajax({
      type:'post',
      url:_url,
      data:_datas,
      dataType: 'json',
      success: function(datas){
        fSuccess(datas);
      },
      error: function(xml,err){
      }
    });
  }
  /*
    提示用户成功和失败信息，需配合相对应的css使用
    txt：需要告知用户的消息
    state：状态是成功还是失败，接收两个参数 'win' or 'err' 默认为 'win'
  */
  function sitesHint(txt,state){
    $('#site-hint').remove();
    $('body').append('<div id="site-hint" class="clearfix '+state+'">'+txt+'<a href="javascript:;" title="关闭" id="close-hint">×</a></div>');
    var siteHint=$('#site-hint');
    siteHint.slideDown(300,function(){
      var timeObj=setTimeout(function() {
        siteHint.slideUp();
        clearTimeout(timeObj);
      }, 2000);
    });
  }
  $('body').on('click','#close-hint',function(){
    $('#site-hint').slideUp();
  });
  $('.cid').val(getVal.cid);
  // 返回课程详情
  $('#current-course').attr('href','/couresdetail?cid='+getVal.cid+'&type='+getVal.type);
  // 课程基本信息
  postAjaxDatas('/couresdetail/detail',getVal,function(datas){
    userMid=datas.user_id;
    if(datas.type==1){
      $('#course-data-title').html(datas.detail.coures_title);
      $('#grade-star').css('width',datas.detail.score+'%');
    }else{
      $('#course-data-title').html(datas.detail.live_title);
      $('#course-type-video').html('类型：直播');
    }
  });
  // 讲师简介
  postAjaxDatas('/couresdetail/course-teach',getVal,function(datas){
    $('#teacher-name').html(datas.username);
    $('#lecturer-id').val(datas.user_id);
  });
  // 课时
  postAjaxDatas('/couresdetail/hour',getVal,function(datas){
    // datas.cid=getVal.cid;
    // datas.type=getVal.type;
    var hourItemList = template('hourItemList',datas);
    $('#hour-item-list').html(hourItemList);
    var liLessonItem;
    if(getVal.hid){
      liLessonItem=$('.lesson-item.lesson-item-66[data-hid='+getVal.hid+']');
      $('.hid').val(getVal.hid);
    }else{
      liLessonItem=$('.lesson-item.lesson-item-66').eq(0);
      $('.hid').val(liLessonItem.attr('data-hid'));
    }
    liLessonItem.addClass('item-active');
    $('#hour-title').html(liLessonItem.find('.title').html());
    // 页面title
    document.title = liLessonItem.find('.title').html();
    // 视频播放
    // $('#example_video_1_html5_api').attr('src',liLessonItem.attr('data-src'));
    // 加载视频
    var url=liLessonItem.attr('data-src');
    if(url==1){
      sitesHint('该课程需要购买后才能观看！','err');
      // $('#buy-popup').removeClass('hide');
    }else if(url){
      var lessonVideoContent = template('lessonVideoContent',{data:url});
      $('#lesson-video-content').html(lessonVideoContent);
      $.getScript('/static/js/plugins/video/video.min.js');
    }else{
      sitesHint('暂无课程','err');
    }
    runFaqs();
  });
  // 关闭弹窗
  // $('.popup-close,.p-close').on('click',function(){
  //   $('.popup').addClass('hide');
  // });
  // 问答列表
  function runFaqs(){
    postAjaxDatas('/comment/question-list',{hour_id:$('.hid').val()},function(datas){
      template.config("escape", false);
      var faqList = template('faqList',{list:datas});
      $('#faq-list').html(faqList);
    });
  }
  // 调用富文本文件 js
  var editor1;
  window.K = KindEditor;
  K.create('textarea[id="form-comment-nr"]', {
    // width:200,
    afterBlur: function(){this.sync()},
    items : [
      'forecolor', 'bold', 'emoticons', 'image', 'link']
  });
  var editor2;
  window.K = KindEditor;
  K.create('textarea[class="form-richtext"]', {
    // width:200,
    afterBlur: function(){this.sync()},
    items : [
      'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
      'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
      'insertunorderedlist', '|', 'emoticons', 'image', 'link','source']
  });
  // 问答详情
  $('.lesson-pane').on('click','.faq-title',function(){
    var aId=$(this).attr('data-aid');
    $('.lesson-question-plugin-pane').show();
    runAnswer(aId);
  });
  function runAnswer(aid){
    postAjaxDatas('/comment/reply-detail',{answer_id:aid},function(datas){
      template.config("escape", false);
      var answersDetails = template('answersDetails',datas);
      $('#answers-details').html(answersDetails);
      // 回复问题
      $('#add-answer-form').validate({
        onsubmit:true,// 是否在提交时验证
        submitHandler: function(form){
          var data = $('#add-answer-form').serialize();
          $.ajax({
            url : '/comment/reply',
            type : 'post',
            data : data,
            dataType:'json',
            success : function(data){
              if(data.status==1){
                runAnswer(aid);
              }else{
                sitesHint(data.msg,'err');
              }
            }
          });
        }
      });
    });
  }
  // 问答返回
  $('.lesson-pane').on('click','#faq-back',function(){
    runFaqs();
    $('.lesson-question-plugin-pane').hide();
  });
  // 右边切换
  $('#lesson-toolbar-primary').on('click','li',function(){
    var _this=$(this);
    var _index=_this.index();
    _this.addClass('active').siblings().removeClass('active');
    $('.lesson-pane .ps-container').eq(_index).addClass('show').siblings().removeClass('show');
  });
  // 问答
  $('#faq-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#faq-form').serialize();
      $.ajax({
        url : '/comment/question',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            $('#faq-form')[0].reset();
            $('.ke-edit-iframe').contents().find('.ke-content').html('');
            runFaqs();
          }else{
            sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
  // 笔记内容
  postAjaxDatas('/comment/get-comment',{cid:getVal.cid},function(datas){
    if(datas.score){
      $('#star-con').attr('class','star-'+datas.score);
    }
    if(datas.content){
      $('#comment-form .ke-edit-iframe').contents().find('.ke-content').html(datas.content);
      $('#form-comment-nr').val(datas.content);
    }
  });
  // 评论表单
  $('#comment-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#comment-form').serialize();
      $.ajax({
        url : '/comment/comment',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            // $('#comment-form .ke-edit-iframe').contents().find('.ke-content').html('');
            $('#comment-succeed').fadeIn().fadeOut(3500);
          }else{
            sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
  // 笔记内容
  postAjaxDatas('/comment/get-note',{cid:getVal.cid},function(datas){
    template.config('escape', false);
    var noteContent = template('noteContent',{list:datas});
    $('#note-content').html(noteContent);
    var editor3;
    window.K = KindEditor;
    K.create('textarea[id="note-textarea"]', {
      // width:200,
      afterBlur: function(){this.sync()},
      items : [
        'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
        'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
        'insertunorderedlist', '|', 'emoticons', 'image', 'link','source']
    });
  });
  // 笔记表单
  $('#note-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#note-form').serialize();
      $.ajax({
        url : '/comment/mynote',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            $('#note-save').fadeIn().fadeOut(3500);
          }else{
            sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
  // 评论选星
  $('.form-controls .star').hover(function(){
    var i=$(this).attr('data-i');
    $('#star-con').attr('class','star-'+i);
    $('#star-val').val(i);
  });
  // 课程资料
  $('.toolbar-nav').one('click','.glyphicon-download-data',function(){
    postAjaxDatas('/comment/datum',{cid:getVal.cid},function(datas){
      var dataItemList = template('dataItemList',{list:datas});
      $('#data-item-list').html(dataItemList);
    });
  });
  // 下载资料
  $('.period-list').on('click','.download-data',function(){
    var did=$(this).attr('data-did');
    postAjaxDatas('/myteach/downloads',{did:did},function(datas){
    });
  });
  // 二维码
  $('.list-unstyled').on('click',function(){
    $('.qrcode-popover2').toggle();
  });
  // 关闭侧边栏
  $('#close-sidebar').on('click',function(){
    $('.toolbar-pane-container').hide();
  });
  // 打赏
  $('#enjoy-con').on('click',function(){
    $('.enjoy-box').toggle();
  });
  $('.enjoy-m').on('click',function(){
    var dataM=$(this).attr('data-m');
    $('#enjoy-val').val(dataM);
  });
  // 打赏 socket.io
  $('#enjoy-btn').on('click',function(){
    var money=$('#enjoy-val').val();
    var lid=$('#lecturer-id').val();
    if(Number(money)!==0){
      postAjaxDatas('/broadcasting/reward',{money:money,to_user_id:lid,cid:getVal.cid,type:1},function(datas){
        if(datas.status==1){
          $('.enjoy-box').hide();
          $('#enjoy-effect').show().animate({
            bottom:'50%',
            fontSize:30
          },3000,function(){
            $('#enjoy-effect').fadeOut(1000,function(){
              $(this).css({
                'bottom':'4px',
                'font-size':'16px',
                'display':'none'
              });
            });
          });
        }else{
          $('#pay-popup').removeClass('hide');
          sitesHint(datas.msg,'err');
        }
      });
    }else{
      sitesHint('最起码打赏一元吧！','err');
    }
  });
  // 弹幕控制按钮
  $('.bullet-con-btn').on('click',function(){
    $(this).toggleClass('close');
    $('#video-shade').toggle();
  });
});