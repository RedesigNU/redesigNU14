$(document).ready(function(){

	$("div.class div.header").click(function() {
		var parent = $(this).parent();
		parent.toggleClass("active");
		var next = $(this).next();
		next.toggleClass("transition");
	});

})