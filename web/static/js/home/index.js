define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  var home = require('/static/js/home/home');
  // 判断有无正在直播课程
  main.postAjaxDatas('/home/live',{user_id:home.uid},function(datas){
    if(datas.length!==0){
      $('#on-air').removeClass('hide').find('a').attr('href','/couresdetail?cid='+datas.live_id+'&type=0');
    }else{
      $('.panel-body-course').removeClass('sub');
    }
  });
  var pageVal=1;
  // 动态列表
  function dynamicList(){
    main.postAjaxDatas('/dynamic/dynamic-list',{user_id:home.uid,page:pageVal},function(datas){
      var talkList = template('talkList',datas);
      $('#talk-list').html(talkList);
      runDynamic();
      if(datas.dynamic.length<pageVal*10){
        swit=false;
      }
    });
  }
  dynamicList();
  // 评论
  $('.home-content').on('click','.publish-comment-btn',function(){
    $(this).parent().parent().next().slideToggle();
    var _index=$(this).attr('data-i');
    $('.comment-form'+_index).validate({
      onsubmit:true,// 是否在提交时验证
      submitHandler: function(form){
        var data = $('.comment-form'+_index).serialize();
        $.ajax({
          url : '/dynamic/inst-dyn-comt',
          type : 'post',
          data : data,
          dataType :'json',
          success : function(data){
            if(data.status==1){
              dynamicList();
            }else{
              main.sitesHint(data.msg,'err');
            }
          }
        });
      }
    });
  });
  // 点赞
  $('.home-content').on('click','.praise-btn',function(){
    var did=$(this).attr('data-pid');
    main.postAjaxDatas('/dynamic/inst-like',{did:did},function(datas){
      if(datas.status==1){
        dynamicList();
      }else{
        main.sitesHint(datas.msg,'err');
      }
    });
  });
  // 点击登录
  $('.panel-body').on('click','.click-login',function(){
    main.registration(0);
  });
  // 取消点赞
  var cancelNum=0;
  $('.home-content').on('click','.cancel-praise-btn',function(){
    var did=$(this).attr('data-pid');
    if(cancelNum<2){
      cancelNum++;
      main.postAjaxDatas('/dynamic/del-like',{did:did},function(datas){
        if(datas.status==1){
          dynamicList();
        }else{
          main.sitesHint(datas.msg,'err');
        }
      });
    }else{
      cancelNum=0;
      main.sitesHint('您操作过于频繁，请稍后重试','err');
    }
  });
  // 删除说说
  $('.home-content').on('click','.delete-btn',function(){
    var did=$(this).attr('data-pid');
    if(confirm("确认删除此条动态吗?")){
      main.postAjaxDatas('/dynamic/del-dynamic',{did:did},function(datas){
        if(datas.status==1){
          main.sitesHint('删除成功！');
          dynamicList();
        }else{
          main.sitesHint(datas.msg,'err');
        }
      });
    }
  });
  // 删除评论
  $('.home-content').on('click','.delete-comment',function(){
    var mid=$(this).attr('data-mid');
    if(confirm("确认删除此条评论吗?")){
      main.postAjaxDatas('/dynamic/del-comment',{comm_id:mid},function(datas){
        if(datas.status==1){
          main.sitesHint('删除成功！');
          dynamicList();
        }else{
          main.sitesHint(datas.msg,'err');
        }
      });
    }
  });
  // 收藏的课程
  main.postAjaxDatas('/home/person-enshrine',{user_id:home.uid},function(datas){
    var collectCourse = template('collectCourse',{list:datas});
    $('#collect-course').html(collectCourse);
    runCollectSide();
  });
  // 学习的课程
  main.postAjaxDatas('/home/my-coures',{user_id:home.uid},function(datas){
    var studyCourse = template('studyCourse',{list:datas});
    $('#study-course').html(studyCourse);
    runStudySide();
  });
  // 轮播
  function runCollectSide(){
    var $collectCourse=$('#collect-course');
    $collectCourse.on('click','>button',function(){
      $(this).removeClass('no').siblings().addClass('no');
    });
    $collectCourse.slick({
      slidesToShow: 2,//显示多少个图片
      slidesToScroll:2,//每次滚动几张图片
      arrows: true,//是否显示两边的箭头
      autoplay:false,//是否自动滚动
      autoplaySpeed:3000,//自动播放的速度
      speed: 300,//图片滚动的速度
      infinite: true,//是否无限循环滚动图片
      dots: false,//是否显示图片下面的小点点
      adaptiveHeight: true,//高度自适应
      pauseOnDotsHover:false,//鼠标放上是否滑动
      // rtl: false,//从左到右滚动， 默认是false,true是从右到左
      vertical: true,//是否垂直滚动，默认false不垂直，true为上下滚动
      swipe:true//可以使用鼠标拖拽
    });
  }
  function runStudySide(){
    var $runStudySide=$('#study-course');
    $runStudySide.on('click','>button',function(){
      $(this).removeClass('no').siblings().addClass('no');
    });
    $runStudySide.slick({
      slidesToShow: 2,//显示多少个图片
      slidesToScroll:2,//每次滚动几张图片
      arrows: true,//是否显示两边的箭头
      autoplay:false,//是否自动滚动
      autoplaySpeed:3000,//自动播放的速度
      speed: 300,//图片滚动的速度
      infinite: true,//是否无限循环滚动图片
      dots: false,//是否显示图片下面的小点点
      adaptiveHeight: true,//高度自适应
      pauseOnDotsHover:false,//鼠标放上是否滑动
      // rtl: false,//从左到右滚动， 默认是false,true是从右到左
      vertical: true,//是否垂直滚动，默认false不垂直，true为上下滚动
      swipe:true//可以使用鼠标拖拽
    });
  }
  $('.home-main').on('click','#talk-camera',function(){
    $('#publish-option').toggle();
  });
  // 动态初始化
  function runDynamic(){
    // 上传图片
    uploadImg();
    /* 上传视频 start */
    uploadVideo();
    // $('.home-main').on('click','.upload-btn',function(){
    //   var _this=$(this);
    //   var _index=_this.attr('data-i');
    //   var listImg = _this.prev();
    //   uploadImg(_this,_index,listImg);
    // });
    $('#publish-option').on('click','a',function(){
      $('#publish-option').hide();
    });
    /* 上传视频 end */
    // 发表说说
    $('#publish-form').validate({
      onsubmit:true,// 是否在提交时验证
      submitHandler: function(form){
        var data = $('#publish-form').serialize();
        $.ajax({
          url : '/dynamic/inst-dynamic',
          type : 'post',
          data : data,
          dataType :'json',
          success : function(data){
            if(data.status==1){
              main.sitesHint('发表成功！');
              $('#publish-form')[0].reset();
              dynamicList();
            }else{
              main.sitesHint(data.msg,'err');
            }
          }
        });
      }
    });
  }
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
        fileNumLimit: 4,
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
        $('#input-img').append('<input type="hidden" name="attach[]" value="'+main.imgPath+'/'+resporse.date+'/'+resporse.name+'">');
        $('#input-video').val('');
        $('#fileList1').html('');
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
  $('.home-content').on('click','.cancel',function(){
    var _index=$(this).parent().parent().index();
    $(this).parent().parent().remove();
    $('#input-img input').eq(_index).remove();
  });
  // 上传视频
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
        fileSingleSizeLimit:8*1024*1024,
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
    /**
     * 验证文件格式以及文件大小
     */
    uploader.on("error",function (type){
      main.sitesHint('请上传小于8M的.mp4格式文件','err');
      // if (type=="Q_TYPE_DENIED"){
      //   main.sitesHint('请上传小于8M的.mp4格式文件','err');
      //     dialogMsg("myModal","messageP","请上传.mp4格式文件");
      // }else if(type=="F_EXCEED_SIZE"){
      //   main.sitesHint('请上传小于8M的.mp4格式文件','err');
      // }
    });
    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
      $('.talk-btn').html('视频正在上传...').addClass('disabled').prop('disabled',true);
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
        $('#input-video').val(main.videoPath+'/'+resporse.date+'/'+resporse.name);
        $('#input-img,#fileList').html('');
        $('.talk-btn').html('发表').removeClass('disabled').prop('disabled',false);
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
});
