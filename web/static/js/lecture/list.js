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
  var cClassify=1;
  var searchVal=getVal.key||'';
  $('#search-val').val(getVal.key||'');
  // 按条件查找
  function runPostAjaxDatas(){
    main.postAjaxDatas('/lecturer/teach-list',{page:pageVal,classify:cClassify,search:searchVal},function(datas){
      var lecturerList = template('lecturerList',datas);
      $('.lecture-list').html(lecturerList);
      console.log(datas);
    });
  }
  // 初始化
  runPostAjaxDatas();
  // 类型选择
  $('.panel-heading').on('click','a',function(){
    $(this).addClass('active').siblings().removeClass('active');
    cClassify=$(this).attr('data-type');
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
    if($('.lecture-list>li').length==12){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
  // 发私信
  $('.lecture-list').on('click','.letter-item',function(){
    $('#user-id').val($(this).attr('data-uid'));
    $('#letter-popup').removeClass('hide');
  });
  // 关注
  $('.lecture-list').on('click','.attention',function(){
    var dataUid=$(this).attr('data-uid');
    main.postAjaxDatas('/lecturer/attention',{user_id:dataUid},function(datas){
      runPostAjaxDatas();
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
      runPostAjaxDatas();
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
            alert('发送成功');
            $('#letter-form')[0].reset();
            $('.popup').addClass('hide');
          }else{
            alert(data.msg);
          }
        }
      });
    }
  });
  // 搜索讲师
  $('#search-btn').on('click',function(){
    searchVal=$('#search-val').val();
    runPostAjaxDatas();
  });
  $('input').keyup(function (event) {
    if (event.keyCode == "13") {
      searchVal=$('#search-val').val();
      runPostAjaxDatas();
    }
  });
});