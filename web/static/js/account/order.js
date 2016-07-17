define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  // var pageVal=1;
  main.count=13;
  var startTime='';
  var endTime='';
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/account/myorder',{page:main.pageVal,start_time:startTime,end_time:endTime},function(datas){
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
      // 日期搜索
      var start = {
        elem: '#startDate',
        max: '2099-06-16 23:59:59', //最大日期
        istime: true,
        istoday: false,
        choose: function(datas){
          end.min = datas; //开始日选好后，重置结束日的最小日期
          end.start = datas; //将结束日的初始值设定为开始日
        }
      };
      var end = {
        elem: '#endDate',
        max: '2099-06-16 23:59:59',
        istime: true,
        istoday: false,
        choose: function(datas){
          start.max = datas; //结束日选好后，重置开始日的最大日期
        }
      };
      laydate(start);
      laydate(end);
    });
  };
  // 初始化
  main.runPostAjaxDatas();
  // 分页
  main.paging('#table-course-list tr');
  // 日期查询
  $('#date-submit').on('click',function(){
    main.pageVal=1;
    startTime=$('#startDate').val();
    endTime=$('#endDate').val();
    main.runPostAjaxDatas();
  });
  // 删除评论
  $('.order-table').on('click','.delete-order',function(){
    var oid=$(this).attr('data-oid');
    if(confirm("确认删除此条订单吗?")){
      main.postAjaxDatas('/account/del-order',{oid:oid},function(datas){
        if(datas.status==1){
          main.runPostAjaxDatas();
        }else{
          alert(datas.msg);
        }
      });
    }
  });
});
