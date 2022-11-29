/* Подключение библиотек *************************/
import './vendor.js';
import LazyLoad from "vanilla-lazyload";

/* Подключение основных функций ******************/
// import {tabs} from './components/functions.js';
/*
    tabs() - вкладки
    accordions() - аккордеоны / спойлеры
    dropdowns() - простое выпадающее меню
    sticky() - прилипающий блок при скролле
*/

/* Подключение слайдеров *************************/
// import './components/sliders.js';

/* Подключение модального окна ********************/
// import {modal} from './components/modal.js'; 
// modal.init();

/* Подключение выпадающего списка ****************/
// import './components/select.js';

/* Подключение всплывающей подсказки *************/
/* 
    tooltip(selector) - инициализация всплывающей подсказки, selector - селектор внешнего контейнера
*/
// import {tooltip} from './components/tooltip.js';
// tooltip();

/* Подключение ползунка **************************/
// import './components/nouislider.js';

/* Подключение Datepicker ************************/
// import './components/datepicker.js';

/* Подключение функций для работы с формой *******/
// import {formFields} from './components/form.js';
/*
    formFields() - поля формы
    formCheckboxes() - чекбоксы
    formRadioButtons() - радио кнопки
    formRating() - звёздный рейтинг
    formCounter() - счётчик количества
    formAttach() - прикрепление файла
*/

/* Подключение навигации при скролле *************/
// import './components/navigation.js';

/* Подключение анимации при скролле **************/
// import './components/animation.js';

/* Подключение шапки *****************************/
// import './components/header.js';

/* Подключение дополнительных скриптов ***********/
import './scripts/scripts.js';

/* Подключение валидации *************************/
// import './validation.js';

// Lazy Load
var lazyLoad = new LazyLoad({
    // Your custom settings go here
});