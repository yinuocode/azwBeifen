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
      <a href="base.html">基础信息</a>
      <a href="safety.html" class="active">安全设置</a>
      <a href="apikey.html">讲师申请</a>
    </header>
    <div class="panel-body">
      <h2 class="panel-title">安全设置</h2>
      <div class="safety-setting w600">
        <div class="row">
          <div class="safety-icon qq"></div>
          <div class="set-name">QQ账号</div>
          <div class="set-info">未绑定，绑定后可直接登录。</div>
          <a href="javascript:;" class="rf">绑定</a>
        </div>
        <div class="row">
          <div class="safety-icon weixin"></div>
          <div class="set-name">微信登录</div>
          <div class="set-info">未绑定，绑定后可直接登录。</div>
          <a href="javascript:;" class="rf">绑定</a>
        </div>
        <div class="row">
          <div class="safety-icon password"></div>
          <div class="set-name">登录密码</div>
          <div class="set-info">登录网校时需要输入的密码</div>
          <a href="setpassword.html" class="rf">修改</a>
        </div>
        <div class="row">
          <div class="safety-icon phone"></div>
          <div class="set-name">手机绑定</div>
          <div class="set-info">增加账户登录、购买课程时的安全性，同时还可以找回登录密码、支付密码。</div>
          <a href="javascript:;" class="rf">绑定</a>
        </div>
      </div>
      <h2 class="panel-title">邮箱设置</h2>
      <form id="set-email-form" class="w600 cmxform" method="post">
        <div class="form-group">
          <label class="control-label" for="profile-email">当前登录邮箱</label>
          <div class="form-controls">
            <input type="text" id="profile-email" name="" class="form-input" value="" required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">新登录邮箱</label>
          <div class="form-controls">
            <input type="text" name="" class="form-input" value="" required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">网站登录密码</label>
          <div class="form-controls">
            <input type="password" name="" required minlength="6" class="form-input" />
            <p class="form-hint">设置新的登录邮箱，需要校验当前的网站登录密码</p>
          </div>
        </div>
        <div class="form-group">
          <div class="form-submit">
            <button type="submit" class="button-submit">提交</button>
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
</body>
</html>