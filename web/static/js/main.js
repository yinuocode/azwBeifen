define(function(require,exports,module){
  // 引入公共模块
  var common = require('common');
  var main={};
  // 配置js 图片上传路径变量
  main.imgPath='http://demo.agodpig.com/static/js/plugins/webupload/upload/';
  // ajax 取数据
  main.getAjaxDatas=function(_url,fSuccess){
    $.ajax({
      type:'post',
      url:_url,
      dataType: 'json',
      success: function(datas){
        fSuccess(datas);
      },
      error: function(xml,err){
        console.log(err);
      }
    });
  };

  // 登录站内信
  main.getAjaxDatas('/index/letter',function(datas){
    var headerLogin = template('headerLogin',datas);
    $('#header-login').html(headerLogin);
  });
  // 友情链接
  main.getAjaxDatas('/index/blogroll',function(datas){
    var fLink = template('fLink',{list:datas});
    $('#f-link').html(fLink);
  });
  // 底部资讯
  main.getAjaxDatas('/index/foot-affiche',function(datas){
    var fNav = template('fNav',{list:datas});
    $('#f-nav').html(fNav);
  });

  // 神猪飞天
  var toTop=$('#toTop');
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 100) {
      toTop.fadeIn(300);
    } else {
      toTop.hide(0);
    }
  });
  toTop.click(function() {
    $('html,body').animate({
      scrollTop: '0'
    }, 600);
    toTop.animate({
      bottom:'100%'
    },1500,function(){
      toTop.css({'bottom':'5%'});
    });
  });
  // 登录
  $('#header-login').on('click','.logout',function(){
    $.post('http://demo.agodpig.com/site/logout',{},function(data){
      if(data){
        location.reload();
      }
    });
  });
  $('#signin-btn').click(function(){
    var data = $('#signin-form').serialize();
    $.ajax({
      url : 'http://demo.agodpig.com/site/login',
      type : 'post',
      data : data,
      success : function(data){
        console.log(data);
        if(data){
          location.reload();
        }else{
          alert(data);
        }
      }
    });
  });
  $('#signup-btn').click(function(){
    var data = $('#signup-form').serialize();
    $.ajax({
      url : 'http://demo.agodpig.com/site/signup',
      type : 'post',
      data : data,
      success : function(data){
        if(data === true){
          location.reload();
        }else{
          alert(data);
        }
      }
    });
  });
  // 登录框弹出
  var $signinForm=$('#signin-form');
  var $signupForm=$('#signup-form');
  $('#header-login').on('click','#login-btn',function(){
    registration(0);
  });
  $('#header-login').on('click','#register-btn',function(){
    registration(1);
  });
  function registration(_index){
    $('#registration').show();
    $('.registration-header h1 span').eq(_index).addClass('active-title').siblings().removeClass('active-title');
    if(_index){
      $signupForm.show();
      $signinForm.hide();
    }else{
      $signinForm.show();
      $signupForm.hide();
    }
  }
  // 登录注册表单验证变量
  var istrueP=false;
  var istrueEP=false;
  var eUsername= $('.e-username');
  var eiUsername= $('#e-username');
  var ePhone=$('#e-phone');
  var iptPwd=$('.ipt-pwd');
  $(function(){
    $('.registration-header h1 span').click(function(){
      $(this).addClass('active-title').siblings().removeClass('active-title');
      $('.registration-form').eq($(this).index()).show().siblings().hide();
      ePhone.focus();eiUsername.focus();
    });
    $('.registration-bg,.rl-close').click(function(){$('#registration').hide();});
    // 验证
    // ePhone.focus();eiUsername.focus();
    eUsername.bind('input blur keydown', function() {
      if($(this).val()===''){
        $(this).addClass('error').next().html('用户名不能为空！').addClass('error');
      }else{
        $(this).removeClass('error').next().removeClass('error').html('');
      }
    });
    iptPwd.bind('blur', function() {
      istrueP=true;
      isPwd($(this));
    });
    iptPwd.bind('input keydown', function() {
      isPwd($(this));
    });
    ePhone.bind('blur', function() {
      istrueEP=true;
      isEPhone($(this));
    });
    ePhone.bind('input keydown', function() {
      isEPhone($(this));
    });
    function isPwd(_this){
      if(istrueP){
        if(/^[\w\W]{6,}$/.test(_this.val())){
          _this.removeClass('error').next().removeClass('error').html('');
        }else{
          _this.addClass('error').next().html('密码不能少于六位！').addClass('error');
        }
      }
    }
    function isEPhone(_this){
      if(istrueEP){
        // 验证是否是手机或者邮箱
        if(/(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)|(^1[3|5|7|8|][0-9]{9}$)/.test(_this.val())){
          _this.removeClass('error').next().removeClass('error').html('');
        }else if(_this.val()===''){
          _this.addClass('error').next().html('邮箱或手机不能为空！').addClass('error');
        }else{
          _this.addClass('error').next().html('输入邮箱或手机格式不正确！').addClass('error');
        }
      }
    }
  });
  // 登录提交验证
  function checkLogin(){
    istrueEP=true;
    istrueP=true;
    if(eUsername.val()===''){
      eUsername.addClass('error').next().html('用户名不能为空！').addClass('error');
      return false;
    }
    if(!(/^[\w\W]{6,}$/.test($('#signin-form').find(iptPwd).val()))){
      $('#signin-form').find(iptPwd).addClass('error').next().html('密码不能少于六位！').addClass('error');
      return false;
    }
  }
  // 注册提交验证
  function checkSignup(){
    istrueEP=true;
    istrueP=true;
    if(/(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)|(^1[3|5|7|8|][0-9]{9}$)/.test(ePhone.val())){
      if($('#signup-form').find(eUsername).val()===''){
        $('#signup-form').find(eUsername).addClass('error').next().html('用户名不能为空！').addClass('error');
        return false;
      }else if(!(/^[\w\W]{6,}$/.test($('#signup-form').find(iptPwd).val()))){
        $('#signup-form').find(iptPwd).addClass('error').next().html('密码不能少于六位！').addClass('error');
        return false;
      }
    }else if(ePhone.val()===''){
      ePhone.addClass('error').next().html('邮箱或手机不能为空！').addClass('error');
      return false;
    }else{
      ePhone.addClass('error').next().html('输入邮箱或手机格式不正确！').addClass('error');
      return false;
    }
  }
  // 登录注册结束

  module.exports=main;
});