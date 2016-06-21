define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var pageVal=1;
  // 按条件查找
  function runPostAjaxDatas(){
    var typeVal=$('#handle-course').attr('data-val');
    var timeVal=$('#handle-date').attr('data-val');
    main.postAjaxDatas('/coures/my-study',{type:typeVal,time:timeVal,page:pageVal},function(datas){
      console.log(datas);
      var studyCourse = template('studyCourse',{list:datas});
      $('.study-course').html(studyCourse);
    });
  }
  // 初始化
  runPostAjaxDatas();
  // 下拉菜单
  $('.handle-icon.triangle').on('click',function(){
    $(this).parent().siblings().find('.select-items').removeClass('active');
    $(this).next().toggleClass('active');
  });
  $('.select-items a').on('click',function(){
    $('.select-items').removeClass('active');
  });
  // 选择操作目标
  $('#controlAll').on('click',function(){
    $('.select-checkbox').show();
    var checklist = document.getElementsByName("selected");
    var len=checklist.length;
    if(document.getElementById("controlAll").checked){
      for(var i=0;i<len;i++){
        checklist[i].checked = 1;
        $('.select-checkbox').eq(i).addClass('active');
      }
    }else{
      for(var j=0;j<len;j++){
        checklist[j].checked = 0;
        $('.select-checkbox').eq(j).removeClass('active');
      }
    }
  });
  $('.study-course').on('click','input[name="selected"]',function(){
    $(this).parent().toggleClass('active');
  });
  // 批处理
  $('#handle-batch').on('click',function(){
    $('.select-checkbox').toggle();
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
    if($('.course-list li').length==9){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
  // 删除
  $('#handle-delete').on('click',function(){
    var $selected=$('input[name="selected"]:checked');
    var cid1=[];
    var cid2=[];
    if($selected.length>0){
      if(confirm('您确定要删除吗?')){
        for(var i=0,len=$selected.length;i<len;i++){
          if($selected.eq(i).attr('data-type')==0){
            cid2.push($selected.eq(i).val());
          }else{
            cid1.push($selected.eq(i).val());
          }
        }
        main.postAjaxDatas('/coures/study-delete',{cid1,cid2},function(datas){
          console.log(datas);
          // 循环删除
          // for(var j=0,lens=$selected.length;j<lens;j++){
          //   $selected.eq(j).parent().parent().remove();
          // }
          // 局部刷新
          runPostAjaxDatas();
        });

      }
    }else{
      alert('请选择您要删除的课程');
    }
  });
  // 发私信
  // $('.course-list').on('click','.letter-item',function(){
  //   $('#user-id').val($(this).attr('data-uid'));
  //   $('#letter-popup').removeClass('hide');
  // });
  // // 关闭弹窗
  // $('.popup-close').on('click',function(){
  //   $('.popup').addClass('hide');
  // });
  // $('#letter-form').validate({
  //   onsubmit:true,// 是否在提交时验证
  //   submitHandler: function(form){
  //     var data = $('#invite-form').serialize();
  //     $.ajax({
  //       url : '/coures/invite-letter',
  //       type : 'post',
  //       data : data,
  //       dataType:'json',
  //       success : function(data){
  //         if(data.status==1){
  //           alert('发送成功');
  //           $('.popup').addClass('hide');
  //         }else{
  //           alert(data.msg);
  //         }
  //       }
  //     });
  //   }
  // });
});