define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var pageVal=1;
  var typeVal=2;
  var startTime='';
  var endTime='';
  // 按条件查找
  function runPostAjaxDatas(){
    main.postAjaxDatas('/wealth/recharge-list',{type:typeVal,page:pageVal,start_time:startTime,end_time:endTime},function(datas){
      datas.type=typeVal;
      console.log(datas);
      var tableCourseList = template('tableCourseList',datas);
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
  // 下拉菜单
  $('.handle-icon.triangle').on('click',function(){
    $(this).parent().siblings().find('.select-items').removeClass('active');
    $(this).next().toggleClass('active');
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
});
