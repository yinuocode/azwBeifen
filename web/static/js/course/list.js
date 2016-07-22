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
  // var pageVal=1;
  main.count=9;
  var cClassify='';
  var grade='';
  var searchVal=getVal.key||'';
  $('#search-val').val(getVal.key||'');
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/index/all-coures',{page:main.pageVal,difficulty:grade,classify:cClassify},function(datas){
      var listCourse = template('listCourse',{list:datas});
      $('#list-course').html(listCourse);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.length<9){
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
  // 搜索课程
  $('#search-btn').on('click',function(){
    searchCourse();
  });
  $('#search-val').keyup(function (event) {
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