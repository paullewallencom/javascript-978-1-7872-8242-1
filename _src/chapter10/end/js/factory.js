(function(win, $){
	var RedCircle = function(){
		this.item = $('<div class="circle"></div>');
	},
			BlueCircle = function(){
		this.item = $('<div class="circle" style="background:blue"></div>');
	}, CircleFactory = function(){
			this.create = function(color){
				if(color === 'blue') {
					return new BlueCircle();
				}else{
					return new RedCircle();
				}
			}
	};

	var CircleGeneratorSingleton = (function(){
		var instance;

		function init(){
			var _aCircle = [],
					_stage = $('.advert'),
					_cf = new CircleFactory();

			function _position(circle, left, top){
				circle.css('left',left);
				circle.css('top',top);
			}

			function create(left, top,color){
				var circle = _cf.create(color).item;
				_position(circle,left, top);
				return circle;
			}

			function add(circle){
				_stage.append(circle);
				_aCircle.push(circle);
			}

			function index(){
				return _aCircle.length;
			}

			return {index:index,
							create:create,
							add:add};
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
		$('.advert').click(function(e){
			var cg = CircleGeneratorSingleton.getInstance();
			var circle = cg.create(e.pageX-25, e.pageY-25,"red");

			cg.add(circle);
				
		});

		$(document).keypress(function(e){
			if(e.key=='a'){
				var cg = CircleGeneratorSingleton.getInstance();
				var circle = cg.create(Math.floor(Math.random()*600),
															Math.floor(Math.random()*600),
															"blue");
				
				cg.add(circle);
			}
			
		});

	});

})(window, jQuery);