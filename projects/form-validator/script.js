(function () {
	'use strict;';

	const form = document.getElementById('form');
	const username = document.getElementById('username');
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const password2 = document.getElementById('password2');

	const errors = {
		username: [],
		email: [],
		password: [],
		password2: [],
	};

	function addError(input, message) {
        const id = input.id;
		errors[id].length = 0;
		errors[id].push(message);
	}

	function showError(input) {
		const formControl = input.parentElement;
		const errorElem = formControl.querySelector('.form-control__error');
		formControl.classList.add('is-error');
		formControl.classList.remove('is-success');

		// Display errors of input
		errorElem.innerHTML = ''; // Reset the error first.
		errors[input.id].forEach((error) => {
			errorElem.innerHTML += `<div>${error}</div>`;
		});
	}

	function showSuccess(input) {
		const formControl = input.parentElement;
		formControl.classList.add('is-success');
		formControl.classList.remove('is-error');
	}

	function checkLength(input, min, max) {
		const inputVal = input.value;
		if (inputVal.length < min) {
			addError(
				input,
				`${getFieldName(input)} must be at least ${min} characters`
			);
			showError(input);
		} else if (inputVal.length > max) {
			addError(
				input,
				`${getFieldName(input)} must be less than ${max} characters`
			);
			showError(input);
		}
	}

	// Inputs: HTML inputs
	// Output: boolean
	function checkRequired(inputs) {
		let isError = false;
		inputs.forEach((input) => {
			if (input.value.trim() === '') {
				addError(input, `${getFieldName(input)} is required`);
				showError(input);
			} else {
				showSuccess(input);
			}
		});
		return isError;
	}

	function checkEmail(input) {
		const regex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (regex.test(input.value.trim())) {
			showSuccess(input);
		} else {
			addError(input, 'Email is not valid');
			showError(input);
		}
	}

	function checkPasswordsMatch(input1, input2) {
		if (input1.value !== input2.value) {
			addError(input2.id, 'Passwords do not match');
			showError(input2);
		}
	}

	function getFieldName(input) {
		return input.id.charAt(0).toUpperCase() + input.id.slice(1);
	}

	// Submit form
	form.addEventListener('submit', function (e) {
		e.preventDefault();

		checkRequired([username, email, password, password2]);
		checkLength(username, 3, 15);
		checkLength(password, 6, 25);
		checkEmail(email);
		checkPasswordsMatch(password, password2);
	});
})();
