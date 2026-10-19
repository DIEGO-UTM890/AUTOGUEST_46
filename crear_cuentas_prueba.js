/**
 * SCRIPT: Crear cuentas de prueba para AUTO_GUEST
 * 
 * Crea:
 *  - 1 Taller (Admin)
 *  - 1 Cliente
 *  - 1 Mecánico (ya APROBADO para que pueda entrar de inmediato)
 * 
 * Uso: node crear_cuentas_prueba.js
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./config/database');

async function crearCuentas() {
    const PASSWORD_PLANO = 'Prueba123';
    const hash = await bcrypt.hash(PASSWORD_PLANO, 10);

    try {
        console.log('\n🔧 Creando cuentas de prueba...\n');

        // ─────────────────────────────────────────
        // 1. TALLER (Admin)
        // ─────────────────────────────────────────
        const idTaller   = 'T_PRUEBA01';
        const idAdmin    = 'UA_PRUEBA01';
        const emailTaller = 'taller.prueba@autoguest.com';

        // Verificar si ya existe
        const [tallerExiste] = await db.query('SELECT idTaller FROM taller WHERE idTaller = ?', [idTaller]);
        if (tallerExiste.length > 0) {
            console.log('⚠️  El taller de prueba ya existe, omitiendo...');
        } else {
            await db.query(
                'INSERT INTO taller (idTaller, nombre, direccion, telefono, correo) VALUES (?, ?, ?, ?, ?)',
                [idTaller, 'Taller Demo AutoGuest', 'Av. Prueba 123, Ciudad', '5500000001', emailTaller]
            );
            await db.query(
                'INSERT INTO usuario (idUsuario, nombre, email, password, telefono) VALUES (?, ?, ?, ?, ?)',
                [idAdmin, 'Admin Demo', emailTaller, hash, '5500000001']
            );
            await db.query(
                'INSERT INTO administrador (idUsuario, idTaller) VALUES (?, ?)',
                [idAdmin, idTaller]
            );
            console.log('✅ TALLER creado');
        }

        // ─────────────────────────────────────────
        // 2. CLIENTE
        // ─────────────────────────────────────────
        const idCliente    = 'CLI_PRUEBA01';
        const emailCliente = 'cliente.prueba@autoguest.com';

        const [clienteExiste] = await db.query('SELECT idUsuario FROM usuario WHERE email = ?', [emailCliente]);
        if (clienteExiste.length > 0) {
            console.log('⚠️  El cliente de prueba ya existe, omitiendo...');
        } else {
            await db.query(
                'INSERT INTO usuario (idUsuario, nombre, email, password, telefono) VALUES (?, ?, ?, ?, ?)',
                [idCliente, 'Cliente Demo', emailCliente, hash, '5500000002']
            );
            await db.query(
                'INSERT INTO cliente (idUsuario) VALUES (?)',
                [idCliente]
            );
            console.log('✅ CLIENTE creado');
        }

        // ─────────────────────────────────────────
        // 3. MECÁNICO (estado APROBADO)
        // ─────────────────────────────────────────
        const idMecanico    = 'MEC_PRUEBA01';
        const emailMecanico = 'mecanico.prueba@autoguest.com';

        const [mecExiste] = await db.query('SELECT idUsuario FROM usuario WHERE email = ?', [emailMecanico]);
        if (mecExiste.length > 0) {
            console.log('⚠️  El mecánico de prueba ya existe, omitiendo...');
        } else {
            await db.query(
                'INSERT INTO usuario (idUsuario, nombre, email, password, telefono) VALUES (?, ?, ?, ?, ?)',
                [idMecanico, 'Mecánico Demo', emailMecanico, hash, '5500000003']
            );
            await db.query(
                'INSERT INTO mecanico (idUsuario, idTaller, especialidad, estado_solicitud) VALUES (?, ?, ?, ?)',
                [idMecanico, idTaller, 'Motor y Transmisión', 'APROBADO']
            );
            console.log('✅ MECÁNICO creado (ya aprobado)');
        }

        // ─────────────────────────────────────────
        // RESUMEN FINAL
        // ─────────────────────────────────────────
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('       CUENTAS DE PRUEBA LISTAS ✅');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n🏠 TALLER (Admin)');
        console.log('   Email    : taller.prueba@autoguest.com');
        console.log('   Contraseña: Prueba123');
        console.log('   Login en : http://localhost:3000/login_taller.html');
        console.log('\n👤 CLIENTE');
        console.log('   Email    : cliente.prueba@autoguest.com');
        console.log('   Contraseña: Prueba123');
        console.log('   Login en : http://localhost:3000/login_cliente.html');
        console.log('\n🔧 MECÁNICO');
        console.log('   Email    : mecanico.prueba@autoguest.com');
        console.log('   Contraseña: Prueba123');
        console.log('   Login en : http://localhost:3000/login_mecanico.html');
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        process.exit(0);
    } catch (e) {
        console.error('\n❌ Error:', e.message);
        console.error(e);
        process.exit(1);
    }
}

crearCuentas();
