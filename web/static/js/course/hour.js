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
    main.postAjaxDatas('/coures/my-teach',{type:typeVal,status:statusVal,time:timeVal,page:pageVal},function(datas){
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
    var checklist = document.getElementsByName('selected');
    var len=checklist.length;
    if(document.getElementById('controlAll').checked){
      for(var i=0;i<len;i++){
        checklist[i].checked = 1;
      }
    }else{
      for(var j=0;j<len;j++){
        checklist[j].checked = 0;
      }
    }
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
    if($('#table-course-list tr').length==10){
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
          if($selected.eq(i).attr('data-type')){
            cid2.push($selected.eq(i).val());
          }else{
            cid1.push($selected.eq(i).val());
          }
        }
        main.postAjaxDatas('/coures/delete',{cid1,cid2},function(datas){
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
  $('.popup-close').on('click',function(){
    $('.popup').addClass('hide');
  });
  // ajax提交
  $('#sub-teaching').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#sub-teaching').serialize();
      $.ajax({
        url : '/coures/add-assistant',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status){
            alert('添加成功');
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
        url : '/coures/invite-letter',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            alert('邀请成功');
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
