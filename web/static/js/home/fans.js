define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  var home = require('/static/js/home/home');
  // 变量
  var pageVal=1;
  // 粉丝送礼排行
  function runPostAjaxDatas(){
    main.postAjaxDatas('/lectcourfan/lect-fans',{page:pageVal,user_id:home.uid},function(datas){
      console.log(datas);
      var fansWealth = template('fansWealth',{list:datas});
      $('#fans-wealth').html(fansWealth);
    });
  }
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
    if($('.lecture-list>li').length==13){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
});
