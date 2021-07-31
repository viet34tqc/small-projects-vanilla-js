(function () {
	'use strict;';

	// Select element
	const formElem = document.getElementById('add-new-form') as HTMLFormElement;
	const questionInput = document.getElementById(
		'question'
	) as HTMLTextAreaElement;
	const answerInput = document.getElementById('answer') as HTMLTextAreaElement;

	const triggerFormBtn = document.querySelector(
		'.btn--trigger-form'
	) as HTMLButtonElement;
	const closeFormBtn = document.querySelector(
		'.btn--close-form'
	) as HTMLButtonElement;
	const clearCardsBtn = document.querySelector(
		'.btn--clear-cards'
	) as HTMLButtonElement;

	const cardsSlider = document.querySelector(
		'.cards-slider-wrapper'
	) as HTMLDivElement;
	const navPre = document.querySelector('.slider-prev') as HTMLButtonElement;
	const navNext = document.querySelector('.slider-next') as HTMLButtonElement;

	interface Card {
		id: string;
		question: string;
		answer: string;
	}

	const cards: Card[] = JSON.parse(localStorage.getItem('cards')) || [];
	let activeIndex = 1;

	// Validation form
	function showError(input: HTMLTextAreaElement) {
		const formGroup = input.parentElement;
		const errorElem = formGroup.querySelector('.error') as HTMLDivElement;
		const inputName = input.id.charAt(0).toUpperCase() + input.id.slice(1);

		errorElem.innerText = `${inputName} is required`;
	}
	function checkRequiredForm(inputs: HTMLTextAreaElement[]) {
		let isError = false;
		inputs.forEach((input) => {
			if (!input.value) {
				isError = true;
				showError(input);
			}
		});
		return isError;
	}

	// Display form
	triggerFormBtn.addEventListener('click', () => {
		document.body.classList.add('is-visible-form');
		questionInput.focus();
	});
	// Hide form
	closeFormBtn.addEventListener('click', () => {
		document.body.classList.remove('is-visible-form');
	});

	formElem.addEventListener('submit', (e) => {
		e.preventDefault();
		const hasError = checkRequiredForm([questionInput, answerInput]);
		if (hasError) {
			return;
		}
		const question = questionInput.value;
		const answer = answerInput.value;
		questionInput.value = '';
		answerInput.value = '';
		addCard(question, answer);
	});

	function addCard(question: string, answer: string) {
		const card = {
			id: Math.random().toString(36).substr(2, 9),
			question,
			answer,
		};

		renderCard(card);
		cards.push(card);

		// Display the newest card.
		const oldIndex = activeIndex;
		activeIndex = cards.length;
		moveSlider(oldIndex);
		document.body.classList.remove('is-visible-form');

		// Save to local storage
		localStorage.setItem('cards', JSON.stringify(cards));
	}

	function renderCard(card) {
		const activeClass = cards.length === 0 ? 'active' : '';
		const cardHTML = `
			<div class="card ${activeClass}">
				<div class="card-inner">
					<div class="card__answer">${card.answer}</div>
					<div class="card__question">${card.question}</div>
				</div>
			</div>
		`;
		cardsSlider.insertAdjacentHTML('beforeend', cardHTML);
	}

	function renderCards() {
		if (!cards.length) {
			cardsSlider.innerHTML = '';
		}
		let cardsHTML = '';
		cards.forEach((card, index) => {
			cardsHTML += `
				<div class="card ${index + 1 === activeIndex ? 'active' : ''}">
					<div class="card-inner">
						<div class="card__answer">${card.answer}</div>
						<div class="card__question">${card.question}</div>
					</div>
				</div>
			`;
		});
		cardsSlider.insertAdjacentHTML('beforeend', cardsHTML);
	}

	function clearCards() {
		clearCardsBtn.addEventListener('click', () => {
			cards.length = 0;
			localStorage.setItem('cards', '[]');
			renderCards();
		});
	}

	function flipCard() {
		document.addEventListener('click', (e) => {
			const target = e.target as HTMLDivElement;
			if (
				!target.classList.contains('card__question') &&
				!target.classList.contains('card__answer')
			) {
				return;
			}
			let parentElem = target.parentElement;
			while (!parentElem.classList.contains('card')) {
				parentElem = parentElem.parentElement;
			}
			parentElem.classList.toggle('show-answer');
		});
	}

	function handleSlider() {
		navNext.addEventListener('click', () => {
			const cardsLength = cards.length;
			activeIndex++;
			if (activeIndex > cardsLength) {
				activeIndex = cardsLength;
				return;
			}
			moveSlider(activeIndex - 1);
		});
		navPre.addEventListener('click', () => {
			activeIndex--;
			if (activeIndex < 1) {
				activeIndex = 1;
				return;
			}
			moveSlider(activeIndex + 1);
		});
	}

	function moveSlider(oldIndex) {
		if (oldIndex === 0) {
			return;
		}
		document.querySelector(`.card:nth-child(${oldIndex})`).className = `card ${
			oldIndex > activeIndex ? 'right' : 'left'
		}`;
		document.querySelector(`.card:nth-child(${activeIndex})`).className =
			'card active';
	}

	renderCards();
	clearCards();
	flipCard();
	handleSlider();
})();
