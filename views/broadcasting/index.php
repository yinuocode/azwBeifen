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
  <link rel="stylesheet" href="/static/js/plugins/upload/uploadify.css">
  <link rel="stylesheet" href="/static/css/lecture.css">
  <!-- 让低版本ie浏览器更好的兼容 -->
  <!--[if lt IE 8]>
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
    <script src="/static/js/polyfills/excanvas.js"></script>
    <script src="/static/js/polyfills/ie8eventlistener.js"></script>
  <![endif]-->
</head>
<body>
  <header class="header clearfix">
    <h1 class="clearfix lf"><a href="/" target="_blank" class="logo lf"><img src="/static/img/lecture/logo-sub.png" alt="阿猪网"></a><hgroup class="lf">课程直播中心</hgroup></h1>
    <a class="rf" id="buttoncontainer" href="javascript:;">开始直播</a>
  </header>
  <!-- header end -->
  <section class="mainbox">
    <aside class="aside clearfix">
      <div class="aside-lf lf" id="SourceSceneMenus">
        <div id="scenes">
          <h2>场景</h2>
          <ul id="SceneList"></ul>
        </div>
        <div id="sources">
          <h2>视频源</h2>
          <ul id="SourceList" class="ui-sortable"></ul>
        </div>
      </div>
      <div class="aside-rf lf">
        <div class="search-student clearfix">
          <input type="text" placeholder="搜索在线学员" id="chat-search"><span class="iconfont icon icon-search">&#xe609;</span>
        </div>
        <ul class="student-list" id="student-list">
        </ul>
      </div>
    </aside>
    <section class="content-box">
      <div class="content lf">
        <aside class="content-side lf">
          <div class="file-btn clearfix">
            <form enctype="multipart/form-data" class="lf">
              <input id="file-upload" name="fileUpload" type="file">
            </form>
            <a href="javascript:;" id="Jpopup" class="lf uploadify-button">云文件</a>
            <!-- onclick="showfile();" -->
          </div>
          <div class="palette-con"><div id="huaban-con">画板</div></div>
          <div id="thumbs" class="navigation">
            <ul class="thumbs">
            </ul>
          </div>
        </aside>
        <section class="content-nr">
          <header class="content-head">
            <h1 id="content-title"></h1>
          </header>
          <div class="content-body">
            <div id="palette">
              <div class="canvas-out">
                <canvas id="canvas" width="700" height="380">您的浏览器不支持画板，请更换较新浏览器使用!</canvas>
              </div>
              <form class="clearfix">
                <div class="w33lf">
                  <dl>
                    <dt class="left">
                      <label for="textBox">输入文本:</label>
                    </dt>
                    <dd>
                      <textarea type="text" id="textBox" placeholder="Your text here" size="30"></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="w33lf">
                  <dl>
                    <dt class="left">
                      <label for="fillOrStroke">字体填充:</label>
                    </dt>
                    <dd>
                      <select id="fillOrStroke">
                        <option value="fill">fill</option>
                        <option value="stroke">stroke</option>
                        <option value="both">both</option>
                      </select>
                    </dd>
                  </dl>
                </div>
                <div class="palette-case w33lf">
                  <div class="palette-box">
                    <div class="palette yellow"></div>
                  </div>
                  <div class="palette-box">
                    <div class="palette red"></div>
                  </div>
                  <div class="palette-box">
                    <div class="palette blue"></div>
                  </div>
                  <div class="palette-box">
                    <div class="palette green"></div>
                  </div>
                  <div class="palette-box">
                    <div class="palette black"></div>
                  </div>
                  <div class="clear"></div>
                  <a class="navbtn" id="new">清除</a>
                </div>
                <div class="w33lf">
                  <dl>
                    <dt class="left">
                      <label for="fontWeight">字体粗细:</label>
                    </dt>
                    <dd>
                      <select id="fontWeight">
                        <option value="normal">normal</option>
                        <option value="bold">bold</option>
                        <option value="bolder">bolder</option>
                        <option value="lighter">lighter</option>
                      </select>
                    </dd>
                  </dl>
                </div>
                <div class="w33lf">
                  <dl>
                    <dt class="left">
                      <label for="textFont">字体朝向:</label>
                    </dt>
                    <dd>
                      <select id="textFont">
                        <option value="serif">serif</option>
                        <option value="sans-serif">sans-serif</option>
                        <option value="cursive">cursive</option>
                        <option value="fantasy">fantasy</option>
                        <option value="monospace">monospace</option>
                      </select>
                    </dd>
                  </dl>
                </div>
                <div class="w33lf">
                  <dl>
                    <dt class="left">
                      <label for="textSize">字体大小:</label>
                    </dt>
                    <dd>
                      <input type="range" id="textSize" min="20" max="200" step="1" value="50">
                    </dd>
                  </dl>
                </div>
                <div class="w33lf">
                  <dl>
                    <dt class="left">
                      <label for="textFillColor">字体颜色:</label>
                    </dt>
                    <dd>
                      <input type="color" id="textFillColor" value="#000000">
                    </dd>
                  </dl>
                </div>
                <div class="w33lf">
                  <dl>
                    <dt class="left">
                      <label for="textBaseline">文本基线:</label>
                    </dt>
                    <dd>
                      <select id="textBaseline">
                        <option value="middle">middle</option>
                        <option value="top">top</option>
                        <option value="hanging">hanging</option>
                        <option value="alphabetic">alphabetic</option>
                        <option value="ideographic">ideographic</option>
                        <option value="bottom">bottom</option>
                      </select>
                    </dd>
                  </dl>
                </div>
                <div class="w33lf">
                  <dl>
                    <dt class="left">
                      <label for="fontStyle">字体风格:</label>
                    </dt>
                    <dd>
                      <select id="fontStyle">
                        <option value="normal">normal</option>
                        <option value="italic">italic</option>
                        <option value="oblique">oblique</option>
                      </select>
                    </dd>
                  </dl>
                </div>
              </form>
            </div>
            <div class="slideshow-container">
              <div id="loading" class="loader"></div>
              <div id="slideshow" class="slideshow"></div>
            </div>
          </div>
        </section>
      </div>
      <div class="chatbox rf chatbox-lecture">
        <header class="chat-head clearfix">
          <div class="lf">讲师：<span id="lecturer-name"></span></div>
          <div class="lf">课堂人数：<span id="count"></span>人</div>
        </header>
        <div class="lecturer-order clearfix">
          <div class="lf icon iconfont icon-speak">麦序模式</div>
          <a href="javascript:;" class="icon-speak-state rf">禁麦</a>
        </div>
        <div class="chat-body">
          <ol class="lecturer-list">
            <li>
              <span class="hot lf point-icon icon iconfont"><b>1.</b></span>
              <img src="http://placehold.it/32x32" alt="用户名" class="avatar">
              <span class="username">久伴</span>
              <span class="usernamesub">老师</span>
            </li>
            <li>
              <span class="hot lf point-icon icon point-icon-off iconfont"><b>2.</b></span>
              <img src="http://placehold.it/32x32" alt="用户名" class="avatar">
              <span class="username">久伴</span>
              <span class="usernamesub">老师</span>
            </li>
            <li>
              <span class="hot lf point-icon point-icon-off icon iconfont"><b>3.</b></span>
              <img src="http://placehold.it/32x32" alt="用户名" class="avatar">
              <span class="username">久伴</span>
              <span class="usernamesub">老师</span>
            </li>
          </ol>
          <div class="chat" id="chat-messages">
            <a href="javascript:;" id="notice" class="inform"></a>
          </div>
        </div>
        <div class="banned-state">抱歉，你已被禁言！</div>
        <div class="chat-bot">
          <div class="chat-bot-bd">
            <div class="chat-tool">
              <div id="iconlist">
              </div>
              <a href="javascript:;" id="face" class="icon iconfont icon-face"></a>&nbsp;&nbsp;
              <a href="javascript:;" id="flower" class="icon iconfont icon-flower"></a>
            </div>
            <div class="chat-input clearfix">
              <div contenteditable="true" class="chat-textarea" placeholder="type you message"></div><button class="chat-submit">发送</button>
            </div>
            <div class="chat-status hide">Status:<span>IDle</span></div>
          </div>
        </div>
      </div>
    </section>
  </section>
  <!-- main end -->
  <div id="connection-form">
    <div id="formcontainer">
        <label for="hostname">直播系统主机</label>
        <input type="text" name="hostname" id="hostname" class="text ui-widget-content ui-corner-all" />
       <div title="Connect To Host" id="connectionbutton" class = "button"> <p>连接</p> </div>
       <div title="Close Connection Dialog" id="closeconnectionform">x</div>
    </div>
    <div id="popup-stats">
      <table>
        <tr><td class="PopupStatLabel">连接状态: </td> <td id="ConnectionStatusStat" class="red"> 未连接 </td></tr>
        <tr><td class="PopupStatLabel"> </td> <td></td></tr>
      </table>
    </div>
  </div>
  <!-- 链接状态 end -->
  <footer class="footer" id="statsView">
    <div id="Lights" title="Manage Connection:&#10;Disconnected from OBS" class="disconnected"></div>
    <div id="MicVolumeControl">
      <div id="MicVolume" class="VolumeMeter">
        <div class="VolumeGrey"></div>
        <div class="VolumeRed"></div>
        <div class="VolumeMask"></div>
      </div>
      <div title="Toggle Mic Mute" id="MicMuteButton"></div>
    </div>
    <div id="DesktopVolumeControl">
      <div id="DesktopVolume" class="VolumeMeter">
        <div class="VolumeGrey"></div>
        <div class="VolumeRed"></div>
        <div class="VolumeMask"></div>
      </div>
      <div title="Toggle Desktop Mute"id="DesktopMuteButton"></div>
    </div>
    <div id="StatsTableDiv">
      <table id="StatsTable">
        <tr>
          <td class="statlabel" id="TimeRunningLb">Time Running:</td>
          <td class="statlabel" id="DroppedFramesLb">Dropped Frames:</td>
          <td class="statlabel" id="FPSLb">FPS:</td>
          <td class="statlabel" id="DataRateLb">Bitrate:</td>
        </tr>
        <tr>
          <td class="stattext" id="TimeRunning">00:00:00</td>
          <td class="stattext" id="DroppedFrames">10000(90.00%)</td>
          <td class="stattext" id="FPS">31</td>
          <td class="stattext" id="DataRate"> 0 kb/s</td>
        </tr>
      </table>
    </div>
  </footer>
  <!-- footer end -->
  <div id="pptlist">
    <div id="Jtarget">
      <ul id="filelist">
      </ul>
      <div id="Jclose"></div>
    </div>
  </div>
  <!-- 云文件弹窗 end -->
  <div class="upload-dispose clearfix">
    <div id="file_upload-queue" class="uploadify-queue"></div>
    <div id="loading" class="loader"></div>
    <div class="upload-hint">正在处理上传文件，请稍后。。。</div>
  </div>
  <!-- 上传处理 end -->
  <input name="_csrf" type="hidden" id="_csrf" value="<?= Yii::$app->request->csrfToken?>">

  <!-- js 脚本文件 -->
  <script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="/static/js/lib/jquery-1.9.1.min.js"><\/script>')</script>
  <script src="/static/js/lib/template.js"></script>
  <script src="/static/js/lib/sea.js" id="seajsnode"></script>
  <script src="http://139.196.195.238:8080/socket.io/socket.io.js"></script>
  <script>
    // 全局变量
    var arrAdminT,//获取管理员数组
        userMid,
        userName,
        socketUrl,
        dataService,
        pTimestamp,
        pTtoken,
        noticeNr,
        search=location.search,
        courseCid=search.substring(search.indexOf('cid=')+4);
    // seajs
    seajs.config({
      alias: {
        'lecture' : '/static/js/lecture/lecture.js',
        'common' : '/static/js/common.js',
        'modernizr': '/static/js/polyfills/modernizr.min',
        'main' : '/static/js/lecture/main.js',
        'volumecontrol' : '/static/js/lecture/volumecontrol.js',
        'palette' : '/static/js/lecture/palette.app.js',
        'galleriffic' : '/static/js/plugins/galleriffic/jquery.galleriffic.js',
        'uploadify' : '/static/js/plugins/upload/jquery.uploadify.js',
        'uploadifymin' : '/static/js/plugins/upload/jquery.uploadify.min.js',
        'socketio' : 'http://139.196.195.238:8080/socket.io/socket.io.js',
        'mychat' : '/static/js/mychat.js'
      }
    });
    // 请求页面数据
    $.ajax({
      url:'/static/json/datas.json',
      type:'POST',
      data:{cid:courseCid},
      dataType:'json',
      success: function(datas){
        // 变量赋值
        arrAdminT=datas.room.arrAdmin;//获取管理员数组
        socketUrl=datas.room.socketUrl;
        noticeNr=datas.room.noticeNr;
        userMid=datas.lecturer.id;
        userName=datas.lecturer.name;
        dataService=datas.dataService;
        pTimestamp=datas.pTimestamp;
        pTtoken=datas.pTtoken;
        $('#lecturer-name').html(userName);
        $('#content-title').html(datas.room.title);
        seajs.use('lecture');
      },
      error: function(xml,err){
        console.log(err);
      }
    });
  </script>
</body>
</html>