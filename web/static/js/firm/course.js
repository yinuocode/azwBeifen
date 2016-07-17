define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  var home = require('/static/js/home/home');
  // 分页
  // var pageVal=1;
  main.count=12;
  var typeVal=0;
  // 课程列表
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/lectcourfan/lect-coures',{page:main.pageVal,user_id:home.uid,type:typeVal},function(datas){
      var homeCourse = template('homeCourse',{list:datas});
      $('#home-course').html(homeCourse);
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
    main.pageVal=1;
    _this.parent().parent().prev().html(_this.html());
    $('.select-items').removeClass('active');
    // 执行查找
    main.runPostAjaxDatas();
  });
  // 分页
  main.paging('.course-list li');
});
