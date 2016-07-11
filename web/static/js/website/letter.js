define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var typeVal=1;
  var pageVal=1;
  var noRead=0;
  // 按条件查找
  function runPostAjaxDatas(){
    main.postAjaxDatas('/website/letter-list',{classify:typeVal,page:pageVal},function(datas){
      console.log(datas);
      var tableCourseList = template('tableCourseList',datas);
      $('#table-course-list').html(tableCourseList);
      noRead=datas.no_read;
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
    $('.handle-icon.invite').addClass('hide');
    var _this=$(this);
    typeVal=_this.attr('data-arg');
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
    if($('#table-course-list tr').length==10){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
  // 查看全部
  $('.table-course').on('click','.rcvd',function(){
    var _this=$(this);
    var lid=_this.attr('data-lid');
    main.postAjaxDatas('/website/is-read',{lid:lid},function(datas){
      _this.parent().prev().find('.name').removeClass('hot');
    });
    _this.removeClass('rcvd');
    noRead--;
    if(noRead===0){
      $('.web-letter').remove();
    }else{
      $('.web-letter').html(noRead);
    }
  });
  $('.table-course').on('click','.look-all',function(){
    if($(this).html()=='查看全部'){
      $(this).html('收起');
    }else{
      $(this).html('查看全部');
    }
    $(this).parent().parent().next().slideToggle();
  });
  // 回复私信
  $('.table-course').on('click','.reply-letter',function(){
    var uid=$(this).attr('data-uid');
    $('#user-id').val(uid);
    $('#letter-popup').removeClass('hide');
  });
  // 删除
  $('.table-course').on('click','.delete-letter',function(){
    var lid=$(this).attr('data-lid');
    if(confirm('您确定要删除吗?')){
      main.postAjaxDatas('/website/del-letter',{lid:lid},function(datas){
        if(datas.status==1){
          window.location.reload();
          // runPostAjaxDatas();
          // noRead--;
          // if(noRead===0){
          //   $('.web-letter').remove();
          // }else{
          //   $('.web-letter').html(noRead);
          // }
        }else{
          alert(datas.msg);
        }
      });
    }
  });
  // 关闭弹窗
  $('.popup-close').on('click',function(){
    $('.popup').addClass('hide');
  });
  // ajax提交
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
            $('.popup').addClass('hide');
          }
        }
      });
    }
  });
});
