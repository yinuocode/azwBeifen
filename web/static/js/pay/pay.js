define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 获取get传值
  function getArgs(){
    var args = {};
    var match = null;
    var search = decodeURIComponent(location.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while((match = reg.exec(search))!==null){
      args[match[1]] = match[2];
    }
    return args;
  }
  var getVal=getArgs();
  // 订单信息
  main.postAjaxDatas('/pay/sel-order',getVal,function(datas){
    console.log(datas);
    var orderPayBody = template('orderPayBody',datas);
    $('.order-pay-body').html(orderPayBody);
    // 支付方式
    $('.order-detail-bg').on('click','.check',function(){
      var _this=$(this);
      _this.addClass('active').siblings().removeClass('active');
      $('.form-paytype').attr('action',_this.attr('data-url'));
    });
    var couponVal=getVal;
    var cPrice=datas.pay_amount;
    var cTitle=datas.title;
    var uDeposit=datas.deposit;
    couponVal.price=cPrice;
    // 优惠券
    main.postAjaxDatas('/pay/coupon',couponVal,function(datas){
      var selectCoupon = template('selectCoupon',{list:datas});
      $('#select-coupon').html(selectCoupon);
      $('#select-coupon').on('change',function(){
        var _this=$(this);
        var id=_this.val();
        $('#coupon-id').val(id);
        var fPrice=_this.find('option:selected').attr('data-price');
        main.postAjaxDatas('/pay/pay-money',{id:id,f_price:fPrice,c_price:cPrice,order:getVal.order},function(datas){
          console.log(datas);
          $('#deal-money').html(datas);
          $('#deal-money-input').val(datas);
        });
      });
    });
    // 点击提交
    $('#submit-buy').on('click',function(){
      var paymoney=$('#deal-money-input').val();
      if($('#site-pay').hasClass('active')){
        if(uDeposit-0>=$('#deal-money-input').val()-0){
          $('.form-paytype').submit();
        }else{
          $('#pay-popup').removeClass('hide');
        }
      }else if($('#wxpay').hasClass('active')){
        main.postAjaxDatas('/pay/wechat',{title:cTitle,paymoney:paymoney},function(datas){
          $('.form-paytype').attr('action','/pay/wechat-pay?url='+datas).submit();
        });
      }else{
        main.postAjaxDatas('/pay/use-coupon',{cpid:$('#coupon-id').val()},function(datas){
          $('.form-paytype').submit();
        });
      }
    });
  });
  // 关闭弹窗
  $('.popup-close,.p-close').on('click',function(){
    $('.popup').addClass('hide');
  });
});
