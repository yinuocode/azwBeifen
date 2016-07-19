define(function(require,exports,module){
  // 引入公共模块
  require('common');
  require('palette');
  var galleriffic=require('galleriffic');
  require('uploadify');
  // 定义变量
  var $body=$('body'),
      $jTarget=$('#Jtarget'),
      $palette=$('#palette');
  // 实现弹窗效果通用代码 poput.js
  $("#Jpopup").click(function(event){
    sumOpen();
    showfile();
  });
  function sumOpen(){
    $('#Jclose').remove();
    $('<div id="Jclose"></div>').appendTo('#Jtarget');
    $body.addClass('Jonbody');
    $jTarget.show();
  }
  $jTarget.on('click','#Jclose',function(){
    sumClose();
  });
  // 关闭弹窗
  function sumClose(){
    $body.removeClass('Jonbody');
    $jTarget.hide();
  }
  // 关闭弹窗
  $('body').on('click','.popup-close,.p-close',function(){
    $('.popup').addClass('hide');
  });
  // 画板
  $('.palette-con').click(function(){
    $palette.fadeIn();
    $('.image-wrapper').fadeOut();
  });
  // 上传 ppt
  $('#file-upload').uploadify({
    'formData'     : {
      // 'timestamp' : pTimestamp,
      // 'token'     : pTtoken,
      'cid':courseCid,
      'mid':userMid,
      '_csrf':$('input[name="_csrf"]').val()
    },
    'auto':true,
    'fileTypeDesc' : 'PPT Files',
    'fileTypeExts' : '*.ppt',
    // 'debug'    : true,
    'swf'      : '/static/js/plugins/upload/uploadify.swf',
    'uploader' : '/pptfile/uploadhandleppt',
    'onUploadSuccess' : function(file) {/*file, data, response*/
      // console.log(file);
    },
    'onUploadComplete' : function(file) {
      var isSetI=setInterval(function() {
        if(isUpWin){
          clearInterval(isSetI);
          isUpWin=false;
          showfile(1);
        }
      }, 500);
      // console.log(file);
      // alert('The file ' + file.name + ' finished processing.');
    },
    'onUploadError' : function(file, errorCode, errorMsg, errorString) {
      console.log('upload error');
      // alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
    }
  });
  // $('#SWFUpload_Console').after('<input name="_csrf" type="hidden" value="'+pTtoken+'">');
  // galleriffic 方法
  function runGalleriffic(){
    // additional styling for hover effect on thumbs
    var onMouseOutOpacity = 0.67;
    $('#thumbs ul.thumbs li').opacityrollover({
      mouseOutOpacity:   onMouseOutOpacity,
      mouseOverOpacity:  1.0,
      fadeSpeed:         'fast',
      exemptionSelector: '.selected'
    });
    // Initialize Advanced Galleriffic Gallery
    var gallery = $('#thumbs').galleriffic({
      delay:                     2500,
      numThumbs:                 35,// 左侧显示图片最大数
      preloadAhead:              10,
      enableTopPager:            false,
      enableBottomPager:         false,
      maxPagesToShow:            7,
      imageContainerSel:         '#slideshow',
      controlsContainerSel:      '#controls',
      captionContainerSel:       '#caption',
      loadingContainerSel:       '#loading',
      renderSSControls:          true,
      renderNavControls:         true,
      playLinkText:              'Play Slideshow',
      pauseLinkText:             'Pause Slideshow',
      prevLinkText:              '&lsaquo; Previous Photo',
      nextLinkText:              'Next Photo &rsaquo;',
      nextPageLinkText:          'Next &rsaquo;',
      prevPageLinkText:          '&lsaquo; Prev',
      enableHistory:             false,
      autoStart:                 false,
      syncTransitions:           true,
      defaultTransitionDuration: 900,
      onSlideChange:             function(prevIndex, nextIndex) {
        // 'this' refers to the gallery, which is an extension of $('#thumbs')
        this.find('ul.thumbs').children()
          .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
          .eq(nextIndex).fadeTo('fast', 1.0);
      },
      onPageTransitionOut:       function(callback) {
        this.fadeTo('fast', 0.0, callback);
      },
      onPageTransitionIn:        function() {
        this.fadeTo('fast', 1.0);
      }
    });
  }
  // 显示 ppt 文件
  function showfile(isCurrent){
    $.ajax({
      url:'/pptfile/getpptlist',
      type:"POST",
      data:{
       'mid':userMid,
       'cid':courseCid
       // '_csrf':pTtoken
      },
      dataType:"json",
      success: function(data){
        console.log(data);
        var str ='';
        if(data.status==1){
          var list = data.data;
          for(var i=0;i<list.length;i++){
            str +='<li data-url="'+list[i].savepath+'">'+list[i].sname+'<a href="javascript:;" data-url="'+list[i].savepath+list[i].id+'">选择</a></li>';
          }
          $('#filelist').html(str);
          $('#filelist li a').on('click',function(){
            useppt($(this));
          });
          if(isCurrent==1){
            useppt($('#filelist li:last-child a'));
          }
        }
      }
    });
  }
  // ppt 显示在页面上
  function useppt(obj){
    $palette.fadeOut();
    $body.removeClass("Jonbody");
    $jTarget.hide();
    var url = $(obj).attr('data-url');
    // var id = $(obj).attr('data-id');
    //var url ='/ppt2pngoutput/20160209/source/123457/';
    $.ajax({
      url:'/pptfile/getpptpic',
      type:'POST',
      data:{
        url:url
        // '_csrf':pTtoken
      },
      dataType:'json',
      success: function(data){
        console.log(data);
        var result = data;
        // console.log(result);
        var str='';
        // alert(str);
        if(result.status==1){
          var imgarr = result.data;
          for(var i=0;i<imgarr.length;i++){
            str+='<li><a class="thumb" name="leaf" href="'+imgarr[i]+'" title="">';
            str+='<img src="'+imgarr[i]+'" alt="" /></a></li>';
          }
          $('.thumbs').html(str);
          $('.thumbs').on('click','li',function(){
            $palette.fadeOut();
          });
          runGalleriffic();
        }
      },
      error:function(xml,err){
        console.log(err);
      }
    });
  }
  // 引入聊天代码
  require('mychat');
});