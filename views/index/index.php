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
  <div class="top-banner">
  </div>
  <!-- top-banner end -->
  <div class="top-notice">
    <div class="clearfix">
      <div class="lf top-notice-icon"></div>
      <div class="lf">
        <ul class="list" id="notice-list">
        <script id="noticeList" type="text/html">
        {{each list as value i}}
          <li>{{value.content}}</li>
        {{/each}}
        </script>
        </ul>
      </div>
    </div>
  </div>
  <!-- top-notice end -->
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
  <section class="section01 clearfix">
    <div class="sec01-lf lf">
      <a href="javascript:;" target="_blank"><img src="/static/img/section01-lf.jpg" alt=""></a>
      <div class="search">
        <form action="" method="post">
          <div class="clearfix" id="search-direction">
            <a href="javascript:;" class="active" val="0">课程</a>
            <a href="javascript:;" val="1">讲师</a>
            <input type="hidden" value='0' name="search-class" id="search-class">
          </div>
          <div class="search-input clearfix">
            <input type="text" class="search-txt" name="search-txt">
            <button type="submit" class="search-btn">搜索</button>
          </div>
        </form>
      </div>
    </div>
    <div class="rf sec01-rf">
      <div class="sec01-rf-top"></div>
      <div class="slider sec01-rf-side" id="sec01-side">
        <script id="sec01Side" type="text/html">
          {{each list as value i}}
            <div><a href="{{value.href}}" target="_blank"><img src="{{value.portrait}}" alt="{{value.real_name}}"></a></div>
          {{/each}}
        </script>
      </div>
      <div class="sec01-rf-bt"></div>
    </div>
  </section>
  <!-- section01 end -->
  <section class="section02">
    <h1 class="sec02-title">推荐课程</h1>
    <ul class="course-list clearfix" id="course-list">
    <script id="courseList" type="text/html">
    {{each list as value i}}
      <li>
        <a href="{{value.coures_href}}" target="_blank">
          <img src="{{value.coures_cover}}" alt="">
          <span>{{value.coures_title}}</span>
        </a>
      </li>
    {{/each}}
    </script>
    </ul>
    <button class="course-all" herf="">全部课程</button>
  </section>
  <!-- section02 end -->
  <section class="section03" id="section03">
    <div class="sec03-top">
      <div class="sec03-top-item active">
        <h1 class="sec03-title">
          <img src="/static/img/sec03-title1.png" alt="魅力排行榜">
        </h1>
        <div class="sec03-rank">
          <table class="sec03-table" id="sec03-charm">
          <script id="sec03Charm" type="text/html">
            <tr>
              <th class="th1">名次</th>
              <th class="th2">昵称</th>
              <th class="th3">礼物</th>
              <th class="th4">数量</th>
              <th class="th5">魅力值</th>
            </tr>
            {{each list as value i}}
            <tr>
              <td><span class="sec03-rank-icon sec03-rank{{i + 1}}">{{i + 1}}</span></td>
              <td>
              {{if value.nick_name}}
                {{value.nick_name}}
              {{else}}
                {{value.username}}
              {{/if}}
              </td>
              <td>
                {{each value.gift as value i}}
                  {{if i<8}}
                  <img src="{{value.g.gimage}}" alt="">
                  {{/if}}
                {{/each}}
              </td>
              <td>{{value.sum}}</td>
              <td>{{value.charm}}</td>
            </tr>
            {{/each}}
          </script>
          </table>
        </div>
      </div>
      <div class="sec03-top-item">
        <h1 class="sec03-title">
          <img src="/static/img/sec03-title2.png" alt="财富榜">
        </h1>
        <div class="sec03-rank">
          <table class="sec03-table" id="sec03-wealth">
          <script id="sec03Wealth" type="text/html">
            <tr>
              <th class="th1">名次</th>
              <th class="th2">昵称</th>
              <th class="th3">礼物</th>
              <th class="th4">数量</th>
              <th class="th5">财富值</th>
            </tr>
            {{each list as value i}}
            <tr>
              <td><span class="sec03-rank-icon sec03-rank{{i + 1}}">{{i + 1}}</span></td>
              <td>
              {{if value.nick_name}}
                {{value.nick_name}}
              {{else}}
                {{value.username}}
              {{/if}}
              </td>
              <td>
                {{each value.gift as values i}}
                  {{if i<8}}
                  <img src="{{values}}" alt="">
                  {{/if}}
                {{/each}}
              </td>
              <td>{{value.summation}}</td>
              <td>{{value.sumprice}}</td>
            </tr>
            {{/each}}
          </script>
          </table>
        </div>
      </div>
      <div class="sec03-top-item">
        <h1 class="sec03-title">
          <img src="/static/img/sec03-title3.png" alt="入驻公司">
        </h1>
        <div class="sec03-rank">
          <ul class="sec03-platform clearfix">
          <script id="sec03Platform" type="text/html">
          {{each list as value i}}
            <li><a href="{{value.address}}" target="_blank"><img src="{{value.logo}}" alt="{{value.fname}}"></a></li>
          {{/each}}
          </script>
          </ul>
        </div>
      </div>
    </div>
    <div class="sec03-bt">
      <div class="item active">
        <a href="javascript:;">
          <img src="/static/img/sec03-item1.png" alt="魅力榜">
          <p class="title">魅力榜</p>
        </a>
      </div>
      <div class="item">
        <a href="javascript:;" id="bt-treasure">
          <img src="/static/img/sec03-item2.png" alt="财富榜">
          <p class="title">财富榜</p>
        </a>
      </div>
      <div class="item">
        <a href="javascript:;" id="bt-platform">
          <img src="/static/img/sec03-item3.png" alt="入驻公司">
          <p class="title">入驻公司</p>
        </a>
      </div>
      <div class="item-last">
        <a href="http://www.baidu.com" target="_blank">
          <img src="/static/img/sec03-item4.png" alt="全部课程">
          <p class="title">全部课程</p>
        </a>
      </div>
    </div>
  </section>
  <!-- main end -->
  <!-- footer -->
  <?php include '../view/layouts/footer.php';?>
  <!-- footer end -->

  <script src="/static/js/plugins/slick/slick.min.js"></script>
  <script>
    // seajs
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