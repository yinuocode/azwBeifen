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
use common\models\Audit;

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
            $row = ($page-1)*8;  
        }else{
            $row = '';  
        }
        $limit=9;
        $where = array('>','create_time',$ago);
        $member = new CouresMember();
        $uid = Yii::$app->user->identity->user_id;
        // $uid = 246;
        $data = array();
        $arr = array();
        switch ($type) {
            case 'liveCoures':
                $conditions = array('user_id'=>$uid,'type'=>'0','is_delete'=>'0');
                $result = $member->getLearnlist($conditions,$row,$limit,$where);
                foreach ($result as $key => $value) {
                    $arr['live_id'] = $value['live_id'];
                    $arr['live_title'] = $value['live_title'];
                    $arr['live_cover'] = $value['live_cover'];
                    $arr['type'] = '0';
                    $arr['time'] = $this->actionLiveState($value['live_id']);
                    array_push($data, $arr);
                }
                break;
            
            case 'coures':
                $conditions = array('user_id'=>$uid,'type'=>'1','is_delete'=>'0');
                $result = $member->getLearnlist($conditions,$row,$limit,$where);
                foreach ($result as $key => $value) {
                    $arr['coures_id'] = $value['coures_id'];
                    $arr['coures_title'] = $value['coures_title'];
                    $arr['coures_cover'] = $value['coures_cover'];
                    $arr['type'] = '1';
                    array_push($data, $arr);
                }
                break;

            // default:
            //     $conditions = array('user_id'=>$uid,'is_delete'=>'0');
            //     $result = $member->getLearnlist($conditions,$row,$limit,$where);
            //     $cou = array();
            //     foreach ($result as $key => $value) {
            //         if ($value['type']=='0') {
            //             $arr['id'] = $value['live_id'];
            //             $arr['title'] = $value['live_title'];
            //             $arr['cover'] = $value['live_cover'];
            //             $arr['type'] = '0';
            //             $arr['time'] = $this->actionLiveState($value['live_id']);
            //             array_push($data, $arr);
            //         }elseif ($value['type']=='1') {
            //             $cou['id'] = $value['coures_id'];
            //             $cou['title'] = $value['coures_title'];
            //             $cou['cover'] = $value['coures_cover'];
            //             $cou['type'] = '1';
            //             array_push($data, $cou);
            //         }
            //     }
            //     break;
        }
        
        // print_r($mycoures);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
   
     /**
      * 课程直播状态 0:未直播; 1:正在直播; 2:今天已播; 3:该课程已过期
      */
    public function  actionLiveState($lid)
    {
        // $lid = $_POST['cid'];
        $liveCoures = new LiveCoures();
        $liveCoures = LiveCoures::findOne(['live_id'=>$lid]);
        $now = strtotime(date('Y-m-d',time()));   
        $cend =strtotime($liveCoures['end_date']);
        $bad = $cend-$now;
        if ($cend-$now<0) {
            $data['state'] = 3;
            // echo json_encode(array('state'='2','msg'=>'课程已过期'),JSON_UNESCAPED_UNICODE);exit;
        }
        $startdate = date('Y-m-d',time()).' '.$liveCoures['start_time'].':00:00';      
        $minute=floor((strtotime($startdate)-time())%86400/60);
        if ($minute<0) {
            $enddate = date('Y-m-d',time()).' '.$liveCoures['end_time'].':00:00';      
            $endminute=floor((strtotime($enddate)-time())%86400/60);
            if ($endminute>0) {
                $liveCoures->is_class = 1;
                if ($liveCoures->save()) {
                    $data['state'] = 1;
                }
            }else{
                $liveCoures->is_class = 2;
                if ($liveCoures->save()) {
                    $data['state'] = 2;
                    $data['start_time'] = $liveCoures['start_time'];
                    $data['end_time'] = $liveCoures['end_time'];
                }
            }  
        }else{
            $liveCoures->is_class = 0;
            if ($liveCoures->save()) {
                $data['state'] = 0;
                $data['hour'] = floor($minute/60);
                $data['min'] = $minute%60;
            }
        }
        return $data;
        // echo json_encode($data,JSON_UNESCAPED_UNICODE);
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
        $result = $classify->getCouresList();
        echo json_encode($result,JSON_UNESCAPED_UNICODE);
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
                    throw new Exception('创建录播失败');
                }
            }
            $transaction->commit();
        } catch (Exception $e) {
            echo json_encode(array('status'=>'0','msg'=>$e->getMessage()),JSON_UNESCAPED_UNICODE);
            $transaction->rollBack();
        }
    }

    /**
     * 我的教学页面
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
        $field = array('live_id','live_title','live_cover','privilege_price','create_time','live_state');
        $cfield = array('coures_id','coures_title','coures_cover','privilege_price','create_time','coures_status');

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
     * 修改发布状态
     */
    public function actionAlterState()
    {
        $type = $_POST['type'];
        $cid  = $_POST['cid'];
        if ($type=='0') {
            $live = LiveCoures::findOne(['live_id'=>$cid]);
            $live->live_state = 1;
            if ($live->save()) {
                echo json_encode(array('status'=>1),JSON_UNESCAPED_UNICODE);
            }else{
                echo json_encode(array('status'=>0),JSON_UNESCAPED_UNICODE);
            }
            
        }elseif ($type=='1') {
            $coures = Coures::findOne(['coures_id'=>$cid]);
            $coures->coures_status = 1;
            if ($coures->save()) {
                echo json_encode(array('status'=>1),JSON_UNESCAPED_UNICODE);
            }else{
                echo json_encode(array('status'=>0),JSON_UNESCAPED_UNICODE);
            }
            
        }
    }

    /**
     * 添加助教
     */
    public function actionAddAssistant()
    {
        $cid = $_POST['cid'];
        $uid = $_POST['uid'];
        $audit = Audit::findOne(['user_id'=>$uid,'audit_state'=>'1']);
        if (empty($audit)) {
            echo json_encode(array('status'=>0,'msg'=>'对方不是讲师，无法添加助教'),JSON_UNESCAPED_UNICODE);exit;
        }
        $lecturer = new Lecturer();
        $stop = $lecturer->lecturerType($uid);
        if (!$stop) {
            echo json_encode(array('status'=>0,'msg'=>'该讲师已被封停'),JSON_UNESCAPED_UNICODE);exit;
        }
        $lec = Lecturer::findOne(['user_id'=>$uid]);
        $lec->assis_id = $cid.',';
        if ($lec->save()) {
            echo json_encode(array('status'=>1,'msg'=>'添加助教成功'),JSON_UNESCAPED_UNICODE);exit;
        }else{
            echo json_encode(array('status'=>0,'msg'=>'助教添加失败'),JSON_UNESCAPED_UNICODE);exit;
        }
    }

    /**
     * 录播列表页面
     */
    public function actionCourseList()
    {
        return $this->renderPartial('course_list.html');
    }
    /**
     * 录播列表
     */
    public function actionRecordedList()
    {
        $page = $_POST['page'];
        if ($page>'1') {
            $row = ($page-1)*8;  
        }else{
            $row = '';  
        }
        $orderby='create_time DESC';
        $limit = 9;
        $coures = new Coures();
        $field = array('coures_id','coures_title','coures_cover','privilege_price','coures_number');
        if (!empty($_POST['classify'])) {
            if (!empty($_POST['difficulty'])) {
                $lconditions = array('coures_status'=>'1','gc_id'=>$_POST['classify'],'difficulty'=>$_POST['difficulty']); 
            }else{
                $lconditions = array('coures_status'=>'1','gc_id'=>$_POST['classify']);
            }            
        }else{
            if (!empty($_POST['difficulty'])) {
                $lconditions = array('coures_status'=>'1','difficulty'=>$_POST['difficulty']); 
            }else{
                $lconditions = array('coures_status'=>'1');
            }
        }
        $liveCoures = $coures->find()->select($field)->where($lconditions)->orderby($orderby)->asArray()->offset($row)->limit($limit)->all();
        $data = array();
        foreach ($liveCoures as $key => $value) {
            $arr['coures_id'] = $value['coures_id'];
            $arr['coures_title'] = $value['coures_title'];
            $arr['coures_cover'] = $value['coures_cover'];
            $arr['privilege_price'] = $value['privilege_price'];
            $arr['coures_number'] = $value['coures_number'];
            // $arr['time'] = $this->actionLiveState($value['coures_id']);
            array_push($data, $arr);
        }       
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 查询录播课程的讲师
     */
    public function actionCourseTeach()
    {
        $lid = $_POST['lid'];
        $coures = new Coures();
        $result = $coures->find()->where(['coures_id'=>9])->asArray()->one();
        echo json_encode($result,JSON_UNESCAPED_UNICODE);
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
            $row = ($page-1)*8;  
        }else{
            $row = '';  
        }
        $orderby='create_time DESC';
        $limit = 9;
        $live = new LiveCoures();
        $field = array('live_id','live_title','live_cover');
        if (!empty($_POST['classify'])) {
            if (!empty($_POST['difficulty'])) {
                $lconditions = array('live_state'=>'1','gc_id'=>$_POST['classify'],'difficulty'=>$_POST['difficulty']); 
            }else{
                $lconditions = array('live_state'=>'1','gc_id'=>$_POST['classify']);
            }            
        }else{
            if (!empty($_POST['difficulty'])) {
                $lconditions = array('live_state'=>'1','difficulty'=>$_POST['difficulty']); 
            }else{
                $lconditions = array('live_state'=>'1');
            }
        }
        $liveCoures = $live->find()->select($field)->where($lconditions)->orderby($orderby)->asArray()->offset($row)->limit($limit)->all();
        $data = array();
        foreach ($liveCoures as $key => $value) {
            $arr['live_id'] = $value['live_id'];
            $arr['live_title'] = $value['live_title'];
            $arr['live_cover'] = $value['live_cover'];
            $arr['time'] = $this->actionLiveState($value['live_id']);
            array_push($data, $arr);
        }       
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
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

    /**
     * 一键邀请
     */
    public function actionInviteLetter()
    {
        if (isset($_POST['cid1'])) {
            $groupRecords = new GroupRecords();
            $record = $groupRecords->find()->where(['live_id'=>$_POST['cid1']])->with('live')->asArray()->all();
            print_r($record);
        }elseif (isset($_POST['cid2'])) {
            $coures = new Coures();            
        }
    }
    /**
     * 执行发送信息
     */
    public function actionSendLetter()
    {
        $type = $_POST['send_type'];
        $model = new LetterDetail();
        $title = $_POST['letter_title'];
        $body = $_POST['letter_body'];
        if(empty($body)){
            echo "内容不能为空";exit;
        }
        $model -> letter_title = $title;
        $model -> letter_body = $body;
        if($model->save()){
            $det_id = $model->primaryKey;
            $letter_model = new Letter();
            $user = new User();
            if($type == '1'){
                $username = $_POST['user_name'];
                if(empty($username)){
                    echo "请填写会员信息";exit;
                }
                $user_array = explode(';',$username);
                foreach($user_array as $list){
                    $_user = clone $user;
                    $ids = $_user->find()->select('id')->where(['username'=>$list])->asArray()->one();
                    $_letter = clone $letter_model;
                    $_letter -> det_id = $det_id;
                    $_letter -> from_mid = Yii::$app->user->identity->id;
                    $_letter -> from_name = Yii::$app->user->identity->username;
                    $_letter -> to_mid = $ids['id'];
                    $_letter -> to_name = $list;
                    $_letter -> letter_read = 0;
                    $_letter -> letter_state = 0;
                    $_letter -> letter_type = 1;
                    $_letter -> letter_add_time = time();
                    $_letter -> letter_add_date = date("Y-m-d");
                    $data = $_letter->save();
                }
                if($data >0){
                    echo true;
                }
                
            }else if($type =='2'){
                $_member = new User();
                $result = $_member->find()->select('id,username')->asArray()->all();
                foreach($result as $value){
                    $_letter = clone $letter_model;
                    $_letter -> det_id = $det_id;
                    $_letter -> from_mid = Yii::$app->user->identity->id;
                    $_letter -> from_name = Yii::$app->user->identity->username;
                    $_letter -> to_mid = $value['id'];
                    $_letter -> to_name = $value['username'];
                    $_letter -> letter_read = 0;
                    $_letter -> letter_state = 0;
                    $_letter -> letter_type = 1;
                    $_letter -> letter_add_time = time();
                    $_letter -> letter_add_date = date("Y-m-d");
                    $data = $_letter->save();
                }
                if($data >0){
                    echo true;
                }
            }
        }
    }
}
