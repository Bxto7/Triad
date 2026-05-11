const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');
const cotizarRoutes = require('./routes/cotizar');
const reclamacionesRoutes = require('./routes/reclamaciones');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

async function initDB() {
    const conn = await pool.getConnection();
    await conn.execute(`
        CREATE TABLE IF NOT EXISTS cotizaciones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombres VARCHAR(150) NOT NULL,
            telefono VARCHAR(20) NOT NULL,
            correo VARCHAR(150) NOT NULL,
            mensaje TEXT,
            fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    await conn.execute(`
        CREATE TABLE IF NOT EXISTS reclamaciones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100) NOT NULL,
            tipo_documento ENUM('DNI', 'Carnet de Extranjería', 'Pasaporte') DEFAULT 'DNI',
            num_documento VARCHAR(20) NOT NULL,
            correo VARCHAR(150) NOT NULL,
            celular VARCHAR(20) NOT NULL,
            tipo_bien ENUM('Producto', 'Servicio') DEFAULT 'Servicio',
            descripcion_bien TEXT,
            tipo_reclamo ENUM('Reclamo', 'Queja') DEFAULT 'Reclamo',
            detalle_reclamo TEXT,
            accion_tomada TEXT,
            estado ENUM('Pendiente', 'En revisión', 'Resuelto') DEFAULT 'Pendiente',
            fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    conn.release();
    console.log('Tablas inicializadas correctamente');
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cotizar', cotizarRoutes);
app.use('/api/reclamaciones', reclamacionesRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', async (req, res) => {
    try {
        await pool.execute('SELECT 1');
        res.json({ status: 'OK', database: 'Conectado' });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', database: 'Sin conexión', detalle: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor TRIAD corriendo en puerto ${PORT}`);
    console.log(`DB_HOST: ${process.env.DB_HOST}`);
    console.log(`DB_PORT: ${process.env.DB_PORT}`);
    console.log(`DB_NAME: ${process.env.DB_NAME}`);
    initDB().catch(err => {
        console.error('Error inicializando BD:', err.message);
    });
});
