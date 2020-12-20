/*! modernizr 3.0.0-alpha.3 (Custom Build) | MIT *
 * http://v3.modernizr.com/download/#-audio !*/
!function(e,n){function a(e,n){return typeof e===n}function o(){var e,n,o,s,i,r,l;for(var u in t){if(e=[],n=t[u],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(o=0;o<n.options.aliases.length;o++)e.push(n.options.aliases[o].toLowerCase());for(s=a(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)r=e[i],l=r.split("."),1===l.length?Modernizr[l[0]]=s:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=s),c.push((s?"":"no-")+l.join("-"))}}var t=[],s={_version:"3.0.0-alpha.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var a=this;setTimeout(function(){n(a[e])},0)},addTest:function(e,n,a){t.push({name:e,fn:n,options:a})},addAsyncTest:function(e){t.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=s,Modernizr=new Modernizr;var i=function(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):n.createElement.apply(n,arguments)};Modernizr.addTest("audio",function(){var e=i("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.opus=e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(a){}return n});var c=[];o(),delete s.addTest,delete s.addAsyncTest;for(var r=0;r<Modernizr._q.length;r++)Modernizr._q[r]();e.Modernizr=Modernizr}(window,document);

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

addOnReady(function(){
	console.log("4 window is loaded.");

	if(false && Modernizr.audio.mp3){
		var snd = new Audio();
				snd.src = "sample.mp3";
				snd.play();
	}

});


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









