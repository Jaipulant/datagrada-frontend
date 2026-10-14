const API_BASE_URL = 'https://datagrada.onrender.com';

/**
 * Comprueba si existe un token y si aún no ha caducado.
 * Si está caducado, destruye la sesión y redirige al login sin tocar el servidor.
 */
function esTokenValido() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return false;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const tiempoActual = Math.floor(Date.now() / 1000); 

        if (tiempoActual >= payload.exp) {
            console.warn("La sesión ha caducado localmente. Redirigiendo sin consumir servidor...");
            localStorage.removeItem('token');
            window.location.href = 'index.html'; 
            return false;
        }
        
        return true;
    } catch (e) {
        console.error("El formato del token es inválido.", e);
        localStorage.removeItem('token');
        window.location.href = 'index.html';
        return false;
    }
}