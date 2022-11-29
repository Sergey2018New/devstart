// import tippy from 'tippy.js';

function tooltip(tooltipContainer) {
	/*
		Tippyjs
		https://atomiks.github.io/tippyjs/
	*/

	let tooltips;

	if (tooltipContainer) {
		if (tooltipContainer instanceof Node) {
			tooltips = tooltipContainer.querySelectorAll('[data-tooltip]');
		}
	} else {
		tooltips = document.querySelectorAll('[data-tooltip]');
	}
	

	if (!tooltips) return;

	for (let i = 0; i < tooltips.length; i++) {
		const tooltip = tooltips[i];
		
		if (!tooltip.hasAttribute('data-tooltip-init')) {
			tooltipInit(tooltip);
		}
	}

	function tooltipInit(tooltip) {
		
		tooltip.setAttribute('data-tooltip-init', '');

		let tooltipContent = tooltip.getAttribute('title') || tooltip.getAttribute('data-tooltip-content') || '';
		let tooltipTrigger = tooltip.getAttribute('data-tooltip-trigger') || 'mouseenter focus';

		if (tooltipContent) {
			tippy(tooltip, {
				content: tooltip.getAttribute('title') || tooltip.getAttribute('data-tooltip-content') || '',
				allowHTML: true,
				trigger: tooltipTrigger,
			});
		}
	}
}

export {tooltip};



