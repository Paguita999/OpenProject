function modificarUsuario(userId) {
    const formulario = document.getElementById("formularioUsuarioModificar");
    if (formulario.dataset.listenerAdded === "true") return;
    formulario.dataset.listenerAdded = "true";



    document.getElementById("cerrarModal").addEventListener("click", function () {
        document.getElementById("modalmod").style.display = "none";
    });

    window.addEventListener("click", function (e) {
        const modal = document.getElementById("modalmod");
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        const apikey = localStorage.getItem("apikey");

        const nombre = document.getElementById("nombremodificar").value;
        const apellido = document.getElementById("apellidomodificar").value;
        const login = document.getElementById("loginmodificar").value;
        const password = document.getElementById("passwordmodificar").value;
        const email = document.getElementById("emailmodificar").value;

        const usuarioModificado = {};
        if (nombre !== "") usuarioModificado.firstName = nombre;
        if (apellido !== "") usuarioModificado.lastName = apellido;
        if (login !== "") usuarioModificado.login = login;
        if (password !== "") usuarioModificado.password = password;
        if (email !== "") usuarioModificado.email = email;

        if (Object.keys(usuarioModificado).length === 0) {
            alert("No hay campos para modificar.");
            return;
        }

        fetch(`http://localhost:8080/api/v3/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('apikey:' + apikey)
            },
            body: JSON.stringify(usuarioModificado)
        })
            .then(res => {
                if (res.ok) {
                    alert('Usuario modificado correctamente.');
                    const empleadosButton = document.getElementById('empleados');
                    empleadosButton.click();
                } else {
                    alert('Error al modificar el usuario.');
                }
            })
            .catch(err => {
                console.error('Error al modificar usuario:', err);
                alert('Error de red al intentar modificar el usuario.');
            });
    });
}

function borrarUsuario(userId) {
    const apikey = localStorage.getItem("apikey");
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        return;
    }
    fetch(`http://localhost:8080/api/v3/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('apikey:' + apikey)
        }
    })
        .then(res => {
            if (res.ok) {
                const empleadosButton = document.getElementById('empleados');
                empleadosButton.click();
            } else {
                alert('Error al eliminar el usuario.');
            }
        })
        .catch(err => {
            console.error('Error al eliminar usuario:', err);
            alert('Error de red al intentar eliminar el usuario.');
        });

}

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
                const empleadosButton = document.getElementById('empleados');
                empleadosButton.click();
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
            <p><strong>Identificador:</strong> ${project.identifier}</p>
            <p><strong>Descripción:</strong> ${project.description.raw}</p>
            <p><strong>Creado:</strong> ${new Date(project.createdAt).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> ${project._links.status.title}</p>
            <p><strong>Explicación:</strong> ${project.statusExplanation.raw}</p>
           
        `;
                    container.appendChild(webDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    });
}
function estadisticas() {
    const Chart = window.Chart;
    const estadisticasButton = document.getElementById('estadisticas');
    estadisticasButton.addEventListener('click', () => {
        const container = document.querySelector('#container');
        container.innerHTML = "<canvas id='statsChart'></canvas>";

        // Generate random data
        const labels = ['Projects', 'Tasks', 'Users', 'Completed', 'In Progress'];
        const values = labels.map(() => Math.floor(Math.random() * 100));

        // Create chart
        const ctx = document.getElementById('statsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Statistics',
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
};
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
                    webDiv.setAttribute('data-id', user.id);
                    webDiv.innerHTML = `
                        <div class="card-content" style="display: flex; align-items: center; gap: 20px;">
                            <h2 style="margin: 0;">${user.login}</h2>
                            <p style="margin: 0;"><strong>Nombre:</strong> ${user.name}</p>
                            <p style="margin: 0;"><strong>Email:</strong> ${user.email}</p>
                            <button id="modify-user-btn-${user.id}" style="margin: 1px; margin-left: auto;" class="modify-user-btn" onclick="modificarUsuario(${user.id})">
                            <img src="../img/modificarusuario.png" alt="Editar"/></button>
                            <button id="delete-user-btn" style="margin: 1px;" class="delete-user-btn" onclick="borrarUsuario(${user.id})">
                            <img src="../img/borrarusuario.png" alt="Eliminar"/></button>
                        </div>
                        `;
                    container.appendChild(webDiv);
                });
                document.querySelectorAll("[id^='modify-user-btn-']").forEach(btn => {
                    btn.addEventListener("click", function () {
                        document.getElementById("modalmod").style.display = "block";
                    });
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
                    fetch(`http://localhost:8080/api/v3/work_packages/${task.id}/watchers`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Basic ' + btoa(`apikey:${apikey}`)
                        }
                    })
                        .then(res => res.json())
                        .then(watcherData => {
                            const watchers = watcherData._embedded?.elements?.map(w => w.name).join(', ') || 'Ninguno';

                            webDiv.innerHTML = `
            <h2>${task.subject}</h2>
            <p><strong>Tipo:</strong> ${task._type}</p>
            <p><strong>Autor:</strong> ${watchers}</p>
          `;

                            container.appendChild(webDiv);
                        })
                        .catch(err => {
                            console.error(`Error al obtener watchers para la tarea ${task.id}`, err);
                            webDiv.innerHTML = `
            <h2>${task.subject}</h2>
            <p><strong>ID:</strong> ${task.id}</p>
            <p><strong>Error al cargar watchers</strong></p>
          `;
                            container.appendChild(webDiv);
                        });
                });
            });
    });
}
/*-----------------------------------------------------------------------------------------*/
