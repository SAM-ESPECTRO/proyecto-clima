const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();


const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

//guardar datos en local storage

localStorage.setItem('username',username);
localStorage.setItem('password',password);

//Redirigir a la aplicacion (app.html)

window.location.href = 'app.html';
})