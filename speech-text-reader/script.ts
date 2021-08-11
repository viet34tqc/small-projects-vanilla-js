(function () {
	'use strict;';

	// Lazy loading image

	const observerOptions = {
		threshold: 0,
	};
	const images = document.querySelectorAll('.lazy');
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				return;
			} else {
				const target = entry.target as HTMLImageElement;
				const src = target.dataset.src;
				target.src = src;
				observer.unobserve(target);
			}
		});
	}, observerOptions);

	images.forEach((img) => {
		observer.observe(img);
	});

	// Toggle the text box
	const toggler = document.getElementById('toggler');
	const textBox = document.getElementById('text-box');
	const closeElem = document.getElementById('close');

	function toggleTextbox() {
		textBox.classList.toggle('is-active');
	}
	function closeTextbox() {
		textBox.classList.remove('is-active');
	}

	toggler.addEventListener('click', toggleTextbox);
	closeElem.addEventListener('click', toggleTextbox);
	document.addEventListener('click', (e) => {
		const target = e.target as Node;
		const isClickOutside =
			!textBox.contains(target) &&
			!closeElem.contains(target) &&
			!toggler.contains(target);
		if (isClickOutside) {
			closeTextbox();
		}
	});

	// Esc key toggle the textbox.
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && textBox.classList.contains('is-active')) {
			closeTextbox();
		}
	});

	// insert options into voice select.
	const voicesSelect = document.getElementById('voices');
	let voices = [];

	function setVoiceOptions() {
		voices = speechSynthesis.getVoices();
		let html = '';
		voices.forEach((voice) => {
			html += `<option value="${voice.name}">
				${voice.name} ${voice.lang}
			</option>`;
		});
		voicesSelect.insertAdjacentHTML('beforeend', html);
	}
	// wait when voices will be loaded and then request them.
	speechSynthesis.addEventListener('voiceschanged', setVoiceOptions);

	// Handle text speaking;
	let message = new SpeechSynthesisUtterance();
	function speakText(text: string) {
		message.text = text;
		speechSynthesis.speak(message);
	}

	// Speak when click on the sample
	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		const sample = target.parentElement;
		if (!sample.classList.contains('sample')) {
			return;
		}
		sample.classList.add('active');
		const text = sample.querySelector('p').innerText;
		setTimeout(() => {
			speakText(text);
			sample.classList.remove('active');
		}, 800);
	});

	// Speak when click on the button in the textbox
	const readBtn = document.getElementById('read');
	const textArea = document.getElementById('text') as HTMLTextAreaElement;
	readBtn.addEventListener('click', () => {
		const text = textArea.value;
		speakText(text);
	});

	// Change the voice
	voicesSelect.addEventListener('change', (e) => {
		const target = e.target as HTMLSelectElement
		const voice = voices.find(voice => voice.name === target.value);
		message.voice = voice
	});
})();
