
document.querySelector('.cerrar-sesion button').addEventListener('click', () => {
                    localStorage.removeItem("apikey");
                    window.location.href = '/html/index.html';
                });