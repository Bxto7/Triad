CREATE TABLE IF NOT EXISTS cotizaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    mensaje TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

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
);
