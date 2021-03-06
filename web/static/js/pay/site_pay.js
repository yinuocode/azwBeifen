define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 获取地址栏url值
  // var search=window.location.search;
  // var urlImg = search.split('=')[1];
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
  $('#order-id').val(getVal.order);
  // 关闭提示
  $('.pay-close').on('click',function(){
    $('.alert-dismissible').hide();
  });
  // 获取手机号
  var profileMobile=$('#profile-mobile');
  main.getAjaxDatas('/pay/phone-show',function(datas){
    if(datas.status==1){
      if(datas.phone){
        profileMobile.val(datas.phone);
      }else{
        main.sitesHint('请先去个人设置里绑定手机号','err');
      }
    }else{
      main.sitesHint(datas.msg,'err');
    }
  });
  // 本站支付
  $('#site-pay-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      if(!($('#verify-code').prop('disabled'))){
        var data = $('#site-pay-form').serialize();
        $.ajax({
          url : '/pay/advance',
          type : 'post',
          data : data,
          dataType:'json',
          success : function(data){
            console.log(data);
            if(data.status==1){
              main.sitesHint('支付成功！');
              window.location.href='/couresdetail?cid='+getVal.cid+'&type='+getVal.type;
            }else{
              main.sitesHint(data.msg,'err');
            }
          }
        });
      }
    }
  });
  // 获取验证码
  $('#get-code').on('click',function(){
    var _this=$(this);
    if(profileMobile.val()!==''&&!(profileMobile.hasClass('error'))){
      main.postAjaxDatas('/pay/note',{mobile:profileMobile.val()},function(datas){
        if(datas.status==1){
          main.sitesHint('请查收验证码！');
          $('#verify-code').prop('disabled',false).focus();
          getCode(_this);
        }else{
          main.sitesHint(datas.msg,'err');
        }
      });
    }
  });
  var countdown=60;
  function getCode(obj) {
    if(countdown===0) {
      obj.prop('disabled',false);
      obj.html('免费获取验证码');
      countdown = 60;
      return;
    } else {
      obj.prop('disabled', true);
      obj.html('重新发送('+countdown+')s');
      countdown--;
    }
    setTimeout(function() {
      getCode(obj);
    },1000);
  }
});
