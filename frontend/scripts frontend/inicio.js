function cerrarSesion() {
    document.querySelector('.cerrar-sesion button').addEventListener('click', () => {
        sessionStorage.removeItem("apikey");
        window.location.href = '/html/index.html';
    });
}

function dashboards() {
    const dashboardButton = document.getElementById('dashboard');

    dashboardButton.addEventListener('click', () => {
        window.location.href = '../html/dashboard.html';
    });
}
function proyectos() {
    const proyectosButton = document.getElementById('proyectos');

    proyectosButton.addEventListener('click', () => {
        const apikey = localStorage.getItem("apikey");

        fetch('http://localhost:3000/api/projects', {
            headers: {
                'x-api-key': apikey
            }
        })
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('#container');
                container.innerHTML = "";
                const sortedProjects = data._embedded.elements.sort((a, b) => a.id - b.id);
                sortedProjects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.innerHTML = `
            <h2>${project.name}</h2>
            <hr>
            <p><strong>ID:</strong> ${project.id}</p>
            <p><strong>Identificador:</strong> ${project.identifier}</p>
            <p><strong>Descripción:</strong> ${project.description.raw}</p>
            <p><strong>Creado:</strong> ${new Date(project.createdAt).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> ${project._links.status.title}</p>
            <p><strong>Explicación:</strong> ${project.statusExplanation.raw}</p>
            <hr>
        `;
                    container.appendChild(projectDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    });
}

function departamentos() {
    const departamentosButton = document.getElementById('departamentos');

    departamentosButton.addEventListener('click', () => {
        window.location.href = '../html/departamentos.html';
    });
}


function empleados() {

    const empleadosButton = document.getElementById('empleados');

    proyectosButton.addEventListener('click', () => {
        const apikey = localStorage.getItem("apikey");

        fetch('http://localhost:3000/api/users', {
            headers: {
                'x-api-key': apikey
            }
        })
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('#container');
                container.innerHTML = "";
                const sortedProjects = data._embedded.elements.sort((a, b) => a.id - b.id);
                sortedProjects.forEach(user => {
                    const projectDiv = document.createElement('div');
                    projectDiv.innerHTML = `
            <h2>${user.login}</h2>
            <hr>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Creado:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Última Edición:</strong> ${new Date(user.updatedAt)}</p>
            <p><strong>Email:</strong> ${user.email.raw}</p>
            <hr>
        `;
                    container.appendChild(projectDiv);
                });
            })
    });
}

function estadisticas() {
    const estadisticasButton = document.getElementById('estadisticas');

    estadisticasButton.addEventListener('click', () => {
        window.location.href = '../html/estadisticas.html';
    });
}

function crearUsuario() {
    document.getElementById("abrirModal").addEventListener("click", function () {
        document.getElementById("modal").style.display = "block";
    });

    document.getElementById("cerrarModal").addEventListener("click", function () {
        document.getElementById("modal").style.display = "none";
    });


    window.addEventListener("click", function (e) {
        const modal = document.getElementById("modal");
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });


    document.getElementById("formularioUsuario").addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;


        console.log("Nuevo usuario:", nombre, email);


        document.getElementById("modal").style.display = "none";

        this.reset();
    });

}