/*
	  -------------- 
	|   ПОЛЯ ФОРМЫ   |
	  --------------

	* Базовые атрибуты:
		* data-field - обёртка для поля
			** data-field-password - атрибут для возможности показать пароль
		* data-field-input - элемент input 
		* data-field-icon - иконка поля (необходима для отображения/скрытия пароля) 
*/

function formFields(containerEl) {
	/* 
		@param  {Element} containerEl - HTML элемент контейнера, по умолчанию document
	*/

	let fiedlsItems;

	if (containerEl) {
		if (containerEl instanceof Node) {
			fiedlsItems = containerEl.querySelectorAll('[data-field]');
		}
	} else {
		fiedlsItems = document.querySelectorAll('[data-field]');
	}

	if (!fiedlsItems) return;


	fiedlsItems.forEach(item => {
		if (!item.hasAttribute('data-field-init')) {
			fieldInit();
		}

		function fieldInit() {
			const inputEl = item.querySelector('[data-field-input]');

			item.setAttribute('data-field-init', '');

			if (inputEl) {
				changeInput();

				inputEl.onfocus = () => {
					item.classList.add('is-focused');
				};

				inputEl.onblur = () => {
					item.classList.remove('is-focused');
				};

				inputEl.addEventListener('change', () => {
					changeInput();
				});

				if (item.hasAttribute('data-field-password')) {
					const fieldIcon = item.querySelector('[data-field-icon]');

					if (fieldIcon) {
						fieldIcon.addEventListener('click', () => {
							if (inputEl.type === "password") {
								inputEl.type = "text";
								item.classList.add('is-show-password');
							} else {
								inputEl.type = "password";
								item.classList.remove('is-show-password');
							}
						});
					}
				}

				function changeInput () {
					const val = item.hasAttribute('data-field-password') ? inputEl.value : inputEl.value.trim();

					if (val !== "") {
						item.classList.add('is-filed');	
					} else {
						item.classList.remove('is-filed');	
					}
				}
			}
		}
	});
}

/*
	  ------------ 
	|   ЧЕКБОКСЫ   |
	  ------------

	* Базовые атрибуты:
		* data-checkbox - обёртка
		* data-checkbox-input - инпут type checkbox
*/

function formCheckboxes(containerEl) {
	/* 
		@param  {Element} containerEl - HTML элемент контейнера, по умолчанию document
	*/

	let checkboxesItems;

	if (containerEl) {
		if (containerEl instanceof Node) {
			checkboxesItems = containerEl.querySelectorAll('[data-checkbox]');
		}
	} else {
		checkboxesItems = document.querySelectorAll('[data-checkbox]');
	}

	if (!checkboxesItems) return;

	checkboxesItems.forEach(item => {
		if (!item.hasAttribute('data-checkbox-init')) {
			init();
		}

		function init() {
			const inputEl = item.querySelector('[data-checkbox-input]');

			item.setAttribute('data-checkbox-init', '');

			if (inputEl) {
				if (inputEl.checked) {
					item.classList.add('is-checked');	
				}
	
				inputEl.addEventListener('change', () => {
					if (inputEl.checked) {
						item.classList.add('is-checked');	
					} else {
						item.classList.remove('is-checked');	
					}
				});
			}
		}
	});
}

/*
	  ---------------- 
	|   РАДИО КНОПКИ   |
	  ----------------

	* Базовые атрибуты:
		* data-radio - обёртка
		* data-radio-item - элемент radio
		* data-radio-input - инпут type radio
*/

function formRadioButtons(containerEl) {
	/* 
		@param  {Element} containerEl - HTML элемент контейнера, по умолчанию document
	*/

	let radioItems;

	if (containerEl) {
		if (containerEl instanceof Node) {
			radioItems = containerEl.querySelectorAll('[data-radio]');
		}
	} else {
		radioItems = document.querySelectorAll('[data-radio]');
	}

	if (!radioItems) return;

	radioItems.forEach(item => {
		if (!item.hasAttribute('data-radio-init')) {
			init();
		}

		function init() {
			const radioBlockItems = item.querySelectorAll('[data-radio-item]');

			item.setAttribute('data-radio-init', '');

			for (let i = 0; i < radioBlockItems.length; i++) {
				const element = radioBlockItems[i];
				const inputEl = element.querySelector('[data-radio-input]');

				if (inputEl) {
					if (inputEl.checked) {
						element.classList.add('is-checked');	
					}

					inputEl.addEventListener('change', () => {
						const radioChecked = item.querySelector('[data-radio-item].is-checked');

						if (radioChecked) {
							radioChecked.classList.remove('is-checked');	
						}

						if (inputEl.checked) {
							element.classList.add('is-checked');	
						}
					});
				}
			}
		}
	});
}

/*
	  ----------- 
	|   РЕЙТИНГ   |
	  -----------

	* Базовые атрибуты:
		* data-rating - обёртка рейтинга, значение атрибута от 1 до 5
			** data-rating-select - атрибут для возможности выбора рейтинга
		* data-rating-item - элемент рейтинга (иконка), значение атрибута от 1 до 5
		* data-radio-input - input рейтинга
*/

