(function () {
    'use strict;';
    const circleContainer = document.querySelector('.circle-wrapper');
    const circle = document.querySelector('.circle');
    let totalTime = Number(getComputedStyle(circleContainer).getPropertyValue('--totalTime')) *
        1000;
    let breathInTime = Number(getComputedStyle(circleContainer).getPropertyValue('--breathIn')) *
        1000;
    let holdTime = Number(getComputedStyle(circleContainer).getPropertyValue('--hold')) * 1000;
    let breathOutTime = totalTime - breathInTime - holdTime;
    // If the promises are not wrapped inside the functions
    // The callbacks in the setTimeout will run immediately
    const breathInPhase = () => new Promise((resolve) => {
        setTimeout(() => {
            circleContainer.className = 'circle-wrapper grow';
            circle.innerText = 'Breath In';
            resolve(); // This is a must. If not, it can't switch to another phase.
        }, breathOutTime);
    });
    const holdPhase = () => new Promise((resolve) => {
        setTimeout(() => {
            circle.innerText = 'Hold';
            resolve();
        }, breathInTime);
    });
    const breathOutPhase = () => new Promise((resolve) => {
        setTimeout(() => {
            circleContainer.className = 'circle-wrapper shrink';
            circle.innerText = 'Breath Out';
            resolve();
        }, holdTime);
    });
    const init = async () => {
        circleContainer.className = 'circle-wrapper grow';
        await holdPhase();
        await breathOutPhase();
        await breathInPhase();
    };
    init();
    setInterval(init, totalTime);
})();
