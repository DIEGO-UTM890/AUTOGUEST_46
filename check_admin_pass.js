require('dotenv').config();
const db = require('./config/database');

async function getAdminPassword() {
    try {
        const [users] = await db.query('SELECT email, password FROM usuario WHERE email = "admin@taller.com"');
        if (users.length > 0) {
            console.log('USUARIO:', users[0].email);
            console.log('CONTRASEÑA EN DB:', users[0].password);
            
            if (users[0].password.startsWith('$2')) {
                console.log('TIPO: Encriptada (Bcrypt)');
            } else {
                console.log('TIPO: Texto plano');
            }
        } else {
            console.log('Usuario admin@taller.com no encontrado.');
        }
        process.exit(0);
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}

getAdminPassword();
