(function(win, $){
	function clone(src,out){
		for(var attr in src.prototype){
			out.prototype[attr] = src.prototype[attr];
		}
	}
	function Circle(){
		
		this.item = $('<div class="circle"></div>');
		
	}
	Circle.prototype.color = function(clr){
		this.item.css('background', clr);
	}
	
	Circle.prototype.move = function(left, top){
				this.item.css('left',left);
				this.item.css('top',top);
	};

	Circle.prototype.get = function(){
		return this.item;
	};

	Circle.prototype.getID = function(){
		return this.id;
	};

	Circle.prototype.setID = function(id){
		this.id= id;
	};

	function Rect(){
		this.item = $('<div class="rect"></div>');
	}
	clone(Circle, Rect);

	function shapeFacade(shp){
		return {
			color:function(clr){
				shp.color(clr);
			},
			move:function(x,y){
				shp.move(x,y);
			},
			getID:function(){
				return shp.getID();
			}

		};
	}

	function selfDestructDecorator(obj){
		obj.item.click(function(){
			obj.kill();
		});
		obj.kill = function(){
			obj.item.remove();
		};
	}


	function RedCircleBuilder(){
		this.item = new Circle();
		this.init();
	}
	RedCircleBuilder.prototype.init = function() {
		//NOTHING
	};

	RedCircleBuilder.prototype.get = function() {
		return this.item;
	};

	
	function BlueCircleBuilder(){
		this.item = new Circle();

		this.init();
	}

	BlueCircleBuilder.prototype.init = function() {
		this.item.color("blue");

		var rect = new Rect();
				rect.color("yellow");
				rect.move(40,40);
				selfDestructDecorator(rect);
		this.item.get().append(rect.get());
	}; 
	BlueCircleBuilder.prototype.get = function() {
		return this.item;
	};	

	ShapeFactory = function(){
			this.types = {};
			this.create = function(type){
				return new this.types[type]().get();
			};

			this.register = function(type, cls){
				if(cls.prototype.init && cls.prototype.get){
						this.types[type] = cls;
				}
			}
	};

	function Stage(id){
		this.index = 0;
		this.context = $(id);
		this.SIG = 'stageItem_';
	}

	Stage.prototype.add = function (item){
		++this.index;
		item.addClass(this.SIG + this.index);
		this.context.append(item);
	};

	Stage.prototype.remove = function(index){
		this.context.remove('.' + this.SIG + index);
	}

	function CompositeController(a){
		this.a = a;
	}

	CompositeController.prototype.action = function (act){
		var args = Array.prototype.slice.call(arguments);
				args.shift();
		for(var item in this.a){
			this.a[item][act].apply(this.a[item],args);
		}
	};

	function flyWeightFader(item){
		console.log(item[0], item.hasClass('circle'))
		if(item.hasClass('circle')){
			item.fadeTo(.5,item.css('opacity')*.5);
		}
	}


	var CircleGeneratorSingleton = (function(){
		var instance;

		function init(){
			var _aCircle = [],
					_stage,
					_sf = new ShapeFactory(),
					_cc = new CompositeController(_aCircle);

			function _position(circle, left, top){
				circle.move(left, top);
			}
			function registerShape(name,cls){
				_sf.register(name, cls);
			}
			function setStage(stg){
				_stage = stg;
			}

			function create(left, top,type){
				var circle = _sf.create(type);
				circle.move(left, top);
				circle.setID(_aCircle.length);
				_aCircle.push(circle);

				return shapeFacade(circle);
			}

			function tint(clr){
				_cc.action('color',clr);
			}

			function move(left, top){
				_cc.action('move',left, top);
			}

			function add(circle){
				_stage.add(_aCircle[circle.getID()].get());
				
			}

			function index(){
				return _aCircle.length;
			}

			return {index:index,
							create:create,
							add:add,
							register:registerShape,
							setStage:setStage,
							tint:tint,
							move:move};
		}

		return {
			getInstance: function(){
				if(!instance){
					instance = init();
				}

				return instance;
			}
		}

	})();

	$(win.document).ready(function(){
		var cg = CircleGeneratorSingleton.getInstance();
		cg.register('red', RedCircleBuilder);
		cg.register('blue', BlueCircleBuilder);
		cg.setStage(new Stage('.advert'));
		$('.advert').click(function(e){
			var circle = cg.create(e.pageX-25, e.pageY-25,"red");

			cg.add(circle);

			flyWeightFader($(e.target));
		});


		$(document).keypress(function(e){
			if(e.key==='a'){
				var circle = cg.create(Math.floor(Math.random()*600),
															Math.floor(Math.random()*600),
															"blue");
				
				cg.add(circle);
			}else if(e.key==='t'){
				cg.tint('black');
			}else if(e.key==='ArrowRight'){
				cg.move("+=5px","+=0px");
			}else if(e.key==='ArrowLeft'){
				cg.move("-=5px","+=0px");
			}
			
		});

	});

})(window, jQuery);