define(function(require,exports,module){
  // 页面公共模块
  // 引入 modernizr 判断 H5C3 支持情况
  var Modernizr = require('modernizr');
  // 如果是 ie9 及以下
  if(!Modernizr.csstransitions){
    $.getScript('/static/js/polyfills/jquery-placeholder.min.js');
  }
  // 如果是 ie8
  if((!Modernizr.canvas)&&(Modernizr.hashchange)){
    $.getScript('/static/js/polyfills/selectivizr.min.js');
  }
  // 检测浏览器版本 ie8及以下浏览器顶部会出现提示
  if(!$.support.leadingWhitespace) {
    $.getScript('/static/js/polyfills/excanvas.js');
    $('body').append('<div id="upgrade" style="text-align:center;position: fixed;height: 30px;top: 0;width:100%;background: #FDF2D3;color: #333;font-size:12px;line-height:30px;z-index: 1000000000;">您的浏览器版本过低。为保证最佳学习体验，<a href="http://cdn.dmeng.net/upgrade-your-browser.html" target="_blank">请更新或更换高版本浏览器</a><a href="javascript:;" id="close-upgrade" style="position: absolute;right:10px;top:0px;">以后再说 X </a></div>');
  }
  // 浏览器升级按钮
  $('body').on('click','#close-upgrade',function(){
    $('#upgrade').slideUp(200).remove();
  });
});