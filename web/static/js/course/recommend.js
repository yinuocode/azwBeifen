define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var pageVal=1;
  var cClassify=1;
  // 按条件查找
  function runPostAjaxDatas(){
    var grade=$('#handle-grade').attr('data-val');
    main.postAjaxDatas('/curriculum/recommend-coures',{page:pageVal,classify:cClassify},function(datas){
      var directCourse = template('directCourse',{list:datas});
      $('.direct-course').html(directCourse);
      console.log(datas);
    });
  }
  // 初始化
  runPostAjaxDatas();
  // 类型选择
  $('.panel-heading').on('click','a',function(){
    $(this).addClass('active').siblings().removeClass('active');
    cClassify=$(this).attr('data-type');
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
    if($('.direct-course>li').length==9){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
});