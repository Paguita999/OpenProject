import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { ConectionBBDD } from './BaseDatos.js';

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

app.post('/api/userscreate', async (req, res) => {
  const { nombre, apellido, email, login,password } = req.body;
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(400).json({ error: 'Falta la API Key en los headers' });
  }

  const userPayload = {
    firstName: nombre,
    lastName: apellido,
    login,
    password,
    email
  };

  try {
    const response = await fetch('http://localhost:8080/api/v3/users', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`apikey:${apiKey}`).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Error al crear usuario en OpenProject' });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ error: 'Error del servidor' });
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

app.get('/api/tasks', async (req, res) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing in headers' });
    }

    try {
        const response = await fetch('http://localhost:8080/api/v3/work_packages', {
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
app.post ('/api/time_entries', async (req, res) => {
    try {
        const body= req.body;
        const BBDD = new ConectionBBDD();
        const data = await BBDD.getTimeEntriesPorUsuario(body.id);
        res.json( data );

    } catch (error) {
        console.error('Error fetching time entries:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});