define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');

  var search=window.location.search;
  var ret = search.split('=')[1];
  if($('#course-type').val()==0){
    main.postAjaxDatas('/coures/update-live-beg',{live_id:ret},function(datas){
      var directForm = template('directForm',datas);
      $('#course-form-box').html(directForm);
      console.log(datas);
      $('#h-cid').val(ret);
      runCourseForm();
      var start = {
          elem: '#startDate',
          min: laydate.now(), //设定最小日期为当前日期
          max: '2099-06-16 23:59:59', //最大日期
          istime: true,
          istoday: false,
          choose: function(datas){
               end.min = datas; //开始日选好后，重置结束日的最小日期
               end.start = datas; //将结束日的初始值设定为开始日
          }
      };
      var end = {
          elem: '#endDate',
          min: laydate.now(),
          max: '2099-06-16 23:59:59',
          istime: true,
          istoday: false,
          choose: function(datas){
              start.max = datas; //结束日选好后，重置开始日的最大日期
          }
      };
      laydate(start);
      laydate(end);
    });
  }else{
    main.postAjaxDatas('/coures/update-coures-beg',{coures_id:ret},function(datas){
      var courseForm = template('courseForm',datas);
      $('#course-form-box').html(courseForm);
      console.log(datas);
      $('#h-cid').val(ret);
      runCourseForm();
    });
  }
  // 初始化 js
  function runCourseForm(){
    main.getAjaxDatas('/coures/get-label',function(datas){
      var courseTag = template('courseTag',{list:datas});
      $('#course-tag').html(courseTag);
      console.log(datas);
    });
    main.getAjaxDatas('/coures/classify',function(datas){
      var selectedId=$('#course-categoryId').attr('value');
      datas.sid=selectedId;
      console.log(datas);
      var courseCategoryId = template('courseCategoryId',{list:datas});
      $('#course-categoryId').html(courseCategoryId);
    });
    // 价格显示
    $('#course-price1').on('input',function(){
      $('#course-price2').attr('range','[1,'+$(this).val()+']');
    });
    // ajax提交
    var $formData = $($('input[name="form-data"]').val());
    $formData.validate({
      onsubmit:true,// 是否在提交时验证
      submitHandler: function(form){
        var _url = $('input[name="_url"]').val();
        var data = $formData.serialize();
        console.log(_url);
        console.log(data);
        $.ajax({
          url : _url,
          type : 'post',
          data : data,
          success : function(data){
            if(data){
              console.log(data);
              alert("操作成功");
              window.location.href='/myteach/teaching';
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

    // 上传图片
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
        pick: '#filePicker',
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
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
                '<div id="' + file.id + '" class="file-item thumbnails">' +
                    '<img>' +
                    '<div class="info">' + file.name + '</div>' +
                '</div>'
                ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $list.html( $li );
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
        $('#img-path').val(main.imgPath+'/'+resporse.date+'/'+file.name);
        $('#uploader-img').find('.error').hide();
        console.log(main.imgPath+'/'+resporse.date+'/'+file.name);
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
    // 是否显示价格
    $('#course-type1').on('click',function(){
      $('#course-price').hide();
    });
    $('#course-type0').on('click',function(){
      $('#course-price').show();
    });
    // 标签
    var formTag=$('.form-tag');
    var inputTag=$('#input-tag');
    inputTag.on('click',function(){
      formTag.toggle();
    });
    inputTag.on('blur',function(){
      inputTag.val(inputTag.val().replace(/，/g,','));
    });
    formTag.on('click','a',function(){
      var txt= $(this).html();
      if($.trim(inputTag.val())!==''){
        inputTag.val(inputTag.val()+','+txt);
      }else{
        inputTag.val(txt);
      }
      formTag.hide();
    });
  }
});
