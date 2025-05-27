function crearUsuario() {
    const formulario = document.getElementById("formularioUsuario");

    
    if (formulario.dataset.listenerAdded === "true") return;
    formulario.dataset.listenerAdded = "true";

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

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("email").value;
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;

        const nuevoUsuario = {
            nombre,
            apellido,
            email,
            login,
            password
        };

        const apikey = localStorage.getItem("apikey");

        fetch('/api/userscreate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apikey 
            },
            body: JSON.stringify(nuevoUsuario)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Usuario creado:", data);
            alert("Usuario creado correctamente.");
        })
        .catch(error => {
            console.error("Error al crear usuario:", error);
            alert("Error al crear usuario.");
        });

        document.getElementById("modal").style.display = "none";
        this.reset();
    });
}
function cerrarSesion() {
    document.querySelector('.cerrar-sesion').addEventListener('click', (event) => {
        event.preventDefault();
        sessionStorage.removeItem("apikey");
        window.location.href = '/html/index.html';
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
                    const webDiv = document.createElement('div');
                    webDiv.classList.add('webDiv');
                    webDiv.innerHTML = `
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
                    container.appendChild(webDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    });
}

function empleados() {

    const empleadosButton = document.getElementById('empleados');

    empleadosButton.addEventListener('click', () => {
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
                const sortedUsers = data._embedded.elements.sort((a, b) => a.id - b.id);
                sortedUsers.forEach(user => {
                    const webDiv = document.createElement('div');
                    webDiv.classList.add('webDiv');
                    webDiv.innerHTML = `
            <h2>${user.login}</h2>
            <hr>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Creado:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Última Edición:</strong> ${new Date(user.updatedAt)}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <hr>
        `;
                    container.appendChild(webDiv);
                });
            })
    });
}

function dashboards() {
    const dashboardButton = document.getElementById('dashboard');

    dashboardButton.addEventListener('click', () => {
        const apikey = localStorage.getItem("apikey");

        fetch('/api/tasks', {
            headers: {
                'x-api-key': apikey
            }
        })
       .then(response => response.json())
      .then(data => {
        const container = document.querySelector('#container');
        container.innerHTML = "";

        const sortedTasks = data._embedded.elements.sort((a, b) => a.id - b.id);

        sortedTasks.forEach(task => {
          const webDiv = document.createElement('div');
            webDiv.classList.add('webDiv');
          webDiv.innerHTML = `
            <h2>${task.subject}</h2>
            <hr>
            <p><strong>ID:</strong> ${task.id}</p>
            <p><strong>Tipo:</strong> ${task._type}</p>
            <p><strong>Creado:</strong> ${new Date(task.createdAt).toLocaleDateString()}</p>
            <p><strong>Actualizado:</strong> ${new Date(task.updatedAt).toLocaleDateString()}</p>
          `;
          container.appendChild(webDiv);
        });
      })
});
}
/*-----------------------------------------------------------------------------------------*/

document.getElementById("empleados").addEventListener("click", function () {
    document.getElementById("crearUsuario").style.display = "block";
});

document.getElementById("dashboard").addEventListener("click", function () {
    document.getElementById("crearUsuario").style.display = "none";
});
document.getElementById("proyectos").addEventListener("click", function () {
    document.getElementById("crearUsuario").style.display = "none";
});
document.getElementById("estadisticas").addEventListener("click", function () {
    document.getElementById("crearUsuario").style.display = "none";
});

/*-----------------------------------------------------------------------------------------*/