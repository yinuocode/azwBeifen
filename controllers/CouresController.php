<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\data\Pagination;
use common\models\CouresClass;
use common\models\LiveCoures;
use common\models\Lecturer;
use common\models\Coures;
use common\models\LiveGroup;
use yii\base\ErrorException;
use yii\db\Exception;
use common\models\base\BaseModel;
use common\models\CouresMember;
use common\models\GroupRecords;

class CouresController extends Controller
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
     * 我的笔记-页面
     */
    public function actionNote()
    {
      return $this->renderPartial('my_note.html');
    }
    /**
     * 我的学习-页面
     */
    public function actionStudy()
    {
      return $this->renderPartial('my_study.html');
    }
    /**
     * 我的学习
     */
    public function actionMyStudy()
    {
        $type = $_POST['type'];
        $time = $_POST['time'];
        $page = $_POST['page'];
        if (is_integer($time)) {
            $ago = time()-60*60*24*$time;  
        }else{
            $ago = 0;
        }
        
        if ($page>'1') {
            $row = ($page-1)*6;  
        }else{
            $row = '';  
        }
        $limit=7;
        $where = array('>','create_time',$ago);
        $member = new CouresMember();
        // $uid = Yii::$app->user->identity->user_id;
        $uid = 246;
        $data = array();
        $arr = array();
        switch ($type) {
            case '0':
                $conditions = array('user_id'=>$uid,'type'=>'0','is_delete'=>'0');
                $result = $member->getLearnlist($conditions,$row,$limit,$where);
                foreach ($result as $key => $value) {
                    $arr['id'] = $value['live_id'];
                    $arr['title'] = $value['live_title'];
                    $arr['cover'] = $value['live_cover'];
                    $arr['type'] = '0';
                    array_push($data, $arr);
                }
                break;
            
            case '1':
                $conditions = array('user_id'=>$uid,'type'=>'1','is_delete'=>'0');
                $result = $member->getLearnlist($conditions,$row,$limit,$where);
                foreach ($result as $key => $value) {
                    $arr['id'] = $value['coures_id'];
                    $arr['title'] = $value['coures_title'];
                    $arr['cover'] = $value['coures_cover'];
                    $arr['type'] = '1';
                    array_push($data, $arr);
                }
                break;

            case '2':
                
                break;

            default:
                $conditions = array('user_id'=>$uid,'is_delete'=>'0');
                $result = $member->getLearnlist($conditions,$row,$limit,$where);
                $cou  = array();
                foreach ($result as $key => $value) {
                    if ($value['type']=='0') {
                        $arr['id'] = $value['live_id'];
                        $arr['title'] = $value['live_title'];
                        $arr['cover'] = $value['live_cover'];
                        $arr['type'] = '0';
                        array_push($data, $arr);
                    }elseif ($value['type']=='1') {
                        $cou['id'] = $value['coures_id'];
                        $cou['title'] = $value['coures_title'];
                        $cou['cover'] = $value['coures_cover'];
                        $cou['type'] = '1';
                        array_push($data, $cou);
                    }
                }
                break;
        }
        
        // print_r($mycoures);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
   
    /**
     * 直播页面
     */
    public function actionDirect()
    {
      return $this->renderPartial('create_direct.html');
    }
    /**
     * 直播修改-请求
     */
    public function actionUpdateLiveBeg()
    {
        if (isset($_POST['live_id'])) {
            $coures = new LiveCoures();
            //获取直播信息
            $liveCoures = $coures->find()->where(['live_id'=>$_POST['live_id']])->asArray()->one();

        }else{
            $liveCoures=array();
        } 
        echo json_encode($liveCoures,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 直播修改创建
     */
    public function actionUpdateLive()
    {    
        //开启事务  
        $transaction = Yii::$app->db->beginTransaction(); 
        try {
             if (isset($_POST['live_id'])) {
                $lid = $_POST['live_id'];
            }else{
                $lid= '';
            }
            $id = Yii::$app->user->identity->user_id;
            $post = Yii::$app->request->post();
            $res = Lecturer::find()->where(['user_id'=>$id])->asArray()->all();
            if($res['0']['lecturer_state']=='0'){
                echo json_encode(array('status'=>'0','msg'=>'已被封号'),JSON_UNESCAPED_UNICODE);exit;
            }
            $live = LiveCoures::findOne(['live_id'=>$lid]) ? LiveCoures::findOne(['live_id'=>$lid]) : new LiveCoures();
            // $live_id = $live->primaryKey;
            $group = new LiveGroup();
            $group -> lecturer_id = $res['0']['lecturer_id'];
            $group -> create_time = time();
            $group -> group_name = $_POST['LiveCoures']['live_title'];
            if($group->save()){
                $live->load(Yii::$app->request->post());
                $live->lecturer_id = $res['0']['lecturer_id'];
                $live->create_time = time();
                $live->group_id = $group->primaryKey;
                if($live->save()){
                    $transaction->commit(); 
                    echo json_encode(array('status'=>'1','msg'=>'操作成功'),JSON_UNESCAPED_UNICODE);
                }else{
                    throw new Exception("创建直播失败");
                }
                
            }else{
                throw new Exception('创建组失败');
            }
                 
         } catch (Exception $e) {
            echo json_encode(array('status'=>'0','msg'=>$e->getMessage()),JSON_UNESCAPED_UNICODE);
            $transaction->rollBack();
         } 
        
    }


    /**
     * 获取所有的分类
     */
    public function actionClassify()
    {
        $classify = new CouresClass();
        $data = $classify->getCouresList();
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    /**
     * 录播页面
     */
    public function actionCourse()
    {
      return $this->renderPartial('create_course.html');
    }

    /**
     * 录播修改-请求
     */
    public function actionUpdateCouresBeg()
    {
        if (isset($_POST['coures_id'])) {
            $coures = new Coures();
            //获取直播信息
            $data = $coures->find()->where(['coures_id'=>$_POST['coures_id']])->asArray()->one();

        }else{
            $data=array();
        } 
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 录播课程-创建修改
     */
    public function actionRecorded()
    {
        //开启事务  
        $transaction = Yii::$app->db->beginTransaction(); 
        try {
            if (isset($_POST['coures_id'])) {
                $cid = $_POST['coures_id'];
            }else{
                $cid= '';
            }
            $id = Yii::$app->user->identity->user_id;
            $post = Yii::$app->request->post();
            $res = Lecturer::find()->where(['user_id'=>$id])->asArray()->all();
            if($res['0']['lecturer_state']==0){
                echo json_encode(array('status'=>'0','msg'=>'已被封号'),JSON_UNESCAPED_UNICODE);exit;
            }
            $coures = Coures::findOne(['coures_id'=>$cid]) ? Coures::findOne(['coures_id'=>$cid]) : new Coures();
            if ($coures->load(Yii::$app->request->post())) {
                $coures->lecturer_id = $res['0']['lecturer_id'];
                $coures->create_time = time();
                if($coures->save()){
                    echo json_encode(array('status'=>'1','msg'=>'操作成功'),JSON_UNESCAPED_UNICODE);              
                }else{
                    throw new Exception('创建直播失败');
                }
            }
            $transaction->commit();
        } catch (Exception $e) {
            echo json_encode(array('status'=>'0','msg'=>$e->getMessage()),JSON_UNESCAPED_UNICODE);
            $transaction->rollBack();
        }
    }

    /**
     * 我的教学
     */
    public function actionTeaching()
    {
      return $this->renderPartial('my_teaching.html');
    }

    /**
     * 我的教学
     */
    public function actionMyTeach()
    {
        $id = Yii::$app->user->identity->user_id;
        // $id = 246;
        //讲师id
        $lecturer = new Lecturer();
        $where = array('user_id' =>$id);
        $lids = $lecturer->getLecturerall($where,'lecturer_id');
        $lid = array_column($lids,'lecturer_id');

        $type = $_POST['type'];
        $status = $_POST['status'];
        $time = $_POST['time'];
        $page = $_POST['page'];
        if (is_integer($time)) {
            $ago = time()-60*60*24*$time;  
        }else{
            $ago = 0;
        }
        
        if ($page>'1') {
            $row = ($page-1)*6;  
        }else{
            $row = '';  
        }
        
        $live = new LiveCoures();
        $coures = new Coures();
        $member = new CouresMember();
        if ($_POST['status'] !='') {
            $lconditions = ['live_state'=>$status];
            $conditions = ['coures_status'=>$status];
        }else{
            $lconditions=['in','live_state',array('0','1')];
            $conditions = ['in','coures_status',array('0','1')];
        }
        $field = array('live_id','live_title','live_cover','privilege_price','create_time');
        $cfield = array('coures_id','coures_title','coures_cover','privilege_price','create_time');

        $orderby='create_time DESC';
        $limit = 6;
        $data = array();
        //判断课程类型
        switch ($type) {
            case 'liveCoures':  
                $result = $live->find()->select($field)->where(['lecturer_id'=>$lid])->andWhere($lconditions)->andWhere(['>','create_time',$ago])->orderby($orderby)->asArray()->offset($row)->limit($limit)->all();  
                // $result = $live->getLive($field,$lconditions,$orderby,$limit,$row);
                foreach ($result as $key => $value) {
                    $value['type']  = 0;
                    $value['ctime'] = date('Y-m-d h:i:s',$value['create_time']);
                    $value['num'] = $member->getMembersum($value['live_id'],$type='0');
                    array_push($data, $value);
                }
                break;
            case 'coures': 
                $result = $coures->find()->select($cfield)->where(['lecturer_id'=>$lid])->andWhere($conditions)->andWhere(['>','create_time',$ago])->orderby($orderby)->asArray()->offset($row)->limit($limit)->all();
                foreach ($result as $key => $value) {
                    $value['type'] = 1;
                    $value['ctime'] = date('Y-m-d h:i:s',$value['create_time']);
                    $value['num'] = $member->getMembersum($value['coures_id'],$type='1');
                    array_push($data, $value);
                }
                break;
            default:
                $result = array();
                $liveCoures = $live->find()->select($field)->where(['lecturer_id'=>$lid])->andWhere($lconditions)->andWhere(['>','create_time',$ago])->orderby($orderby)->asArray()->offset($row)->limit($limit)->all();
                $broadcast = $coures->find()->select($cfield)->where(['lecturer_id'=>$lid])->andWhere($conditions)->andWhere(['>','create_time',$ago])->orderby($orderby)->asArray()->offset($row)->limit($limit)->all();
                array_push($result, $liveCoures);
                array_push($result, $broadcast);
                foreach ($result[0] as $key => $value) {
                    $value['type'] = 0;
                    $value['ctime'] = date('Y-m-d h:i:s',$value['create_time']);
                    $value['num'] = $member->getMembersum($value['live_id'],$type='0');
                    array_push($data, $value); 
                }
                foreach ($result[1] as $key => $value) {
                    $value['type'] = 1;
                    $value['ctime'] = date('Y-m-d h:i:s',$value['create_time']);
                    $value['num'] = $member->getMembersum($value['coures_id'],$type='1');
                    array_push($data, $value);  
                }
                break;
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    /**
     * 课程删除
     */
    public function actionDelete()
    {
        $post = $_POST;
        $ldel= 0;
        $cdel = 0;
        if (isset($_POST['cid2'])) {
             $live = new LiveCoures();
            $ldel = $live->deleteAlllive(array('live_id'=>$_POST['cid2']));
            if (!$ldel) {
                echo json_encode(array('status'=>0,'mag'=>'删除失败'),JSON_UNESCAPED_UNICODE);
            }else{
                echo json_encode(array('status'=>1,'mag'=>'删除成功'),JSON_UNESCAPED_UNICODE);
            }
        }elseif (isset($_POST['cid1'])) {
            $coures = new Coures();
            $cdel = $coures->deleteAllcoures(array('coures_id'=>$_POST['cid1']));
            if (!$cdel) {
                echo json_encode(array('status'=>0,'mag'=>'删除失败'),JSON_UNESCAPED_UNICODE);
            }else{
                echo json_encode(array('status'=>1,'mag'=>'删除成功'),JSON_UNESCAPED_UNICODE);
            }
        }
        
    }

    /**
     * 直播列表页面
     */
    public function actionDirectList()
    {
        return $this->renderPartial('direct_list.html');
    }

    /**
     * 直播列表
     */
    public function actionLiveList()
    {
        $page = $_POST['page'];
        if ($page>'1') {
            $row = ($page-1)*6;  
        }else{
            $row = '';  
        }
        $orderby='create_time DESC';
        $limit = 6;
        $live = new LiveCoures();
        $field = array('live_id','live_title','live_cover','privilege_price','start_time','end_time');
        $lconditions = array('live_state'=>'1');
        $liveCoures = $live->find()->select($field)->where($lconditions)->orderby($orderby)->asArray()->offset($row)->limit($limit)->all();
        echo json_encode($liveCoures,JSON_UNESCAPED_UNICODE);
    }

    /**
     * 学员管理页面
     */
    public function actionManage()
    {
      return $this->renderPartial('student_manage.html');
    }
    /**
     * 学员管理
     */
    public function actionStudentManage()
    {
        $lid = $_POST['live_id'];
        $time = $_POST['time'];
        $page = $_POST['page'];
        if (isset($lid)) {
            $conditions = '';
        }else{
            $conditions = array('live_id'=>$lid);
        }
        if (is_integer($time)) {
            $ago = time()-60*60*24*$time;  
        }else{
            $ago = 0;
        }
        
        if ($page>'1') {
            $row = ($page-1)*6;  
        }else{
            $row = '';  
        }
        $data = array();
        $record = new GroupRecords();   
        $where = array('>','time',$ago);
        $limit = 7;
        $mentee = $record->find()->where($where)->andWhere($conditions)->with('user','user.userDetails','user.grade')->asArray()->orderby('time DESC')->offset($row)->limit($limit)->all();
        foreach ($mentee as $key => $value) {
            $arr['sex'] = $value['user']['userDetails']['user_sex'];
            $arr['nick'] = $value['user']['userDetails']['nick_name'];
            $arr['points'] = $value['user']['points'];
            $arr['empirical'] = $value['user']['empirical'];
            $arr['grade'] = $value['user']['grade']['grade_image'];
            $arr['addtime'] = $value['date'];
            array_push($data, $arr);
        }
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    /**
     * 获取讲师创建的所有组
     */
    public function actionGetGroup()
    {
        $uid = Yii::$app->user->identity->user_id;
        $lecturer = new Lecturer();
        $lid = $lecturer->getLecturerall(array('user_id'=>$uid),'lecturer_id');
        $liveGroup = new LiveGroup();
        $group = $liveGroup->find()->select(['group_id','group_name'])->where(['lecturer_id'=>$lid])->asArray()->all();
        echo json_encode($group,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 获取讲师创建的所有直播课程
     */
    public function actionGetCoures()
    {
        $uid = Yii::$app->user->identity->user_id;
        $lecturer = new Lecturer();
        $lid = $lecturer->getLecturerall(array('user_id'=>$uid),'lecturer_id');
        $liveCoures = new LiveCoures();
        $live = $liveCoures->getLive(array('live_id','live_title'),array('lecturer_id'=>$lid));
        echo json_encode($live,JSON_UNESCAPED_UNICODE);
    }
}
