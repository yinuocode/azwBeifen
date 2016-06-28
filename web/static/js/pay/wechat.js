define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 获取地址栏url值
  var search=window.location.search;
  var urlImg = search.split('=')[1];
  urlImg='http://paysdk.weixin.qq.com/example/qrcode.php?data='+urlImg;
  $('#erweima').attr('src',urlImg);
  // 获取get传值
  // function getArgs(){
  //   var args = {};
  //   var match = null;
  //   var search = decodeURIComponent(location.search.substring(1));
  //   var reg = /(?:([^&]+)=([^&]+))/g;
  //   while((match = reg.exec(search))!==null){
  //     args[match[1]] = match[2];
  //   }
  //   return args;
  // }
  // var getVal=getArgs();
  $('.pay-close').on('click',function(){
    $('.alert-dismissible').hide();
  });
  // $('#code-img').qrcode(urlImg);
    // $("#sub_btn").click(function(){

    // });
  // $('#code-img').empty();
  // str = toUtf8(urlImg);
  // $('#code-img').qrcode({
  //   render: 'div',
  //   width: 210,
  //   hegiht:200,
  //   text: str
  // });
  // function toUtf8(str) {
  //   var out, i, len, c;
  //   out = "";
  //   len = str.length;
  //   for(i = 0; i < len; i++) {
  //     c = str.charCodeAt(i);
  //     if ((c >= 0x0001) && (c <= 0x007F)) {
  //       out += str.charAt(i);
  //     } else if (c > 0x07FF) {
  //       out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
  //       out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
  //       out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
  //     } else {
  //       out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
  //       out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
  //     }
  //   }
  //   return out;
  // }
});
