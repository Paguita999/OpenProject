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

function cerrarSesion() {
    document.querySelector('#cerrarSesion').addEventListener('click', () => {
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

/*-----------------------------------------------------------------------------------------*/

document.getElementById("empleados").addEventListener("click", function () {
    // Mostrar el botón de Crear Usuario
    document.getElementById("crearUsuario").style.display = "block";

    // Puedes cargar también la sección de empleados aquí si lo necesitas
    console.log("Vista de empleados activada");
});

// También puedes ocultar el botón cuando se pulse otra sección (opcional)
document.getElementById("dashboard").addEventListener("click", function () {
    document.getElementById("crearUsuario").style.display = "none";
});
document.getElementById("proyectos").addEventListener("click", function () {
    document.getElementById("crearUsuario").style.display = "none";
});
document.getElementById("departamentos").addEventListener("click", function () {
    document.getElementById("crearUsuario").style.display = "none";
});
document.getElementById("estadisticas").addEventListener("click", function () {
    document.getElementById("crearUsuario").style.display = "none";
});

/*-----------------------------------------------------------------------------------------*/



document.addEventListener("DOMContentLoaded", () => {
    const botonesNav = document.querySelectorAll(".nav button");

    botonesNav.forEach(boton => {
        boton.addEventListener("click", () => {
            // Quitar clase 'activo' de todos
            botonesNav.forEach(b => b.classList.remove("activo"));

            // Añadir clase 'activo' al clicado
            boton.classList.add("activo");
        });
    });
});



/*-----------------------------------------------------------------------------------------*/

const apikey = localStorage.getItem("apikey");
const form = document.getElementById('userForm');
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Evita que recargue la página

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey 
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        console.log('Usuario creado:', res);
        alert('Usuario creado con éxito');
        form.reset();
      })
      .catch(err => {
        console.error('Error al crear usuario:', err);
        alert('Error al crear usuario');
      });
    });
