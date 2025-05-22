import { ProjecteModel } from './model/projectemodel.js';
const apikey = '68826a72943fbd4dc4abe8445ea278297c191da0f897d2dbd507c30f5f07a398';
async function loadProjects() {
    try {
        const response = await fetch('http://localhost:8080/api/v3/projects', {
            headers: {
                'Authorization': 'Basic ' + btoa('apikey:' + apikey),
                'Origin': 'http://localhost:8080'
            }
        });
        const data = await response.json();
        const container = document.getElementById('projectsContainer');
        const projectes = data._embedded.elements.map(proj => new ProjecteModel(proj));
        const sortedProjects = projectes.sort((a, b) => a.id - b.id);
        
        sortedProjects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.innerHTML = `
                <h3>${project.name}</h3>
                <hr>
                <p><strong>ID:</strong> ${project.id}</p>
                <p><strong>Identificador:</strong> ${project.identifier}</p>
                <p><strong>Descripción:</strong> ${project.description.raw}</p>
                <p><strong>Creado:</strong> ${new Date(project.createdAt).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> ${project.status.title}</p>
                <p><strong>Explicación:</strong> ${project.statusExplanation.raw}</p>
                <hr>
            `;
            container.appendChild(projectDiv);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

loadProjects();