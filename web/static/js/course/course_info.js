define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // var search=window.location.search;
  // var cid = search.split('=')[1];
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
  // 课程基本信息
  main.postAjaxDatas('/couresdetail/detail',getVal,function(datas){
    var courseInfo = template('courseInfo',datas);
    $('#course-info').html(courseInfo);
    if(getVal.type==1){
      if(datas.detail.coures_describe!==''){
        $('#course-introduce').html(datas.detail.coures_describe);
      }
      if(datas.detail.coures_title_r!==''){
        $('#course-notice').html(datas.detail.coures_title_r);
      }
    }else{
      if(datas.detail.live_describe!==''){
        $('#course-introduce').html(datas.detail.live_describe);
      }
      if(datas.detail.live_title_r!==''){
        $('#course-notice').html(datas.detail.live_title_r);
      }
    }
    window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"1","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
    console.log(datas);
  });
  // 讲师简介
  main.postAjaxDatas('/couresdetail/course-teach',getVal,function(datas){
    var lecturerModule = template('lecturerModule',datas);
    $('#lecturer-module').html(lecturerModule);
    console.log(datas);
    $('#user-id').val(datas.user_id);
  });
  // 课程评论
  if(getVal.type==1){
    $('#comment-btn').removeClass('hide');
    main.postAjaxDatas('/couresdetail/comment',getVal,function(datas){
      template.config("escape", false);
      var commentList = template('commentList',datas);
      $('.comment-list').html(commentList);
      console.log(datas);
    });
  }
  // 课时
  main.postAjaxDatas('/couresdetail/hour',getVal,function(datas){
    var hourList = template('hourList',datas);
    $('.hour-list').html(hourList);
    console.log(datas);
  });
  // 课时评价切换
  $('#course-about-head').on('click','a',function(){
    var _this=$(this);
    var _index=_this.index();
    _this.addClass('active').siblings().removeClass('active');
    $('#course-about-body .body-item').eq(_index).removeClass('hide').siblings().addClass('hide');
  });
  // 点击登录
  $('.panel-body').on('click','.click-login',function(){
    main.registration(0);
  });
  // 发私信
  $('.panel-body').on('click','#send-letter',function(){
    $('#letter-popup').removeClass('hide');
  });
  // 关闭弹窗
  $('.popup-close').on('click',function(){
    $('.popup').addClass('hide');
  });
  // 私信表单
  $('#letter-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#letter-form').serialize();
      $.ajax({
        url : '/myteach/letter',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          console.log(data);
          if(data.status==1){
            alert('发送成功');
            $('.popup').addClass('hide');
          }else{
            alert(data.msg);
          }
        }
      });
    }
  });
  // 点击购买课程
  $('.panel-body').on('click','#course-buy',function(){
    var _this=$(this);
    var cid=getVal.cid;
    var type=getVal.type;
    var title=_this.attr('data-title');
    getVal.title=title;
    main.postAjaxDatas('/pay/add-order',getVal,function(datas){
      if(datas.status==1){
        window.location.href='pay?cid='+cid+'&type='+type+'&order='+datas.order;
      }else{
        alert(datas.msg);
      }
    });
  });
  // 尚未购买提示
  $('.panel-body').on('click','.no-buy ',function(){
    $('#no-buy-popup').removeClass('hide');
  });
  // 点击收藏
  $('.panel-body').on('click','#collect',function(){
    var _this=$(this);
    main.postAjaxDatas('/couresdetail/enshrine',getVal,function(datas){
      if(datas.status==1){
        _this.attr('id','cancel-collect').html('取消收藏');
      }else{
        alert(datas.msg);
      }
    });
  });
  // 取消收藏
  $('.panel-body').on('click','#cancel-collect',function(){
    var _this=$(this);
    main.postAjaxDatas('/couresdetail/delenshrine',getVal,function(datas){
      if(datas.status==1){
        _this.attr('id','collect').html('点击收藏');
      }else{
        alert(datas.msg);
      }
    });
  });
});
