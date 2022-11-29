/*
	  ----------- 
	|   ВКЛАДКИ   |
	  ----------- 

	* Базовые атрибуты:
		* data-tabs - общая обёртка для вкладок
		* data-tabs-menu - меню вкладок
		* data-tabs-item - пункт меню
			** Значение атрибута должно быть уникальным внутри обёртки data-tabs
			** Дополнительно можно указать атрибут data-value со значением названия вкладки
				(необходимо для изменения текста кнопки, открывающей список меню)
		* data-tabs-content - раскрывающаяся панель
		* data-tabs-pane - раскрывающаяся панель
			** Значение атрибута должно совпадать со значением атрибута data-tabs-item

	* Дополнительные атрибуты:
		* data-tabs-list - список пунктов меню
		* data-tabs-overlay - динамическая плашка для пунктов меню
		* data-tabs-prev - навигация по вкладком "назад"
		* data-tabs-next - навигация по вкладком "вперёд"
		* data-tabs-button - кнопка, открывающая список меню (для адаптива)
		* data-tabs-button-text - текст кнопки, открывающей список меню (для адаптива)
			** Значение атрибута подставляется с активного пункта меню из атрибута data-value

	* Функциональные атрибуты (можно указать на любом HTML элементе):
		* data-tabs-switch - добавляет HTML элементу возможность переключения заданных вкладок
			** Значение атрибута должно совпадать со значением атрибута data-tabs
		* data-tabs-switch-pane - атрибут, указывающий конкретную вкладку с атрибута data-tabs-pane
*/

