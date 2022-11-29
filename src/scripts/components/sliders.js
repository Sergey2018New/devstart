// import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

// sliders();

function sliders() {
	/*
		Swiper
		https://swiperjs.com/swiper-api
	*/

	if (document.querySelector('.js-slider-swiper')) {
		const slider = new Swiper(document.querySelector('.js-slider-swiper'), {
			modules: [Navigation, Pagination, Scrollbar],
			slidesPerView: 2,
			spaceBetween: 15,
			loop: false,
			navigation: {
			  prevEl: '.swiper-button-prev',
			  nextEl: '.swiper-button-next'
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
				snapOnRelease: false
			},
			breakpoints: {
				576: {
				  slidesPerView: 2,
				  spaceBetween: 20,
				}
			}
		});
	}
}

// Init slider with max width
function initSlider(sliderSelector, options, maxWidth = 991) {
	if (!sliderSelector) return;

	if (!options) {
		let options = {};
	}

	const sliderItems = document.querySelectorAll(sliderSelector);

	if (sliderItems) {
		sliderItems.forEach(slider => {
			let swiperSliders;
		
			function initializeSlider () {
				swiperSliders = new Swiper(slider, options);
			};
		
			function updateSlider() {
				if (window.innerWidth <= maxWidth) {
					if (!slider.classList.contains("swiper-initialized")) {
						initializeSlider();
					}
				}
		
				if (window.innerWidth > maxWidth) {
					if (slider.classList.contains("swiper-initialized")) {
						swiperSliders.destroy();
					}
				}
			};
		
			updateSlider();
		
			window.addEventListener("resize", () => {
				updateSlider();
			});
		});
	}
}


