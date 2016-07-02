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
  // 分页
  var pageVal=1;
  var cClassify='';
  var grade='';
  var searchVal=getVal.key||'';
  $('#search-val').val(getVal.key||'');
  // 按条件查找
  function runPostAjaxDatas(){
    main.postAjaxDatas('/index/all-coures',{page:pageVal,difficulty:grade,classify:cClassify},function(datas){
      var listCourse = template('listCourse',{list:datas});
      $('#list-course').html(listCourse);
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
    grade=_this.attr('data-arg');
    _this.parent().parent().prev().html(_this.html());
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
  // 课程标签
  $('.header-tag').on('click','a',function(){
    $(this).parents('.li-tag').addClass('active').siblings().removeClass('active');
    $('.header-tag-sub').removeClass('active');
    $(this).parents('.li-tag').find('.header-tag-sub').addClass('active');
    cClassify=$(this).attr('data-tid');
    runPostAjaxDatas();
  });
  // 搜索课程
  $('#search-btn').on('click',function(){
    searchCourse();
  });
  $('input').keyup(function (event) {
    if (event.keyCode == '13') {
      searchCourse();
    }
  });
  // 搜索方法
  function searchCourse(){
    searchVal=$('#search-val').val();
    main.postAjaxDatas('/index/coures-search',{search:searchVal},function(datas){
      var listCourse = template('listCourse',{list:datas});
      $('#list-course').html(listCourse);
      console.log(datas);
    });
  }
  if(getVal.key){
    searchCourse();
  }
});