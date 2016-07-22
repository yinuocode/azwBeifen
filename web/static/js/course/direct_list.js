define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  // var pageVal=1;
  // 一页显示多少条
  main.count=9;
  var cClassify='';
  var grade='';
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/curriculum/live-list',{page:main.pageVal,difficulty:grade,classify:cClassify},function(datas){
      var directCourse = template('directCourse',{list:datas});
      $('.direct-course').html(directCourse);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.length<main.count){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  };
  // 初始化
  main.runPostAjaxDatas();
  // 下拉菜单
  $('.handle-icon.triangle').on('click',function(){
    $(this).parent().siblings().find('.select-items').removeClass('active');
    $(this).next().toggleClass('active');
  });
  // 类型查找
  $('.select-items').on('click','a',function(){
    var _this=$(this);
    grade=_this.attr('data-arg');
    main.pageVal=1;
    _this.parent().parent().prev().html(_this.html());
    $('.select-items').removeClass('active');
    // 执行查找
    main.runPostAjaxDatas();
  });
  // 分页
  main.paging('.course-list li');
  // 分类
  main.getAjaxDatas('/coures/classify',function(datas){
    var panelHeading = template('panelHeading',{list:datas});
    $('.header-tag').html(panelHeading);
  });
  // 课程标签
  $('.header-tag').on('click','.li-tag>a',function(){
    $('.header-tag-sub a').removeClass('active');
    $(this).parents('.li-tag').addClass('active').siblings().removeClass('active');
    $('.header-tag-sub').removeClass('active');
    $(this).parents('.li-tag').find('.header-tag-sub').addClass('active');
    cClassify=$(this).attr('data-tid');
    main.pageVal=1;
    main.runPostAjaxDatas();
  });
  // 子类选择
  $('.header-tag').on('click','.header-tag-sub>li>a',function(){
    console.log(1234);
    $('.header-tag-sub a').removeClass('active');
    $(this).addClass('active');
    cClassify=$(this).attr('data-tid');
    main.pageVal=1;
    main.runPostAjaxDatas();
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
            main.sitesHint('发送成功！');
            $('.popup').addClass('hide');
          }else{
            main.sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
  // 导航选中
  $('.nav>ul>li').eq(1).addClass('active').siblings().removeClass('active');
});