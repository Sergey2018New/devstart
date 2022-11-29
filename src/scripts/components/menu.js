/*
	  -------- 
	|   MENU   |
	  --------

	* Базовые селекторы:
		* .js-menu - обёртка меню
		* .js-menu-burger - кнопка "бургер" открытия/закрытия меню
        * .js-menu-body - основной блок меню
		* .js-menu-overlay - фоновая подложка
		* .js-menu-close - кнопка закрытия меню

    * Селекторы многоуровнего меню
		* .js-menu-dropdown - применяется для li элементов, у которых есть вложенное меню
        * .js-menu-link - селектор для открытия вложенного меню
        * .js-menu-submenu - вложенное меню
*/

function menu(delay = 300, maxWidth = 991) {
    /* 
		@param  {number} delay - время открытия меню (также необходимо изменить в CSS)
		@param  {number} maxWidth - максимальная ширина браузера, при котором срабатывает вложенное меню при клике
	*/

    const menu = document.querySelector('.js-menu');

    if (!menu) return;
    
    const menuBurger = menu.querySelector('.js-menu-burger');
    const menuBody = menu.querySelector('.js-menu-body');
    const menuOverlay = menu.querySelector('.js-menu-overlay');
    const menuClose = menu.querySelector('.js-menu-close');
    const menuDropdownItems = menu.querySelectorAll('.js-menu-dropdown');
    let isMenu = true;

    menuDropdownItems.forEach(item => {
        const menuLink = item.querySelector('.js-menu-link');
        const menuList = item.querySelector('.js-menu-submenu');

        if (menuList && menuLink) {
            menuLink.addEventListener('click', (e) => {
                if (window.innerWidth <= maxWidth) {
                    e.preventDefault();
                    item.classList.toggle('is-active');
                }
            }); 
        }
    });

    if (menuBurger) {
        menuBurger.addEventListener('click', () => {
            if (menuBurger.classList.contains('is-active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', () => {
            closeMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            closeMenu();
        });
    }

    function openMenu () {
        if (isMenu) {
            isMenu = false;

            if (menuBurger) {
                menuBurger.classList.add('is-active');
            }

            if (menuOverlay) {
                menuOverlay.classList.add('is-active');
            }
            
            if (menuBody) {
                menuBody.classList.add('is-visible');

                setTimeout(() => {
                    menuBody.classList.add('is-active');
                }, 1);
            }
    
            document.body.classList.add('is-menu-active');

            setTimeout(() => {
                isMenu = true;
            }, delay);
        }
    }

    function closeMenu () {
        if (isMenu) {
            isMenu = false;

            if (menuBurger) {
                menuBurger.classList.remove('is-active');
            }

            if (menuOverlay) {
                menuOverlay.classList.remove('is-active');
            }
            
            if (menuBody) {
                menuBody.classList.remove('is-active');

                setTimeout(() => {
                    menuBody.classList.remove('is-visible');
                }, delay);
            }
            
            document.body.classList.remove('is-menu-active');

            setTimeout(() => {
                isMenu = true;
            }, delay);
        }
    }
}