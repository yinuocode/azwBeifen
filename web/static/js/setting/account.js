define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 是否是公司
  main.getAjaxDatas('/firm/is-firm',function(datas){
    if(datas==1){
      $('#apply-lecturer-btn').html('添加讲师').attr('href','/personage/addlecturer');
    }
  });
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
          data.status==1?main.sitesHint('修改成功！'):main.sitesHint(data.msg,'err');
        }
      });
    }
  });
  // 合并账号
  var $formData2 = $('#merge-account-form');
  $formData2.validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $formData2.serialize();
      $.ajax({
        url : '/personage/merge-account',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          data.status==1?main.sitesHint('合并成功！'):main.sitesHint(data.msg,'err');
        }
      });
    }
  });
  // 合并账号失焦
  var mainA1 = $('#main-account1');
  var mainA2 = $('#main-account2');
  var margeAccount = $('#merge-account');
  // 新登录邮箱
  $('#new-email').on('focus',function(){
    var $this = $(this);
    $this.val($.trim($this.val()));
  });
  var margeAccountVal = margeAccount.val();
  margeAccount.on('focus',function(){
    var $this = $(this);
    $this.val($.trim($this.val()));
  });
  margeAccount.on('blur',function(){
    if($(this).val() != margeAccountVal){
      margeAccountVal = $(this).val();
      main.postAjaxDatas('/personage/main',{merge_account:margeAccountVal},function(datas){
        if(datas.status == 1){
          if(datas.msg == 1){
            mainA1.show().prop('checked',true).next().show();
            mainA2.hide().next().hide();
          }else if(datas.msg == 2){
            mainA2.show().prop('checked',true).next().show();
            mainA1.hide().next().hide();
          }else{
            mainA1.show().next().show();
            mainA2.show().next().show();
          }
        }else{
          main.sitesHint(datas.msg,'err');
        }
      });
    }
  });
  // 设置邮箱
  var $formData3 = $('#set-email-form');
  $formData3.validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $formData3.serialize();
      $.ajax({
        url : '/personage/mailset',
        type : 'post',
        data : data,
        success : function(data){
          data.status==1?main.sitesHint('提交成功！'):main.sitesHint(data.msg,'err');
        }
      });
    }
  });
});
