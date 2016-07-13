define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  var home = require('/static/js/home/home');
  // 变量
  // var pageVal=1;
  main.count=13;
  // 粉丝送礼排行
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/lectcourfan/lect-fans',{page:main.pageVal,user_id:home.uid},function(datas){
      console.log(datas);
      var fansWealth = template('fansWealth',{list:datas});
      $('#fans-wealth').html(fansWealth);
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
  main.runPostAjaxDatas();
  // 分页
  main.paging('#fans-wealth tr');
});
