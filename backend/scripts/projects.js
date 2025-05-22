fetch('http://localhost:8080/api/v3/projects', {
    headers: {
        'Authorization': 'Basic ' + btoa('apikey:a6733f2b3f07ba4b57fb489204ca83ec8d33934f339812eb8d4a558b9912da65'),
        'Origin': 'http://localhost:8080'
    }
})
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('#projectsContainer');
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