function formRating(containerEl) {
	/* 
		@param  {Element} containerEl - HTML элемент контейнера, по умолчанию document
	*/

	let ratingItems;

	if (containerEl) {
		if (containerEl instanceof Node) {
			ratingItems = containerEl.querySelectorAll('[data-rating]');
		}
	} else {
		ratingItems = document.querySelectorAll('[data-rating]');
	}

	if (!ratingItems) return;

	ratingItems.forEach(ratingItem => {
		if (!ratingItem.hasAttribute('data-rating-init') && ratingItem.hasAttribute('data-rating-select')) {
			init();
		}

		function init() {
			const inputEl = ratingItem.querySelector('[data-rating-input]');
			const iconsItems = ratingItem.querySelectorAll('[data-rating-item]');

			ratingItem.setAttribute('data-rating-init', '');
			
			iconsItems.forEach(iconItem => {
				iconItem.addEventListener('click', () => {
					const ratingValue = iconItem.getAttribute('data-rating-item');

					if (ratingValue) {
						inputEl.value = ratingValue;

						ratingItem.setAttribute('data-rating', ratingValue);
					}
				});
			});
		}
	});
}

/*
	  ---------------------- 
	|   СЧЁТЧИК КОЛИЧЕСТВА   |
	  ----------------------

	* Базовые атрибуты:
		* data-counter - обёртка счётчика
		* data-counter-decrease - кнопка уменьшения счётчика
		* data-counter-increase - кнопка увеличения счётчика
		* data-counter-input - input счётчика
			** data-value-min - минимальное значение 
			** data-value-max - максимальное значение 
*/

function formCounter(containerEl) {
	/* 
		@param  {Element} containerEl - HTML элемент контейнера, по умолчанию document
	*/

	let counterItems;

	if (containerEl) {
		if (containerEl instanceof Node) {
			counterItems = containerEl.querySelectorAll('[data-counter]');
		}
	} else {
		counterItems = document.querySelectorAll('[data-counter]');
	}

	if (!counterItems) return;

	counterItems.forEach(counterItem => {
		if (!counterItem.hasAttribute('data-counter-init')) {
			init();
		}

		function init() {
			const inputEl = counterItem.querySelector('[data-counter-input]');
			const decreaseEl = counterItem.querySelector('[data-counter-decrease]');
			const increaseEl = counterItem.querySelector('[data-counter-increase]');

			if (!inputEl) return;

			counterItem.setAttribute('data-counter-init', '');

			checkValue(parseInt(inputEl.value));

			if (decreaseEl) {
				decreaseEl.addEventListener('click', () => {
					let value = changeValue(decreaseEl, parseInt(inputEl.value));
					checkValue(value);
				});
			}

			if (increaseEl) {
				increaseEl.addEventListener('click', () => {
					let value = changeValue(increaseEl, parseInt(inputEl.value));
					checkValue(value);
				});
			}

			inputEl.addEventListener('change', () => {
				checkValue(inputEl.value);
			});

			function changeValue(element, value) {
				if (element.hasAttribute('data-counter-increase')) {
					value++;
				} else {
					value--;
				}
		
				return value;
			}

			function checkValue(value) {
				const valueMin = inputEl.hasAttribute('data-value-min') ? inputEl.getAttribute('data-value-min') : 1;
				const valueMax = inputEl.hasAttribute('data-value-max') ? inputEl.getAttribute('data-value-max') : 100;

				decreaseEl.removeAttribute('disabled');
				decreaseEl.classList.remove('is-disabled');
				increaseEl.removeAttribute('disabled');
				increaseEl.classList.remove('is-disabled');
				
				if (value <= valueMin || value === '') {
					value = valueMin;
					decreaseEl.setAttribute('disabled', 'disabled');
					decreaseEl.classList.add('is-disabled');
				} else if (valueMax && parseInt(value) > valueMax) {
					value = valueMax;
					increaseEl.setAttribute('disabled', 'disabled');
					increaseEl.classList.add('is-disabled');
				}

				inputEl.value = value;
			}
		}
	});
}

/*
	  ---------------------- 
	|   Прикрепление файла   |
	  ----------------------

	* Базовые атрибуты:
		* data-attach - обёртка прикрепления файла
		* data-attach-input - input прикрепления файла
		* data-attach-text - текст прикрепления файла
*/

function formAttach(containerEl) {
	/* 
		@param  {Element} containerEl - HTML элемент контейнера, по умолчанию document
	*/

	let attaches;

	if (containerEl) {
		if (containerEl instanceof Node) {
			attaches = containerEl.querySelectorAll('[data-attach]');
		}
	} else {
		attaches = document.querySelectorAll('[data-attach]');
	}

	if (!attaches) return;

	if(!attaches) return;

	attaches.forEach(attach => {
		const attachInput = attach.querySelector('[data-attach-input]');
		const attachText = attach.querySelector('[data-attach-text]');

		if (attachInput) {
			attachInput.addEventListener('change', (event) => {
				const name = event.target.files[0].name;

				if (attachText && name) {
					attachText.textContent = name;
				}
			});
		}
	});
}

export {formFields, formCheckboxes, formRadioButtons, formRating, formCounter, formAttach};