define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  var home = require('/static/js/home/home');
  // 分页
  var pageVal=1;
  var aid=home.getVal.aid;
  // 照片列表
  function runPostAjaxDatas(){
    main.postAjaxDatas('/album/get-albumimg',{page:pageVal,user_id:home.uid,aid:aid},function(datas){
      console.log(datas);
      var pictureList = template('pictureList',datas);
      $('#picture-list').html(pictureList);
      $("#auto-loop").lightGallery({
        loop:true,
        auto:true,
        pause:4000
      });
      if(datas.data.album_detail.length<pageVal*20){
        swit=false;
      }
      $('.panel-body input[name="selected"]').on('click','',function(event){
        $(this).parent().toggleClass('active');
        event.stopPropagation();
      });
    });
  }
  runPostAjaxDatas();
  // 添加图片
  $('#photo-aid').val(aid);
  $('.panel-body').on('click','#add-picture',function(){
    $('#add-picture-popup').removeClass('hide');
  });
  $('.panel-body').one('click','#add-picture',function(){
    uploadImg();
  });
  // 添加图片提交
  $('#add-picture-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#add-picture-form').serialize();
      console.log(data);
      $.ajax({
        url : '/album/album-addimg',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          if(data.status==1){
            alert('上传成功');
            $('.popup').addClass('hide');
            // 局部刷新
            runPostAjaxDatas();
          }else{
            alert(data.msg);
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
  // 批处理
  $('.panel-body').on('click','#handle-batch',function(){
    $('.select-checkbox').toggle();
  });
  // 删除图片
  $('.panel-body').on('click','#handle-delete',function(){
    var $selected=$('input[name="selected"]:checked');
    var imgId=[];
    if($selected.length>0){
      if(confirm('您确定要删除吗?')){
        for(var i=0,len=$selected.length;i<len;i++){
          imgId.push($selected.eq(i).val());
        }
        main.postAjaxDatas('/album/delete-albumimg',{img_id:imgId},function(datas){
          if(datas.status==1){
            // 局部刷新
            runPostAjaxDatas();
          }else{
            alert(datas.msg);
          }
        });
      }
    }else{
      alert('请选择您要删除的图片');
    }
  });
  // 将图片设置为封面
  $('.panel-body').on('click','#set-cover',function(){
    var $selected=$('input[name="selected"]:checked');
    if($selected.length==1){
      var imgId=$selected.val();
      main.postAjaxDatas('/album/set-albumcover',{img_id:imgId,aid:aid},function(datas){
        if(datas.status==1){
          alert('设置成功');
          // 局部刷新
          runPostAjaxDatas();
        }else{
          alert(datas.msg);
        }
      });
    }else{
      alert('请选择您要封面的具体某个照片');
    }
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
  // 上传图片
  function uploadImg(){
    var $list = $('#fileList'),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 260 * ratio,
        thumbnailHeight = 146 * ratio,
    // 初始化Web Uploader
    uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '/static/js/plugins/webupload/Uploader.swf',
        // 文件接收服务端。
        server: "/static/js/plugins/webupload/fileupload.php",
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: $('#filePicker'),
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        fileNumLimit: 50,
        thumb: {
            width: 260,
            height: 146,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 70,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,
            // 是否允许裁剪。
            crop: false,
            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            type: 'image/jpeg'
        }
    });
    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        var $li = $(
                '<li id="' + file.id + '" class="file-item thumbnails">' +
                    '<img>' +
                    '<div class="file-panel"><span class="cancel">删除</span></div>'+
                '</li>'
                ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $list.append( $li );
        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr( 'src', src );
        }, thumbnailWidth, thumbnailHeight );
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress span');
        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo( $li )
                    .find('span');
        }
        $percent.css( 'width', percentage * 100 + '%' );
    });
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file,resporse ) {
        $( '#'+file.id ).addClass('upload-state-done');
        $('#input-img').append('<input type="hidden" name="attach[]" value="'+main.imgPath+'/'+resporse.date+'/'+file.name+'">');
    });
    // 文件上传失败，显示上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');
        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }
        $error.text('上传失败');
    });
    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
    });
  }
  // 删除图片
  $('.uploader-list').on('click','.cancel',function(){
    var _index=$(this).parent().parent().index();
    $(this).parent().parent().remove();
    $('#input-img input').eq(_index).remove();
  });
  // 滚动条滚动到底部获取数据
  var swit=true;
  $(window).bind('scroll', function() {
    if(swit){
      if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
        pageVal++;
        dynamicList();
      }
    }
  });
});
