/* Add Here */

var about = false;

function changePanel() {
	about = !about;
	$('.panel-1').slideToggle();

	if(about) {
		$("#switch img").attr("src", "./imgs/down.png");
	} else {
		$("#switch img").attr("src", "./imgs/up.png");
	}
}

function main() {
	$(document).on("click", "#switch", function() {
		$('.back-panel').show();
		changePanel();
	});

	$(document).on("click", "#but-1", function() {
		if(!about) {
			changePanel()
		}
	});
}

$(document).ready(function() {
	main();
});