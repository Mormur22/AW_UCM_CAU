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
  comentario TEXT,
  cerrado BOOLEAN DEFAULT 0,
  cancelado BOOLEAN DEFAULT 0,
  idUsu INTEGER,
  idTec INTEGER,
  PRIMARY KEY (idAvi),
  FOREIGN KEY (idUsu) REFERENCES UCM_AW_CAU_USU_Usuarios (idUsu),
  FOREIGN KEY (idTec) REFERENCES UCM_AW_CAU_TEC_Tecnicos (idTec)
);

INSERT INTO UCM_AW_CAU_USU_Usuarios (idUsu, email, password, nombre, perfil, imagen, desactivado, reputacion) VALUES
  ( 1, 'anuñez@ucm.es', 'letmein', 'Alfredo Nuñez', 'alumno', 'anuñez.jpg', 0, 50.00 ),
  ( 2, 'alozano@ucm.es', 'letmein', 'Ana Lozano', 'alumno', 'alozano.jpg', 0, 50.00 ),
  ( 3, 'ctorres@ucm.es', 'letmein', 'Carlota Torres', 'alumno', 'ctorres.jpg', 0, 50.00 ),
  ( 4, 'msalas@ucm.es', 'letmein', 'Matias Salas', 'alumno', 'msalas.jpg', 0, 50.00 ),
  ( 5, 'nroca@ucm.es', 'letmein', 'Nuria Roca', 'alumno', 'nroca.jpg', 0, 50.00 ),
  ( 6, 'rcarrasco@ucm.es', 'letmein', 'Rebeca Carrasco', 'alumno', 'rcarrasco.jpg', 0, 50.00 ),
  ( 7, 'rcontreras@ucm.es', 'letmein', 'Ruben Contreras', 'alumno', 'rcontreras.jpg', 0, 50.00 ),
  ( 8, 'vramos@ucm.es', 'letmein', 'Vanesa Ramos', 'alumno', 'vramos.jpg', 0, 50.00 ),
  ( 9, 'vramirez@ucm.es', 'letmein', 'Victor Ramirez', 'alumno', 'vramirez.jpg', 0, 50.00 ),
  ( 10, 'bgerpe@ucm.es', 'letmein', 'Begoña Gerpe', 'pdi', 'bgerpe.jpg', 0, 50.00 ),
  ( 11, 'eporto@ucm.es', 'letmein', 'Eva Porto', 'pdi', 'eporto.jpg', 0, 50.00 ),
  ( 12, 'jsantaolalla@ucm.es', 'letmein', 'Javier Santaolalla', 'pdi', 'jsantaolalla.jpg', 0, 50.00 ),
  ( 13, 'maranda@ucm.es', 'letmein', 'Marcos Aranda', 'pdi', 'maranda.jpg', 0, 50.00 ),
  ( 14, 'rguzman@ucm.es', 'letmein', 'Roberto Guzman', 'pdi', 'rguzman.jpg', 0, 50.00 ),
  ( 15, 'smontes@ucm.es', 'letmein', 'Sabrina Montes', 'pdi', 'smontes.jpg', 0, 50.00 ),
  ( 16, 'agarrido@ucm.es', 'letmein', 'Ana Garrido', 'pas', 'agarrido.jpg', 0, 50.00 ),
  ( 17, 'csamper@ucm.es', 'letmein', 'Cristian Samper', 'pas', 'csamper.jpg', 0, 50.00 ),
  ( 18, 'mhall@ucm.es', 'letmein', 'Meredith Hall', 'pas', 'mhall.jpg', 0, 50.00 ),
  ( 19, 'rsantos@ucm.es', 'letmein', 'Rebeca Santos', 'pas', 'rsantos.jpg', 0, 50.00 ),
  ( 20, 'tbrown@ucm.es', 'letmein', 'Taylor Brown', 'pas', 'tbrown.jpg', 0, 50.00 ),
  ( 21, 'avillar@ucm.es', 'letmein', 'Andres Villar', 'aa', 'avillar.jpg', 0, 50.00 ),
  ( 22, 'jmolina@ucm.es', 'letmein', 'Julian Molina', 'aa', 'jmolina.jpg', 0, 50.00 ),
  ( 23, 'lmarin@ucm.es', 'letmein', 'Luisa Marin', 'aa', 'lmarin.jpg', 0, 50.00 ),
  ( 24, 'tmorgan@ucm.es', 'letmein', 'Tina Morgan', 'aa', 'tmorgan.jpg', 0, 50.00 );

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
  ( 2, 'csolis@ucm.es', 'letmein', 'Carolina Solis', 'pas', 'csolis.jpg', 0, '5102-gev' ),
  ( 3, 'hsmith@ucm.es', 'letmein', 'Harold Smith', 'pas', 'hsmith.jpg', 0, '6884-hnx' ),
  ( 4, 'pjuarez@ucm.es', 'letmein', 'Pablo Juarez', 'pas', 'pjuarez.jpg', 0, '7039-con' ),
  ( 5, 'lmoreno@ucm.es', 'letmein', 'Lucas Moreno', 'pas', 'lmoreno.jpg', 0, '8959-azy' );

