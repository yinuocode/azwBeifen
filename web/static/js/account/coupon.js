define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  // var pageVal=1;
  main.count=13;
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/wealth/my-coupon',{page:main.pageVal},function(datas){
      var tableCourseList = template('tableCourseList',{list:datas});
      $('#table-course-list').html(tableCourseList);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.length<main.count-1){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  };
  // 初始化
  main.runPostAjaxDatas();
  // 分页
  main.paging('#table-course-list tr');
});
