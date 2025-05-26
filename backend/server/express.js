import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

// Inicialització d'Express
const app = express();
const PORT = 3000;

// Configuració de __dirname en mòduls ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Càrrega de middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servim els arxius estàtics
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));


// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..' ,'..', 'frontend', 'html', 'check.html'));
});

//proyectos
app.get('/api/projects', async (req, res) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing in headers' });
    }

    try {
        const response = await fetch('http://localhost:8080/api/v3/projects', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`apikey:${apiKey}`).toString('base64')
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch from OpenProject API' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from OpenProject:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


//usuarios
app.get('/api/users', async (req, res) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing in headers' });
    }

    try {
        const response = await fetch('http://localhost:8080/api/v3/users', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`apikey:${apiKey}`).toString('base64')
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch from OpenProject API' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from OpenProject:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/users', async (req, res) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing in headers' });
    }

    try {
        const response = await fetch('http://localhost:8080/api/v3/users', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`apikey:${apiKey}`).toString('base64')
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch from OpenProject API' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from OpenProject:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});