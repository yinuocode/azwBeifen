define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  var home = require('/static/js/home/home');
  // 简介
  main.postAjaxDatas('/home/introp',{user_id:home.uid},function(datas){
    console.log(datas);
    var homeIntro = template('homeIntro',datas);
    $('#home-intro').html(homeIntro);
  });
});
