define(function(require,exports,module){
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
        console.log(err);
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
      $('#grade-star').attr('class','lf star-'+datas.detail.score);
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
  // 回放列表
  postAjaxDatas('/couresdetail/playback',getVal,function(datas){
    console.log(datas);
    var hourItemList = template('hourItemList',datas);
    $('#hour-item-list').html(hourItemList);
    var liLessonItem;
    if(getVal.vid){
      liLessonItem=$('.lesson-item.lesson-item-66[data-vid='+getVal.vid+']');
    }else{
      liLessonItem=$('.lesson-item.lesson-item-66').eq(0);
    }
    liLessonItem.addClass('item-active');
    $('#hour-title,title').html(liLessonItem.find('.title').html());
    // 加载视频
    var url=liLessonItem.attr('data-src');
    if(url==1){
      sitesHint('该课程需要购买后才能观看！','err');
    }else if(url){
      var lessonVideoContent = template('lessonVideoContent',{data:url});
      $('#lesson-video-content').html(lessonVideoContent);
      $.getScript('/static/js/plugins/video/video.min.js');
    }else{
      sitesHint('暂无回放内容','err');
    }
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
      postAjaxDatas('/broadcasting/reward',{money:money,to_user_id:lid,cid:getVal.cid,type:0},function(datas){
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