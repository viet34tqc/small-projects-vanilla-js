(function () {
    'use strict;';
    const deleteButton = document.getElementById('confirm-delete');
    deleteButton.addEventListener('click', handleClick);
    function handleClick(e) {
        const target = e.target;
        const targetModal = target.dataset.modal;
        const modal = document.querySelector(`[data-target="${targetModal}"`);
        modal.classList.toggle('modal--open');
        const cancelButtons = modal.querySelectorAll('.modal__cancel');
        cancelButtons.forEach(e => {
            e.addEventListener('click', () => {
                modal.classList.remove('modal--open');
            }, {
                once: true,
            });
        });
    }
})();
