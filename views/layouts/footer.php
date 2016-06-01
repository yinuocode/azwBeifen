<footer class="footer clearfix" id="footer">
  <div class="lf">
    <div class="f-links clearfix">
      <div class="lf">友情链接：</div>
      <div class="lf f-link" id="f-link">
      <script id="fLink" type="text/html">
        {{each list as value i}}
        <a href="{{value.address}}" target="_blank">{{value.text}}</a>
        {{/each}}
      </script>
      </div>
    </div>
    <div class="f-line"></div>
    <div class="f-nav clearfix" id="f-nav">
    <script id="fNav" type="text/html">
      {{each list as value i}}
      <a href="{{value.controller}}">{{value.title}}</a>
      {{/each}}
    </script>
    </div>
    <div class="copyright">上海缔醍信息科技有限公司版权所有 | 京 ICP 备 13046642 号 -2</div>
  </div>
  <div class="rf f-erweima">
    <img src="./static/img/erweima.jpg" alt="">
  </div>
</footer>
<!-- footer end -->
<!-- 右侧客服 -->
<div id="float-consult" class="float-consult hidden-xs">
  <div class="btn-group-vertical">
    <span class="btn btn-consult-warning float-consult-qq-btn" data-container=".float-consult-qq-btn" data-title="QQ客服" data-content-element="#consult-qq-content">
      <span class="icon icon-qq"></span>
      <div class="popover fade left in" style="top: -53px; left: -251px;">
        <div class="arrow"></div>
        <h3 class="popover-title">QQ客服</h3>
        <div class="popover-content">
          <p>
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=359722609&amp;site=qq&amp;menu=yes">
              <img border="0" src="http://wpa.qq.com/pa?p=2:359722609:52" alt="" title="点击这里给我发消息">杨 艳
            </a>
          </p>
          <p>
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=349080058&amp;site=qq&amp;menu=yes">
              <img border="0" src="http://wpa.qq.com/pa?p=2:349080058:52" alt="" title="点击这里给我发消息">胡世春
            </a>
          </p>
          <p>
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=823006117&amp;site=qq&amp;menu=yes">
              <img border="0" src="http://wpa.qq.com/pa?p=2:823006117:52" alt="" title="点击这里给我发消息">黄亚东
            </a>
          </p>
        </div>
      </div>
    </span>
    <span class="btn btn-consult-warning float-consult-qqgroup-btn" data-container=".float-consult-qqgroup-btn" data-title="QQ群" data-content-element="#consult-qqgroup-content"><span class="icon icon-qqgroup"></span>
      <div class="popover fade left in">
        <div class="arrow"></div>
        <h3 class="popover-title">QQ群</h3>
        <div class="popover-content">
          <p>
            <span class="icon icon-qqgroup text-muted" style="font-size:14px;"></span>阿猪网学习交流群<br>
            <span class="text-info" style="margin-left:20px;">338756035</span>
          </p>
        </div>
      </div>
    </span>
    <span class="btn btn-consult-warning float-consult-phone-btn" data-container=".float-consult-phone-btn" data-title="电话客服" data-content-element="#consult-phone-content"><span class="icon icon-phone"></span>
      <div class="popover fade left in">
        <div class="arrow"></div>
        <h3 class="popover-title">电话客服</h3>
        <div class="popover-content">
          <p>
            <strong>服务时间：</strong> 9:00 - 17:00
          </p>
          <p>杨老师： 13981940599</p>
          <p>胡老师： 15216621371</p>
          <p>黄老师： 15800916796</p>
        </div>
      </div>
    </span>
    <span class="btn btn-consult-warning float-consult-weixin-btn" data-container=".float-consult-weixin-btn" data-title="微信公众号" data-content-element="#consult-weixin-content"><span class="icon icon-weixin"></span>
      <div class="popover fade left in">
        <div class="arrow"></div>
        <h3 class="popover-title">微信公众号</h3>
        <div class="popover-content">
          <img src="./static/img/erweima.jpg" class="qrcode center-block">
        </div>
      </div>
    </span>
  </div>
</div>
<!-- right service end -->
<div id="toTop"><img src="./static/img/totop.png" title="神猪飞天"></div>
<!-- to-top end -->
<!-- 登录注册弹窗代码 -->
<div class="registration" id="registration">
  <div class="registration-modal">
    <div class="registration-header">
      <h1>
        <span class="active-title">登录</span>
        <span>注册</span>
      </h1>
      <button type="button" class="rl-close"></button>
    </div>
    <div class="registration-body">
      <form id="signin-form" method="post" class="registration-form" onsubmit="return checkLogin()">
        <div class="rlf-group">

          <input type="text" value="" name="LoginForm[username]" class="ipt ipt-email e-username" id="e-username" placeholder="请输入用户名或邮箱">
          <p class="rlf-tip-wrap"></p>
        </div>
        <div class="rlf-group">
          <input type="password" name="LoginForm[password]" class="ipt ipt-pwd" id="ipt-pwd" placeholder="请输入密码">
          <p class="rlf-tip-wrap"></p>
        </div>
        <div class="rlf-group rlf-appendix clearfix">
          <label for="auto-signin" class="rlf-autoin lf" hidefocus="true"><input type="checkbox" checked="checked" name="rememberMe" class="auto-cbx" id="auto-signin">下次自动登录</label>
          <a href="/user/newforgot" class="rlf-forget rf" target="_blank" hidefocus="true">忘记密码 </a>
        </div>
        <div class="rlf-group clearfix">
          <input type="button" id="signin-btn" value="登录" hidefocus="true" class="btn-red btn-full">
        </div>
        <input name="_csrf" type="hidden" id="_csrf" value="">
      </form>
      <form id="signup-form"  method="post" class="registration-form" onsubmit="return checkSignup()">
        <div class="rlf-group">
          <input type="text" value="" name="SignupForm[email]" class="ipt ipt-email" id="e-phone" placeholder="请输入邮箱">
          <p class="rlf-tip-wrap"></p>
        </div>
        <div class="rlf-group">
          <input type="text" value="" name="SignupForm[username]" class="ipt ipt-email e-username" placeholder="用户名">
          <p class="rlf-tip-wrap"></p>
        </div>
        <div class="rlf-group">
          <input type="password" name="SignupForm[password]" class="ipt ipt-pwd" placeholder="请输入密码">
          <p class="rlf-tip-wrap"></p>
        </div>
        <div class="rlf-group clearfix">
          <input type="button" id="signup-btn" value="注册" hidefocus="true" class="btn-red btn-full">
        </div>
        <input name="_csrf" type="hidden" id="_csrf" value="">
      </form>
    </div>
    <div class="registration-footer">
      <div class="pop-login-sns clearfix">
        <span class="lf">其他方式登录</span>
        <a href="javascript:void(0)" class="pop-sns-weibo"><i class="icon-weibo"></i></a>
        <a href="javascript:void(0)" class="pop-sns-qq"><i class="icon-qq"></i></a>
        <a href="javascript:void(0)" class="pop-sns-weixin"><i class="icon-weixin"></i></a>
      </div>
    </div>
  </div>
  <div class="registration-bg"></div>
</div>
<!-- 登录注册 end -->
<!-- js 脚本文件 -->
<script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="/static/js/lib/jquery-1.9.1.min.js"><\/script>')</script>
<script src="/static/js/lib/template.js"></script>
<script src="/static/js/lib/sea.js" id="seajsnode"></script>