function tabs(tabsContainer) {
	/* 
		@param  {Element} tabsContainer - HTML элемент контейнера, по умолчанию document
	*/

	let tabsElements;

	if (tabsContainer) {
		if (tabsContainer instanceof Node) {
			tabsElements = tabsContainer.querySelectorAll('[data-tabs]');
		}
	} else {
		tabsElements = document.querySelectorAll('[data-tabs]');
	}

	if (!tabsElements) return;

	tabsElements.forEach(tabs => {

		if (!tabs.hasAttribute('data-tabs-init')) {
			tabsInit();
		}

		function tabsInit() {
			const tabsButton = tabs.querySelector('[data-tabs-button]');
			const tabsMenu = tabs.querySelector('[data-tabs-menu]');
			const tabsList = tabs.querySelector('[data-tabs-list]');
			const tabsItems = tabsMenu ? tabsMenu.querySelectorAll('[data-tabs-item]') : '';
			const tabsOverlay = tabs.querySelector('[data-tabs-overlay]');
			const tabsPrev = tabs.querySelector('[data-tabs-prev]');
			const tabsNext = tabs.querySelector('[data-tabs-next]');

			tabs.setAttribute('data-tabs-init', '');

			changeOverlay(tabs, tabsOverlay);
			isDisabledTabNavigation(tabs, tabsPrev, tabsNext);

			window.addEventListener('resize', () => {
				changeOverlay(tabs, tabsOverlay);
			});

			if (tabsItems) {
				tabsItems.forEach(tabItem => {
					tabItem.addEventListener('click', (event) => {
						const target = event.currentTarget;

						moveTab(tabs, target, tabsButton);
						changeOverlay(tabs, tabsOverlay);
						isDisabledTabNavigation(tabs, tabsPrev, tabsNext);
					});
				});
			}

			if (tabsPrev) {
				tabsPrev.addEventListener('click', (e) => {
					e.preventDefault();

					tabNavigation(tabs, tabsOverlay, 'prev');
					isDisabledTabNavigation(tabs, tabsPrev, tabsNext);
				});
			}

			if (tabsNext) {
				tabsNext.addEventListener('click', (e) => {
					e.preventDefault();

					tabNavigation(tabs, tabsOverlay, 'next');
					isDisabledTabNavigation(tabs, tabsPrev, tabsNext);
				}); 
			}

			if (tabsButton) {
				tabsButton.addEventListener('click', (e) => {
					e.preventDefault();

					tabsButton.classList.toggle('is-active');

					if (tabsList) {
						tabsList.classList.toggle('is-active');
					}
				});
			}
		}
	});

	document.addEventListener('click', (event) => {
		let target = event.target;

		if (target.hasAttribute('data-tabs-switch') || target.closest('[data-tabs-switch]')) {
			event.preventDefault();
			
			const tabsSwitch = document.querySelector(`[data-tabs="${target.getAttribute('data-tabs-switch')}"]`);

			if (tabsSwitch) {
				const tabsPrev = tabsSwitch.querySelector('[data-tabs-prev');
				const tabsNext = tabsSwitch.querySelector('[data-tabs-next');
				const tabCurrent = tabsSwitch.querySelector(`[data-tabs-item="${target.getAttribute('data-tabs-switch-pane')}"]`);
				const tabsOverlay = tabsSwitch.querySelector('[data-tabs-overlay]');
				const tabsButton = tabsSwitch.querySelector('[data-tabs-button]');
				
				if (tabCurrent) {
					moveTab(tabsSwitch, tabCurrent, tabsButton);
					changeOverlay (tabsSwitch, tabsOverlay);
					isDisabledTabNavigation(tabsSwitch, tabsPrev, tabsNext);
				}
			}
		}

		if (!target.hasAttribute('data-tabs-button') && !target.closest('[data-tabs-button]')) {
			closeTabsList();
		}
	});


	function changeOverlay (tabsCurrent, tabsOverlay) {
		setTimeout(() => {
			const tabActive = tabsCurrent.querySelector('[data-tabs-item].is-active');

			if (tabsOverlay && tabActive) {
				tabsOverlay.style.width = `${tabActive.offsetWidth}px`;
				tabsOverlay.style.left = `${tabActive.offsetLeft}px`;
			}
		},10);
	}

	function moveTab(tabs, tabCurrent, tabsButton) {
		if (!tabs || !tabCurrent) return;

		const tabActive = tabs.querySelector('[data-tabs-item].is-active');

		let panelActive;
		let panelCurrent = tabs.querySelector(`[data-tabs-pane="${tabCurrent.getAttribute('data-tabs-item')}"]`);

		if (tabActive) {
			tabActive.classList.remove('is-active');
			panelActive = tabs.querySelector(`[data-tabs-pane="${tabActive.getAttribute('data-tabs-item')}"]`);
		}

		if (panelActive) {
			panelActive.classList.remove('is-active');
		}

		tabCurrent.classList.add('is-active');
		
		if (panelCurrent) {
			panelCurrent.classList.add('is-active');
		}

		if (tabsButton) {
			const tabsButtonText = tabsButton.querySelector('[data-tabs-button-text]');

			if (tabsButtonText) {
				tabsButtonText.textContent = tabCurrent.getAttribute('data-value') || '';
			}
		}
	}

	function closeTabsList () {
		const tabsButtonActive = document.querySelector('[data-tabs-button].is-active');
		const tabsListActive = document.querySelector('[data-tabs-list].is-active');

		if (tabsButtonActive) {
			tabsButtonActive.classList.remove('is-active');
		}
		if (tabsListActive) {
			tabsListActive.classList.remove('is-active');
		}
	}

	function tabNavigation(tabs, tabsOverlay, direction) {
		if (!tabs) return;

		let tabActive = tabs.querySelector('[data-tabs-item].is-active');
		let tabsButton = tabs.querySelector('[data-tabs-button]');

		if (tabActive) {
			let tabCurrent = tabActive.nextElementSibling;

			if (direction == 'prev') {
				tabCurrent = tabActive.previousElementSibling;
			}

			if (tabCurrent) {
				moveTab(tabs, tabCurrent, tabsButton);

				if (tabsOverlay) {
					changeOverlay (tabs, tabsOverlay); 
				}
			}
		}
	}

	function isDisabledTabNavigation(tabs, tabNavPrev, tabNavNext) {
		let tabActive = tabs.querySelector('[data-tabs-item].is-active');

		if (tabNavPrev) {
			if (tabActive.previousElementSibling) {
				tabNavPrev.classList.remove('is-disabled');
			} else {
				tabNavPrev.classList.add('is-disabled');
			}
		}

		if (tabNavNext) {
			if (tabActive.nextElementSibling) {
				tabNavNext.classList.remove('is-disabled');
			} else {
				tabNavNext.classList.add('is-disabled');
			}
		}
	}
}

/*
	  ------------- 
	|   АККОРДЕОН   |
	  ------------- 

	* Базовые атрибуты:
		* data-accordions - общая обёртка для аккордеонов
		* data-accordion - блок аккордеона
			** Если необходимо закрывать соседние аккордеоны, то указываем атрибут data-accordion-one
			** Если нужно всегда отображать активный аккордион (без возможности закрытия), то указываем атрибут data-acccordion-visible
			** Если по умолчанию необходимо показать аккордеон, то нужно указать классы .is-active.is-visible
		* data-accordion-button - кнопка открытия/закрытия раскрывающегося контента
		* data-accordion-content - раскрывающийся контент
*/

