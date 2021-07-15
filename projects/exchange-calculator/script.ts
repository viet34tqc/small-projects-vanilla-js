const selectOne = document.getElementById('currency-one') as HTMLSelectElement;
const inputOne = document.getElementById('amount-one') as HTMLInputElement;
const selectTwo = document.getElementById('currency-two') as HTMLSelectElement;
const inputTwo = document.getElementById('amount-two') as HTMLInputElement;
const swapButton = document.getElementById('swap-btn') as HTMLButtonElement;
const rateEl = document.getElementById('rate') as HTMLDivElement;

// Calculate the rate
async function calculate() {
	const currencyOne = selectOne.value;
	const currencyTwo = selectTwo.value;

	try {
		const res = await fetch('https://open.exchangerate-api.com/v6/latest');
		const data = await res.json();

		const rate = data.rates[currencyTwo] / data.rates[currencyOne];
		rateEl.innerText = `1 ${currencyOne} = ${rate.toFixed(2)} ${currencyTwo}`;
		inputTwo.value = (+inputOne.value * rate).toFixed(2);
	} catch (e) {
		console.log(e.message);
	}
}

function swap() {
	[selectOne.value, selectTwo.value] = [selectTwo.value, selectOne.value];
	calculate();
}

selectOne.addEventListener('change', calculate);
inputOne.addEventListener('input', calculate);
selectTwo.addEventListener('change', calculate);
inputTwo.addEventListener('input', calculate);

swapButton.addEventListener('click', swap);

calculate();
