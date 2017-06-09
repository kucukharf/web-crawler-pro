require(["jquery"], function(jquery) {
   var $ = jquery;
   	$(document).ready(function(){
   		$('.hero-img').attr('style', $('.hero-img').attr('style').replace('&qlt=43', ''))
   		
   		$('button[data-analytics-page-tab_layout]').on('click', function(event){
   			event.preventDefault();
   			var locate  = $('<div></div>').html($(this).find('noscript').text()).find('a').attr('href');
   			console.log(locate);
   			window.location.href= window.location.origin + locate;
   		})
   	})
});