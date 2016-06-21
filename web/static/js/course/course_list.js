define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var pageVal=1;
  var cClassify='';
  // 按条件查找
  function runPostAjaxDatas(){
    var grade=$('#handle-grade').attr('data-val');
    main.postAjaxDatas('/coures/recorded-list',{page:pageVal,difficulty:grade,classify:cClassify},function(datas){
      var directCourse = template('directCourse',{list:datas});
      $('.direct-course').html(directCourse);
      console.log(datas);
    });
  }
  // 初始化
  runPostAjaxDatas();
  // 下拉菜单
  $('.handle-icon.triangle').on('click',function(){
    $(this).parent().siblings().find('.select-items').removeClass('active');
    $(this).next().toggleClass('active');
  });
  // 类型查找
  $('.select-items').on('click','a',function(){
    var _this=$(this);
    var dataArg=_this.attr('data-arg');
    _this.parent().parent().prev().html(_this.html()).attr('data-val',dataArg);
    $('.select-items').removeClass('active');
    // 执行查找
    runPostAjaxDatas();
  });
  // 分页
  $('#paging-prev').on('click',function(){
    if(pageVal>1){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal--;
      runPostAjaxDatas();
    }
  });
  $('#paging-next').on('click',function(){
    if($('.direct-course>li').length==9){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
  // 分类
  main.getAjaxDatas('/coures/classify',function(datas){
    var panelHeading = template('panelHeading',{list:datas});
    $('.header-tag').html(panelHeading);
  });
  // 标签
  $('.header-tag').on('click','a',function(){
    $(this).parents('.li-tag').addClass('active').siblings().removeClass('active');
    $('.header-tag-sub').removeClass('active');
    $(this).parents('.li-tag').find('.header-tag-sub').addClass('active');
    cClassify=$(this).attr('data-tid');
    runPostAjaxDatas();
  });
  // 发私信
  $('.course-list').on('click','.letter-item',function(){
    $('#user-id').val($(this).attr('data-uid'));
    $('#letter-popup').removeClass('hide');
  });
  // 关闭弹窗
  $('.popup-close').on('click',function(){
    $('.popup').addClass('hide');
  });
  $('#letter-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#invite-form').serialize();
      $.ajax({
        url : '/coures/letter',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            alert('发送成功');
            $('.popup').addClass('hide');
          }else{
            alert(data.msg);
          }
        }
      });
    }
  });
});