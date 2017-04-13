require.config({
	baseUrl: BASE_URL,
	paths: {
		lib: "js/app"
	}
});

require(["./mediator"], function (page) {
	
	page.beforeReady();
	
	$(function () {
		
		page.onReady();
		
	});
});