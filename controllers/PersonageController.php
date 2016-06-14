<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\data\Pagination;

use common\models\base\Upload;
use common\models\UserDetail;
use common\models\Audit;
use common\models\base\MailSend;
use common\models\User;

class PersonageController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                        'matchCallback' => function ($rule, $action) {
                            if(!\Yii::$app->user->isGuest){
                              return true;
                            }
                        }
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['post'],
                ],
            ],
        ];
    }

    /**
     * 渲染基本信息页面
     */
    public function actionSetbase()
    {
      return $this->renderPartial('setbase.html');
    }
    
    /**
     * 基础信息页-提交
     */
    public function actionBasic()
    {    
       $uid = Yii::$app->user->identity->id;
       $post = Yii::$app->request->post();
       $post['UserDetail']['user_id'] = $uid;
       $model = UserDetail::findOne(['user_id'=>$uid]) ? UserDetail::findOne(['user_id'=>$uid]) : new UserDetail();

       //判断是否有用户详情
       if($model->load($post) && $model->save()){
          $data = array('state'=>'1');
          echo json_encode($data,JSON_UNESCAPED_UNICODE);
       }else{
         echo json_encode(array('status'=>'0','error'=>'操作失败'),JSON_UNESCAPED_UNICODE);
       }
    }
    /**
     * 基础信息页-请求
     */
    public function actionBasicBeg()
    {
        $uid = Yii::$app->user->identity->id;
        $users = UserDetail::find()->where(['user_id'=>$uid])->asArray()->one();
        $username = Yii::$app->user->identity->username;
        $link = 'http://demo.agodpig.com'.$uid;

        if (empty($users)) {
            $data['link'] = $link;
            $data['status']=0;
            $data['data'] = array();
            $data['username'] = $username;
        }else{
            $users['link'] = $link;
            $data['status']=1;
            $data['data'] = $users;
            $data['username'] = $username;
            if (!empty($users['card'])) {
              $data['card'] = 1;
            }else{
              $data['card'] = 0;
            }
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    /**
     *
     *上传方法
     */
    public function actionUpload()
    {
      if ($_FILES) {
          $upload = new Upload();
          $date = date('Ymd');
          $upload->set_dir('../../common/upload/',$date);
          $fs = $upload->execute();
          // print_r($fs);
      }
    }

    /**
     * 实名认证页面
     */
    public function actionSetname()
    {
      return $this->renderPartial('setname.html');
    }
    /**
     * 实名认证
     */
    public function actionAuthentication()
    {   
      $uid = Yii::$app->user->identity->id;
      $post = Yii::$app->request->post();
      $model = UserDetail::findOne(['user_id'=>$uid]) ? UserDetail::findOne(['user_id'=>$uid]) : new UserDetail();

      if ($model->load($post) && $model->save()) {
          $data['status'] = 1;
          $data['error'] = "认证成功";
      }
      echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 讲师申请页面
     */
    public function actionSetlecturer()
    {
      return $this->renderPartial('setlecturer.html');
    }

    /**
     * 讲师申请
     */
    public function actionLecturerApply()
    {
        $id = Yii::$app->user->identity->id;
        $audit = Audit::findOne(['user_id'=>$id]) ? Audit::findOne(['user_id'=>$uid]) : new Audit();

        //添加讲师信息
        $post = Yii::$app->request->post();
        if ($_POST) {
          $audit -> load(Yii::$app->request->post());
          $audit -> user_id = $id;
          $audit -> audit_time = time();
          if ($audit->save()) {
            $data['status'] = '1';
          }
        }
       
       echo json_encode($data,JSON_UNESCAPED_UNICODE); 
    }
    /**
     * 讲师申请页面请求
     */
    public function actionLecturerBeg()
    {
        $id = Yii::$app->user->identity->id;
        $audit = new Audit();

        $data = $audit->find()->select(['audit_state'])->where(['user_id'=>$id])->asArray()->one();
        if (empty($data)) {
          $data['audit_state'] = '3';
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 安全设置页面
     */
    public function actionSetsafety()
    {
      return $this->renderPartial('setsafety.html');
    }
    /**
     * 邮箱设置
     */
     public function actionMailset()
     {
        $uid = Yii::$app->user->identity->user_id;
        $user = new User();
        $result = $user->find()->where(['id'=>$uid])->asArray()->one();

        if (!empty($_POST)) {
          $password= $result['password_key'].md5($_POST['User']['password_hash']);
          //判断当前登录邮箱和当前网站登录密码
          if ($result['email']==$_POST['oldemail'] && $result['password_hash'] == md5($password)) {
            //邮箱验证
            $mail = new MailSend();
            if ($mail->mail()) {
                $result->email = $_POST['User']['email'];
                if($result->save()){
                  $data['status'] =1;
                }else{
                  echo json_encode(array('status'=>0,'error'=>'邮箱设置失败'),JSON_UNESCAPED_UNICODE);exit();
               }
            }else{
              echo json_encode(array('status'=>0,'error'=>'发送邮箱失败'),JSON_UNESCAPED_UNICODE);exit();
            }
          } else{
              echo json_encode(array('status'=>0,'error'=>'当前登录邮箱或网站登录密码错误'),JSON_UNESCAPED_UNICODE);exit();
          }      
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
     }

    /**
     * 修改密码页面
     */
    public function actionSetpassword()
    {
      return $this->renderPartial('setpassword.html');
    }
    /**
     * 安全设置-修改密码
     */
    public function actionChangepassword()
    {
      if ($_POST) {
            $user = Yii::$app->user->identity;
            //验证旧密码
            $password =md5($user['password_key'].md5($_POST['oldpassword']));
            if ($user['password_hash']==$password) {
                $uid = Yii::$app->user->identity->user_id;
                $puser = User::findOne(['user_id'=>$uid]);
                $newPassword = $user['password_key'].md5($_POST['User']['password_hash']);
                $puser->password_hash =md5($newPassword);
                if ($puser->save()) {
                  $data['status'] =1;
                  $data['error'] = '修改密码成功';
                }else{
                  echo json_encode(array('status'=>'0','error'=>'修改失败'),JSON_UNESCAPED_UNICODE);exit();
                }
            }else{
                echo json_encode(array('status'=>'0','error'=>'旧密码错误'),JSON_UNESCAPED_UNICODE);exit();
            }    
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    } 
 
}
