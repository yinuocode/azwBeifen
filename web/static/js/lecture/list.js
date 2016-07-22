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
  var cClassify=1;
  var searchVal=getVal.key||'';
  $('#search-val').val(getVal.key||'');
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/lecturer/teach-list',{page:main.pageVal,classify:cClassify,search:searchVal},function(datas){
      var lecturerList = template('lecturerList',datas);
      $('.lecture-list').html(lecturerList);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.data.length<9){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  };
  // 初始化
  main.runPostAjaxDatas();
  // 类型选择
  $('.panel-heading').on('click','a',function(){
    $(this).addClass('active').siblings().removeClass('active');
    cClassify=$(this).attr('data-type');
    main.pageVal=1;
    main.runPostAjaxDatas();
  });
  // 分页
  main.paging('.lecture-list li');
  // 发私信
  $('.lecture-list').on('click','.letter-item',function(){
    $('#user-id').val($(this).attr('data-uid'));
    $('#letter-popup').removeClass('hide');
  });
  // 关注
  $('.lecture-list').on('click','.attention',function(){
    var dataUid=$(this).attr('data-uid');
    main.postAjaxDatas('/lecturer/attention',{user_id:dataUid},function(datas){
      if(datas.status==1){
        main.runPostAjaxDatas();
      }else{
        main.sitesHint(datas.msg,'err');
      }
    });
  });
  // 未登录点击关注
  $('.lecture-list').on('click','.attention-login',function(){
    main.registration(0);
  });
  // 未登录点击发私信
  $('.lecture-list').on('click','.letter-item-login',function(){
    main.registration(0);
  });
  // 取消关注
  $('.lecture-list').on('click','.cancel-attention',function(){
    var dataUid=$(this).attr('data-uid');
    main.postAjaxDatas('/lecturer/del-attention',{user_id:dataUid},function(datas){
      main.runPostAjaxDatas();
    });
  });
  // 关闭弹窗
  $('.popup-close').on('click',function(){
    $('.popup').addClass('hide');
  });
  // 私信表单
  $('#letter-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#letter-form').serialize();
      $.ajax({
        url : '/myteach/letter',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            main.sitesHint('发送成功！');
            $('#letter-form')[0].reset();
            $('.popup').addClass('hide');
          }else{
            main.sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
  // 搜索讲师
  $('#search-btn').on('click',function(){
    main.pageVal=1;
    searchVal=$('#search-val').val();
    main.runPostAjaxDatas();
  });
  $('#search-val').keyup(function (event) {
    if (event.keyCode == "13") {
      main.pageVal=1;
      searchVal=$('#search-val').val();
      main.runPostAjaxDatas();
    }
  });
});