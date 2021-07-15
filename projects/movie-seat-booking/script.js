// Select the DOM
const seatsContainer = document.querySelector('.seats-container');
const seats = document.querySelectorAll('.seat:not(.occupied)');
const movieSelect = document.getElementById('movies-select');
const totalSeleted = document.querySelector('.total__selected');
const totalPrice = document.querySelector('.total__price');
// Select seat:
// Change the UI
// Update the total
seatsContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('seat') &&
        !target.classList.contains('occupied')) {
        target.classList.toggle('selected');
    }
    updateTotal();
    saveToLocalStorage();
});
// Handle when select the movie:
// Update the total
movieSelect.addEventListener('change', (e) => {
    updateTotal();
    saveToLocalStorage();
});
// Get the data from Local Storage and populate the UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (!selectedSeats || !selectedSeats.length) {
        return;
    }
    [...seats].forEach((seat, index) => {
        if (selectedSeats.includes(index)) {
            seat.classList.add('selected');
        }
    });
    const selectedMovie = localStorage.getItem('selectedMovie');
    if (selectedMovie) {
        movieSelect.value = selectedMovie;
    }
}
// Update the selected seats
function updateTotal() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const ticketPrice = +movieSelect.value;
    const total = selectedSeats.length * ticketPrice;
    totalSeleted.innerText = selectedSeats.length.toString();
    totalPrice.innerText = total.toString();
}
// Update the price with selected seats retrieved from local storage.
populateUI();
updateTotal();
// Save to localStorage
// - Save the indexes of selected seats
// - Save the selected movie
function saveToLocalStorage() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedIndexes = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    const selectedMovie = movieSelect.value;
    localStorage.setItem('selectedSeats', JSON.stringify(selectedIndexes));
    localStorage.setItem('selectedMovie', selectedMovie);
}
