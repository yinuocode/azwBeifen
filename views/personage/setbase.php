<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="zh-cmn-Hans" class="no-js">
<!--<![endif]-->
<head>
  <meta charset="UTF-8">
  <title>课程直播中心</title>
  <meta name="Keywords" content="课程直播中心">
  <meta name="Description" content="课程直播中心">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <link rel="stylesheet" href="/static/css/rely/reset.css">
  <link rel="stylesheet" href="/static/js/plugins/webupload/webupload.css">
  <link rel="stylesheet" href="/static/css/base.css">
  <!-- 让低版本ie浏览器更好的兼容 -->
  <!--[if lt IE 7]>
    <script>
      window.location.href="http://cdn.dmeng.net/upgrade-your-browser.html?referrer="+location.href;
    </script>
  <![endif]-->
  <!-- 兼容ie8以下的盒模型 -->
  <!--[if lt IE 8]>
    <style>
      *{*behavior: url(/static/css/rely/boxsizing.htc);}
    </style>
  <![endif]-->
  <!-- 让低版本 ie 兼容 html5 新标签 -->
  <!--[if lt IE 9]>
    <script src="/static/js/polyfills/html5shiv.min.js"></script>
  <![endif]-->
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header-row1 clearfix">
        <h1 class="logo lf"><a href="/"><img src="/static/img/logo.png" alt="阿猪网"></a></h1>
        <nav class="rf nav">
          <ul class="clearfix">
            <li class="active">
              <a href="/">
                <span class="nav1-icon nav-icon"></span>
                <strong>首页</strong>
              </a>
            </li>
            <li>
              <a href="/">
                <span class="nav2-icon nav-icon"></span>
                <strong>直播</strong>
              </a>
            </li>
            <li>
              <a href="/">
                <span class="nav3-icon nav-icon"></span>
                <strong>录播</strong>
              </a>
            </li>
            <li>
              <a href="/">
                <span class="nav4-icon nav-icon"></span>
                <strong>推荐课程</strong>
              </a>
            </li>
            <li>
              <a href="/">
                <span class="nav5-icon nav-icon"></span>
                <strong>讲师团队</strong>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="header-row2 clearfix">
        <div class="lf">您好，欢迎来到阿猪网！</div>
        <ul class="rf clearfix hide" id="login-hide">
          <li><a href="javascript:;">登录</a></li>
          <li><a href="javascript:;">注册</a></li>
        </ul>
        <ul class="rf clearfix" id="login-show">
          <li><a href="javascript:;">我的课程</a></li>
          <li><a href="javascript:;">我的主页</a></li>
          <li><a href="javascript:;">个人设置</a></li>
          <li><a href="javascript:;">站内信<span class="web-letter">11</span></a></li>
          <li><a href="javascript:;">退出</a></li>
        </ul>
      </div>
    </div>
  </header>
  <!-- header end -->
  <section class="section-panel">
    <header class="panel-heading clearfix">
      <a href="base.html" class="active">基础信息</a>
      <a href="safety.html">安全设置</a>
      <a href="apikey.html">讲师申请</a>
    </header>
    <div class="panel-body">
      <h2 class="panel-title">基础信息</h2>
      <form id="set-base-form" class="w600 cmxform" method="post">
        <div class="form-group">
          <label class="control-label">昵称</label>
          <div class="form-controls">
            <input type="text" id="nickname" name="" class="form-input" value="" maxlength="50">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">性别</label>
          <div class="form-controls">
            <div id="form-radio">
              <input type="radio" id="profile-gender0" checked name="sex" required value="1">
              <label for="profile-gender0">男</label>
              <input type="radio" id="profile-gender1" name="sex" required value="0">
              <label for="profile-gender1">女</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label" for="profile-truename">姓名</label>
          <div class="form-controls">
            <input type="text" id="profile-truename" name="" class="form-input" value="" maxlength="30">
            <div class="form-hint">您尚未实名认证，<a href="autonym.html">点此认证</a></div>
          </div>
        </div>
        <div class="form-group">
          <div class="control-label">当前头像</div>
          <div class="form-controls" id="user-avatar">
            <!-- <input type="file" name="file" id="head-set" value="选择图片"/> -->
            <div id="uploader">
                <div class="queueList">
                    <ul class="filelist"><li><img id="imghead" src="/static/img/default-avatar.jpg" class="avatar-img"></li></ul>
                </div>
                <div class="statusBar">
                    <!-- <div class="progress">
                        <span class="text">0%</span>
                        <span class="percentage"></span>
                    </div><div class="info"></div> -->
                    <div class="btns">
                        <div id="filePicker"></div><div class="uploadBtn">开始上传</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="profile-mobile" class="control-label">手机号码</label>
          <div class="form-controls">
            <input type="text" id="profile-mobile" class="form-input" value="" name="" isMobile="true">
          </div>
        </div>
        <div class="form-group">
          <label for="profile-link" class="control-label">邀请链接</label>
          <div class="form-controls">
            <input type="text" id="profile-link" class="form-input" value="" name="">
          </div>
        </div>
        <div class="form-group">
          <label for="profile-firm" class="control-label">公司</label>
          <div class="form-controls">
            <input type="text" id="profile-firm" class="form-input" value="" name="">
          </div>
        </div>
        <div class="form-group">
          <label for="profile-job" class="control-label">职位</label>
          <div class="form-controls">
            <input type="text" id="profile-job" class="form-input" value="" name="">
          </div>
        </div>
        <div class="form-group">
          <label for="profile-sdf" class="control-label">个性签名</label>
          <div class="form-controls">
            <input type="text" id="profile-sdf" class="form-input" value="" name="">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">自我介绍</label>
          <div class="form-controls">
            <textarea name="" rows="4" id="profile-about" class="form-textarea"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">微博</label>
          <div class="form-controls">
            <input type="text" class="form-input" value="" name="">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">微信</label>
          <div class="form-controls">
            <input type="text" class="form-input" value="" name="">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">qq</label>
          <div class="form-controls">
            <input type="text" class="form-input" value="" name="">
          </div>
        </div>
        <div class="form-group">
          <div class="form-submit">
            <button type="submit" class="button-submit">保存信息</button>
          </div>
        </div>
      </form>
    </div>
  </section>
  <footer class="footer clearfix">
    <div class="lf">
      <div class="f-links clearfix">
        <div class="lf">友情链接：</div>
        <div class="lf f-link">
          <a href="http://www.baidu.com" target="_blank">百度</a>
          <a href="https://auth.alipay.com/login/index.htm" target="_blank">支付宝</a>
          <a href="http://www.baidu.com" target="_blank">百度</a>
          <a href="https://auth.alipay.com/login/index.htm" target="_blank">支付宝</a>
          <a href="http://www.baidu.com" target="_blank">百度</a>
          <a href="https://auth.alipay.com/login/index.htm" target="_blank">支付宝</a>
        </div>
      </div>
      <div class="f-line"></div>
      <div class="f-nav clearfix">
        <a href="javascript:;">关于我们</a>
        <a href="javascript:;">人才招聘</a>
        <a href="javascript:;">讲师招聘</a>
        <a href="javascript:;">联系我们</a>
        <a href="javascript:;">意见反馈</a>
      </div>
      <div class="copyright">上海缔醍信息科技有限公司版权所有 | 京 ICP 备 13046642 号 -2</div>
    </div>
    <div class="rf f-erweima">
      <img src="/static/img/erweima.jpg" alt="">
    </div>
  </footer>
  <!-- footer end -->

  <!-- js 脚本文件 -->
  <script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="/static/js/lib/jquery-1.9.1.min.js"><\/script>')</script>
  <script src="/static/js/lib/sea.js" id="seajsnode"></script>
  <script src="/static/js/plugins/slick/slick.min.js"></script>
  <script>
    seajs.config({
      alias: {
        'modernizr': '/static/js/polyfills/modernizr.min',
        'common' : '/static/static/js/common.js',
        'slick': '/static/js/plugins/slick/slick.min'
      }
    });
    seajs.use('/static/js/main.js');
  </script>
  <script src="/static/js/plugins/validate/jquery.validate.min.js"></script>
  <script src="/static/js/plugins/validate/messages_zh.js"></script>
  <script src="/static/js/plugins/kindeditor/kindeditor-min.js?v=2"></script>
  <script src="/static/js/plugins/webupload/webuploader.js"></script>
  <script src="/static/js/plugins/webupload/upload.js"></script>
  <script>
    // 调用富文本文件 js
    var editor2;
    window.K = KindEditor;
    K.create('textarea[id="profile-about"]', {
      resizeType : 1,
      afterBlur: function(){this.sync()},
      items : [
        'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
        'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
        'insertunorderedlist', '|', 'emoticons', 'image', 'link','source']
    });
    $(function(){
      $("#set-base-form").validate({
        onsubmit:true,// 是否在提交时验证
        submitHandler: function(form){
          var _url = $("input[name='_url']").val();
          var data = $("#user-profile-form").serialize();
          $.ajax({
            url : _url,
            type : 'post',
            data : data,
            success : function(data){
              if(data == true){
                alert("提交成功");
              }else{
                alert(data);
              }
            }
          });
        }
      });
    });
    //ajax提交
  </script>
</body>
</html>