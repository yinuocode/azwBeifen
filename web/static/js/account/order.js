define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var pageVal=1;
  var startTime='';
  var endTime='';
  // 按条件查找
  function runPostAjaxDatas(){
    main.postAjaxDatas('/account/myorder',{page:pageVal,start_time:startTime,end_time:endTime},function(datas){
      console.log(datas);
      var tableCourseList = template('tableCourseList',{list:datas});
      $('#table-course-list').html(tableCourseList);
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
  }
  // 初始化
  runPostAjaxDatas();
  // 分页
  $('#paging-prev').on('click',function(){
    if(pageVal>1){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal--;
      runPostAjaxDatas();
    }
  });
  $('#paging-next').on('click',function(){
    if($('#table-course-list tr').length==13){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
  $('#date-submit').on('click',function(){
    startTime=$('#startDate').val();
    endTime=$('#endDate').val();
    runPostAjaxDatas();
  });
  // 删除评论
  $('.order-table').on('click','.delete-order',function(){
    var oid=$(this).attr('data-oid');
    if(confirm("确认删除此条订单吗?")){
      main.postAjaxDatas('/account/del-order',{oid:oid},function(datas){
        if(datas.status==1){
          runPostAjaxDatas();
        }else{
          alert(datas.msg);
        }
      });
    }
  });
});
