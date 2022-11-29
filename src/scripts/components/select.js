// import '../../../node_modules/choices.js/public/assets/scripts/choices.min.js';

// select();

function select() {
	/*
		Choices.js
		https://github.com/Choices-js/Choices
	*/

	const selects = document.querySelectorAll('[data-select]');

	if (!selects) return;

	selects.forEach(item => {
		const choices = new Choices(item, {
			searchEnabled: false,
			itemSelectText: '',
			shouldSort: false
		});
	});
}




