define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var pageVal=1;
  // 组列表
  function runPostAjaxDatas(){
    main.postAjaxDatas('/group/join-group',{page:pageVal},function(datas){
      console.log(datas);
      var groupList = template('groupList',{list:datas});
      $('#group-list').html(groupList);
    });
  }
  // 初始化
  runPostAjaxDatas();
  // 分页
  $('.panel-body').on('click','#paging-prev',function(){
    if(pageVal>1){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal--;
      runPostAjaxDatas();
    }
  });
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