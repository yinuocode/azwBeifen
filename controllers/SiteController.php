<?php
namespace frontend\controllers;

use Yii;
use frontend\models\LoginForm;
use frontend\models\PasswordResetRequestForm;
use frontend\models\ResetPasswordForm;
use frontend\models\SignupForm;
use frontend\models\ContactForm;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\Member;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;

/**
 * Site controller
 */
class SiteController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return ArrayHelper::merge([
            [
                'class' => Cors::className(),
                'cors' => [
                    'Origin' => ['http://webapp.agodpig.com'],
                    'Access-Control-Request-Method' => ['POST', 'HEAD', 'OPTIONS'],
                ],
                'actions' => [
                    'signmoup' => [
                        'Access-Control-Allow-Credentials' => true,
                    ]
                ]
            ],
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout', 'signup'],
                'rules' => [
                    [
                        'actions' => ['signup'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ], parent::behaviors());
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return mixed
     */
    public function actionIndex()
    {
        return $this->render('index');
    }

    /**
     * Logs in a user.
     *
     * @return mixed
     */
    public function actionLogin()
    {
        if (!\Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        // print_r(Yii::$app->request->post());exit;
        
        if ($model->load($_POST) && $model->login()) {
            echo true;
        } else {
            $this->getError($model->errors);
        }
    }

    /**
     * Logs out the current user.
     *
     * @return mixed
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        echo true;
    }

    /**
     * Displays contact page.
     *
     * @return mixed
     */
    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail(Yii::$app->params['adminEmail'])) {
                Yii::$app->session->setFlash('success', 'Thank you for contacting us. We will respond to you as soon as possible.');
            } else {
                Yii::$app->session->setFlash('error', 'There was an error sending email.');
            }

            return $this->refresh();
        } else {
            return $this->render('contact', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Displays about page.
     *
     * @return mixed
     */
    public function actionAbout()
    {
        return $this->render('about');
    }

    /**
     * Signs user up.
     *
     * @return mixed
     */
    public function actionSignup()
    {
        $model = new SignupForm();
        // print_r(Yii::$app->request->post());exit;
        if ($model->load(Yii::$app->request->post())) {
            if ($member = $model->signup()) {
                // print_r($member);exit;
                if(Yii::$app->getUser()->login($member)){
                    echo true;
                }
            }else{
                $this->getError($model->errors);
            }
        }     
    }
    /**
     * Signs user up.
     *
     * @return mixed
     */
    // public function actionSignup()
    // {
    //     $model = new SignupForm();
    //     // print_r(Yii::$app->request->post());exit;
    //     if ($model->load(Yii::$app->request->post())) {
    //         if ($user = $model->signup()) {
    //             print_r($user);exit;
    //             $member = new Member();
    //             $member -> user_id = $user['id'];
    //             $member -> username = $user['username'];
    //             $member -> identity = 0;
    //             $member -> member_type = 1;
    //             $member -> member_date = date("Y-m-d");
    //             $member -> member_time = time();
    //             if (Yii::$app->getUser()->login($user) && $member->save()) {
    //                 echo true;
    //             } else{
    //                 echo "注册失败";
    //             }
    //         }else{
    //             $this->getError($model->errors);
    //         }
    //     }     
    // }
    /**
     * Signs user up.
     *
     * @return mixed
     */
    public function actionSignmoup()
    {
        $mid = $_POST['mid'];
        $model = new SignupForm();
        if($model->load(Yii::$app->request->post())) {
            if($user = $model->signup()){
                 $member = Member::findOne(['member_id'=>$mid]);
                 $member -> user_id = $user['id'];
                 $member -> username = $user['username'];
                 if($member->save()){
                    echo true;
                 }else{
                    echo "注册失败";
                 }
            }else{
                $this->getError($model->errors);
            }
        } 
    }

    /**
     * Requests password reset.
     *
     * @return mixed
     */
    public function actionRequestPasswordReset()
    {
        $model = new PasswordResetRequestForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail()) {
                Yii::$app->session->setFlash('success', 'Check your email for further instructions.');

                return $this->goHome();
            } else {
                Yii::$app->session->setFlash('error', 'Sorry, we are unable to reset password for email provided.');
            }
        }

        return $this->render('requestPasswordResetToken', [
            'model' => $model,
        ]);
    }

    /**
     * Resets password.
     *
     * @param string $token
     * @return mixed
     * @throws BadRequestHttpException
     */
    public function actionResetPassword($token)
    {
        try {
            $model = new ResetPasswordForm($token);
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->resetPassword()) {
            Yii::$app->session->setFlash('success', 'New password was saved.');

            return $this->goHome();
        }

        return $this->render('resetPassword', [
            'model' => $model,
        ]);
    }

    /**
     * 循环错误信息
     * @param array $array
     * @return 输出错误信息
     */
    private function getError($array)
    {   
        if(is_array($array)){
            foreach($array as $val){
                if(is_array($val)){
                    $this->getError($val);
                }else{
                    echo $val;
                }
            }
       }
    }
}
