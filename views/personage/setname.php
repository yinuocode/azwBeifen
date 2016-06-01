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
  <link rel="stylesheet" href="/static/js/plugins/slick/slick.css">
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
      <h2 class="panel-crumbs"><a href="base.html">基础信息</a>&gt;实名认证</h2>
      <div class="panel-body-bd">
        <form id="set-base-form" class="w600 cmxform" method="post">
          <div class="form-group">
            <label class="control-label" for="profile-truename">姓名</label>
            <div class="form-controls required">
              <input type="text" id="profile-truename" name="" class="form-input" value="" required maxlength="30">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label" for="profile-idcard">身份证号</label>
            <div class="form-controls required">
              <input type="text" id="profile-idcard" name="" class="form-input" value="">
            </div>
          </div>
          <div class="form-group">
            <div class="form-submit">
              <button type="submit" class="button-submit">保存信息</button>
            </div>
          </div>
        </form>
      </div>
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
</body>
</html>