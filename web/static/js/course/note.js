define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  // var pageVal=1;
  main.count=12;
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/mynote/my-note',{page:main.pageVal},function(datas){
      var noteList = template('noteList',{list:datas});
      $('#note-list').html(noteList);
      // 是否显示分页
      if(main.pageVal==1){
        if(datas.length<main.count){
          $('.ajax-paging').hide();
        }else{
          $('.ajax-paging').show();
        }
      }
    });
  };
  // 初始化
  main.runPostAjaxDatas();
  // 分页
  main.paging('#note-list li');
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
          main.sitesHint('删除成功！');
          main.runPostAjaxDatas();
        }else{
          main.sitesHint(datas.msg,'err');
        }
      });
    }
  });
});
