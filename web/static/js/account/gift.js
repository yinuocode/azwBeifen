define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 加载礼物
  main.getAjaxDatas('/account/my-gift',function(datas){
    console.log(datas);
    var getGiftList = template('getGiftList',{list:datas});
    $('#get-gift-list').html(getGiftList);
  });
});
