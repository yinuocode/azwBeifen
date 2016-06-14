define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var pageVal=1;
  // 按条件查找
  function runPostAjaxDatas(){
    var typeVal='liveCoures';
    var statusVal=1;
    var timeVal=null;
    main.postAjaxDatas('/coures/live-list',{page:pageVal},function(datas){
      var directCourse = template('directCourse',{list:datas});
      $('.direct-course').html(directCourse);
      console.log(datas);
    });
  }
  // 初始化
  runPostAjaxDatas();
  // 分页
  $('#paging-prev').on('click',function(){
    if(pageVal>1){
      pageVal--;
      runPostAjaxDatas();
    }
  });
  $('#paging-next').on('click',function(){
    if($('.direct-course>li').length==6){
      pageVal++;
      runPostAjaxDatas();
    }
  });
  // 直播标签
  $('.panel-heading a').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
  });
  // 导航选中
  $('.nav>ul>li').eq(1).addClass('active').siblings().removeClass('active');
});