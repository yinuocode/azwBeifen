define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  // var pageVal=1;
  main.count=13;
  var classify=1;
  var search=location.search,
  courseCid=search.substring(search.indexOf('cid=')+4);
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/myteach/period',{cid:courseCid,classify:classify,page:main.pageVal},function(datas){
      var tableCourseList = template('tableCourseList',datas);
      $('#table-course-list').html(tableCourseList);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.data.length<main.count-1){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  };
  // 判断是否是免费课程
  main.postAjaxDatas('/myteach/isfree',{cid:courseCid},function(datas){
    if(datas.free==0){
      $('#course-type').hide();
    }
  });
  // 初始化
  main.runPostAjaxDatas();
  // 下拉菜单
  $('.handle-icon.triangle').on('click',function(){
    $(this).parent().siblings().find('.select-items').removeClass('active');
    $(this).next().toggleClass('active');
  });
  // 类型查找
  $('.select-items').on('click','a',function(){
    var _this=$(this);
    var dataArg=_this.attr('data-arg');
    classify=dataArg;
    main.pageVal=1;
    _this.parent().parent().prev().html(_this.html());
    $('.select-items').removeClass('active');
    // 执行查找
    main.runPostAjaxDatas();
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
  // 分页
  main.paging('#table-course-list tr');
  // 删除
  $('#handle-delete').on('click',function(){
    var $selected=$('input[name="selected"]:checked');
    var hid=[];
    var did=[];
    if($selected.length>0){
      if(confirm('您确定要删除吗?')){
        for(var i=0,len=$selected.length;i<len;i++){
          if($selected.eq(i).attr('data-type')==1){
            hid.push($selected.eq(i).val());
          }else{
            did.push($selected.eq(i).val());
          }
        }
        main.postAjaxDatas('/myteach/del-hour',{hid:hid,did:did},function(datas){
          console.log(datas);
          if(datas.status==1){
            main.sitesHint('删除成功');
            // 局部刷新
            main.runPostAjaxDatas();
          }else{
            main.sitesHint(datas.msg,'err');
          }
        });
      }
    }else{
      main.sitesHint('请选择您要删除的课程','err');
    }
  });
  var one1=0;
  var one2=0;
  // 添加课时按钮
  $('.select-type').on('click','#add-hour',function(){
    $('#add-hour-popup').removeClass('hide');
    if(!one1){
      uploadVideo();
      one1++;
    }
  });
  // 添加资料按钮
  $('.select-type').on('click','#add-data',function(){
    $('#add-data-popup').removeClass('hide');
    if(!one2){
      uploadData();
      one2++;
    }
  });
  // 关闭弹窗
  $('.popup-close').on('click',function(){
    $('.popup').addClass('hide');
  });
  // ajax提交
  // 添加课时
  $('#add-hour-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#add-hour-form').serialize();
      console.log(data);
      $.ajax({
        url : '/myteach/add-hour',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          console.log(data);
          if(data.status==1){
            main.sitesHint('添加成功！');
            $('#add-hour-form')[0].reset();
            $('#fileList1').html('');
            $('#hour-path').val('');
            $('.popup').addClass('hide');
            main.runPostAjaxDatas();
          }else{
            main.sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
  // 课程id
  $('.course-id').val(courseCid);
  // 添加资料
  $('#add-data-form').validate({
    onsubmit:true,// 是否在提交时验证
    submitHandler: function(form){
      var data = $('#add-data-form').serialize();
      console.log(data);
      $.ajax({
        url : '/myteach/add-datum',
        type : 'post',
        data : data,
        dataType:'json',
        success : function(data){
          console.log(data);
          if(data.status==1){
            main.sitesHint('添加成功！');
            $('#add-data-form')[0].reset();
            $('#fileList2').html('');
            $('#data-path').val('');
            $('.popup').addClass('hide');
            main.runPostAjaxDatas();
          }else{
            main.sitesHint(data.msg,'err');
          }
        }
      });
    }
  });
  // 发布
  $('.table-course').on('click','#issue',function(){
    var thisId=$(this).attr('data-hid');
    main.postAjaxDatas('/myteach/hour-state',{hour_id:thisId},function(datas){
      main.runPostAjaxDatas();
    });
  });
  // 取消发布
  $('.table-course').on('click','#cancel-issue',function(){
    var thisId=$(this).attr('data-hid');
    main.postAjaxDatas('/myteach/hour-stateno',{hour_id:thisId},function(datas){
      main.runPostAjaxDatas();
    });
  });
  function uploadVideo(){
    // 上传资料视频
    var $list = $('#fileList1'),
        // 优化retina, 在retina下这个值是2
        // ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        // thumbnailWidth = 260 * ratio,
        // thumbnailHeight = 146 * ratio,
    // 初始化Web Uploader
    uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '/static/js/plugins/webupload/Uploader.swf',
        // 文件接收服务端。
        server: "/static/js/plugins/webupload/videoupload.php",
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker1',
        // 只允许选择视频文件。
        accept: {
            title: 'video',
            extensions: 'mp4',
            mimeTypes: 'application/.mp4'
        },
        thumb: {
          // width: 260,
          // height: 146,
          // 图片质量，只有type为`image/jpeg`的时候才有效。
          // quality: 70,
          // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
          // allowMagnify: false,
          // 是否允许裁剪。
          crop: false
          // 为空的话则保留原有图片格式。
          // 否则强制转换成指定的类型。
          // type: 'image/jpeg'
        }
    });
    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
      $('#upload-status').html('视频正在上传...').addClass('disabled').prop('disabled',true);
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnails">' +
                    '<div class="info">' + file.name + '</div>' +
                '</div>'
                ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $list.html( $li );
        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        // uploader.makeThumb( file, function( error, src ) {
        //     if ( error ) {
        //         $img.replaceWith('<span>不能预览</span>');
        //         return;
        //     }
        //     $img.attr( 'src', src );
        // }, thumbnailWidth, thumbnailHeight );
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
        $('#hour-date').val(resporse.date);
        $('#hour-fname').val(resporse.name);
        $('#hour-path').val('/'+resporse.date+'/'+resporse.name);
        $('#uploader-hour').find('.error').hide();
        $('#upload-status').html('确认添加').removeClass('disabled').prop('disabled',false);
        console.log('/'+resporse.date+'/'+resporse.name);
    });
    // 文件上传失败，显示上传出错。
    uploader.on( 'uploadError', function( file ) {
      console.log(456);
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
  function uploadData(){
    // 上传资料视频
    var $list = $('#fileList2'),
        // 优化retina, 在retina下这个值是2
        // ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        // thumbnailWidth = 260 * ratio,
        // thumbnailHeight = 146 * ratio,
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
        pick: '#filePicker2',
        // 只允许选择图片文件。
        accept: {
            title: 'zip',
            extensions: 'zip,rar,cab,arj,lzh,ace,7-zip,tar,gzip,uue,bz2,jar,iso',
            mimeTypes: 'application/.zip'
        },
        thumb: {
          // width: 260,
          // height: 146,
          // 图片质量，只有type为`image/jpeg`的时候才有效。
          // quality: 70,
          // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
          // allowMagnify: false,
          // 是否允许裁剪。
          crop: false
          // 为空的话则保留原有图片格式。
          // 否则强制转换成指定的类型。
          // type: 'image/jpeg'
        }
    });
    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
      $('#upload-status2').html('资料正在上传...').addClass('disabled').prop('disabled',true);
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnails">' +
                    '<div class="info">' + file.name + '</div>' +
                '</div>'
                ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $list.html( $li );
        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        // uploader.makeThumb( file, function( error, src ) {
        //     if ( error ) {
        //         $img.replaceWith('<span>不能预览</span>');
        //         return;
        //     }
        //     $img.attr( 'src', src );
        // }, thumbnailWidth, thumbnailHeight );
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
        $('#data-path').val(main.imgPath+'/'+resporse.date+'/'+resporse.name);
        $('#uploader-data').find('.error').hide();
        $('#upload-status2').html('确认添加').removeClass('disabled').prop('disabled',false);
        console.log(main.imgPath+'/'+resporse.date+'/'+resporse.name);
    });
    // 文件上传失败，显示上传出错。
    uploader.on( 'uploadError', function( file ) {
      console.log(456);
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
