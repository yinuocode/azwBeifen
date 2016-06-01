define(function(require,exports,module){
  // 引入公共模块
  var common = require('./common.js');


  var ajaxDatas=[
    // 登录站内信
    {
      url:'/index/letter',
      fSuccess:function(datas){
        var headerLogin = template('headerLogin',datas);
        $('#header-login').html(headerLogin);
      }
    },
    // banner
    {
      url:'/index/banner',
      fSuccess:function(datas){
        $('.top-banner').html('<a href="'+datas[0].img_address+'" target="_blank"><img src="'+datas[0].src+'" width="100%" alt="'+datas[0].img_title+'"></a>');
      }
    },
    // 公告
    {
      url:'/index/affiche',
      fSuccess:function(datas){
        var noticeList = template('noticeList',{list:datas});
        $('#notice-list').html(noticeList);
        runNotice();
      }
    },
    // 讲师
    {
      url:'/index/lecturer',
      fSuccess:function(datas){
        var sec01Side = template('sec01Side',{list:datas});
        $('#sec01-side').html(sec01Side);
        runLecturerSide();
      }
    },
    // 推荐课程
    {
      url:'/index/coures',
      fSuccess:function(datas){
        var courseList = template('courseList',{list:datas});
        $('#course-list').html(courseList);
      }
    },
    // 魅力排行榜
    {
      url:'/index/charm',
      fSuccess:function(datas){
        var sec03Charm = template('sec03Charm',{list:datas});
        $('#sec03-charm').html(sec03Charm);
      }
    },
    // 友情链接
    {
      url:'/index/blogroll',
      fSuccess:function(datas){
        var fLink = template('fLink',{list:datas});
        $('#f-link').html(fLink);
      }
    },
    // 底部资讯
    {
      url:'/index/foot-affiche',
      fSuccess:function(datas){
        var fNav = template('fNav',{list:datas});
        $('#f-nav').html(fNav);
      }
    }
  ];
  for(var i=0,len=ajaxDatas.length;i<len;i++){
    getAjaxDatas(ajaxDatas[i].url,ajaxDatas[i].fSuccess);
  }
  // ajax 取数据
  function getAjaxDatas(_url,fSuccess){
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
  }
  // 点击财富和入住公司
  $('#bt-treasure').one('click',function(){
    // 财富排行榜
    getAjaxDatas('/index/wealth',function(datas){
      var sec03Wealth = template('sec03Wealth',{list:datas});
      $('#sec03-wealth').html(sec03Wealth);
    });
  });
  $('#bt-platform').one('click',function(){
    // 入驻公司
    getAjaxDatas('/index/firm',function(datas){
      var sec03Platform = template('sec03Platform',{list:datas});
      $('.sec03-platform').html(sec03Platform);
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

  // 轮播
  function runLecturerSide(){
    var $sec01RfSide=$('.sec01-rf-side');
    $sec01RfSide.on('click','>button',function(){
      $(this).removeClass('no').siblings().addClass('no');
    });
    $sec01RfSide.slick({
      slidesToShow: 3,//显示多少个图片
      slidesToScroll:1,//每次滚动几张图片
      arrows: true,//是否显示两边的箭头
      autoplay:false,//是否自动滚动
      autoplaySpeed:3000,//自动播放的速度
      speed: 300,//图片滚动的速度
      infinite: true,//是否无限循环滚动图片
      dots: false,//是否显示图片下面的小点点
      adaptiveHeight: true,//高度自适应
      pauseOnDotsHover:false,//鼠标放上是否滑动
      // rtl: false,//从左到右滚动， 默认是false,true是从右到左
      vertical: true,//是否垂直滚动，默认false不垂直，true为上下滚动
      swipe:true//可以使用鼠标拖拽
    });
  }
  // 顶部公告
  function runNotice(){
    var noticetop1=0;
    var $noticeList=$('#notice-list');
    var $noticeListH=$noticeList.outerHeight();
    $noticeList.html($noticeList.html()+$noticeList.html());
    setInterval(function() {
      if(noticetop1>=$noticeListH){
        noticetop1=0;
        $noticeList.css('marginTop',0);
      }
      noticetop1+=24;
      $noticeList.animate({
        marginTop:-noticetop1
      },800);
    }, 5000);
  }
  // 搜索方向
  var $searchDirection=$('#search-direction a');
  var $searchClass=$('#search-class');
  $searchDirection.on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
    $searchClass.val($(this).attr('val'));
  });
  // 排行榜切换
  var $sec03BtItem=$('.sec03-bt .item');
  var $sec03TopItem=$('.sec03-top-item');
  $sec03BtItem.on('click',function(){
    var $this=$(this);
    var _index=$this.index();
    $this.addClass('active').siblings().removeClass('active');
    $sec03TopItem.eq(_index).addClass('active').siblings().removeClass('active');
  });
  // 请求页面数据

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
});