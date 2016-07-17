define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  // var pageVal=1;
  main.count=13;
  // 组列表
  function runPostAjaxDatas(){
    main.postAjaxDatas('/group/join-group',{page:main.pageVal},function(datas){
      var groupList = template('groupList',{list:datas});
      $('#group-list').html(groupList);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.length<main.count-1){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  }
  // 初始化
  runPostAjaxDatas();
  // 分页
  main.paging('#table-course-list tr');
  $('.panel-body').on('click','#paging-next',function(){
    if($('#group-list tr').length==13){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
  // 退出组
  $('.panel-body').on('click','.exit-group',function(){
    var groupId=$(this).attr('data-gid');
    if(confirm('您确定要退出这个组吗?')){
      main.postAjaxDatas('/group/del-group',{gid:groupId},function(datas){
        console.log(datas);
        // 局部刷新
        runPostAjaxDatas();
      });
    }
  });
});