INSERT INTO UCM_AW_CAU_AVI_Avisos ( idAvi, tipo, categoria, subcategoria, fecha, observaciones, comentario, cerrado, cancelado, idUsu, idTec ) VALUES
  ( 1, 'incidencia', 'comunicaciones', 'correo_electronico', '2022-09-14', 'Después de haber solicitado la migración de mi cuenta puedo acceder al nuevo correo, pero no encuentro los correos antiguos y me faltan carpetas.', 'Lo hemos revisado y por lo visto no se realizó correctamente la migración. Lo más probable es que no se seleccionasen las opciones adecuadas en el momento de hacer la copia. Somos humanos y a veces metemos la pata. Afortunadamente, tu antigua cuenta aún no había sido eliminada y hemos podido recuperar lo que faltaba. Ya deberías tenerlo todo disponible en tu nueva cuenta.', 1, 0, 12, 2 ),  -- jsantaolalla / csolis
  ( 2, 'incidencia', 'docencia', 'aula_virtual', '2022-09-20', 'He solicitado un cambio de matrícula pero en el Campus Virtual me siguen apareciendo las asignaturas del la carrera en la que estaba antes.', 'Las notificaciones de traspasos tardan unos días en llegar al servicio de informática. Estamos trabajando para acelerar el proceso. Si dentro de unos 10 días sigue sin haberse actualizado el listado de asignaturas, vuelve a contactar con nosotros.', 1, 0, 1, 3 ),  -- anuñez / hsmith
  ( 3, 'incidencia', 'comunicaciones', 'correo_electronico', '2022-09-21', 'Me están llegando correos en los que el remitente soy yo mismo.', 'Márcalos como "correo no deseado". Una vez que se hayan movido a la carpeta de "Spam" puedes indicar el motivo en el apartado de categorización de correo. Indica en el primer desplegable "mensaje fraudulento" y en el segundo "suplantación de identidad".', 1, 0, 17, 4 ),  -- csamper / pjuarez
  ( 4, 'incidencia', 'comunicaciones', 'cuenta_alumno', '2022-09-23', 'No me gusta como queda mi foto de perfil, ¿se le puede poner algún filtro?', 'No, y te recomiendo que no lo hagas con otras aplicaciones. Esto no es una red social sino una institución académica.', 1, 0, 8, 2 ),  -- vramos / csolis
  ( 5, 'sugerencia', 'docencia', 'aula_virtual', '2022-10-06', '¿No podrías hacer una aplicación para votaciones? Hay compañeros que no han podido votarme en la elección de delegado por no haber ido ese día a clase.', 'No es que no se pueda, se trata más bien un tema de confianza en la organización que gestione el sistema.', 1, 0, 7, 1 ),  -- rcontreras / hsmith
  ( 6, 'incidencia', 'docencia', 'aula_virtual', '2022-10-11', '¿Hay alguna manera de recibir avisos en el correo electrónico cuando el profesor pone una nueva tarea en el Campus Virtual?', 'Claro que sí. En el menú de configuración, ve al apartado de "Notificaciones", pincha en el botón con el símbolo [+] para añadir una nueva, y elije en el desplegable la asignatura que te interese (o "Todas") y más abajo marca "tareas". Te recomiendo que también marques "cambios de fechas de entrega". Para comprobar, si todo ha ido bien ve al apartado de "Mis notificaciones", te aparecerá un listado desde el que puedes activarlas o desactivarlas a conveniencia sin necesidad de borrarlas. Verifica, entonces, que el check box de la columna "act." esté marcado.', 1, 0, 3, 1 ),  -- ctorres / aortiz
  ( 7, 'sugerencia', 'comunicaciones', 'cuenta_alumno', '2022-10-29', '¿Para cuándo un Tinder UCM?', 'XD', 1, 1, 7, 2 ),  -- rcontreras / csolis
  ( 8, 'felicitacion', 'informatica', NULL, '2022-11-15', 'Hola, quiero daros la enhorabuena por la gran labor de mantenimiento que hacéis con los equipos de los laboratorios. ¡Buen trabajo!', 'Muchas gracias. Resulta reconfortante saber que se valora el esfuerzo que hacemos.', 1, 0, 11, 1 ),  -- eporto / aortiz
  ( 9, 'incidencia', 'docencia', 'aula_virtual', '2022-11-28', 'La calefacción está muy alta en el Aula 2.09 ¿podéis bajarla unos grados?', 'Lo siento, nosotros no llevamos eso. Pregunta en conserjería.', 1, 1, 7, 3 ),  -- rcontreras / hsmith
  ( 10, 'incidencia', 'comunicaciones', 'correo_electronico', '2022-12-02', 'Este curso es mi último año en la universidad y me gustaría conservar copia de mis correos electrónicos ¿Podéis hacerme una?', 'Si solo te interesa conservar unos cuantos emails te recomiendo que uses la opción de exportar correos. Crea una nueva carpeta con todos los correos que te interesen y desde las opciones de carpeta elije "exportar".<br/><br/>Si los quieres todos, podemos proporcionarte una copia, pero primero deberás realizar una solicitud de entrega de datos desde la página de administración electrónica. No se te olvide marcar la casilla de "correos electrónicos".', 1, 0, 14, 5 ),  -- rguzman / lmoreno
  ( 11, 'incidencia', 'comunicaciones', 'correo_electronico', '2022-12-12', 'Voy a estar ausente un tiempo y deseo que otra persona pueda acceder a la cuenta institucional para poder contestar a los correos nuevos.', 'Lo siento, pero por motivos de privacidad de datos no se permite esa posibilidad. Sin embargo siempre puedes activar la opción de reenvío automático para correos entrantes. Cuando la marques se te habilitará el campo "cuenta de destino", en el que deberás escribir la dirección de correo electrónico de la persona que quieres que los reciba. Otra opción es la de "respuesta automática", en la que puedes poner un texto como "estoy de vacaciones y no puedo atenderte". Pero acuérdate de desactívala cuando vuelvas.', 1, 0, 13, 4 );  -- maranda / pjuarez


/* Crear (como mínimo) registros para: */
-- 5 usuarios
-- 3 tecnicos
-- 10 avisos