(function () {
    'use strict;';
    // Elements
    const addUsersBtn = document.getElementById('btn--add-user');
    const doubleMoneyBtn = document.getElementById('btn--double-money');
    const sortBtn = document.getElementById('btn--sort');
    const calculateBtn = document.getElementById('btn--calculate-total');
    const usersList = document.getElementById('users-list');
    // UPDATE STATE =>  POPULATE UI
    // State
    let users = [];
    async function getUser() {
        try {
            const res = await fetch('https://randomuser.me/api');
            const data = await res.json();
            return [data.results[0], null];
        }
        catch (error) {
            return [null, error.message];
        }
    }
    async function addUser() {
        const [user, error] = await getUser();
        if (error) {
            usersList.innerHTML += error;
        }
        const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000),
        };
        users.push(newUser);
        populateUI();
    }
    function doubleMoney() {
        users = users.map((user) => (Object.assign(Object.assign({}, user), { money: user.money * 2 })));
        populateUI();
    }
    function sortUser() {
        users.sort((a, b) => b.money - a.money);
        populateUI();
    }
    function calculateTotal() {
        let total = 0;
        if (users.length > 0) {
            total = users.reduce((sum, current) => sum + current.money, 0);
        }
        const totalElem = `
            <div class="total">
                <strong>Total:</strong>
                ${formatMoney(total)}
            </div>
        `;
        usersList.insertAdjacentHTML('beforeend', totalElem);
    }
    function populateUI() {
        let usersHTML = '';
        users.forEach((user) => {
            usersHTML += `
            <div class="user">
                <strong>${user.name}</strong>
                <span>${formatMoney(user.money)}</span>
            </div>
        `;
        });
        usersList.innerHTML = usersHTML;
    }
    // Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    function formatMoney(number) {
        return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    // Initialize users
    addUser();
    addUser();
    addUser();
    // Event listeners
    addUsersBtn.addEventListener('click', addUser);
    doubleMoneyBtn.addEventListener('click', doubleMoney);
    sortBtn.addEventListener('click', sortUser);
    calculateBtn.addEventListener('click', calculateTotal);
})();
