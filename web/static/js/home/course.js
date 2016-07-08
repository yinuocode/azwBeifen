define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  var home = require('/static/js/home/home');
  // 分页
  var pageVal=1;
  var typeVal=0;
  // 课程列表
  function runPostAjaxDatas(){
    main.postAjaxDatas('/lectcourfan/lect-coures',{page:pageVal,user_id:home.uid,type:typeVal},function(datas){
      console.log(datas);
      var homeCourse = template('homeCourse',{list:datas});
      $('#home-course').html(homeCourse);
    });
  }
  runPostAjaxDatas();
  // 下拉菜单
  $('.handle-icon.triangle').on('click',function(){
    $(this).parent().siblings().find('.select-items').removeClass('active');
    $(this).next().toggleClass('active');
  });
  $('.select-items a').on('click',function(){
    $('.select-items').removeClass('active');
  });
  // 类型查找
  $('.select-items').on('click','a',function(){
    var _this=$(this);
    typeVal=_this.attr('data-arg');
    _this.parent().parent().prev().html(_this.html());
    $('.select-items').removeClass('active');
    // 执行查找
    runPostAjaxDatas();
  });
  // 分页
  $('#paging-prev').on('click',function(){
    if(pageVal>1){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal--;
      runPostAjaxDatas();
    }
  });
  $('#paging-next').on('click',function(){
    if($('.course-list li').length==12){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
});
