// import noUiSlider from 'nouislider';
// import wNumb from 'wnumb';

// rangeSliders();

function rangeSliders() {
	/*
		noUiSlider
		https://refreshless.com/nouislider/
	*/

	const uisliders = document.querySelectorAll('[data-slider]');

	if (!uisliders) return;

	for (let index = 0; index < uisliders.length; index++) {
		const item = uisliders[index];
		const slider = item.querySelector('[data-slider-ui]');
		
		if (!slider) continue;

		const isRange = item.hasAttribute('data-slider-range');
		let min = item.getAttribute('data-slider-min') || 1;
		let max = item.getAttribute('data-slider-max') || 100;
		let step = item.getAttribute('data-slider-step') || 1;
		let connect = [true, false];
		let format = wNumb({
			decimals: 0
		});

		let input = item.querySelector('[data-slider-input]');
		let inputMin = item.querySelector('[data-slider-input-min]');
		let inputMax = item.querySelector('[data-slider-input-max]');
		let valueStart = input ? input.value : min;

		if (isRange) {
			connect = true;
			valueStart = [inputMin ? inputMin.value : min, inputMax ? inputMax.value : max];
		}

		noUiSlider.create(slider, {
			start: valueStart,
			step: Number(step),
			connect: connect,
			range: {
				'min': Number(min),
				'max': Number(max)
			},
			format: format
		});	

		slider.noUiSlider.on('update', function (values) {
			if (input) {
				input.value = setValue(Number(values));
			}

			if (inputMin) {
				inputMin.value = setValue(Number(values[0]));
			}

			if (inputMax) {
				inputMax.value = setValue(Number(values[1]));
			}
		});

		if (input) {
			input.addEventListener('change', () => {
				input.value = setValue(Number(input.value));
				slider.noUiSlider.set(setValue(Number(input.value)));
			});
		}

		if (inputMin) {
			inputMin.addEventListener('change', () => {
				changeSliderRange();
			});
		}

		if (inputMax) {
			inputMax.addEventListener('change', () => {
				changeSliderRange();
			});
		}

		function setValue(val) {
			let currentValue = val;

			if (currentValue <= min) {
				currentValue = min;
			}

			if (currentValue >= max) {
				currentValue = max;
			}

			return currentValue;
		}

		function changeSliderRange() {
			let setValueMin = Number(min);
			let setValueMax = Number(max);

			if (inputMin) {
				setValueMin = Number(inputMin.value);
			}

			if (inputMax) {
				setValueMax = Number(inputMax.value);
			}

			if (setValueMin >= setValueMax) {
				setValueMin = setValueMax;
			}

			slider.noUiSlider.set([setValueMin, setValueMax]);
		}
	}
}