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
  main.count=6;
  var fid=getVal.fid;
  // 公司头部
  main.postAjaxDatas('/firm/firm-detail',{fid:fid},function(datas){
    console.log(datas);
    var firmHeader = template('firmHeader',datas);
    $('#firm-header').html(firmHeader);
    $('#firm-intro').html(datas.description);
  });
  // 讲师团队
  main.postAjaxDatas('/firm/firm-lecturer',{fid:fid},function(datas){
    console.log(datas);
    var firmLecturer = template('firmLecturer',{list:datas});
    $('#firm-lecturer').html(firmLecturer);
    runFirmLecturer();
  });
  // 课程列表
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/firm/firm-coures',{fid:fid,page:main.pageVal,count:6},function(datas){
      console.log(datas);
      var firmCourse = template('firmCourse',{list:datas});
      $('#firm-course').html(firmCourse);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.length<main.count){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  };
  main.runPostAjaxDatas();
  // 分页
  main.paging('#firm-course li');
  // 轮播
  function runFirmLecturer(){
    var $firmLecturer=$('#firm-lecturer');
    $firmLecturer.on('click','>button',function(){
      $(this).removeClass('no').siblings().addClass('no');
    });
    $firmLecturer.slick({
      slidesToShow: 4,//显示多少个图片
      slidesToScroll:1,//每次滚动几张图片
      arrows: true,//是否显示两边的箭头
      autoplay:false,//是否自动滚动
      autoplaySpeed:3000,//自动播放的速度
      speed: 300,//图片滚动的速度
      infinite: false,//是否无限循环滚动图片
      dots: false,//是否显示图片下面的小点点
      adaptiveHeight: true,//高度自适应
      pauseOnDotsHover:false,//鼠标放上是否滑动
      // rtl: false,//从左到右滚动， 默认是false,true是从右到左
      vertical: false,//是否垂直滚动，默认false不垂直，true为上下滚动
      swipe:true//可以使用鼠标拖拽
    });
  }
});
