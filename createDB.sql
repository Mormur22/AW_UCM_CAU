CREATE DATABASE IF NOT EXISTS UCM_AW_CAU CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE UCM_AW_CAU;

DROP TABLE IF EXISTS UCM_AW_CAU_EMP_Empleados;
DROP TABLE IF EXISTS UCM_AW_CAU_AVI_Avisos;
DROP TABLE IF EXISTS UCM_AW_CAU_USU_Usuarios;
DROP TABLE IF EXISTS UCM_AW_CAU_TEC_Tecnicos;

CREATE TABLE UCM_AW_CAU_EMP_Empleados (
  numero VARCHAR(8) NOT NULL UNIQUE,
  PRIMARY KEY (numero)
);

CREATE TABLE UCM_AW_CAU_USU_Usuarios (
  idUsu INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(130) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  perfil ENUM('alumno','pas','pdi','aa') NOT NULL,
  imagen VARCHAR(255) DEFAULT NULL,
  desactivado BOOLEAN DEFAULT 0,
  reputacion DECIMAL(5,2) DEFAULT 50.00,
  PRIMARY KEY (idUsu)
);

CREATE TABLE UCM_AW_CAU_TEC_Tecnicos (
  idTec INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(130) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  perfil ENUM('alumno','pas','pdi','aa') NOT NULL,
  imagen VARCHAR(255) DEFAULT NULL,
  desactivado BOOLEAN DEFAULT 0,
  numEmp VARCHAR(8),
  PRIMARY KEY (idTec)
);

CREATE TABLE UCM_AW_CAU_AVI_Avisos (
  idAvi INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  tipo ENUM('sugerencia','incidencia','felicitacion') NOT NULL,
  categoria ENUM('administracion','comunicaciones','conectividad','docencia','web','archivo','asesoria_juridica','biblioteca','centro_informacion','departamentos_docentes','inspeccion_servicios','oficina_gestion','informatica','documentacion','imprenta','cafeteria','universidad') NOT NULL,
  subcategoria ENUM('certificado_digital','certificado_electronico','registro_electronico','sede_electronica','portafirmas','correo_electronico','google_meet','cuenta_alumno','cuenta_personal','cuenta_generica','cuenta_sara','conexion_cable','cortafuegos','dns','vpn','wifi_eduroam','wifi_visitantes','aula_virtual','blackboard_collaborate','listado_clase','moodle','cursos_online','analitica_web','certificado_ssl','hosting','portal_eventos','redirecciones_web'),
  fecha DATE NOT NULL,
  observaciones TEXT NOT NULL,
  comentario TINYTEXT,
  cerrado BOOLEAN DEFAULT 0,
  cancelado BOOLEAN DEFAULT 0,
  idUsu INTEGER,
  idTec INTEGER,
  PRIMARY KEY (idAvi),
  FOREIGN KEY (idUsu) REFERENCES UCM_AW_CAU_USU_Usuarios (idUsu),
  FOREIGN KEY (idTec) REFERENCES UCM_AW_CAU_TEC_Tecnicos (idTec)
);

