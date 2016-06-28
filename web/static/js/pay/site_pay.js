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
              alert('支付成功');
              window.location.href='/couresdetail?cid='+getVal.cid+'&type='+getVal.type;
            }else{
              alert(data.msg);
            }
          }
        });
      }
    }
  });
  // 获取验证码
  var profileMobile=$('#profile-mobile');
  $('#get-code').on('click',function(){
    var _this=$(this);
    if(profileMobile.val()!==''&&!(profileMobile.hasClass('error'))){
      main.postAjaxDatas('/pay/note',{mobile:profileMobile.val()},function(datas){
        var ceshi=datas;
        $('#verify-code').prop('disabled',true);
        getCode(_this);
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
