define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var cClassify=1;
  main.count=9;
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/curriculum/recommend-coures',{page:main.pageVal,classify:cClassify},function(datas){
      var directCourse = template('directCourse',{list:datas});
      $('.direct-course').html(directCourse);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.length<9){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  };
  // 初始化
  main.runPostAjaxDatas();
  // 类型选择
  $('.panel-heading').on('click','a',function(){
    $(this).addClass('active').siblings().removeClass('active');
    main.pageVal=1;
    cClassify=$(this).attr('data-type');
    main.runPostAjaxDatas();
  });
  // 分页
  main.paging('.course-list li');
});