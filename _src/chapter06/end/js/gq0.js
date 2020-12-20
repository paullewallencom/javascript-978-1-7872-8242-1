(function(scope){
	var version = 1.0001; 


	var gQ = function( selector, context){
		// ... 
	};

	gQ.loadJS = function (){
		//...
	};

	gQ.version = function (){
		return version;
	};

	if(!window.gQ){
		window.gQ = gQ;
	}else{
		//TBD
	}

}(window));

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