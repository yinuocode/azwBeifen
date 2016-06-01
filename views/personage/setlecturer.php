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
      <a href="safety.html">安全设置</a>
      <a href="apikey.html" class="active">讲师申请</a>
    </header>
    <div class="panel-body">
      <h2 class="panel-title">讲师申请</h2>
      <form id="set-base-form" class="w600 cmxform" method="post">
        <div class="form-group">
          <label class="control-label" for="profile-truename">姓名</label>
          <div class="form-controls required">
            <input type="text" id="profile-truename" name="" class="form-input" value="" required maxlength="30">
          </div>
        </div>
        <div class="form-group">
          <div class="control-label">上传半身照</div>
          <div class="form-controls">
            <img id="imghead" src="/static/img/default-avatar.jpg" class="avatar-img">
            <input type="file" name="file" id="head-set" value="选择图片"/>
          </div>
        </div>
        <div class="form-group">
          <div class="control-label">身份证正面照</div>
          <div class="form-controls">
            <img id="imghead" src="/static/img/default-avatar.jpg" class="avatar-img">
            <input type="file" name="file" id="head-set" value="选择图片"/>
          </div>
        </div>
        <div class="form-group">
          <div class="control-label">身份证反面照</div>
          <div class="form-controls">
            <img id="imghead" src="/static/img/default-avatar.jpg" class="avatar-img">
            <input type="file" name="file" id="head-set" value="选择图片"/>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">师资年限</label>
          <div class="form-controls">
            <input type="text" class="form-input" value="" name="">
          </div>
        </div>
        <div class="form-group">
          <label for="profile-mobile" class="control-label">手机号码</label>
          <div class="form-controls required">
            <input type="text" id="profile-mobile" class="form-input" value="" name="" isMobile="true">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">擅长领域</label>
          <div class="form-controls">
            <textarea name="" rows="4" id="profile-about" class="form-textarea"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">邮箱</label>
          <div class="form-controls">
            <input type="text" class="form-input" value="" name="">
          </div>
        </div>
        <div class="form-group">
          <div class="form-submit">
            <button type="submit" class="button-submit">提交</button>
          </div>
        </div>
      </form>
     <!--  <form id="set-base-form" class="cmxform" method="post">
        <div class="form-group">
          <label class="control-label">昵称</label>
          <div class="form-control">
            <input type="text" id="nickname" name="" required class="" value="<?=$result['member_nickname']?>" maxlength="30">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label" for="profile-truename">姓名</label>
          <div class="controls">
            <input type="text" id="profile-truename" name="Member[member_name]" class="form-control" required maxlength="30" value="<?= $result["member_name"]?>">
            <div class="help-block"> </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">性别</label>
          <div class="col-md-7 controls radios">
            <div id="profile_gender">
              <input type="radio" id="profile_gender_0" name="Member[member_sex]" required="required" value="1" <?php if($result['member_sex'] == '1')echo "checked=checked"?>>
              <label for="profile_gender_0" class="required">男</label>
              <input type="radio" id="profile_gender_1" name="Member[member_sex]" required="required" value="0" <?php if($result['member_sex'] == '0')echo "checked=checked"?>>
              <label for="profile_gender_1" class="required">女</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label" for="profile_idcard">身份证号</label>
          <div class="col-md-7 controls radios">
            <input type="text" id="profile_idcard" name="Member[member_card]" class="form-control" value="<?=$result['member_card'] ?>">
            <div class="help-block"> </div>
          </div>
        </div>
        <div class="form-group">
          <label for="profile_mobile" class="col-md-2 control-label">手机号码</label>
          <div class="col-md-7 controls">
            <input type="text" id="profile_mobile" name="Member[member_phone]" isMobile="true" class="form-control" value="<?=$result['member_phone']?>">
            <div class="help-block" style="display:none"> </div>
          </div>
        </div>
        <div class="form-group form-forIam-group form-notStudent-group">
          <label class="col-md-2 control-label">公司</label>
          <div class="col-md-7 controls">
            <input type="text" id="profile_company" name="Member[member_company]" class="form-control" value="<?=$result['member_company']?>">
            <div class="help-block"></div>
          </div>
        </div>
        <div class="form-group form-forIam-group form-notStudent-group">
          <label class="col-md-2 control-label">职业</label>
          <div class="col-md-7 controls">
            <input type="text" id="profile_job" name="Member[member_profess]" class="form-control" value="<?=$result['member_profess']?>">
            <div class="help-block"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">头衔</label>
          <div class="col-md-7 controls">
            <input type="text" id="profile_title" name="Member[member_title]" class="form-control" value="<?=$result['member_title']?>" data-explain="">
            <div class="help-block"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">个人签名</label>
          <div class="col-md-7 controls">
            <textarea type="text" rows="5" maxlength="130" id="profile_signature" name="Member[member_motto]" class="form-control"><?=$result['member_motto']?></textarea>
            <div class="help-block"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">自我介绍</label>
          <div class="col-md-7 controls">
            <textarea name="Member[member_introduce]" rows="10" id="profile_about" class="form-control"><?=$result['member_introduce']?></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">个人主页</label>
          <div class="col-md-7 controls">
            <input type="text" id="profile_site" name="Member[member_home_page]" class="form-control" value="<?=$result['member_home_page']?>">
            <div class="help-block"></div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-2 control-label">
            <label for="weibo">微博</label>
          </div>
          <div class="col-md-7 controls">
            <input type="text" id="weibo" name="Member[member_weibo]" class="form-control" value="<?=$result['member_weibo']?>">
            <div class="help-block"></div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">微信</label>
          <div class="col-md-7 controls">
            <input type="text" id="profile_weixin" name="Member[member_wechat]" class="form-control" value="<?=$result['member_wechat']?>">
            <div class="help-block"></div>
          </div>
        </div>
        <div class="form-group">
          <label for="profile_qq" class="col-md-2 control-label">QQ</label>
          <div class="col-md-7 controls">
            <input type="text" id="profile_qq" name="Member[member_qq]" class="form-control" value="<?=$result['member_qq']?>">
            <div class="help-block"></div>
          </div>
        </div>
        <input type="hidden" name="Member[member_time]" value="<?php echo time();?>">
        <input type="hidden" name="Member[user_id]" value="<?=Yii::$app->user->identity->id?>">
        <input type="hidden" name="Member[username]" value="<?=Yii::$app->user->identity->username?>">
        <div class="row">
          <div class="col-md-7 col-md-offset-2">
            <button id="profile-save-btn" type="submit" class="btn btn-primary">保存</button>
          </div>
        </div>
      </form> -->
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