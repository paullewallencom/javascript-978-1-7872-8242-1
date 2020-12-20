
var q;


window.onload=function(){
	console.log("window is loaded.");
}


addOnReady(function(){
	console.log("2 window is loaded.");
});

addOnReady(function(){
	console.log("3 window is loaded.");

	if(document.querySelectorAll && document.querySelectorAll('body:first-of-type')){
		q = function(parm) {
			return document.querySelectorAll(parm);
		};
		
		onReadySelect();

	}else{
		loadScript('js/sizzle.min.js', function(){
			q = Sizzle;
			onReadySelect();
		});
	}

});

function onReadySelect(){
	var span = q('#msg span')[0],
			innerText = (span.innerText===undefined) ? 'textContent':'innerText';

	span[innerText] = 'Yay!! We Made It Mom!!!';
}



function addOnReady(fun){
	var last = window.onload;
	var isReady= false;

	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			console.log("DOM is loaded");
			isReady = true;
			fun();
		});
	}

	window.onload = function(){
		if(last) last();

		if(isReady) fun();
	}

}


function loadScript(path, callback){
	var js = document.createElement('script');
			js.src = path;
			js.type = 'text/javascript';
			js.onload = function(){
				callback();
				this.onload = this.onreadystatechange = null;
			};

			js.onreadystatechange = function(){
				if(this.readState == 'complete'){
					this.onload();
				}
			}

			document.getElementsByTagName('head')[0].appendChild(js);
}









