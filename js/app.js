$(document).ready(function(){

	$("div.class div.header").click(function(e) {
		e.preventDefault();

		var parent = $(this).parent();
		parent.toggleClass("active");
		var next = $(this).next();
		next.slideToggle();
	});

})