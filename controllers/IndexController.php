<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\db\Query;

use yii\data\Pagination;

use common\models\ShufflingMent;
use common\models\Shuffling;
use common\models\UserDetail;
use common\models\Lecturer;
use common\models\Coures;
use common\models\Blogroll;
use common\models\GiftUser;
use common\models\Information;
use common\models\InfoClass;
use common\models\User;
use common\models\Letter;
use common\models\Firm;
use common\models\LiveCoures;

class IndexController extends Controller
{
    //渲染首页页面
    public function actionIndex()
    {
    	return $this->renderPartial('index.html');
    }
  
    //站内信,用户详情
    public function actionLetter()
    {
    	if (!Yii::$app->user->isGuest) {
    		$data['isLogin'] = 1;
    		$id = Yii::$app->user->identity->id;
			//用户身份
			$identity = Yii::$app->user->identity->identity;
	    	if ($identity==0) {
	    		$data['identity'] = 0;
	    	}else{
	    		$data['identity'] = 1;
	    	}

			//用户头像和昵称
			$userDetail =new UserDetail();
			$detail = $userDetail->getUserDetail($id);
			if (!empty($detail)) {
				$data['portrait'] =$detail['portrait'];
				if (empty($detail['nick_name'])) {
					$data['name'] =Yii::$app->user->identity->username;
				}else{
					$data['name'] =$detail['nick_name'];
				}
			}else{
				$user = User::find()->where(['user_id'=>$id])->asArray()->one();
				$data['portrait'] = '';
				$data['name'] =Yii::$app->user->identity->username;
			}

			//站内信
    		$letter = Letter::find()->where(['to_mid'=>$id,'letter_read'=>0])->count();
    		if (empty($letter)) {
    			$data['letter'] = '';
    		}else{
    			$data['letter'] = $letter;
    		}
       	}else{
       		$data['isLogin'] = 0;
       	}
    	echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    
    //首页banner图
    public function actionBanner()
    {
    	$banner = array();
		$homeBanner = ShufflingMent::find()->where(['id'=>'1','state'=>1])->asArray()->one();
		$shuffing= new Shuffling();
		$getBanner = $shuffing->getBanner($homeBanner['id']);
		foreach ($getBanner as $key => $value) {
			$ban['src'] = $value['savepath'].$value['name'];
			$ban['medium'] = $value['medium'];
			$ban['img_address'] = $value['img_address'];
			$ban['image_title'] = $value['img_title'];		
			array_push($banner, $ban);
		}
		echo json_encode($banner,JSON_UNESCAPED_UNICODE);
    }

    //首页公告
    public function actionAffiche()
    {
		$information = new Information();
		$messInfo = $information->getInformation(1);
		$affiche = array();
		foreach ($messInfo as $key => $value) {
			$info['title'] =$value['title'];
			$info['content'] = $value['content'];
			array_push($affiche,$info);
		}
		echo json_encode($affiche,JSON_UNESCAPED_UNICODE);
    }
    //底部资讯
    public function actionFootAffiche()
    {
    	$information = new Information();
    	$footInfo= $information->getInformation(2);
    	$footAffiche = array();
    	foreach ($footInfo as $key => $value) {
    		$info['info_id'] = $value['info_id'];
    		$info['title'] = $value['title'];    	
    		$info['controller'] = 'Information/affiche'."?id=".$value['info_id'];
    		array_push($footAffiche, $info);
    	}
    	echo json_encode($footAffiche,JSON_UNESCAPED_UNICODE);
    }

    //讲师详情
    public function actionLecturer()
    {
    	$data = array();
		$lecturer = Lecturer::find()->where(['lecturer_state'=>1])->with('user.userDetails')->asArray()->limit(10)->all();
		foreach ($lecturer as $key => $value) {
			$info = $value['user']['userDetails'];
			$lectur['real_name'] = $info['real_name'];
			$lectur['portrait'] = $info['portrait'];
			$lectur['motto'] = $info['motto'];
			$lectur['href'] = 'lecturer/lecturer-home'."?id=".$info['id'];
			array_push($data, $lectur);
		}
		echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    //推荐课程
    public function actionCoures()
    {
    	$data = array();
    	$coures = Coures::find()->select(['coures_id','coures_title','coures_title_r','coures_label','coures_cover','coures_describe'])->where(['coures_status'=>1])->orderby('coures_weight desc')->asArray()->limit(9)->all();
		foreach ($coures as $key => $value) {	
			$info['coures_id'] = $value['coures_id'];
			$info['coures_title'] = $value['coures_title'];
			$info['coures_title_r'] = $value['coures_title_r'];
			$info['coures_label'] = $value['coures_label'];
			$info['coures_cover'] = $value['coures_cover'];
			$info['coures_describe'] = $value['coures_describe'];
			$info['coures_href'] = 'coures/coures-home'."?id=".$value['coures_id'];
			// $value['coures_href'][]=$info;
			array_push($data, $info);
		}
		echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    //入住公司
	public function actionFirm()
	{
		$firm = Firm::find()->select(['fname','logo','address','description'])->where(['status'=>1])->asArray()->all();
		echo json_encode($firm,JSON_UNESCAPED_UNICODE);
	}

	//友情链接
	public function actionBlogroll()
	{
		$blogroll = Blogroll::find()->select(['address','text','img'])->where(['state'=>1])->asArray()->all();
		echo json_encode($blogroll,JSON_UNESCAPED_UNICODE);
	}

	//魅力排行榜
	public function actionCharm()
	{		
		$recegifts = array();
		$user = new User();
		$result = $user->find()->select(['id','user_id','charm'])->where(['identity'=>'1'])->with('userDetails','userDetails.user','giftUsers','giftUsers.g')->orderby('charm desc')->limit(10)->asArray()->all();
		foreach ($result as $key => $value) {		
			if (empty($value['userDetails']['nick_name'])) {
				$charm['nick_name'] = $value['userDetails']['user']['username'];
			}else{
				$charm['nick_name'] = $value['userDetails']['nick_name'];
			}
			$charm['gift'] = $value['giftUsers'];
			$charm['charm'] = $result[$key]['charm'];
			foreach ($charm as $ckey => $cvalue) {
				$gift = $charm['gift'];
				$sum= 0;
				foreach ($gift as $gkey => $gvalue) {
					$sum+=$gvalue['gift_num'];
				}
				$charm['sum'] = $sum;
			}
			array_push($recegifts, $charm);
		}
		echo json_encode($recegifts,JSON_UNESCAPED_UNICODE);
	}

	//财富排行榜
	public function actionWealth()
	{	
		$user = new User();
		$giveGift =array();
		$money = $user->find()->with('userDetails','giftDetails','giftDetails.g')->limit(10)->asArray()->all();
		
		foreach ($money as $mkey => $mvalue) {
			if (empty($mvalue['userDetails']['nick_name'])) {
				$treasure['nick_name'] = $mvalue['username'];
			}else{
				$treasure['nick_name'] = $mvalue['userDetails']['nick_name'];
			}
					
			$treasure['gift'] = $mvalue['giftDetails'];
			foreach ($treasure as $tkey => $tvalue) {
				$wealth = $treasure['gift'];
				$summation= 0;
				$sumprice = 0;
				foreach ($wealth as $wkey => $wvalue) {
					$sumprice+=$wvalue['price'];
					$summation+=$wvalue['quantity'];	
				}
				$treasure['sumprice'] = $sumprice;
				$treasure['summation'] = $summation;
				// arsort($wvalue);	
			}
			
			array_push($giveGift, $treasure);
		}
		echo json_encode($giveGift,JSON_UNESCAPED_UNICODE);
	}
	/**
	 * 全部课程
	 */	
	public function actionAllCoures()
	{
		$live = new LiveCoures();
		$coures = new Coures();
		$data = array();
		$data['live'] = $live->find()->where(['live_state'=>'1'])->orderby('create_time DESC')->asArray()->all();
		$data['coures'] = $coures->find()->where(['coures_status'=>'1'])->orderby('create_time DESC')->asArray()->all();
		echo json_encode($data,JSON_UNESCAPED_UNICODE);
	}
}  
?>