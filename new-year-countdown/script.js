(function () {
    'use strict;';
    const newYearElem = document.getElementById('new-year');
    const spinnerElem = document.getElementById('spinner');
    const countdownELem = document.querySelector('.countdown');
    const daysElem = document.querySelector('.countdown__days');
    const hoursElem = document.querySelector('.countdown__hours');
    const minutesElem = document.querySelector('.countdown__minutes');
    const secondsElem = document.querySelector('.countdown__seconds');
    const currentYear = new Date().getFullYear();
    // Display next year
    newYearElem.innerText = (currentYear + 1).toString();
    // Hide spinner and display countdown
    setTimeout(() => {
        spinnerElem.remove();
        countdownELem.classList.remove('hidden');
    }, 1000);
    // Countdown handler
    const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`).getTime();
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const diff = newYearTime - currentTime;
        if (diff === 0) {
            countdownELem.innerHTML = 'Happy New Year';
            return;
        }
        let d = Math.floor(diff / 1000 / 3600 / 24);
        let h = Math.floor(diff / 1000 / 3600) % 24; // the remainder of division total hours and the number of hours per day.
        let m = Math.floor(diff / 1000 / 60) % 60;
        let s = Math.floor(diff / 1000) % 60;
        daysElem.innerHTML = d.toString();
        hoursElem.innerHTML = h < 10 ? '0' + h.toString() : h.toString();
        minutesElem.innerHTML = m < 10 ? '0' + m.toString() : m.toString();
        secondsElem.innerHTML = s < 10 ? '0' + s.toString() : s.toString();
    }
    // Update countdown
    setInterval(updateCountdown, 1000);
})();
