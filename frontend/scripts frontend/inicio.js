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
        fetch('http://localhost:8080/api/v3/projects', {
            headers: {
                'Authorization': 'Basic ' + btoa('apikey:'+ localStorage.getItem("apikey")),

                'Origin': 'http://localhost:8080'
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
                            <p><strong>ID:</strong> ${project.id}</li>
                            <p><strong>Identificador:</strong> ${project.identifier}</p>
                            <p><strong>Descripción:</strong> ${project.description.raw}</p>
                            <p><strong>Creado:</strong> ${new Date(project.createdAt).toLocaleDateString()}</p>
                            <p><strong>Estado:</strong> ${project._links.status.title}</p>
                            <p><strong>Explicación:</strong> ${project.statusExplanation.raw}</p>
                            <hr>
                        `;
                    container.appendChild(projectDiv);
                });
            });
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

    empleadosButton.addEventListener('click', () => {
        window.location.href = '../html/empleados.html';
    });
}
function estadisticas() {
    const estadisticasButton = document.getElementById('estadisticas');

    estadisticasButton.addEventListener('click', () => {
        window.location.href = '../html/estadisticas.html';
    });
}