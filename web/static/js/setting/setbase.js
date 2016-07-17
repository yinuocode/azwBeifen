define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');

  main.getAjaxDatas('/personage/basic-beg',function(datas){
    console.log(datas);
    var setBaseForm = template('setBaseForm',datas);
    $('#set-base-form').html(setBaseForm);
    runForm();
  });
  // 是否是公司
  main.getAjaxDatas('/firm/is-firm',function(datas){
    if(datas==1){
      $('#apply-lecturer-btn').html('添加讲师').attr('href','/personage/addlecturer');
    }
  });
  // 复制文本
  function copyToClipboard(txt,id){
    var clip = new ZeroClipboard.Client(); // 新建一个对象
    clip.setHandCursor( true ); // 设置鼠标为手型
    clip.setCSSEffects( true );
    var val=$("#"+txt).val();   //获取需要复制文本。
    clip.setText(val);          // 设置要复制的文本。
    clip.addEventListener( 'complete', function(){$('#'+id).html('复制成功');});
    clip.glue(id);              // 和上一句位置不可调换
  }
  function runForm(){
    // ajax提交
    var $formData = $($('input[name="form-data"]').val());
    $formData.validate({
      onsubmit:true,// 是否在提交时验证
      submitHandler: function(form){
        var _url = $('input[name="_url"]').val();
        var data = $formData.serialize();
        console.log(data);
        $.ajax({
          url : _url,
          type : 'post',
          data : data,
          success : function(data){
            if(data){
              alert("提交成功");
            }else{
              alert(data);
            }
          }
        });
      }
    });
    $('#setname').on('click',function(){
      console.log(123);
      $('#panel-body1').hide();
      $('#panel-body2').show();
    });
    // ajax提交
    var $formData2 = $($('input[name="form-data2"]').val());
    $formData2.validate({
      onsubmit:true,// 是否在提交时验证
      submitHandler: function(form){
        var _url = $('input[name="_url2"]').val();
        var data = $formData2.serialize();
        console.log(data);
        $.ajax({
          url : _url,
          type : 'post',
          data : data,
          success : function(data){
            if(data){
              alert("认证成功");
              $('#panel-body2').hide();
              $('#panel-body1').show();
              $('.form-hint').html('<span class="hot">已认证成功</span>');
            }else{
              alert(data);
            }
          }
        });
      }
    });
    // 调用富文本文件 js
    var editor2;
    window.K = KindEditor;
    K.create('textarea[id="form-richtext"]', {
      resizeType : 1,
      afterBlur: function(){this.sync()},
      items : [
        'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
        'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
        'insertunorderedlist', '|', 'emoticons', 'image', 'link','source']
    });
    // 复制邀请链接
    copyToClipboard('profile-link','copy-link');
    // 上传图片
    var $list = $('.fileList'),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 260 * ratio,
        thumbnailHeight = 100 * ratio,
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
        pick: '.filePicker',
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        // 允许重复上传
        duplicate : true,
        thumb: {
            // width: 110,
            // height: 110,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 70,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: true,
            // 是否允许裁剪。
            crop: false,
            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            type: 'image/jpeg'
        }
    });
    // 当有文件添加进来的时候
    var _index=0;
    $('.filePicker').on('click',function(){_index=$(this).attr('data-index');});
    uploader.on( 'fileQueued', function( file ) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnails">' +
                    '<img>' +
                    '<div class="info">' + file.name + '</div>' +
                '</div>'
                ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $list.eq(_index).html( $li );
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
      console.log(_index);
        $( '#'+file.id ).addClass('upload-state-done');
        $('.img-path').eq(_index).val(main.imgPath+'/'+resporse.date+'/'+file.name);
        console.log($('.img-path').eq(_index).val());
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
});
