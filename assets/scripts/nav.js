// localStorage.setItem('logged', JSON.stringify(true));
// localStorage.setItem('loggedUser', 'annapecheanu1@gmail.com');

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(localStorage.getItem('loggedUser')));
}
const behaviour = () => {
    const isLogged = JSON.parse(localStorage.getItem('logged'));
    if (isLogged) {
        const user = getCurrentUser().first_name;
        const greeting = document.createElement('p');
        greeting.innerHTML = "Hi, ";
        const name = document.createElement('span');
        name.innerHTML = user;
        name.classList.add('yellow');
        greeting.appendChild(name);
        greeting.innerHTML += "!";
        const log = document.createElement('a');
        log.innerHTML = "Log Out";
        log.href = "#";
        const dropdown = document.querySelectorAll('.user')[0];
        dropdown.appendChild(greeting);
        dropdown.appendChild(log);
        log.addEventListener('click', function() {
            localStorage.setItem('logged', JSON.stringify(false));
            window.location.href = 'index.html';
            behaviour();
        });
        const cart = document.createElement('div');
        cart.classList.add('dropdown');
        const cartIcon = document.createElement('span');
        cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        cart.appendChild(cartIcon);
        const cartContent = document.createElement('div');
        cartContent.classList.add('dropdown-content');
        if (getCurrentUser().orders === null || getCurrentUser().orders === undefined) {
            localStorage.setItem(localStorage.getItem('loggedUser'), JSON.stringify({ ...getCurrentUser(), orders: JSON.parse(JSON.stringify([]))}));
        }

        const cartItems = getCurrentUser().orders;
        cartItems.forEach(item => {
            const cartItem = document.createElement('p');
            cartItem.innerHTML = item.name;
            cartContent.appendChild(cartItem);
        });

        if (cartItems.length === 0) {
            const cartItem = document.createElement('p');
            cartItem.innerHTML = "No items in cart";
            cartContent.appendChild(cartItem);
        } else {
            let clear = document.createElement('button');
            let checkout = document.createElement('button');
            checkout.innerHTML = "Send Order";
            checkout.addEventListener('click', function() {
                alert('Your order has been sent!');
                localStorage.setItem(localStorage.getItem('loggedUser'), JSON.stringify({ ...getCurrentUser(), orders: JSON.parse(JSON.stringify([]))}));
                window.location.href = 'index.html';
            });
            clear.innerHTML= "Clear Cart";
            clear.addEventListener('click', function() {
                localStorage.setItem(localStorage.getItem('loggedUser'), JSON.stringify({ ...getCurrentUser(), orders: JSON.parse(JSON.stringify([]))}));
                window.location.reload();
            });
            clear.classList.add('dropdown-btn');
            checkout.classList.add('dropdown-btn');
            cartContent.appendChild(clear);
            cartContent.appendChild(checkout);
        }

        cart.appendChild(cartContent);

        const navBar = document.querySelector('.header-nav ul');
        navBar.insertBefore(cart, navBar.firstChild);
    } else {
        const log = document.createElement('a');
        log.innerHTML = "Log In";
        log.href = "login.html";
        const dropdown = document.querySelectorAll(' .user')[0];
        dropdown.appendChild(log);
        const sign = document.createElement('a');
        sign.innerHTML = "Sign Up";
        sign.href = "signup.html";
        dropdown.appendChild(sign);
    }
}

behaviour();
