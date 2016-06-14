<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\data\Pagination;

use common\models\CouresClass;
use common\models\LiveCoures;

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
     * 创建直播页面
     */
    public function actionIndex()
    {
      return $this->renderPartial('index.html');
    }
    /**
     * 创建直播课程
     */
    public function actionAddLive()
    {
        $model = new LiveCoures();
        $modelclass = new CouresClass();
        //分类
        $datas = $modelclass->find()->where(['gc_parent_id'=>'0'])->orderBy('gc_sort ASC')->asArray()->all();
        $id = Yii::$app->user->identity->user_id;
        if($model->load(yii::$app->request->post())){
          $res = Lecturer::find()->where(['user_id'=>$id])->asArray()->all();
          $model -> lecturer_id = $res['0']['lecturer_id'];
          $model -> create_time = time();
          if($model->save()){
            $live_id = $model->primaryKey;
            $group = new LiveGroup();
            $group -> live_id = $live_id;
            $group -> lecturer_id = $res['0']['lecturer_id'];
            $group -> create_time = time();
            $group -> group_name = $_POST['group_name'];
            if($group->save()){
              echo json_encode(array('status'=>'1','msg'=>'创建成功'),JSON_UNESCAPED_UNICODE);
            }
          }
        }
    }

    /**
     * 直播修改-请求
     */
    public function actionUpdateLiveBeg()
    {
        $lid = $_GET['live_id'];
        $coures = new LiveCoures();
        //获取直播信息
        $liveCoures = $coures->find(['live_id'=>$lid])->with('liveGroup')->asArray()->one();
        echo json_encode($liveCoures,JSON_UNESCAPED_UNICODE);
    }

    /**
     * 直播修改-提交
     */
    public function actionUpdateLive()
    {
        $lid = $_POST['live_id'];
        $live = LiveCoures::findOne('live_id'=>$lid) ? LiveCoures::findOne('live_id'=>$lid) : new LiveCoures();
        if($live->load(Yii::$app->request->post())){
          $res = Lecturer::find()->where(['user_id'=>$id])->asArray()->all();
          $model -> lecturer_id = $res['0']['lecturer_id'];
          $model -> create_time = time();
          if($model->save()){
            $live_id = $model->primaryKey;
            $group = new LiveGroup();
            $group -> live_id = $live_id;
            $group -> lecturer_id = $res['0']['lecturer_id'];
            $group -> create_time = time();
            $group -> group_name = $_POST['group_name'];
            if($group->save()){
              echo json_encode(array('status'=>'1','msg'=>'创建成功'),JSON_UNESCAPED_UNICODE);
            }
          }
        }
    }

    /**
     * 获取所有的分类
     */
    public function actionClassify()
    {
        $classify = CouresClass::find()->select(['gc_name'])->where(['gc_parent_id'=>'0'])->orderBy('gc_sort ASC')->asArray()->all();
        echo json_encode($classify,JSON_UNESCAPED_UNICODE);
    }
    /**
     * 获取录播推荐课程
     */
}
