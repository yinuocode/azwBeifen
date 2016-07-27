define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  var ajaxDatas=[
    // banner
    {
      url:'/index/banner',
      fSuccess:function(datas){
        var topBanner = template('topBanner',{list:datas});
        $('#banner').html(topBanner);
        runBanner();
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
    }
  ];
  for(var i=0,len=ajaxDatas.length;i<len;i++){
    main.getAjaxDatas(ajaxDatas[i].url,ajaxDatas[i].fSuccess);
  }

  // 点击财富和入住公司
  $('#bt-treasure').one('click',function(){
    // 财富排行榜
    main.getAjaxDatas('/index/wealth',function(datas){
      var sec03Wealth = template('sec03Wealth',{list:datas});
      $('#sec03-wealth').html(sec03Wealth);
    });
  });
  $('#bt-platform').one('click',function(){
    // 入驻公司
    main.getAjaxDatas('/index/firm',function(datas){
      var sec03Platform = template('sec03Platform',{list:datas});
      $('.sec03-platform').html(sec03Platform);
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
      autoplay:true,//是否自动滚动
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
  // 顶部banner
  function runBanner(){
    $('#banner').slick({
      slidesToShow: 1,//显示多少个图片
      slidesToScroll:1,//每次滚动几张图片
      arrows: false,//是否显示两边的箭头
      autoplay:true,//是否自动滚动
      autoplaySpeed:5000,//自动播放的速度
      speed: 300,//图片滚动的速度
      infinite: true,//是否无限循环滚动图片
      dots: false,//是否显示图片下面的小点点
      adaptiveHeight: true,//高度自适应
      pauseOnDotsHover:false,//鼠标放上是否滑动
      // rtl: false,//从左到右滚动， 默认是false,true是从右到左
      // vertical: true,//是否垂直滚动，默认false不垂直，true为上下滚动
      swipe:true//可以使用鼠标拖拽
    });
  }
  // 搜索方向
  var $searchDirection=$('#search-direction a');
  var $searchClass=$('#search-class');
  $searchDirection.on('click',function(){
    var _this=$(this);
    _this.addClass('active').siblings().removeClass('active');
    $('#search-form').attr('action',_this.attr('data-url'));
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
  // 设置滚动条样式
  $('.sec03-rank').niceScroll({
    cursorborder: '',
    autohidemode: 'leave',
    cursorcolor: '#41B9FF'
  });
});