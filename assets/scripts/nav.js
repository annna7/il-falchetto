/*
<li>
                <div class="dropdown">
                    <span><i class="fas fa-user"></i></span>
                    <div class="dropdown-content">
                        <a href="login.html">Log In</a>
                        <a href="signup.html">Sign Up</a>
                    </div>
                </div>
              </li>
 */

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem('loggedUser'))));
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
        const dropdown = document.querySelectorAll('.dropdown-content')[1];
        dropdown.appendChild(greeting);
        dropdown.appendChild(log);
        log.addEventListener('click', function() {
            localStorage.setItem('logged', JSON.stringify(false));
            window.location.href = 'index.html';
            behaviour();
        });
    } else {
        const log = document.createElement('a');
        log.innerHTML = "Log In";
        log.href = "login.html";
        const dropdown = document.querySelectorAll('.dropdown-content')[1];
        dropdown.appendChild(log);
        const sign = document.createElement('a');
        sign.innerHTML = "Sign Up";
        sign.href = "signup.html";
        dropdown.appendChild(sign);
    }
}

behaviour();