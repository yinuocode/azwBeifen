<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="zh-cmn-Hans" class="no-js">
<!--<![endif]-->
<head>
  <meta charset="UTF-8">
  <title>阿猪网首页</title>
  <meta name="Keywords" content="阿猪网首页">
  <meta name="Description" content="阿猪网首页">
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
              <a href="/index.php?r=coures%2Findex">
                <span class="nav2-icon nav-icon"></span>
                <strong>直播</strong>
              </a>
            </li>
            <li>
              <a href="/index.php?r=coures%2Findex">
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
      <div class="header-row2 clearfix" id="header-login">
        <script id="headerLogin" type="text/html">
        {{if isLogin}}
          <div class="lf">{{name}} 欢迎来到阿猪网！</div>
          <ul class="rf clearfix">
            <li><a href="/index.php?r=teaching%2Fonline">我的课程</a></li>
            <li><a href="javascript:;">我的主页</a></li>
            <li><a href="/personage/setbase">个人设置</a></li>
            <li><a href="javascript:;">站内信
              {{if letter}}
              <span class="web-letter">{{letter}}</span>
              {{/if}}
            </a></li>
            <li class="logout"><a href="javascript:;">退出</a></li>
          </ul>
        {{else}}
          <div class="lf">您好，欢迎来到阿猪网！</div>
          <ul class="rf clearfix">
            <li><a href="javascript:;" id="login-btn">登录</a></li>
            <li><a href="javascript:;" id="register-btn">注册</a></li>
          </ul>
        {{/if}}
        </script>
      </div>
    </div>
  </header>
  <!-- header end -->