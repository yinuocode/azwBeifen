define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  var home = require('/static/js/home/home');
  // 分页
  // var pageVal=1;
  main.count=12;
  // 课程列表
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/album/album-list',{page:main.pageVal,user_id:home.uid},function(datas){
      var photoList = template('photoList',datas);
      $('#photo-list').html(photoList);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.data.length<main.count){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  };
  main.runPostAjaxDatas();
  // 创建相册
  $('.panel-body').on('click','#add-photo',function(){
    $('#create-photo-popup').removeClass('hide');
  });
  // 创建相册提交
  $('#create-photo-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#create-photo-form').serialize();
      console.log(data);
      $.ajax({
        url : '/album/create-album',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            main.sitesHint('创建成功!');
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
  // 选择操作目标
  $('.panel-body').on('click','#controlAll',function(){
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
  $('.panel-body').on('click','input[name="selected"]',function(){
    $(this).parent().toggleClass('active');
  });
  // 批处理
  $('.panel-body').on('click','#handle-batch',function(){
    $('.select-checkbox').toggle();
  });
  // 编辑相册
  $('.panel-body').on('click','#handle-edit',function(){
    var _this=$(this);
    var $selected=$('input[name="selected"]:checked');
    if($selected.length==1){
      var aid=$selected.val();
      main.postAjaxDatas('/album/update-album',{aid:aid},function(datas){
        console.log(datas);
        var editPhotoPopup = template('editPhotoPopup',datas);
        $('#edit-photo-popup').html(editPhotoPopup).removeClass('hide');
        // 编辑相册提交
        $('#edit-photo-form').validate({
          onsubmit:true,// 是否在提交时验证
          submitHandler: function(form){
            var data = $('#edit-photo-form').serialize();
            $.ajax({
              url : '/album/set-permission',
              type : 'post',
              data : data,
              dataType:'json',
              success : function(data){
                if(data.status==1){
                  main.sitesHint('修改成功!');
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
      });
    }else{
      main.sitesHint('请选择具体修改的某个相册','err');
    }
  });
  // 删除相册
  $('.panel-body').on('click','#handle-delete',function(){
    var $selected=$('input[name="selected"]:checked');
    var aid=[];
    if($selected.length>0){
      if(confirm('您确定要删除吗?')){
        for(var i=0,len=$selected.length;i<len;i++){
          aid.push($selected.eq(i).val());
        }
        main.postAjaxDatas('/album/delete-album',{aid:aid},function(datas){
          if(datas.status==1){
            main.sitesHint('删除成功！');
            // 局部刷新
            main.runPostAjaxDatas();
          }else{
            main.sitesHint(datas.msg,'err');
          }
        });
      }
    }else{
      main.sitesHint('请选择您要删除的相册','err');
    }
  });
  // 分页
  main.paging('.photo-list li');
});
