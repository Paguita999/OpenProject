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

function horario(){
    document.getElementById('horario').addEventListener('click', function() {
    window.location.href = 'atencionalcliente.html';
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
        const email= document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const departamento = document.getElementById("departamento").value;
        console.log("Nuevo usuario:", nombre,apellido,email,telefono,departamento);


        document.getElementById("modal").style.display = "none";

        this.reset();
    });

}
    function modificarUsuario(usuarioExistente) {
    document.getElementById("modificarModal").addEventListener("click", function () {
        document.getElementById("modal").style.display = "block";

        document.getElementById("nombre").value = usuarioExistente.nombre || "";
        document.getElementById("apellido").value = usuarioExistente.apellido || "";
        document.getElementById("email").value = usuarioExistente.email || "";
        document.getElementById("telefono").value = usuarioExistente.telefono || "";
        document.getElementById("departamento").value = usuarioExistente.departamento || "";
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
        const telefono = document.getElementById("telefono").value;
        const departamento = document.getElementById("departamento").value;

        console.log("Usuario modificado:", nombre, apellido, email, telefono, departamento);
        document.getElementById("modal").style.display = "none";
        this.reset();
    });
}

function borrarUsuario(){
    document.getElementById("borrarModal").addEventListener("click", function () {
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

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const departamento = document.getElementById("departamento").value;

    const departamentos= ["ventas", "marketing", "desarrollo", "recursos humanos"];
    if (!departamentos.includes(departamento.toLowerCase())) {
      alert("Por favor, selecciona un departamento válido.");
      return;
    }
    
    console.log("Borrando usuario:");
    console.log("Nombre:", nombre);
    console.log("Apellido:", apellido);
    console.log("Correo:", correo);
    console.log("Teléfono:", telefono);
    console.log("Departamento:", departamento);

    alert(`Usuario ${nombre} ${apellido} borrado correctamente.`);

    this.reset();
  });
}