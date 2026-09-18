document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const mensajeError = document.getElementById('mensajeError');
    const btnEntrar = document.querySelector('button[type="submit"]'); // Selecciona el botón de enviar

    // Ocultar mensaje de error por si estaba visible de un intento fallido anterior
    mensajeError.classList.add('d-none');
    mensajeError.textContent = 'Usuario o contraseña incorrectos.'; // Reiniciar texto

    // Guardar texto original del botón y mostrar indicador de carga para Render
    const textoOriginal = btnEntrar.innerHTML;
    btnEntrar.disabled = true;
    btnEntrar.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Despertando servidor...`;

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
            // Si la contraseña o el usuario están mal, mostramos el aviso rojo y restauramos el botón
            mensajeError.classList.remove('d-none');
            btnEntrar.disabled = false;
            btnEntrar.innerHTML = textoOriginal;
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        mensajeError.textContent = 'Fallo de conexión con el servidor.';
        mensajeError.classList.remove('d-none');
        // Restaurar el botón si falla la red
        btnEntrar.disabled = false;
        btnEntrar.innerHTML = textoOriginal;
    }
});