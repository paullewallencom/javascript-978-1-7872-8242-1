(function(win, $){
	$(win.document).ready(function(){
		$('.advert').click(function(e){
			var circle = $('<div class="circle"></div>');
				circle.css('left',e.pageX-25);
				circle.css('top',e.pageY-25)
			$('.advert').append(circle);
		});

	});

})(window, jQuery);