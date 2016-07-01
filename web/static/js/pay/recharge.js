define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 获取get传值
  main.getAjaxDatas('/wealth/ratio',function(datas){
    console.log(datas);
    $('#account').html(datas.user_id);
    var ratioCount = template('ratioCount',datas);
    $('#ratio-count').html(ratioCount);
    $('#ratio-count').on('click','.btn',function(){
      var money=$(this).attr('data-m');
      $('#money').val(money);
    });
    // 支付方式
    $('.order-detail-bg').on('click','.check',function(){
      var _this=$(this);
      _this.addClass('active').siblings().removeClass('active');
      $('.form-paytype').attr('action',_this.attr('data-url'));
    });
    // var couponVal=getVal;
    // var cPrice=datas.pay_amount;
    // var cTitle=datas.title;
    // var uDeposit=datas.deposit;
    // couponVal.price=cPrice;
    // 点击提交
    $('#submit-buy').on('click',function(){
      var paymoney=$('#money').val();
      if(/^\+?[1-9]\d*$/.test(paymoney)){
        if($('#wxpay').hasClass('active')){
          main.postAjaxDatas('/pay/wechat',{paymoney:paymoney},function(datas){
            $('.form-paytype').attr('action','/pay/wechat-pay?url='+datas).submit();
          });
        }else{
          // main.postAjaxDatas('/pay/use-coupon',{cpid:$('#coupon-id').val()},function(datas){
            $('.form-paytype').submit();
          // });
        }
      }else{
        alert('请输入不为零的整数');
      }
    });
  });
});
