window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded(){
	canvasApp();
}

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

	// Output Console
/*	var output = document.getElementById('output');
	output.innerHTML = '<span class="comment">/*-- Output Console --*</span><br/>';
	output.innerHTML = output.innerHTML + '<span class="function">var</span> canvas <span class="operator">=</span> <span class="document">document</span>.<span class="function">getElementById</span>(<span class="string">\'canvas\'</span>); <br/>';
	output.innerHTML = output.innerHTML + '<span class="function">var</span> ctx <span class="operator">=</span> <span class="document">canvas</span>.<span class="function">getContext</span>(<span class="string">\'2d\'</span>); <br/><br/>';
	output.innerHTML = output.innerHTML + '<span class="comment">// Initial text properties</span><br/>';
	output.innerHTML = output.innerHTML + 'message <span class="operator">=</span> <span class="string">\'Type your text!\'</span>; <br/>';
	output.innerHTML = output.innerHTML + 'ctx.fillStyle <span class="operator">=</span> <span class="string">\'#000000\'</span>; <br/>';
	output.innerHTML = output.innerHTML + 'ctx.font <span class="operator">=</span> <span class="string">\'normal normal 50px serif\'</span>; <br/>';
	output.innerHTML = output.innerHTML + 'ctx.textBaseline <span class="operator">=</span> <span class="string">\'middle\'</span>; <br/>';
	output.innerHTML = output.innerHTML + 'ctx.textAlign <span class="operator">=</span> <span class="string">\'left\'</span>; <br/>';
	output.innerHTML = output.innerHTML + 'ctx.globalAlpha <span class="operator">=</span> <span class="string">\'1\'</span>; <br/>';
	output.innerHTML = output.innerHTML + 'ctx.shadowColor <span class="operator">=</span> <span class="string">\'#787878\'</span>; <br/>';
	output.innerHTML = output.innerHTML + 'ctx.shadowBlur <span class="operator">=</span> <span class="string">\'5\'</span>; <br/>';
	output.innerHTML = output.innerHTML + 'ctx.shadowOffsetX <span class="operator">=</span> <span class="string">\'3\'</span>; <br/>';
	output.innerHTML = output.innerHTML + 'ctx.shadowOffsetY <span class="operator">=</span> <span class="string">\'3\'</span>; <br/><br/>';
	output.innerHTML = output.innerHTML + '<span class="comment">// Updated text properties here</span><br/>';
*/
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var formElement = document.getElementById('textBox');
	formElement.addEventListener('keyup', textBoxChanged, false);

	formElement = document.getElementById('fillOrStroke');
	formElement.addEventListener('change', fillOrStrokeChanged, false);

	formElement = document.getElementById('textSize');
	formElement.addEventListener('change', textSizeChanged, false);

	formElement = document.getElementById('textFont');
	formElement.addEventListener('change', textFontChanged, false);

	formElement = document.getElementById('fontWeight');
	formElement.addEventListener('change', fontWeightChanged, false);

	formElement = document.getElementById('fontStyle');
	formElement.addEventListener('change', fontStyleChanged, false);

	formElement = document.getElementById('textFillColor');
	formElement.addEventListener('change', textFillColorChanged, false);

	// formElement = document.getElementById('textStrokeColor');
	// formElement.addEventListener('change', textStrokeColorChanged, false);

	formElement = document.getElementById('textBaseline');
	formElement.addEventListener('change', textBaselineChanged, false);

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