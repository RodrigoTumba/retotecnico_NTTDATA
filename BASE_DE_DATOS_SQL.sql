create database nttdata_pruebatecnica;
use nttdata_pruebatecnica;
 
CREATE TABLE empleado (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    dni VARCHAR(20) UNIQUE NOT NULL,
    direccion VARCHAR(255),
    fecha_nacimiento DATE,
    trabajo_remoto BOOLEAN DEFAULT FALSE
);

CREATE TABLE oficina (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(250)
);

CREATE TABLE empleado_oficina (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    oficina_id BIGINT NOT NULL,
    fecha_asignacion DATE,
    FOREIGN KEY (empleado_id) REFERENCES empleado(id),
    FOREIGN KEY (oficina_id) REFERENCES oficina(id)
);

CREATE TABLE Administrador (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO Administrador (username, password) VALUES
('RodrigoTumba', '123456');

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50)
);


INSERT INTO empleado (nombre, telefono, dni, direccion, fecha_nacimiento, trabajo_remoto)
VALUES
('Juan Pérez', '123456789', '12345678A', 'Av. Libertador 1000', '1985-03-25', FALSE),
('Ana Gómez', '987654321', '23456789B', 'Calle Falsa 123', '1990-05-10', TRUE),
('Carlos Ruiz', '112233445', '34567890C', 'Calle 456', '1982-08-14', FALSE),
('Luisa Fernández', '223344556', '45678901D', 'Paseo Colón 777', '1993-11-22', TRUE),
('Pedro Martínez', '334455667', '56789012E', 'Avenida del Sol 200', '1975-01-30', FALSE),
('María López', '445566778', '67890123F', 'Calle 456, Edificio 5', '1988-06-18', TRUE),
('José García', '556677889', '78901234G', 'Av. España 1500', '1995-12-02', FALSE),
('Laura Sánchez', '667788990', '89012345H', 'Calle Mayor 321', '1980-09-15', TRUE),
('Tomás Herrera', '778899001', '90123456I', 'Callejón de la Luna 900', '1983-04-10', FALSE),
('Sofia Díaz', '889900112', '01234567J', 'Calle de las Flores 101', '1992-02-25', TRUE);

INSERT INTO oficina (nombre, direccion)
VALUES ('Oficina Santiago', 'Avenida Santiago 200'),
('Oficina Central', 'Av. Principal 101'),
('Oficina Sur', 'Calle Sur 205'),
('Oficina Norte', 'Av. Norte 500'),
('Oficina Este', 'Calle Este 123'),
('Oficina Oeste', 'Paseo Oeste 321'),
('Oficina Lima', 'Calle Lima 55'),
('Oficina Barcelona', 'Plaza Barcelona 12'),
('Oficina Madrid', 'Calle Gran Vía 30'),
('Oficina Buenos Aires', 'Calle Corrientes 1234'),
('Oficina Santiago', 'Avenida Santiago 200');


INSERT INTO empleado_oficina (empleado_id, oficina_id, fecha_asignacion)
VALUES
(1, 1, '2022-03-01'),
(1, 2, '2022-03-10'),
(2, 3, '2023-01-15'),
(2, 4, '2023-01-18'),
(3, 2, '2021-08-07'),
(3, 5, '2021-08-10'),
(4, 3, '2020-11-23'),
(5, 6, '2022-02-20'),
(6, 7, '2023-04-05'),
(7, 8, '2023-02-25');


