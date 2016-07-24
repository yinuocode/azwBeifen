define(function(require,exports,module){
  // 引入主要模块模块
  var main = require('main');
  // 获取get传值
  function getArgs(){
    var args = {};
    var match = null;
    var search = decodeURIComponent(location.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while((match = reg.exec(search))!==null){
      args[match[1]] = match[2];
    }
    return args;
  }
  var getVal=getArgs();
  var lid = getVal.lid;
  // 按条件查找
  main.runPostAjaxDatas = function(){
    main.postAjaxDatas('/website/letter-detail',{lid:lid},function(datas){
      var conversationS = template('conversationS',datas);
      $('#conversation').html(conversationS);
      // ajax提交
      $('#letter-form').validate({
        onsubmit:true,// 是否在提交时验证
        submitHandler: function(form){
          var data = $('#letter-form').serialize();
          $.ajax({
            url : '/myteach/letter',
            type : 'post',
            data : data,
            dataType:'json',
            success : function(data){
              if(data.status==1){
                main.sitesHint('发送成功！');
                $('#letter-form')[0].reset();
              }else{
                main.sitesHint(data.msg,'err');
              }
            }
          });
        }
      });
    });
  };
  // 初始化
  main.runPostAjaxDatas();
  // 删除
  $('.conversation').on('click','.delete-message',function(){
    var lid=$(this).attr('data-lid');
    if(confirm('您确定要删除吗?')){
      main.postAjaxDatas('/website/del-letter',{lid:lid},function(datas){
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
