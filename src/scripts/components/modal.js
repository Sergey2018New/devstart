/*
	  --------
	|   MODAL  |
	  --------

	* Базовые атрибуты:
		* data-modal-open - атрибут для открытия модального окна, в значении указывается селектор модального окна
		* data-modal - модальное окно
		* data-modal-window - видимая часть модального окна
		* data-modal-close - атрибут для закрытия модального окна

	* Инициализация модального окна
		modal.init() - инициализация модального окна

	* Callback функции при открытии и закрытии модального окна
		modal.beforeOpen - перед открытием 
		modal.beforeClose - перед закрытием
		modal.afterOpen - после открытием 
		modal.afterClose - после закрытия 
*/

let modal = {};
const body = document.querySelector('body');
const timeout = 400;
let unlock = true;
let isOpen = false;

const focusElements = [
	'a[href]',
	'area[href]',
	'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
	'select:not([disabled]):not([aria-hidden])',
	'textarea:not([disabled]):not([aria-hidden])',
	'button:not([disabled]):not([aria-hidden])',
	'iframe',
	'object',
	'embed',
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])'
];

modal.beforeOpen = (callbackCurrent) => {
	callback(callbackCurrent);
};
modal.beforeClose = (callbackCurrent) => {
	callback(callbackCurrent);
};
modal.afterOpen = (callbackCurrent) => {
	callback(callbackCurrent);
};
modal.afterClose = (callbackCurrent) => {
	callback(callbackCurrent);
};

modal.init = (beforeOpenCallback, beforeCloseCallback) => {
	document.addEventListener('click', (e) => {
		const target = e.target;

		if (target.closest('[data-modal-open]') || target.hasAttribute('data-modal-open')) {
			const modalSelector = target.getAttribute('data-modal-open');
			const currentModal = modalSelector ? document.querySelector(modalSelector) : '';

			e.preventDefault();

			openModal(currentModal);
		}

		if (target.closest('[data-modal-close]') || target.hasAttribute('data-modal-close') ||
			!target.closest('[data-modal-window]') && !target.hasAttribute('data-modal-window')
		) {
			const currentModal = target.closest('[data-modal]') || '';

			e.preventDefault();

			closeModal(currentModal);
		}
	});

	document.addEventListener('keydown', (e) => {
		const modalActive = document.querySelector('[data-modal].is-active');

		if (e.which === 27 && isOpen) {
			closeModal(modalActive);
			return;
		}

		if (e.which == 9 && isOpen) {
			focusCatcher(e, modalActive);
			return;
		}
	});
};

modal.open = (selector, callbackCurrent) => {
	const currentModal = selector && typeof selector == 'string' ? document.querySelector(selector) : '';

	callback(callbackCurrent);
	
	openModal(currentModal);
};

function openModal(currentModal) {
	if (unlock && currentModal) {
		modal.beforeOpen();

		currentModal.setAttribute('aria-hidden', false);
		currentModal.classList.add('is-active');

		isOpen = true;

		bodyLock();

		setTimeout(() => {
			modal.afterOpen();
		}, timeout);
	}
}

function closeModal(activeModal) {
	if (unlock && activeModal) {
		modal.beforeClose();

		activeModal.setAttribute('aria-hidden', true);
		activeModal.classList.remove('is-active');

		isOpen = false;
		bodyUnlock();
		
		setTimeout(() => {
			modal.afterClose();
		}, timeout);
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';

	body.paddingRight = lockPaddingValue;
	body.classList.add('is-modal-active');

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	unlock = false;

	setTimeout(() => {
		body.paddingRight = null;
		body.classList.remove('is-modal-active');

		unlock = true;
	}, timeout);
}

function callback (callbackCurrent) {;
	if (callbackCurrent && typeof callbackCurrent === 'function') {
		callbackCurrent();
	}
}

function focusCatcher(e, modal){
    // Находим все элементы на которые можно сфокусироваться
    const nodes = modal.querySelectorAll(focusElements);

    //преобразуем в массив
    const nodesArray = Array.prototype.slice.call(nodes);

    //если фокуса нет в окне, то вставляем фокус на первый элемент
    if (!modal.contains(document.activeElement)) {
        nodesArray[0].focus();
        e.preventDefault();
    } else {
        const focusedItemIndex = nodesArray.indexOf(document.activeElement);

        if (e.shiftKey && focusedItemIndex === 0) {
            //перенос фокуса на последний элемент
            nodesArray[nodesArray.length - 1].focus();
            e.preventDefault();
        }

        if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
            //перенос фокуса на первый элемент
            nodesArray[0].focus();
            e.preventDefault();
        }
    }
}

export {modal};
