<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\LiveCoures;
use common\models\Lecturer;
use common\models\LiveGroup;
use common\models\CouresMember;
use common\models\GroupRecords;
use common\models\Attention;
use common\models\GiftDetail;
use common\models\Audit;
use common\models\SetGift;
use common\models\Advertising;
use common\models\Grade;

class BroadcastingController extends Controller
{
    /**
     * @inheritdoc
     */
    // public function behaviors()
    // {
    //     return [
    //         'access' => [
    //             'class' => AccessControl::className(),
    //             'rules' => [
    //                 [
    //                     'allow' => true,
    //                     'roles' => ['@'],
    //                     'matchCallback' => function ($rule, $action) {
    //                         if(!\Yii::$app->user->isGuest){
    //                           return true;
    //                         }
    //                     }
    //                 ],
    //             ],
    //         ],
    //         'verbs' => [
    //             'class' => VerbFilter::className(),
    //             'actions' => [
    //                 'delete' => ['post'],
    //             ],
    //         ],
    //     ];
    // }

    /**
     * 讲师直播页面
     */
    public function actionIndex()
    {
      return $this->renderPartial('index.html');
    }
   
    public function actionClassroom()
    {
        return $this->renderPartial('classroom.html');
    }
    /**
     * 讲师直播中心
     */
    public function actionLecturerLive()
    {
        $cid = $_POST['cid'];
        $uid = Yii::$app->user->identity->user_id;
        // $uid = 246;
       
        //判断讲师是否有权限
        $model = new Lecturer();
        $stop = $model->lecturerType($uid);
        $lecturer = $model->getLecturerall(array('user_id'=>$uid));
        $lid =array_column($lecturer,'lecturer_id');
        
        //课程信息
        $live = new LiveCoures();
        $coures = $live->findLive(['live_id'=>$cid]);
        $data['live_id'] = $coures['live_id'];
        $data['live_title']= $coures['live_title'];
        $data['live_cover'] = $coures['live_cover'];
        if (!$stop || !in_array($coures['lecturer_id'],$lid)) {
            echo json_encode(array('state'=>'0','error'=>'没有权限进入'));exit;
        }

        //距离课程开始倒计时
        $startdate = date('Y-m-d',time()).' '.$coures['start_time'].':00:00';
        $minute=floor((strtotime($startdate)-time())%86400/60);
        $data['hour'] = floor($minute/60);
        $data['minute'] = $minute%60;
      
        // //获取直播课程管理员id
        // $member = new CouresMember();
        // $admin = $member->getAdminId($cid);
        // $data['admin'] = $admin;
        //判断并添加当天记录返回用户信息
        $records = new GroupRecords();
        $result = $records->addRecords($cid,$uid);
        if (empty($result['nick_name'])) {
            $data['uname'] = Yii::$app->user->identity->username;
        }else{
            $data['uname'] = $result['nick_name'];
        }
        $data['portrait'] = $result['portrait'];
        $data['motto'] = $result['motto'];
        //获取粉丝
        $attention = new Attention();
        $fans = $attention->getFans($uid);
        $fromid = array_column($fans,'fromid');
        $data['fans'] = $fromid;

        $data['prefixurl'] = './static/broadcast/';
        $data['socket_url'] = SOCKET_IP;
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    /**
     *  会员直播信息
     */
    public function actionStudy()
    {
        $cid = $_POST['cid'];
        $uid = Yii::$app->user->identity->user_id; 
        $user['id'] = $uid;
        //判断并添加当天记录返回用户信息
        $records = new GroupRecords();
        $result = $records->addRecords($cid,$uid);
        if (empty($result['nick_name'])) {
            $user['uname'] = Yii::$app->user->identity->username;
        }else{
            $user['uname'] = $result['nick_name'];
        }
        $user['portrait'] = $result['portrait'];
        $user['motto'] = $result['motto'];
        //用户等级
        $gid = Yii::$app->user->identity->grade_id;
        $grade = new Grade();
        $g= $grade->find()->select('grade_rank')->where(['grade_id'=>$gid])->asArray()->one();
        $user['grade'] = $g['grade_rank'];
       // print_r($g);exit(); 
        echo json_encode($user,JSON_UNESCAPED_UNICODE);

    }
    /**
     * 贵宾席
     */
    public function actionGuest()
    {
        $cid = $_POST['cid'];
        $live = new LiveCoures();
        $lecturer =$live->getLecturerList(array('live_id'=>$cid));
        $data=array();
        $giftDetail= new GiftDetail();
        $gift = $giftDetail->getRanking($lecturer['user_id']);
        foreach ($gift as $key => $value) {
            $user = $value['user'];
            if (empty($user['userDetails'])) {
                $data['uname'] = $user['username'];
            }else{
                $data['uname'] = $user['userDetails']['nick_name'];
            }
            $data['grade'] = $user['grade']['grade_image'];
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 礼物
     */
    public function actionGift()
    {
        $setGift = new SetGift();
        $allGift = $setGift->getSetgift(array('state'=>'1'));
        echo json_encode($allGift,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 粉丝
     */
    public function actionFans()
    {
        $cid = $_POST['cid'];
        $live = new LiveCoures();
        $lecturer =$live->getLecturerList(array('live_id'=>$cid));
         //粉丝关注
        $attention = new Attention();
        $fans = $attention->find()->where(['toid'=>$lecturer['user_id']])->with('from','from.userDetails','from.grade')->orderby('')->asArray()->all();
        $from = array_column($fans,'from');
        $data = array();
        foreach ($from as $key => $value) {
            foreach ($value as $k => $val) {
                if (!empty($val['userDetails'])) {
                    $data[$k]['nick'] = $val['userDetails']['nick_name'];
                }else{
                    $data[$k]['nick']= $val['username'];
                }
                $data[$k]['grade'] = $val['grade']['grade_image'];
                
                
            }
        }

        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    /**
     * 判断用户是否有权限进入课程
     *
     */
    public function actionMember()
    {
        $cid = $_POST['cid'];
        $uid = Yii::$app->user->identity->user_id;
        $member = new CouresMember();
        $coures = $member->getCouresMemone(array('user_id'=>$uid,'type'=>'0','coures_id'=>$cid,'is_black'=>'0'));
        if (empty($coures)) {
           echo json_encode(array('status'=>'0','msg'=>'您没有权限访问该课程'),JSON_UNESCAPED_UNICODE);
        }else{
            echo json_encode(array('status'=>'1','msg'=>''),JSON_UNESCAPED_UNICODE);
        }
    }
    /**
     * 判断用户是否有权限进入课程-返回首页
     *
     */
    public function actionMemGohome()
    {
        $cid = $_POST['cid'];
        $uid = Yii::$app->user->identity->user_id;
        $member = new CouresMember();
        $coures = $member->getCouresMemone(array('user_id'=>$uid,'type'=>'0','coures_id'=>$cid,'is_black'=>'0'));
        if (empty($coures)) {
           return $this->goHome();
        }else{
            echo json_encode(array('status'=>'1','msg'=>''),JSON_UNESCAPED_UNICODE);
        }
    }
    /**
     * 课程信息,倒计时-会员
     */
    public function actionTeachClass()
    {
        $cid = $_POST['cid'];
        $live = new LiveCoures();
        //课程信息
        $data = array();
        $coures = $live->findLive(array('live_id'=>$cid));
        $liveCoures =array();
        $liveCoures['live_id'] =$coures['live_id'];
        $liveCoures['live_title'] =$coures['live_title'];
        $liveCoures['live_cover'] =$coures['live_cover'];
        $data['coures'] = $liveCoures;

        //距离课程开始倒计时
        $time = $this->countdown($coures['start_time']);
        $data['time'] = $time;
       echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 讲师信息-会员
     */
    public function actionLecturerInfo()
    {
        $cid = $_POST['cid'];
        $live = new LiveCoures();
        $lecturer =$live->getLecturerList(array('live_id'=>$cid));
        $lec = array();
        $lec['uid'] = $lecturer['user_id'];
        $lec['nick_name'] = $lecturer['nick_name'];
        $lec['portrait'] = $lecturer['portrait'];
        $lec['motto'] = $lecturer['motto'];
        // $data['lecturer'] = $lec;
       
        echo json_encode($lec,JSON_UNESCAPED_UNICODE);
    }

    /**
     * 广告
     */
    public function actionAdvertisement()
    {
        $advertisement = new Advertising();
        $advertis = $advertisement->getAdvertisement(['aid'=>'1']);
        echo json_encode($advertis,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 视频请求地址
     */
    public function actionGetGurl()
    {
        $cid = $_POST['cid'];
        $uid = Yii::$app->user->identity->user_id;
        $live = new LiveCoures();
        $lid = $live->getLecturerMain(array('live_id'=>$cid));
 
        $audit = new Audit();
        $result = $audit->findOne(['user_id'=>$lid['id']]);
        $key = $result['audit_key'];

        $data = $this->gurl($uid,$cid,$key);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    /**
      *倒计时
      */
    public function  countdown($start)
    {
        $startdate = date('Y-m-d',time()).' '.$start.':00:00';
        $minute=floor((strtotime($startdate)-time())%86400/60);
        $data['hour'] = floor($minute/60);
        $data['minute'] = $minute%60;

        return $data;
    }
    /**
     * 视频地址
     * @param $user_id 用户uid;  $coures_id 课程id;  $stream  讲师申请表的通道密码audit_key;  $channel='myapp',$protocol='rtmp';
     */
    private function gurl($user_id,$coures_id,$stream,$channel='myapp',$protocol='rtmp'){
        $url = exec("/usr/local/bin/myhlsgurl.sh $user_id $coures_id $channel $stream $protocol");
        return $url;
    }
}