require('dotenv').config();
const db = require('./config/database');

async function findUsers() {
    try {
        console.log('--- BUSCANDO USUARIOS DE PRUEBA ---');

        // Buscar un Cliente
        const [clientes] = await db.query('SELECT u.email, u.nombre FROM cliente c JOIN usuario u ON c.idUsuario = u.idUsuario LIMIT 1');
        if (clientes.length > 0) {
            console.log('CLIENTE:', clientes[0].email, '(' + clientes[0].nombre + ')');
        } else {
            console.log('CLIENTE: No se encontró ninguno.');
        }

        // Buscar un Mecánico
        const [mecanicos] = await db.query('SELECT u.email, u.nombre FROM mecanico m JOIN usuario u ON m.idUsuario = u.idUsuario LIMIT 1');
        if (mecanicos.length > 0) {
            console.log('MECÁNICO:', mecanicos[0].email, '(' + mecanicos[0].nombre + ')');
        } else {
            console.log('MECÁNICO: No se encontró ninguno.');
        }

        // Buscar un Administrador/Taller
        const [admins] = await db.query('SELECT u.email, u.nombre FROM administrador a JOIN usuario u ON a.idUsuario = u.idUsuario LIMIT 1');
        if (admins.length > 0) {
            console.log('ADMIN/TALLER:', admins[0].email, '(' + admins[0].nombre + ')');
        } else {
            console.log('ADMIN/TALLER: No se encontró ninguno.');
        }

        console.log('\nNOTA: Las contraseñas están cifradas en la DB. Prueba con "123456" o "Admin123" que son las comunes.');
        process.exit(0);
    } catch (e) {
        console.error('Error al consultar la base de datos:', e.message);
        process.exit(1);
    }
}

findUsers();
