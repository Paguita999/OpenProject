fetch('http://localhost:8080/api/v3/projects', {
    headers: {
        'Authorization': 'Basic ' + btoa('apikey:68826a72943fbd4dc4abe8445ea278297c191da0f897d2dbd507c30f5f07a398'),
        'Origin': 'http://localhost:8080'
    }
})
.then(response => response.json())
.then(data => {
    const container = document.getElementById('projectsContainer');
    const sortedProjects = data._embedded.elements.sort((a, b) => a.id - b.id);
    sortedProjects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.innerHTML = `
            <h2>${project.name}</h2>
            <p>ID: ${project.id}</p>
            <p>Identificador: ${project.identifier}</p>
            <p>Descripción: ${project.description.html}</p>
            <p>Creado: ${new Date(project.createdAt).toLocaleDateString()}</p>
            <p>Estado: ${project._links.status.title}</p>
            <p>Explicación: ${project.statusExplanation.raw}</p>
            <hr>
        `;
        container.appendChild(projectDiv);
    });
});
