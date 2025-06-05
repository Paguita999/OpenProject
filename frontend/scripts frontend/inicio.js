function modificarUsuario(userId) {
    const formulario = document.getElementById("formularioUsuarioModificar");
    if (formulario.dataset.listenerAdded === "true") return;
    formulario.dataset.listenerAdded = "true";



    document.getElementById("cerrarModalmod").addEventListener("click", function () {
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
                    empleados();
                    const modal = document.getElementById("modalmod");
                    modal.style.display = "none";
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
                empleados(); 
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
                const modal = document.getElementById("modal");
                modal.style.display = "none";

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

        fetch('/api/projects', {
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
            <p><strong>Estado:</strong> ${project._links.status.title}</p>
           
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
    estadisticasButton.addEventListener('click', async () => {
        const container = document.querySelector('#container');
        container.innerHTML = `
            <div style="display: flex; justify-content: space-around;">
                <canvas id='barChart' class='stats' style="width: 45%;"></canvas>
                <canvas id='pieChart' class='stats' style="width: 45%;"></canvas>
                <canvas id='lineChart' class='stats' style="width: 45%"></canvas>
            </div>`;

        const apikey = localStorage.getItem("apikey");

        Promise.all([
            fetch('/api/projects', { headers: { 'x-api-key': apikey } }),
            fetch('/api/tasks', { headers: { 'x-api-key': apikey } }),
            fetch('/api/users', { headers: { 'x-api-key': apikey } })
        ])
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(async (data) => {
            const [projects, tasks, userData] = data;
            const users = userData._embedded.elements;
            
            const userHours = [];
            const userNames = [];
            const timeEntriesByDay = {};

            for (const user of users) {
                const timeRes = await fetch('/api/time_entries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: user.id })
                });
                const timeData = await timeRes.json();
                
                const totalHours = timeData.reduce((sum, entry) => sum + (entry.horas || 0), 0);
                userHours.push(totalHours);
                userNames.push(user.name);

                // Organize entries by day
                timeData.forEach(entry => {
                    const date = new Date(entry.fecha);
                    const dayKey = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
                    if (!timeEntriesByDay[dayKey]) {
                        timeEntriesByDay[dayKey] = {
                            projects: new Set(),
                            tasks: new Set()
                        };
                    }
                    if (entry.proyecto) timeEntriesByDay[dayKey].projects.add(entry.proyecto);
                    if (entry.tarea) timeEntriesByDay[dayKey].tasks.add(entry.tarea);
                });
            }

            // Bar chart for user hours
            const ctxBar = document.getElementById('barChart').getContext('2d');
            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: userNames,
                    datasets: [{
                        label: 'Horas por Usuario',
                        data: userHours,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgb(67, 53, 218)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }
            });

            // Pie chart for elements count
            const ctxPie = document.getElementById('pieChart').getContext('2d');
            new Chart(ctxPie, {
                type: 'pie',
                data: {
                    labels: ['Proyectos', 'Tareas', 'Usuarios'],
                    datasets: [{
                        data: [
                            projects._embedded.elements.length,
                            tasks._embedded.elements.length,
                            users.length
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Número de elementos'
                        }
                    }
                }
            });

            // Line chart with daily data
            const days = Object.keys(timeEntriesByDay).sort((a, b) => new Date(a) - new Date(b));
            const projectCounts = days.map(day => timeEntriesByDay[day].projects.size);
            const taskCounts = days.map(day => timeEntriesByDay[day].tasks.size);

            const ctxLine = document.getElementById('lineChart').getContext('2d');
            // Calculate total hours per day
            const dailyHours = {};
            for (const user of users) {
                const timeData = await fetch('/api/time_entries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: user.id })
                }).then(r => r.json());

                timeData.forEach(entry => {
                    const dayKey = new Date(entry.fecha).toISOString().split('T')[0];
                    dailyHours[dayKey] = (dailyHours[dayKey] || 0) + (entry.horas || 0);
                });
            }

            const sortedDays = Object.keys(dailyHours).sort();
            const hoursData = sortedDays.map(day => dailyHours[day]);

            new Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: sortedDays.map(day => {
                        const date = new Date(day);
                        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    }),
                    datasets: [{
                        label: 'Horas Totales por Día',
                        data: hoursData,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    scales: { 
                        y: { 
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Horas'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Horas Trabajadas por Día'
                        }
                    }
                }
            });
        });
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
                    const webDiv = document.createElement('div');
                    webDiv.classList.add('webDiv');
                    webDiv.setAttribute('data-id', user.id);
                    webDiv.innerHTML = `
                        <div class="card-content" align-items: center; gap: 20px;">
                            <h2 style="margin: 0;">${user.login}</h2>
                            <p style="margin: 0;"><strong>Nombre:</strong> ${user.name}</p>
                            <p style="margin: 0;"><strong>Email:</strong> ${user.email}</p>
                            <div class="users-btn">
                            <button id="modify-user-btn-${user.id}" style="margin: 1px; margin-left: auto;" class="modify-user-btn" onclick="modificarUsuario(${user.id})">
                                <img src="../img/modificarusuario.png" alt="Editar" style="width:50%; height:100%;"></button>
                            <button id="delete-user-btn" style="margin: 1px;" class="delete-user-btn" onclick="borrarUsuario(${user.id})">
                            <img src="../img/borrarusuario.png" alt="Eliminar"/ style="width:50%; height:100%;"></button>
                            </div>
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

    dashboardButton.addEventListener('click', async () => {
        const apikey = localStorage.getItem("apikey");
        const res = await fetch ('/api/users', {
            headers: {
                'x-api-key': apikey
            }
        });
        const data= await res.json();
        
        const sortedUsers = data._embedded.elements.sort((a, b) => a.id - b.id);
        for (const user of sortedUsers) {
            const time = await fetch('/api/time_entries',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user.id })
            });
            const data_time= await time.json();
            const container = document.querySelector('#container');
            if (user === sortedUsers[0]) {
                container.innerHTML = '';
            }

            const userDiv = document.createElement('div');
            userDiv.classList.add('webDiv');
            userDiv.innerHTML = `
                <h2>${user.name}</h2>
                <h3>Time Entries:</h3>
            `;

            const timeList = document.createElement('table');
            timeList.classList.add('time_entries'); 
            timeList.innerHTML = `
                <thead>
                    <tr>
                        <th>Proyecto</th>
                        <th>Tarea</th>
                        <th>Horas</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            const tbody = timeList.querySelector('tbody');
            data_time.forEach(entry => {
                const timeItem = document.createElement('tr');
                timeItem.innerHTML = `
                    <td>${entry.proyecto || 'N/A'}</td>
                    <td>${entry.tarea || 'N/A'}</td>
                    <td>${entry.horas || 0} h</td>
                    <td>${new Date(entry.fecha).toLocaleDateString()}</td>
                    <td>${entry.estado ? 'Activo' : 'Inactivo'}</td>
                `;
                tbody.appendChild(timeItem);
            });

            userDiv.appendChild(timeList);
            container.appendChild(userDiv);
        }
    });

}
/*-----------------------------------------------------------------------------------------*/