INSERT INTO UCM_AW_CAU_USU_Usuarios (idUsu, email, password, nombre, perfil, imagen, desactivado, reputacion) VALUES
  ( 1, 'cbonilla@ucm.es', 'letmein', 'Carlos Bonilla', 'alumno', 'cbonilla.jpg', 0, 50.00 ),
  ( 2, 'msalas@ucm.es', 'letmein', 'Matias Salas', 'alumno', 'msalas.jpg', 0, 50.00 ),
  ( 3, 'nroca@ucm.es', 'letmein', 'Nuria Roca', 'alumno', 'nroca.jpg', 0, 50.00 ),
  ( 4, 'rcontreras@ucm.es', 'letmein', 'Ruben Contreras', 'alumno', 'rcontreras.jpg', 0, 50.00 ),
  ( 5, 'vramos@ucm.es', 'letmein', 'Vanesa Ramos', 'alumno', 'vramos.jpg', 0, 50.00 ),
  ( 6, 'vramirez@ucm.es', 'letmein', 'Victor Ramirez', 'alumno', 'vramirez.jpg', 0, 50.00 ),
  ( 7, 'eporto@ucm.es', 'letmein', 'Eva Porto', 'pdi', 'evaporto.jpg', 0, 50.00 ),
  ( 8, 'jsantaolalla@ucm.es', 'letmein', 'Javier Santaolalla', 'pdi', 'jsantaolalla.jpg', 0, 50.00 ),
  ( 9, 'maranda@ucm.es', 'letmein', 'Marcos Aranda', 'pdi', 'maranda.jpg', 0, 50.00 ),
  ( 10, 'rguzman@ucm.es', 'letmein', 'Roberto Guzman', 'pdi', 'rguzman.jpg', 0, 50.00 ),
  ( 11, 'smontes@ucm.es', 'letmein', 'Sabrina Montes', 'pdi', 'smontes.jpg', 0, 50.00 ),
  ( 12, 'agarrido@ucm.es', 'letmein', 'Ana Garrido', 'pas', 'agarrido.jpg', 0, 50.00 ),
  ( 13, 'csamper@ucm.es', 'letmein', 'Cristian Samper', 'pas', 'csamper.jpg', 0, 50.00 ),
  ( 14, 'mhall@ucm.es', 'letmein', 'Meredith Hall', 'pas', 'mhall.jpg', 0, 50.00 ),
  ( 15, 'rsantos@ucm.es', 'letmein', 'Rebeca Santos', 'pas', 'rsantos.jpg', 0, 50.00 ),
  ( 16, 'tbrown@ucm.es', 'letmein', 'Taylor Brown', 'pas', 'tbrown.jpg', 0, 50.00 ),
  ( 17, 'jmolina@ucm.es', 'letmein', 'Julian Molina', 'aa', 'jmolina.jpg', 0, 50.00 ),
  ( 18, 'tmorgan@ucm.es', 'letmein', 'Tina Morgan', 'aa', 'tmorgan.jpg', 0, 50.00 );

INSERT INTO UCM_AW_CAU_EMP_Empleados (numero) VALUES
  ('4678-dfs'),
  ('5102-gev'),
  ('6884-hnx'),
  ('7039-con'), 
  ('8959-azy'),
  ('1234-abc'),
  ('5678-xyz'),
  ('1111-aaa'),
  ('2222-bbb'),
  ('3333-ccc'),
  ('4444-ddd'),
  ('5555-eee'),
  ('0000-xxx');

INSERT INTO UCM_AW_CAU_TEC_Tecnicos ( idTec, email, password, nombre, perfil, imagen, desactivado, numEmp ) VALUES
  ( 1, 'aortiz@ucm.es', 'letmein', 'Alexander Ortiz', 'pas', 'aortiz.jpg', 0, '4678-dfs' ),
  ( 2, 'csolis@ucm.es', 'letmein', 'Carlota Solis', 'pas', 'csolis.jpg', 0, '5102-gev' ),
  ( 3, 'hsmith@ucm.es', 'letmein', 'Harold Smith', 'pas', 'hsmith.jpg', 0, '6884-hnx' ),
  ( 4, 'pjuarez@ucm.es', 'letmein', 'Pablo Juarez', 'pas', 'pjuarez.jpg', 0, '7039-con' ),
  ( 5, 'lmoreno@ucm.es', 'letmein', 'Lucas Moreno', 'pas', 'lmoreno.jpg', 0, '8959-azy' );

INSERT INTO UCM_AW_CAU_AVI_Avisos ( idAvi, tipo, categoria, subcategoria, fecha, observaciones, comentario, cerrado, cancelado, idUsu, idTec ) VALUES
  ( 1, 'felicitacion', 'informatica', NULL, '2022-11-15', 'Hola, quiero daros la enhorabuena por la gran labor de mantenimiento que hacéis con los equipos de los laboratorios. ¡Buen trabajo!', 'Muchas gracias. Resulta reconfortante saber que se valora el esfuerzo que hacemos.', 1, 0, 7, 1 );

/* Crear (como mínimo) registros para: */
-- 5 usuarios
-- 3 tecnicos
-- 10 avisos