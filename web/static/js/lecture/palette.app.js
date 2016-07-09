define(function(require,exports,module){
	function canvasApp(){
		var message = '';
		var fillOrStroke = 'fill';
		var fontSize = '36';
		var fontFace = 'serif';
		var fontWeight = 'normal';
		var fontStyle = 'normal';
		var textFillColor = '#000000';
		var textStrokeColor = '#ffffff';
		var textBaseLine = 'middle';
		var textAlign = 'left';
		var textAlpha = 1;
		var shadowX = 3;
		var shadowY = 3;
		var shadowBlur = 5;
		var shadowColor = '#787878';
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		var formElement = document.getElementById('textBox');
		formElement.addEventListener('keyup', textBoxChanged, false);
		formElement = document.getElementById('fillOrStroke');
		formElement.addEventListener('change', fillOrStrokeChanged, false);
		formElement = document.getElementById('textSize');
		formElement.addEventListener('change', textSizeChanged, false);
		// formElement = document.getElementById('textFont');
		// formElement.addEventListener('change', textFontChanged, false);
		formElement = document.getElementById('fontWeight');
		formElement.addEventListener('change', fontWeightChanged, false);
		// formElement = document.getElementById('fontStyle');
		// formElement.addEventListener('change', fontStyleChanged, false);
		formElement = document.getElementById('textFillColor');
		formElement.addEventListener('change', textFillColorChanged, false);
		// formElement = document.getElementById('textStrokeColor');
		// formElement.addEventListener('change', textStrokeColorChanged, false);
		// formElement = document.getElementById('textBaseline');
		// formElement.addEventListener('change', textBaselineChanged, false);
		// formElement = document.getElementById('textAlign');
		// formElement.addEventListener('change', textAlignChanged, false);
		// formElement = document.getElementById('textAlpha');
		// formElement.addEventListener('change', textAlphaChanged, false);
		// formElement = document.getElementById('shadowColor');
		// formElement.addEventListener('change', shadowColorChanged, false);
		// formElement = document.getElementById('shadowBlur');
		// formElement.addEventListener('change', shadowBlurChanged, false);
		// formElement = document.getElementById('shadowX');
		// formElement.addEventListener('change', shadowXChanged, false);
		// formElement = document.getElementById('shadowY');
		// formElement.addEventListener('change', shadowYChanged, false);
		document.getElementById('new').addEventListener('click', function() {
			document.getElementById('textBox').value='';
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = '#f5f5f5';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}, false);
		drawScreen();
		// Draw Screen function
		function drawScreen() {
		//Background
			ctx.fillStyle = '#f5f5f5';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			if(message){
				var words = message.split(/\b(?=\w)/);
				//alert('cccccccccccccc');
				//alert(words.length);
				//console.log(words);
				//Text
				ctx.font = fontWeight + ' ' + fontStyle + ' ' + fontSize + 'px ' + fontFace;
				ctx.textBaseline = textBaseline;
				ctx.textAlign = textAlign;
				// Global Alpha and Shadow
				ctx.save();
				ctx.globalAlpha = textAlpha;
				ctx.shadowColor = shadowColor;
				ctx.shadowOffsetX = shadowX;
				ctx.shadowOffsetY = shadowY;
				ctx.shadowBlur = shadowBlur;
				var metrics = ctx.measureText(message);
				var textWidth = metrics.width;
				//var xPosition = (canvas.width / 2) - (textWidth / 2);
				var xPosition = 20;
				var yPosition = 30;
				switch (fillOrStroke) {
					case 'fill':
						ctx.fillStyle = textFillColor;
						for(var i=0;i<words.length;i++){
						ctx.fillText(words[i], xPosition, yPosition);
							yPosition+=fontSize*1.5;
						}
						break;
					case 'stroke':
						ctx.strokeStyle = textStrokeColor;
						ctx.lineWidth = 1;
						ctx.strokeText(message, xPosition, yPosition);
						break;
					case 'both':
						ctx.fillStyle = textFillColor;
						ctx.fillText(message, xPosition, yPosition);
						ctx.strokeStyle = textStrokeColor;
						ctx.strokeText(message, xPosition, yPosition);
						break;
				}
			}
		}
		// Events
		function textBoxChanged(e){
			var target = e.target;
			message = target.value;
			ctx.restore();
			drawScreen();
		}
		function fillOrStrokeChanged(e){
			var target = e.target;
			fillOrStroke = target.value;
			ctx.restore();
			drawScreen();
		}
		function textSizeChanged(e) {
			var target = e.target;
			fontSize = target.value;
			ctx.restore();
			drawScreen();
		}
		function textFontChanged(e) {
			var target = e.target;
			fontFace = target.value;
			ctx.restore();
			drawScreen();
		}
		function fontWeightChanged(e) {
			var target = e.target;
			fontWeight = target.value;
			ctx.restore();
			drawScreen();
		}
		function fontStyleChanged(e) {
			var target = e.target;
			fontStyle = target.value;
			ctx.restore();
			drawScreen();
		}
		function textFillColorChanged(e) {
			var target = e.target;
			textFillColor = target.value;
			ctx.restore();
			drawScreen();
		}
		function textStrokeColorChanged(e) {
			var target = e.target;
			textStrokeColor = target.value;
			ctx.restore();
			drawScreen();
		}
		function textBaselineChanged(e){
			var target = e.target;
			textBaseline = target.value;
			ctx.restore();
			drawScreen();
		}
		function textAlignChanged(e){
			var target = e.target;
			textAlign = target.value;
			ctx.restore();
			drawScreen();
		}
		function textAlphaChanged(e){
			var target = e.target;
			textAlpha = target.value;
			ctx.restore();
			drawScreen();
		}
		function shadowColorChanged(e){
			var target = e.target;
			shadowColor = target.value;
			ctx.restore();
			drawScreen();
		}
		function shadowBlurChanged(e){
			var target = e.target;
			shadowBlur = target.value;
			ctx.restore();
			drawScreen();
		}
		function shadowXChanged(e){
			var target = e.target;
			shadowX = target.value;
			ctx.restore();
			drawScreen();
		}
		function shadowYChanged(e){
			var target = e.target;
			shadowY = target.value;
			ctx.restore();
			drawScreen();
		}
	}
	// 初始化
	canvasApp();
	// palette js
	var ctx, color = '#000';
	var cPalette=$('.palette'),
			iCanvas=$('#canvas'),
			iPalette=$('#palette');
	$(function(){
	  // setup a new canvas for drawing wait for device init
	  setTimeout(function() {
	    newCanvas();
	  }, 1000);
	  // reset palette selection (css) and select the clicked color for canvas strokeStyle
	  cPalette.on('click',function() {
	    cPalette.css('border-color', '#777');
	    cPalette.css('border-style', 'solid');
	    $(this).css('border-color', '#fff');
	    $(this).css('border-style', 'dashed');
	    color = $(this).css('background-color');
	    ctx.beginPath();
	    ctx.strokeStyle = color;
	  });
	});
	var wwidth = document.body.clientWidth;
	var xoffset = (wwidth - 960) / 2;
	// function to setup a new canvas for drawing
	function newCanvas() {
	  // setup canvas
	  ctx = document.getElementById('canvas').getContext('2d');
	  ctx.strokeStyle = color;
	  ctx.lineWidth = 4;
	  // setup to trigger drawing on mouse or touch
	  iCanvas.drawTouch();
	  iCanvas.drawPointer();
	  iCanvas.drawMouse();
	}
	// prototype to start drawing on touch using canvas moveTo and lineTo
	$.fn.drawTouch = function() {
	  var start = function(e) {
	    console.log(e);
	    e = e.originalEvent;
	    ctx.beginPath();
	    x = e.changedTouches[0].pageX;
	    alert(x);
	    x = x - xoffset;
	    y = e.changedTouches[0].pageY;
	    ctx.moveTo(x, y);
	  };
	  var move = function(e) {
	    e.preventDefault();
	    e = e.originalEvent;
	    x = e.changedTouches[0].pageX;
	    x = x - xoffset;
	    y = e.changedTouches[0].pageY;
	    ctx.lineTo(x, y);
	    ctx.stroke();
	  };
	  $(this).on('touchstart', start);
	  $(this).on('touchmove', move);
	};
	// prototype to start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
	$.fn.drawPointer = function() {
	  var start = function(e) {
	    e = e.originalEvent;
	    ctx.beginPath();
	    x = e.pageX;
	    x = x - xoffset;
	    y = e.pageY;
	    ctx.moveTo(x, y);
	  };
	  var move = function(e) {
	    e.preventDefault();
	    e = e.originalEvent;
	    x = e.pageX;
	    x = x - xoffset;
	    y = e.pageY;
	    ctx.lineTo(x, y);
	    ctx.stroke();
	  };
	  $(this).on('MSPointerDown', start);
	  $(this).on('MSPointerMove', move);
	};
	// prototype to start drawing on mouse using canvas moveTo and lineTo
	$.fn.drawMouse = function() {
	  var clicked = 0;
	  var start = function(e) {
	    clicked = 1;
	    ctx.beginPath();
	    x = e.pageX;
	    x = x -iPalette.show().offset().left-10;
	    y = e.pageY-iPalette.show().offset().top-10;
	    ctx.moveTo(x, y);
	  };
	  var move = function(e) {
	    if (clicked) {
	      x = e.pageX;
	      x = x -iPalette.show().offset().left-10;
	      y = e.pageY-iPalette.show().offset().top-10;
	      ctx.lineTo(x, y);
	      ctx.stroke();
	    }
	  };
	  var stop = function(e) {
	    clicked = 0;
	  };
	  $(this).on('mousedown', start);
	  $(this).on('mousemove', move);
	  $(window).on('mouseup', stop);
	};
});