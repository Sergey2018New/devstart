/* Установка переменной vh высоты окна браузера */
setHeightProperty();
    
window.addEventListener('resize', () => {
    setHeightProperty();
});

function setHeightProperty() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
} 