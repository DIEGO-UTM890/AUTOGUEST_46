const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'gestion_taller'
    });

    const tables = ['usuario', 'cliente', 'taller', 'mecanico', 'administrador'];
    for (const t of tables) {
        console.log(`\n================= TABLE: ${t} =================`);
        try {
            const [rows] = await conn.query(`SHOW CREATE TABLE ${t}`);
            console.log(rows[0]['Create Table']);
        } catch (e) {
            console.log(`Error showing table ${t}:`, e.message);
        }
    }
    process.exit();
}
run();
