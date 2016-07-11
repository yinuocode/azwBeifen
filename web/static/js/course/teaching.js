define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var pageVal=1;
  // 按条件查找
  function runPostAjaxDatas(){
    var typeVal=$('#handle-course').attr('data-val');
    var statusVal=$('#handle-status').attr('data-val');
    var timeVal=$('#handle-date').attr('data-val');
    main.postAjaxDatas('/myteach/my-teach',{type:typeVal,status:statusVal,time:timeVal,page:pageVal},function(datas){
      console.log(datas);
      var tableCourseList = template('tableCourseList',{list:datas});
      $('#table-course-list').html(tableCourseList);
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
    var dataArg=_this.attr('data-arg');
    _this.parent().parent().prev().html(_this.html()).attr('data-val',dataArg);
    $('.select-items').removeClass('active');
    // 执行查找
    runPostAjaxDatas();
  });
  // 选择操作目标
  $('#table-course-list').on('click','#controlAll',function(){
    if($(this).prop('checked')){
      $('#table-course-list').find('input:checkbox').prop('checked',true);
    }else{
      $('#table-course-list').find('input:checkbox').prop('checked',false);
    }
    // var checklist = document.getElementsByName('selected');
    // var len=checklist.length;
    // if(document.getElementById('controlAll').checked){
    //   for(var i=0;i<len;i++){
    //     checklist[i].checked = 1;
    //   }
    // }else{
    //   for(var j=0;j<len;j++){
    //     checklist[j].checked = 0;
    //   }
    // }
  });
  // 直播选择
  $('.select-type').on('click','#live-pitch',function(){
    $('.handle-icon.invite').removeClass('hide');
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
    if($('#table-course-list tr').length==9){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
  // 编辑
  $('#handle-edit').on('click',function(){
    var _this=$(this);
    var $selected=$('input[name="selected"]:checked');
      if($selected.length==1){
        var cid=$selected.val();
        var ctype=$selected.attr('data-type');
        if(ctype==1){
          window.open('/coures/course?cid='+cid);
        }else{
          window.open('/coures/direct?cid='+cid);
        }
      }else{
        alert('请选择具体修改的某个课程');
      }
  });
  // 一键邀请
  $('#handle-invite').on('click',function(){
    var $selected=$('input[name="selected"]:checked');
    var cid1=[];
    // var cid2=[];
    if($selected.length>0){
      for(var i=0,len=$selected.length;i<len;i++){
        cid1.push($selected.eq(i).val());
      }
      $('#invite-cid').val(cid1);
      $('#invite-popup').removeClass('hide');
    }else{
      alert('请选择您要邀请的课程');
    }
  });
  // 开始发布
  $('.table-course').on('click','.start-issue',function(){
    var type=$(this).attr('data-type');
    var cid=$(this).attr('data-cid');
    main.postAjaxDatas('/myteach/alter-state',{type:type,cid:cid},function(datas){
      if(!datas.status){
        alert('服务器忙，请稍后。。。');
      }
      // 局部刷新
      runPostAjaxDatas();
    });
  });
  // $('#handle-edit').on('click',function(){
  //   var $selected=$('input[name="selected"]:checked');
  //   if($selected.length==1){
  //     main.getAjaxDatas('/coures/update-live-beg?live_id='+$selected.val(),function(datas){
  //       // var tableCourseList = template('tableCourseList',{list:datas});
  //       // $('#table-course-list').html(tableCourseList);
  //       console.log(datas);
  //     });
  //   }else{
  //     alert('请选择具体修改的某个课程');
  //   }
  // });
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
        main.postAjaxDatas('/myteach/delete',{cid1:cid1,cid2:cid2},function(datas){
          console.log(datas);
          if(datas.status==1){
            alert('删除成功');
            // 局部刷新
            runPostAjaxDatas();
          }else{
            alert(datas.msg);
          }
          // 循环删除
          // for(var j=0,lens=$selected.length;j<lens;j++){
          //   $selected.eq(j).parent().parent().remove();
          // }
        });
      }
    }else{
      alert('请选择您要删除的课程');
    }
  });
  // 添加助教
  $('.table-course').on('click','.add-teaching',function(){
    var cid=$(this).attr('data-cid');
    $('#sub-teaching-popup').removeClass('hide');
    $('input[name="cid"]').val(cid);
  });
  // 添加客服
  $('.table-course').on('click','.add-service',function(){
    var cid=$(this).attr('data-cid');
    $('#sub-service-popup').removeClass('hide');
    $('input[name="cid"]').val(cid);
  });
  // 添加客服
  $('.table-course').on('click','.generalize-link',function(){
    var url=$(this).attr('data-url');
    $('#sub-generalize-popup').removeClass('hide');
    $('#generalize-addr').val(url);
  });
  $('.popup-close').on('click',function(){
    $('.popup').addClass('hide');
  });
  // 助教
  $('#sub-teaching').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#sub-teaching').serialize();
      $.ajax({
        url : '/myteach/add-assistant',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status){
            alert('添加成功');
            $('#sub-teaching')[0].reset();
            $('.popup').addClass('hide');
          }else{
            alert(data.msg);
          }
        }
      });
    }
  });
  // 客服
  $('#sub-service').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#sub-service').serialize();
      $.ajax({
        url : '/lecturer/inst-coumer',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status){
            alert('添加成功');
            $('#sub-service')[0].reset();
            $('.popup').addClass('hide');
          }else{
            alert(data.msg);
          }
        }
      });
    }
  });
  $('#invite-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#invite-form').serialize();
      $.ajax({
        url : '/myteach/invite-letter',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            alert('邀请成功');
            $('#invite-form')[0].reset();
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
