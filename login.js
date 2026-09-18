document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const mensajeError = document.getElementById('mensajeError');

    // Ocultar mensaje de error por si estaba visible de un intento fallido anterior
    mensajeError.classList.add('d-none');
    mensajeError.textContent = 'Usuario o contraseña incorrectos.'; // Reiniciar texto

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        });

        if (response.ok) {
            const data = await response.json();
            
            // Guardamos el token en el LocalStorage del navegador
            localStorage.setItem('token', data.token);
            
            // Redirigimos a la página de inicio
            window.location.href = 'inicio.html'; 
        } else {
            // Si la contraseña o el usuario están mal, mostramos el aviso rojo
            mensajeError.classList.remove('d-none');
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        mensajeError.textContent = 'Fallo de conexión con el servidor.';
        mensajeError.classList.remove('d-none');
    }
});