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
      }
    });
  }
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
  // 课时
  postAjaxDatas('/couresdetail/playback',getVal,function(datas){
    console.log(datas);
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
    // 加载视频
    var url=liLessonItem.attr('data-src');
    if(url==1){
      alert('该课程需要购买后才能观看');
    }else{
      var lessonVideoContent = template('lessonVideoContent',{data:url});
      $('#lesson-video-content').html(lessonVideoContent);
      $.getScript('/static/js/plugins/video/video.min.js');
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
          alert(datas.msg);
        }
      });
    }else{
      alert('最起码打赏一元吧');
    }
  });
  // 弹幕控制按钮
  $('.bullet-con-btn').on('click',function(){
    $(this).toggleClass('close');
    $('#video-shade').toggle();
  });
});