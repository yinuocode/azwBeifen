define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
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
  $('#user-id').val(getVal.uid);
  // home head
  function runHead(){
    main.postAjaxDatas('/home/my-home',{user_id:getVal.uid},function(datas){
      datas.uid=getVal.uid;
      var homeHeader = template('homeHeader',datas);
      $('#home-header').html(homeHeader);
    });
  }
  runHead();
  // 登录站内信
  main.getAjaxDatas('/index/letter',function(datas){
    var courseHead = template('courseHead',datas);
    $('#course-head1').html(courseHead);
    $('#course-head1 a').each(function(){
      $(this).attr('href',$(this).attr('href')+'?uid='+getVal.uid);
    });
  });
  // 点击登录
  $('.home-head').on('click','.click-login',function(){
    main.registration(0);
  });
  // 发私信
  $('.home-head').on('click','#send-letter',function(){
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
  // 关注
  $('.home-head').on('click','#attention',function(){
    main.postAjaxDatas('/lecturer/attention',{user_id:getVal.uid},function(datas){
      runHead();
    });
  });
  // 取消关注
  $('.home-head').on('click','#cancel-attention',function(){
    main.postAjaxDatas('/lecturer/del-attention',{user_id:getVal.uid},function(datas){
      runHead();
    });
  });
  // 签到
  $('.home-head').one('click','#user-signin',function(){
    var _this=$(this);
    main.postAjaxDatas('/home/check-in',{user_id:getVal.uid},function(datas){
      console.log(datas);
      if(datas.status==1){
        var signinSpan=_this.find('.signin-span');
        signinSpan.show().animate({
          top:-50,
          opacity:0
        },1000,function(){
          signinSpan.parent().html('已签到');
        });
      }else{
        alert(datas.msg);
      }
    });
  });
  // uid
  var home={};
  home.uid=getVal.uid;
  module.exports=home;
});
