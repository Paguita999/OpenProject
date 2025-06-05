
import { Client } from 'pg';

export class ConectionBBDD{

    constructor() {
        

        this.client = new Client({
            host: 'localhost', // o el nom del servei docker, ex: 'db'
            port: 5555,
            user: 'postgres', // usuari per defecte OpenProject
            password: 'postgres', // contrasenya per defecte OpenProject
            database: 'openproject' // nom de la base de dades
        });
        // Tu código adicional aquí
    }

    async getTimeEntriesPorDia(fecha,id) {
        try {
            await this.client.connect();

            const result = await this.client.query(`
    SELECT 
        p.name AS proyecto, 
        w.subject AS tarea,
        t.hours AS horas,
        t.ongoing AS estado 
    FROM 
        projects AS p, 
        work_packages AS w, 
        time_entries AS t 
    WHERE 
        t.work_package_id = w.id 
        AND t.project_id = p.id 
        AND t.user_id = ${id} 
        AND t.spent_on = '${fecha}'
`);
            await this.client.end();


            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }

async getTimeEntriesPorUsuario(id) {
        try {
            await this.client.connect();
            const result = await this.client.query(`select p.name as proyecto,w.subject as tarea,t.hours as horas,t.spent_on as fecha,
                t.ongoing as estado from projects as p, work_packages as w, time_entries as t where t.work_package_id=w.id
                and t.project_id=p.id and t.user_id=${id};`);
            await this.client.end();
            return result.rows;
        } catch (error) {
            return JSON.stringify({ error: error.message });
        }
    }
}