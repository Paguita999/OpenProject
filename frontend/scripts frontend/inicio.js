function cerrarSesion() {
    document.querySelector('.cerrar-sesion button').addEventListener('click', () => {
        sessionStorage.removeItem("apikey");
        window.location.href = '/html/index.html';
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
          const taskDiv = document.createElement('div');
          taskDiv.innerHTML = `
            <h2>${task.subject}</h2>
            <hr>
            <p><strong>ID:</strong> ${task.id}</p>
            <p><strong>Tipo:</strong> ${task._type}</p>
            <p><strong>Creado:</strong> ${new Date(task.createdAt).toLocaleDateString()}</p>
            <p><strong>Actualizado:</strong> ${new Date(task.updatedAt).toLocaleDateString()}</p>
          `;
          container.appendChild(taskDiv);
        });
      })
})
}

function proyectos() {
    const proyectosButton = document.getElementById('proyectos');

    proyectosButton.addEventListener('click', () => {
        const apikey = localStorage.getItem("apikey");

        fetch('/api/projects', {
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
                    const taskDiv = document.createElement('div');
                    taskDiv.innerHTML = `
            <h2>${task.subject}</h2>
            <hr>
            <p><strong>ID:</strong> ${task.id}</p>
            <p><strong>Identificador:</strong> ${task.identifier}</p>
            <p><strong>Descripción:</strong> ${task.description.raw}</p>
            <p><strong>Creado:</strong> ${new Date(task.createdAt).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> ${task._links.status.title}</p>
            <p><strong>Explicación:</strong> ${task.statusExplanation.raw}</p>
            <hr>
        `;
                    container.appendChild(taskDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    });
}


function empleados() {

    const empleadosButton = document.getElementById('empleados');

    empleadosButton.addEventListener('click', () => {
        const apikey = localStorage.getItem("apikey");

        fetch('/api/users', {
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
                    const userDiv = document.createElement('div');
                    userDiv.innerHTML = `
            <h2>${user.login}</h2>
            <hr>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Creado:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Última Edición:</strong> ${new Date(user.updatedAt)}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <hr>
        `;
                    container.appendChild(userDiv);
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
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("email").value;
        const login = document.getElementById("login").value;

        const nuevoUsuario = {
            nombre,
            apellido,
            email,
            login
        };

        fetch('/api/users', {
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

function modificarUsuario() {
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
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("email").value;
        const login = document.getElementById("login").value;

        const modificarUsuario = {
            nombre,
            apellido,
            email,
            login  
        };
        const apikey = localStorage.getItem("apikey");
        fetch('/api/usersupdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apikey 
            },
            body: JSON.stringify(modificarUsuario)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Usuario modificado:", data);
            alert("Usuario modificado correctamente.");
        })
        .catch(error => {
            console.error("Error al modificar el usuario:", error);
            alert("Error al modificar el usuario.");
        });

        document.getElementById("modal").style.display = "none";
        this.reset();
    });
}

function borrarUsuario() {
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
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("email").value;
        const login = document.getElementById("login").value;

        const borrarUsuario = {
            nombre,
            apellido,
            email,
            login  
        };
        const apikey = localStorage.getItem("apikey");
        fetch('/api/usersdelete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apikey 
            },
            body: JSON.stringify(borrarUsuario)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Usuario borrado:", data);
            alert("Usuario borrado correctamente.");
        })
        .catch(error => {
            console.error("Error al borrar el usuario:", error);
            alert("Error al borrar el usuario.");
        });

        document.getElementById("modal").style.display = "none";
        this.reset();
    });
}