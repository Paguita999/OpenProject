import express from 'express';
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
    res.sendFile(path.join(__dirname,'..' ,'..', 'frontend', 'html', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escoltant a http://localhost:${PORT}`);
});