function accordions(accordionsContainer, duration = 300) {
	/* 
		@param  {Element} accordionsContainer - HTML элемент контейнера, по умолчанию document
		@param  {number} duration - время раскрытия аккордеона (также необходимо изменить в CSS)
	*/

	let accordions;

	if (accordionsContainer) {
		if (accordionsContainer instanceof Node) {
			accordions = accordionsContainer.querySelectorAll('[data-accordion]');
		}
	} else {
		accordions = document.querySelectorAll('[data-accordion]');
	}

	if (!accordions) return;

	accordions.forEach(accordion => {
		if (!accordion.hasAttribute('data-accordion-init')) {
			accordionInit();
		}

		function accordionInit () {
			const accordionButton = accordion.querySelector('[data-accordion-button]');
			const accordionContent = accordion.querySelector('[data-accordion-content]');
			let isOpen = true;
			
			accordion.setAttribute('data-accordion-init', '');

			if (accordionButton && accordionContent) {
				if (accordion.classList.contains('is-active')) {
					accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
				}

				accordionButton.addEventListener('click', (event) => {
					let isVisible = accordion.hasAttribute('data-accordion-visible');

					if (isOpen) {
						if (isVisible) {
							if (!accordion.classList.contains('is-active')) {
								accordionItem ();
							}
						} else {
							accordionItem ();
						}
					}

					function accordionItem () {
						isOpen = false;

						if (accordion.hasAttribute('data-accordion-one')) {
							const accordionActive = accordion.closest('[data-accordions]').querySelector('[data-accordion].is-active');
		
							if (accordionActive && accordionActive !== accordion) {
								const accordionActiveContent = accordionActive.querySelector('[data-accordion-content]');

								accordionActive.classList.remove('is-active', 'is-visible');

								if (accordionActiveContent.style.maxHeight) {
									accordionActiveContent.style.maxHeight = null;
								}
							}
						}
		
						accordion.classList.toggle('is-active');

						if (accordion.classList.contains('is-active')) {
							setTimeout(() => {
								accordion.classList.add('is-visible');
							}, duration);
						} else {
							accordion.classList.remove('is-visible');
						}
		
						if (accordionContent.style.maxHeight) {
							accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
							accordionContent.style.maxHeight = null;
						} else {
							accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
						}

						setTimeout(() => {
							isOpen = true;
						}, duration);
					}
				});
			}
		}
	});
}

/*
	  ------------- 
	|   DROPDOWN   |
	  -------------

	* Базовые атрибуты:
		* data-dropdown - обертка выпадающего меню
		* data-dropdown-button - кнопка открытия/закрытия контента
		* data-dropdown-content - контент выпадающего меню
*/

function dropdown(dropdownContainer) {
	/* 
		@param  {Element} dropdownContainer - HTML элемент контейнера, по умолчанию document
	*/

	let dropdowns;

	if (dropdownContainer) {
		if (dropdownContainer instanceof Node) {
			dropdowns = dropdownContainer.querySelectorAll('[data-dropdown]');
		}
	} else {
		dropdowns = document.querySelectorAll('[data-dropdown]');
	}
 
	if (!dropdowns) return;

	dropdowns.forEach(dropdownItem => {
		if (!dropdownItem.hasAttribute('data-dropdown-init')) {
			dropdownInit(dropdownItem);
		}
	});

	function dropdownInit (dropdownItem) {
		const dropdownButton = dropdownItem.querySelector('[data-dropdown-button]');

		dropdownItem.setAttribute('data-dropdown-init', '');

		if (dropdownButton) {
			dropdownButton.addEventListener('click', (event) => {
				const dropdownActive = document.querySelector('[data-dropdown].is-active');
				const dropdownContent = dropdownItem.querySelector('[data-dropdown-content]');

				if (dropdownActive && dropdownActive !== dropdownItem) {
					dropdownActive.classList.remove('is-active');

					if (dropdownContent) {
						dropdownContent.classList.remove('is-active');
					}
				}

				dropdownItem.classList.toggle('is-active');

				if (dropdownContent) {
					dropdownContent.classList.toggle('is-active');
				}
			});
		}
	}

	document.addEventListener('click', (event) => {
		const target = event.target;
		const dropdownActive = document.querySelector('[data-dropdown].is-active');

		if (dropdownActive && target !== dropdownActive && !target.closest('[data-dropdown]')) {
			const dropdownContent = dropdownActive.querySelector('[data-dropdown-content]');

			dropdownActive.classList.remove('is-active');

			if (dropdownContent) {
				dropdownContent.classList.remove('is-active');
			}
		}
	});
}

