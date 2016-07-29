define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 获取手机号
  var profileMobile=$('#profile-mobile');
  // 本站支付
  var phoneForm = $('#bind-phone-form');
  phoneForm.validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      if(!($('#verify-code').prop('disabled'))){
        var data = phoneForm.serialize();
        $.ajax({
          url : '/personage/binding',
          type : 'post',
          data : data,
          dataType:'json',
          success : function(data){
            console.log(data);
            if(data.status==1){
              main.sitesHint('绑定成功！');
              window.location.reload();
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
    var mobile = profileMobile.val();
    if(mobile !== '' && !(profileMobile.hasClass('error'))){
      main.postAjaxDatas('/personage/get-authcode',{mobile:mobile},function(datas){
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
  // 修改密码
  var $formData1 = $('#set-password-form');
  $formData1.validate({
    // 验证两次输入密码是否相同
    rules: {
      form_newPassword: "required",
      form_confirmPassword: {
        equalTo: "#form_newPassword"
      }
    },
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $formData1.serialize();
      $.ajax({
        url : '/personage/changepassword',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            alert('修改成功！');
            window.location.href='/';
          }else{
            main.sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
});
