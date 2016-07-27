define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 分页
  main.count=12;
  // 按条件查找
  main.runPostAjaxDatas=function(){
    main.postAjaxDatas('/website/station-letter',{page:main.pageVal},function(datas){
      var letterList = template('letterList',datas);
      $('#letter-list').html(letterList);
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
  // 初始化
  main.runPostAjaxDatas();
  // 分页
  main.paging('#letter-list li');
  // 删除
  $('#letter-list').on('click','.delete-letter',function(){
    var lid=$(this).attr('data-lid');
    if(confirm('您确定要删除吗?')){
      main.postAjaxDatas('/website/delete-letter',{lid:lid},function(datas){
        if(datas.status==1){
          main.sitesHint('删除成功！');
          main.runPostAjaxDatas();
        }else{
          main.sitesHint(datas.msg,'err');
        }
      });
    }
  });
  // 点击站内信跳转
  $('#letter-list').on('click','li',function(){
    var $this = $(this);
    var lid = $this.attr('data-lid');
    main.postAjaxDatas('/website/is-read',{lid:lid},function(datas){
      if(datas.status==1){
        window.location.href=$this.attr('data-url');
      }else{
        main.sitesHint(datas.msg,'err');
      }
    });
  });
  // 阻止事件冒泡
  $('#letter-list').on('click','li a',function(event){
    event.stopPropagation();    //  阻止事件冒泡
  });
});