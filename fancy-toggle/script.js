(function () {
    'use strict;';
    const checkboxElem = document.getElementById('toggle-checkbox');
    checkboxElem.addEventListener('change', () => {
        document.body.classList.toggle('night');
    });
})();
