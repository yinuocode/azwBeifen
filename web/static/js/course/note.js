define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  var pageVal=1;
  // 按条件查找
  function runPostAjaxDatas(){
    main.postAjaxDatas('/mynote/my-note',{page:pageVal},function(datas){
      console.log(datas);
      var noteList = template('noteList',{list:datas});
      $('#note-list').html(noteList);
    });
  }
  // 初始化
  runPostAjaxDatas();
  // 分页
  $('#paging-prev').on('click',function(){
    if(pageVal>1){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal--;
      runPostAjaxDatas();
    }
  });
  $('#paging-next').on('click',function(){
    if($('.note-course li').length==12){
      $(this).addClass('active').siblings().removeClass('active');
      pageVal++;
      runPostAjaxDatas();
    }
  });
  // 查看笔记
  $('.note-course').on('click','.look-note',function(){
    var cid=$(this).attr('data-cid');
    main.postAjaxDatas('/comment/get-note',{cid:cid},function(datas){
      template.config("escape", false);
      var noteContent = template('noteContent',{data:datas});
      $('#note-content').html(noteContent);
      $('#note-nr-box').show();
    });
  });
  // 关闭笔记
  $('#close-note').on('click',function(){
    $('#note-nr-box').hide();
  });
  // 删除笔记
  $('.note-course').on('click','.delete-note',function(){
    var nid=$(this).attr('data-nid');
    if(confirm('笔记删除将不可恢复，是否继续！')){
      main.postAjaxDatas('/mynote/del-note',{nid:nid},function(datas){
        if(datas.status==1){
          runPostAjaxDatas();
        }else{
          alert(datas.msg);
        }
      });
    }
  });
});