/*
	  ---------- 
	|   STICKY   |
	  ----------

	* Базовые атрибуты:
		* data-sticky-container - контейнер прилипающего блока
		* data-sticky - прилипающий блок
			** data-sticky-offset - смещение сверху окна браузера
			** data-sticky-is-header - учитывать фиксированную шапку
		
*/

function sticky(stickyContainer) {
	/* 
		@param  {Element} stickyContainer - HTML элемент контейнера, по умолчанию document
	*/
	let stickyElements;

	if (stickyContainer) {
		if (stickyContainer instanceof Node) {
			stickyElements = stickyContainer.querySelectorAll('[data-sticky]');
		}
	} else {
		stickyElements = document.querySelectorAll('[data-sticky]');
	}

	if (!stickyElements) return;
    
	stickyElements.forEach(stickyBlock => {
		stickyInit(stickyBlock);

        window.addEventListener('scroll', () => {
            stickyInit(stickyBlock);
        });
        
        window.addEventListener('resize', () => {
            stickyInit(stickyBlock);
        });
	});

	function stickyInit(stickyBlock) {
		const container = stickyBlock.closest('[data-sticky-container]');
		let scrollTop = window.pageYOffset;
		let stickyHeight = stickyBlock.scrollHeight;

		if (container) {
			const stickyHeight = stickyBlock.offsetHeight;
			const offsetTop = container.getBoundingClientRect().top + scrollTop;
			const containerWidth = container.offsetWidth;
			const containerHeight = container.offsetHeight;

			container.style.height = null;

			if (stickyHeight >= containerHeight) {
				container.style.height = null;
				stickyBlock.style.width = null;
				stickyBlock.classList.remove('is-fixed', 'is-bottom');
				return;
			} else {
				container.style.height = container.offsetHeight + 'px';
			}

			if (stickyBlock.hasAttribute('data-sticky-is-header')) {
				
				const header = document.querySelector('.header.is-fixed');

				if (header) {
					scrollTop += header.offsetHeight;
				}
			}

			if (stickyBlock.hasAttribute('data-sticky-offset')) {
				scrollTop += Number(stickyBlock.getAttribute('data-sticky-offset'));
			}
			
			if ((scrollTop) >= offsetTop) {
				stickyBlock.classList.add('is-fixed');
				stickyBlock.style.width = containerWidth + 'px';
			} else {
				stickyBlock.classList.remove('is-fixed');
				stickyBlock.style.width = null;
			}

			if ((scrollTop) >= (offsetTop + containerHeight - stickyBlock.offsetHeight)) {
				stickyBlock.classList.add('is-bottom');

				if (stickyBlock.classList.contains('is-fixed')) {
					stickyBlock.classList.remove('is-fixed');
					stickyBlock.style.width = null;
				}
			} else {
				stickyBlock.classList.remove('is-bottom');
			}
		}
	}
}

/*
	  ----------------------
	|   Add Class On Scroll  |
	  ----------------------
*/

function addClassOnScroll (elementHTML, elementClass, isAddHeight = true, isHeader = true) {
	/* 
		@param  {Element} elementHTML - HTML элемент блока
		@param  {string} elementClass - добавляемый класс при прокрутке
		@param  {boolean} isAddHeight - необходимо ли добавлять высоту элементу после добавления класса
		@param  {boolean} isHeader - необходимо ли учитывать высоту шапки
	*/

	let element;

	if (elementHTML && elementHTML instanceof Node) {
		element = elementHTML;
	} else {
		return;
	}

	addClass();

	window.addEventListener('scroll', addClass);
	
	function addClass() {
		const scrollTop = window.pageYOffset;
		const elementHeight = element.offsetHeight;
		let positionTop = element.getBoundingClientRect().top + scrollTop;

		if (isHeader) {
			const header = document.querySelector('.header.is-fixed');

			if (header) {
				positionTop += header.offsetHeight;
			}
		}
		
		if (scrollTop > positionTop) {
			if (isAddHeight) {
				element.style.height = `${elementHeight}px`;
			}
			element.classList.add(elementClass);
		} else {
			element.classList.remove(elementClass);

			if (isAddHeight) {
				element.style.removeProperty('height');
			}
		}
	}
};

export {tabs, accordions, dropdown, sticky, addClassOnScroll};
