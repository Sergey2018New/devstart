import { gotoBlock } from "./gotoblock.js";

/*
	  -------------- 
	|   NAVIGATION   |
	  --------------

	* Базовые атрибуты:
		* data-navigation - список навигации
            ** data-goto - атрибут, указывающий селектор навигационного блока
            ** data-offset - смещение от начала окна браузера
		* data-navigation-block - блок навигации с указанием ID
*/

function navigation() {
	const navigation = document.querySelector('[data-navigation]');

	if (!navigation) return;

    let isNavigation = true;
    const navItems = navigation.querySelectorAll('[data-navigation-item]');

    for (let i = 0; i < navItems.length; i++) {
        const navItem = navItems[i];

        navItem.addEventListener('click', function (event){
            let offset = navItem.getAttribute('data-offset') ? Number(navItem.getAttribute('data-offset')) : 0;
            const gotoLink = navItem.getAttribute('data-goto'); 
            const gotoLinkSelector = gotoLink ? gotoLink : '';

            gotoBlock(gotoLinkSelector, true, 600, offset);

            event.preventDefault();
        }); 
    }

    pageNavigationScroll();

    window.addEventListener("scroll", pageNavigationScroll);

    function pageNavigationScroll () {
        const header = document.querySelector('.header.is-fixed');
        const scrollTop = window.scrollY;
        const elementsWatch = document.querySelectorAll('[data-navigation-block]');
		let offsetTop = header ? header.offsetHeight : 0;

        for (let i = elementsWatch.length - 1; i >= 0; i--) {
            let item = elementsWatch[i];

            const navItem = navigation.querySelector(`[data-navigation-item][data-goto="#${item.id}"]`);

            navItems.forEach(navCurrent => {
                navCurrent.classList.remove('is-active');
            });

            if (navItem) {
                offsetTop += navItem.getAttribute('data-offset') || 0;
            }

            if (scrollTop + offsetTop >= (item.getBoundingClientRect().top + scrollTop - 2)) {
                if (navItem) {
                    navItem.classList.add('is-active');
                }

                break;
            }
        }
    }
}

navigation();