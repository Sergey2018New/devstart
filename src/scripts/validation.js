// import JustValidate from 'just-validate';
// import IMask from 'imask';
// import { Fancybox } from "@fancyapps/ui";
// import { modal } from "./modules/modal.js";

const maskPhones = document.querySelectorAll('.js-mask-phone');

maskPhones.forEach(phone => {
	IMask(phone, {
		mask: '+{7} (000) 000-00-00',
		lazy: false,
	});
});

const options = {
	errorFieldCssClass: 'is-error',
	errorLabelStyle: false,
	errorLabelCssClass: 'is-label-error',
}

const nameFieldOptions = [
	{
		rule: 'required',
		errorMessage: 'Заполните поле',
	}
];

const emailFieldOptions = [
	{
		rule: 'required',
		errorMessage: 'Заполните поле',
	},
	{
		rule: 'email',
		errorMessage: 'Укажите корректный email',
	},
	// {
	// 	validator: (value) => {
	// 		if (value.trim().length === 0) {
	// 			return true;
	// 		} else if (isValidEmail(value.trim())) {
	// 			return true;
	// 		}
	// 	},
	// 	errorMessage: 'Укажите корректный email',
	// },
]

const phoneFieldOptions = [
	{
		rule: 'required',
		errorMessage: 'Заполните поле',
	},
	{
		rule: 'minLength',
		value: 18,
		errorMessage: 'Неверный формат телефона',
	}
];

// Валидация форм
const forms = document.querySelectorAll('.js-form');

forms.forEach(form => {
	const validate = new JustValidate(form, options);

	if (form.querySelector('[name="name"]')) {
		validate.addField('[name="name"]', nameFieldOptions);
	}
	
	if (form.querySelector('[name="email"]')) {
		validate.addField('[name="email"]', emailFieldOptions);
	}
	
	if (form.querySelector('[name="phone"]')) {
		validate.addField('[name="phone"]', phoneFieldOptions);
	}

	validate.onSuccess((event) => {
		alert('Форма отправлена');
		// modal.open('#modal-success');

		// if (Fancybox.getInstance()) {
		// 	Fancybox.getInstance().close();
		// }
		// Fancybox.show([
		// 	{
		// 		src: "#modal-success",
		// 		type: "inline",
		// 	}
		// ]);
	});
});

// Is valid url
function isValidUrl(url)
{
	var objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
	return objRE.test(url);
}

// Is valid Email
function isValidEmail(email)
{
	var objRE = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	return objRE.test(email);
}
