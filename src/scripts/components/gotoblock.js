import SmoothScroll from "../../../node_modules/smooth-scroll/dist/smooth-scroll.min.js";

/*
	Модуль плавной проктутки к блоку
*/

export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offset = 0) => {
	let headerItem = '';
	
	if (noHeader) {
		headerItem = '.header.is-fixed';
	}

	let options = {
		speedAsDuration: true,
		speed: speed,
		header: headerItem,
		offset: offset,
		easing: 'easeOutQuad',
	};

	const targetBlockElement = document.querySelector(targetBlock);
	targetBlockElement ? new SmoothScroll().animateScroll(targetBlockElement, '', options) : console.log(`[gotoBlock] - Такого блока нет: ${targetBlock}`);
};


