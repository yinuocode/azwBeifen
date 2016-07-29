define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  // var pageVal=1;
  main.count=13;
  var groupId='';
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/coures/student-manage',{group_id:groupId,page:main.pageVal},function(datas){
      var studentList = template('studentList',{list:datas});
      $('#student-list').html(studentList);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.length<main.count-1){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  };
  // 课程小组名称
  function runGetAjaxGroup(){
    main.getAjaxDatas('/coures/get-group',function(datas){
      var selectItems = template('selectItems',{list:datas});
      $('.select-items').html(selectItems);
    });
  }
  // 初始化
  runGetAjaxGroup();
  main.runPostAjaxDatas();
  // 下拉菜单
  $('.handle-icon.triangle').on('click',function(e){
    $(this).parent().siblings().find('.select-items').hide();
    $(this).next().toggle();
    e.stopPropagation();
  });
  // 类型查找
  $('.select-items').on('click','a',function(){
    $('.handle-icon.invite').addClass('hide');
    var _this=$(this);
    groupId=_this.attr('data-gid');
    main.pageVal=1;
    $('#group-id,#group-id2').val(groupId);
    _this.parent().parent().prev().html(_this.html());
    // 执行查找
    main.runPostAjaxDatas();
  });
  // 点击空白取消下拉列表
  $(document).on('click',function(){
    $('.select-items').hide();
  });
  // 选择操作目标
  $('.table-course').on('click','#controlAll',function(){
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
  // 分页
  main.paging('#student-list tr');
  // 删除组
  $('#delete-group').on('click',function(){
    if(groupId){
      if(confirm('您确定要删除这个组吗?')){
        main.postAjaxDatas('/coures/delete-group',{group_id:groupId},function(datas){
          main.sitesHint('删除成功！');
          // 局部刷新
          runGetAjaxGroup();
          main.runPostAjaxDatas();
        });
      }
    }else{
      main.sitesHint('请选择您要删除的组','err');
    }
  });
  // 删除学员
  $('#delete-student').on('click',function(){
    if(groupId){
      var $selected=$('input[name="selected"]:checked');
      var sid=[];
      if($selected.length>0){
        if(confirm('您确定要删除吗?')){
          for(var i=0,len=$selected.length;i<len;i++){
            sid.push($selected.eq(i).val());
          }
          main.postAjaxDatas('/coures/delete-student',{group_id:groupId,sid:sid},function(datas){
            main.sitesHint('删除成功！');
            // 局部刷新
            runGetAjaxGroup();
            main.runPostAjaxDatas();
          });
        }
      }else{
        main.sitesHint('请选择您要删除的学员','err');
      }
    }else{
      main.sitesHint('请先选择一个组','err');
    }
  });
  // 创建组
  $('#create-group').on('click',function(){
    $('#create-group-popup').removeClass('hide');
  });
  // 添加学员
  $('#add-student').on('click',function(){
    if(groupId){
      $('#add-student-popup').removeClass('hide');
    }else{
      main.sitesHint('请先选择一个组','err');
    }
  });
  // 关闭弹窗
  $('.popup-close').on('click',function(){
    $('.popup').addClass('hide');
  });
  // ajax提交
  $('#create-group-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#create-group-form').serialize();
      $.ajax({
        url : '/coures/add-group',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            main.sitesHint('创建成功');
            $('.popup').addClass('hide');
            // 局部刷新
            runGetAjaxGroup();
            main.runPostAjaxDatas();
          }else{
            main.sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
  // 添加学员
  $('#add-student-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#add-student-form').serialize();
      console.log(data);
      $.ajax({
        url : '/coures/add-student',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            main.sitesHint('添加成功');
            $('.popup').addClass('hide');
            // 局部刷新
            main.runPostAjaxDatas();
          }else{
            main.sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
  // 搜索
  $('#student-search').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#student-search').serialize();
      $.ajax({
        url : '/coures/search',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            var studentList = template('studentList',{list:data.data});
            $('#student-list').html(studentList);
          }else{
            main.sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
});