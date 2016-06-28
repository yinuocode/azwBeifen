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
    console.log(_datas);
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
  // 返回课程详情
  $('#current-course').attr('href','/couresdetail?cid='+getVal.cid+'&type='+getVal.type);
  // 课程基本信息
  postAjaxDatas('/couresdetail/detail',getVal,function(datas){
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
      $('#hid').val(liLessonItem.attr('data-hid'));
    }
    liLessonItem.addClass('item-active');
    $('#hour-title').html(liLessonItem.find('.title').html());
  });
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
    $('.lesson-question-plugin-pane').show();
  });
  // 问答返回
  $('.lesson-pane').on('click','#faq-back',function(){
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
          }else{
            alert(data.msg);
          }
        }
      });
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
            $('#comment-form')[0].reset();
            $('.ke-edit-iframe').contents().find('.ke-content').html('');
          }else{
            alert(data.msg);
          }
        }
      });
    }
  });
  // 笔记表单
  $('#note-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#note-form').serialize();
      $.ajax({
        url : '/comment/note',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            console.log('以保存');
          }else{
            alert(data.msg);
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
});