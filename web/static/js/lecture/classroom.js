define(function(require,exports,module){
  // 引入公共模块
  require('common');

  // ajax post 方法
  function postAjaxDatas(_url,fSuccess){
    $.ajax({
      type:'post',
      url:_url,
      data:{cid:courseCid},
      dataType: 'json',
      success: function(datas){
        fSuccess(datas);
      },
      error: function(xml,err){
        console.log(err);
      }
    });
  }
  var ajaxDatas=[
    // 视频地址
    {
      url:'/broadcasting/get-gurl',
      fSuccess:function(datas){
        runVideo(datas);
      }
    },
    // 用户信息 会员 倒计时
    {
      url:'/broadcasting/teach-class',
      fSuccess:function(datas){
        var cHeader = template('cHeader', datas);
        $('#c-header').html(cHeader);
        runFavorites();
      }
    },
    // 讲师
    {
      url:'/broadcasting/lecturer-info',
      fSuccess:function(datas){
        $('#lecturer-name').html(datas.nick_name);
        var mainSideTop = template('mainSideTop',datas);
        $('#main-side-top').html(mainSideTop);
      }
    },
    // 会员信息
    {
      url:'/broadcasting/study',
      fSuccess:function(datas){
        console.log(datas);
        var userInfoOption = template('userInfoOption',datas);
        $('#user-info-option').html(userInfoOption);
      }
    },
    // 贵宾席
    {
      url:'/broadcasting/guest',
      fSuccess:function(datas){
        console.log(datas);
        var rankigVip = template('rankigVip',{list:datas});
        $('#rankig-vip').html(rankigVip);
      }
    // },
    // // 粉丝团
    // {
    //   url:'/broadcasting/guest',
    //   fSuccess:function(datas){
    //     var rankigVermicelli = template('rankigVermicelli',{list:datas});
    //     $('#rankig-vermicelli').html(rankigVermicelli);
    //   }
    // },
    // // 礼物
    // {
    //   url:'/broadcasting/guest',
    //   fSuccess:function(datas){
    //     var allGift = template('allGift',{list:datas});
    //     $('#all-gift').html(allGift);
    //   }
    }
  ];
  for(var i=0,len=ajaxDatas.length;i<len;i++){
    postAjaxDatas(ajaxDatas[i].url,ajaxDatas[i].fSuccess);
  }
  var jwplayer = require('jwplayer');
  // 视频播放
  function runVideo(videoUrl){
    jwplayer.key="NIxzRzXFeCuptg0mr83yTWc9muAM872Um0sYWg==";
    jwplayer("botr_oSQWzFgF_8nLlWRv4_div").setup({
      aspectratio: "4:3",
      autostart: true,
      controls: true,
      displaydescription: false,
      displaytitle: false,
      flashplayer: "/static/js/plugins/jwplayer/jwplayer.flash.swf",
      file:videoUrl,
      //file:"./aaa.mp4",
      'controlbar':'bottom',
      height: 555,
      width:810,
      //playlist: "http://content.jwplatform.com/jw6/oSQWzFgF.xml",
      //plugins: {"http://assets-jpcust.jwpsrv.com/player/6/6124956/ping.js": {"pixel": "http://content.jwplatform.com/ping.gif"}},
      preload: "none",
      primary: "flash"
    });
  }
  // 收藏页面
  function runFavorites(){
    $("#favorites").on('click',function(){
      var ctrl=(navigator.userAgent.toLowerCase()).indexOf('mac')!=-1?'Command/Cmd': 'CTRL';
      if(document.all){
        window.external.addFavorite(currentHerf, $title);
      }else if(window.sidebar){
        window.sidebar.addPanel($title, currentHerf);
      }else{
        alert('您可以通过快捷键' + ctrl + ' + D 加入到收藏夹');}
    });
  }
  // 定义变量
  // var currentHerf=window.location.href; // href
  // var $title=$('title');
  // var $currentLink=$('#current-link'); // 当前页面链接
  // var $shareLink=$('#share-link'); // 分享链接
  // var $shareBlock=$('.share-block'); // 分享链接框
  // var $giftPrev=$('#gift-paging .prev'); // 分页按钮
  // var $giftNext=$('#gift-paging .next'); // 分页按钮
  // var giftHeight=$allGift.parent().height(); // 真实高度
  // var scollHeight=0; // 滚动的高度
  // var allGiftPages=Math.ceil($allGift.find('a').length/15); // 礼物页数
  // var currentPages=1; //当前页数
  // // 添加当前页面链接
  // $currentLink.val(currentHerf);
  // // 获焦选中
  // $currentLink.on('focus',function(){
  //   $(this).select();
  // });
  // // 邀请
  // $shareLink.on('click',function(){
  //   $shareBlock.toggle();
  // });
  // // 签到
  // $('#user-signin').one('click',function(){
  //   var signinSpan=$(this).find('.signin-span');
  //   signinSpan.show().animate({
  //     top:-50,
  //     opacity:0
  //   },1000,function(){
  //     signinSpan.hide();
  //   }).parent().attr('title','已签到');
  // });
  // // 礼物切换分页
  // $giftPrev.on('click',function(){
  //   if(allGiftPages>1&&currentPages>1){
  //     currentPages--;
  //     $(this).addClass('active').siblings().removeClass('active');
  //     scollHeight-=giftHeight;
  //     $allGift.css('marginTop',-scollHeight+'px');
  //   }
  // });
  // // 下一页
  // $giftNext.on('click',function(){
  //   if(allGiftPages>1&&allGiftPages>currentPages){
  //     currentPages++;
  //     $(this).addClass('active').siblings().removeClass('active');
  //     scollHeight+=giftHeight;
  //     $allGift.css('marginTop',-scollHeight+'px');
  //   }
  // });
  // // 选中礼物
  // $allGift.on('click','a',function(){
  //   $(this).addClass('active').siblings().removeClass('active');
  //   giftNr=$(this).html();
  //   giftTitle=$(this).attr('title');
  // });

  /*var $userAll=$('#user-all'); // 弹出所有用户
  var $userObject=$('#user-object'); // 选择送礼对象
  //显示隐藏用户
  $userObject.on('click',function(){
    $userAll.toggle();
  });
  // 选中送礼对象
  $userAll.find('li').on('click',function(){
    $userObject.html($(this).html());
    $userAll.hide();
  });*/
  // 引入聊天代码
  // require('mychat');
});