<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;

// use frontend\assets\AppAsset;
// AppAsset::register($this);
?>
<?php $this->beginPage() ?>

<?php $this->beginBody() ?>

    <?= $this->render(
        'header.html'
    ) ?>
    <?= $content?>

<?php $this->endBody() ?>

<?php $this->endPage() ?>
