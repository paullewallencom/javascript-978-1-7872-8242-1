(function(scope, isForgiving){
	var version = 1.0003; 
	var doc = window.document;
	var q;


	var gQ = function( selector, context){
		return q(selector);
	};

	gQ.loadJS = function (path, callback){
		var js = doc.createElement('script');
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

				doc.getElementsByTagName('head')[0].appendChild(js);
	};


	gQ.ready = function(fun){
		var last = window.onload;
		var isReady= false;

		if(doc.addEventListener){
			doc.addEventListener('DOMContentLoaded',function(){
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
	gQ.start = function (){};
	gQ.version = function (){
		return version;
	};

	gQ.ready(function(){
		if(doc.querySelectorAll && doc.querySelectorAll('body:first-of-type')){
			q = function(parm) {
				return doc.querySelectorAll(parm);
			};
			
			gQ.start();

		}else{
			loadScript('js/sizzle.min.js', function(){
				q = Sizzle;
				gQ.start();
			});
		}
	});

	


	if(!window.gQ){
		window.gQ = gQ;
	}else{
		if(isForgiving && window.gQ.version){
			window.gQ = window.gQ.version()>version ? window.gQ : gQ;
		}else{
			throw new Error("The variable window.gQ already exists.");
		}
	}

}(window,true));

//console.log(version);
/*
var com = com || {};
		com.o2GEEK = com.o2GEEK || {};

if(com.o2GEEK.gQ){
	com.o2GEEK.gQ = function( selector, context){
		// ... 
	}

	com.o2GEEK.gQ.loadJS = function (){
		//...
	}
}*/