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
  fecha DATETIME NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(130) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  perfil ENUM('alumno','pas','pdi','aa') NOT NULL,
  imagen MEDIUMBLOB DEFAULT NULL,
  mime VARCHAR(50) DEFAULT NULL,
  desactivado BOOLEAN DEFAULT 0,
  reputacion DECIMAL(5,2) DEFAULT 50.00,
  PRIMARY KEY (idUsu)
);

CREATE TABLE UCM_AW_CAU_TEC_Tecnicos (
  idTec INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  fecha DATETIME NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(130) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  perfil ENUM('alumno','pas','pdi','aa') NOT NULL,
  imagen MEDIUMBLOB DEFAULT NULL,
  mime VARCHAR(50) DEFAULT NULL,
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

INSERT INTO UCM_AW_CAU_USU_Usuarios ( idUsu, fecha, email, password, nombre, perfil, imagen, mime, desactivado, reputacion ) VALUES
( 1, '2019-09-11 12:01:22', 'anuñez@ucm.es', 'letmein', 'Alfredo Nuñez', 'alumno', NULL, NULL, 0, 50.00 ),
( 2, '2022-09-09 18:04:41', 'alozano@ucm.es', 'letmein', 'Ana Lozano', 'alumno', NULL, NULL, 0, 50.00 ),
( 3, '2022-09-15 21:53:22', 'ctorres@ucm.es', 'letmein', 'Carlota Torres', 'alumno', NULL, NULL, 0, 50.00 ),
( 4, '2021-09-13 14:02:53', 'msalas@ucm.es', 'letmein', 'Matias Salas', 'alumno', NULL, NULL, 0, 50.00 ),
( 5, '2021-09-06 08:47:06', 'nroca@ucm.es', 'letmein', 'Nuria Roca', 'alumno', NULL, NULL, 0, 50.00 ),
( 6, '2022-09-06 13:07:20', 'rcarrasco@ucm.es', 'letmein', 'Rebeca Carrasco', 'alumno', NULL, NULL, 0, 50.00 ),
( 7, '2022-09-07 14:02:53', 'rcontreras@ucm.es', 'letmein', 'Ruben Contreras', 'alumno', NULL, NULL, 0, 50.00 ),
( 8, '2021-09-03 10:31:32', 'vramos@ucm.es', 'letmein', 'Vanesa Ramos', 'alumno', NULL, NULL, 0, 50.00 ),
( 9, '2020-09-14 09:17:54', 'vramirez@ucm.es', 'letmein', 'Victor Ramirez', 'alumno', NULL, NULL, 0, 50.00 ),
( 10, '2021-09-03 11:42:27', 'bgerpe@ucm.es', 'letmein', 'Begoña Gerpe', 'pdi', NULL, NULL, 0, 50.00 ),
( 11, '2020-09-04 13:09:16', 'eporto@ucm.es', 'letmein', 'Eva Porto', 'pdi', NULL, NULL, 0, 50.00 ),
( 12, '2020-09-02 10:25:14', 'jsantaolalla@ucm.es', 'letmein', 'Javier Santaolalla', 'pdi', NULL, NULL, 0, 50.00 ),
( 13, '2014-09-01 11:48:26', 'maranda@ucm.es', 'letmein', 'Marcos Aranda', 'pdi', NULL, NULL, 0, 50.00 ),
( 14, '1958-09-03 09:12:30', 'rguzman@ucm.es', 'letmein', 'Roberto Guzman', 'pdi', NULL, NULL, 0, 50.00 ),
( 15, '2022-09-02 10:57:28', 'smontes@ucm.es', 'letmein','Sabrina Montes', 'pdi', NULL, NULL, 0, 50.00 ),
( 16, '1977-10-21 12:03:44', 'agarrido@ucm.es', 'letmein', 'Ana Garrido', 'pas', NULL, NULL, 0, 50.00 ),
( 17, '1991-02-18 14:08:19', 'csamper@ucm.es', 'letmein', 'Cristian Samper', 'pas', NULL, NULL, 0, 50.00 ),
( 18, '2006-04-17 09:44:37', 'mhall@ucm.es', 'letmein', 'Meredith Hall', 'pas', NULL, NULL, 0, 50.00 ),
( 19, '1999-05-20 11:41:25', 'rsantos@ucm.es', 'letmein', 'Rebeca Santos', 'pas', NULL, NULL, 0, 50.00 ),
( 20, '1997-06-13 10:59:07', 'tbrown@ucm.es', 'letmein', 'Taylor Brown', 'pas', NULL, NULL, 0, 50.00 ),
( 21, '1978-07-05 12:41:16', 'avillar@ucm.es', 'letmein', 'Andres Villar', 'aa', NULL, NULL, 0, 50.00 ),
( 22, '1980-11-24 09:24:14', 'jmolina@ucm.es', 'letmein', 'Julian Molina', 'aa', NULL, NULL, 0, 50.00 ),
( 23, '1985-12-16 08:48:53', 'lmarin@ucm.es', 'letmein', 'Luisa Marin', 'aa', NULL, NULL, 0, 50.00 ),
( 24, '1987-05-11 12:28:39', 'tmorgan@ucm.es', 'letmein', 'Tina Morgan', 'aa', NULL, NULL, 0, 50.00 );

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

INSERT INTO UCM_AW_CAU_TEC_Tecnicos ( idTec, fecha, email, password, nombre, perfil, imagen, mime, desactivado, numEmp ) VALUES
  ( 1, '1991-09-02 11:55:19', 'aortiz@ucm.es', 'letmein', 'Alexander Ortiz', 'pas', NULL, NULL, 0, '4678-dfs' ),
  ( 2, '2002-06-05 12:24:33', 'csolis@ucm.es', 'letmein', 'Carolina Solis', 'pas', NULL, NULL, 0, '5102-gev' ),
  ( 3, '2015-03-15 08:49:56', 'hsmith@ucm.es', 'letmein', 'Harold Smith', 'pas', NULL, NULL, 0, '6884-hnx' ),
  ( 4, '2020-01-05 10:25:08', 'pjuarez@ucm.es', 'letmein', 'Pablo Juarez', 'pas', NULL, NULL, 0, '7039-con' ),
  ( 5, '2022-09-01 09:10:40', 'lmoreno@ucm.es', 'letmein', 'Lucas Moreno', 'pas', NULL, NULL, 0, '8959-azy' );

INSERT INTO UCM_AW_CAU_AVI_Avisos ( idAvi, tipo, categoria, subcategoria, fecha, observaciones, comentario, cerrado, cancelado, idUsu, idTec ) VALUES
  ( 1, 'incidencia', 'comunicaciones', 'correo_electronico', '2022-09-14', 'Después de haber solicitado la migración de mi cuenta puedo acceder al nuevo correo, pero no encuentro los correos antiguos y me faltan carpetas.', 'Lo hemos revisado y por lo visto no se realizó correctamente la migración. Lo más probable es que no se seleccionasen las opciones adecuadas en el momento de hacer la copia. Somos humanos y a veces metemos la pata. Afortunadamente, tu antigua cuenta aún no había sido eliminada y hemos podido recuperar lo que faltaba. Ya deberías tenerlo todo disponible en tu nueva cuenta.', 1, 0, 12, 2 ),  -- jsantaolalla (pdi) / csolis
  ( 2, 'incidencia', 'docencia', 'aula_virtual', '2022-09-20', 'He solicitado un cambio de matrícula pero en el Campus Virtual me siguen apareciendo las asignaturas del la carrera en la que estaba antes.', 'Las notificaciones de traspasos tardan unos días en llegar al servicio de informática. Estamos trabajando para acelerar el proceso. Si dentro de unos 10 días sigue sin haberse actualizado el listado de asignaturas, vuelve a contactar con nosotros.', 1, 0, 1, 3 ),  -- anuñez (alumno) / hsmith
  ( 3, 'incidencia', 'comunicaciones', 'correo_electronico', '2022-09-21', 'Me están llegando correos en los que el remitente soy yo mismo.', 'Márcalos como "correo no deseado". Una vez que se hayan movido a la carpeta de "Spam" puedes indicar el motivo en el apartado de categorización de correo. Indica en el primer desplegable "mensaje fraudulento" y en el segundo "suplantación de identidad".', 1, 0, 17, 4 ),  -- csamper (pas) / pjuarez
  ( 4, 'incidencia', 'comunicaciones', 'cuenta_alumno', '2022-09-23', 'No me gusta como queda mi foto de perfil, ¿se le puede poner algún filtro?', 'No, y te recomiendo que no lo hagas con otras aplicaciones. Esto no es una red social sino una institución académica.', 1, 0, 8, 2 ),  -- vramos (alumno) / csolis
  ( 5, 'sugerencia', 'docencia', 'aula_virtual', '2022-10-06', '¿No podríais hacer una aplicación para votaciones? Hay compañeros que no han podido votarme en la elección de delegado por no haber ido ese día a clase.', 'No es que no se pueda, se trata más bien un tema de confianza en la organización que gestione el sistema.', 1, 0, 7, 1 ),  -- rcontreras (alumno) / hsmith
  ( 6, 'incidencia', 'docencia', 'aula_virtual', '2022-10-11', '¿Hay alguna manera de recibir avisos en el correo electrónico cuando el profesor pone una nueva tarea en el Campus Virtual?', 'Claro que sí. En el menú de configuración, ve al apartado de "Notificaciones", pincha en el botón con el símbolo [+] para añadir una nueva, y elije en el desplegable la asignatura que te interese (o "Todas") y más abajo marca "tareas". Te recomiendo que también marques "cambios de fechas de entrega". Para comprobar, si todo ha ido bien ve al apartado de "Mis notificaciones", te aparecerá un listado desde el que puedes activarlas o desactivarlas a conveniencia sin necesidad de borrarlas. Verifica, entonces, que el check box de la columna "act." esté marcado.', 1, 0, 3, 1 ),  -- ctorres (alumno) / aortiz
  ( 7, 'sugerencia', 'comunicaciones', 'cuenta_alumno', '2022-10-29', '¿Para cuándo un Tinder UCM?', 'Este aviso ha sido eliminado por el técnico Carolina Solis debido a:\n\nXD', 0, 1, 7, 2 ),  -- rcontreras (alumno) / csolis
  ( 8, 'felicitacion', 'informatica', NULL, '2022-11-15', 'Hola, quiero daros la enhorabuena por la gran labor de mantenimiento que hacéis con los equipos de los laboratorios. ¡Buen trabajo!', 'Muchas gracias. Resulta reconfortante saber que se valora el esfuerzo que hacemos.', 1, 0, 11, 1 ),  -- eporto (pdi) / aortiz
  ( 9, 'incidencia', 'docencia', 'aula_virtual', '2022-11-28', 'La calefacción está muy alta en el Aula 2.09 ¿podéis bajarla unos grados?', 'Este aviso ha sido eliminado por el técnico Harold Smith debido a:\n\nLo siento, nosotros no llevamos eso. Pregunta en conserjería.', 0, 1, 7, 3 ),  -- rcontreras (alumno) / hsmith
  ( 10, 'incidencia', 'comunicaciones', 'correo_electronico', '2022-12-02', 'Este curso es mi último año en la universidad y me gustaría conservar copia de mis correos electrónicos ¿Podéis hacerme una?', 'Si solo te interesa conservar unos cuantos emails te recomiendo que uses la opción de exportar correos. Crea una nueva carpeta con todos los correos que te interesen y desde las opciones de carpeta elije "exportar".<br/><br/>Si los quieres todos, podemos proporcionarte una copia, pero primero deberás realizar una solicitud de entrega de datos desde la página de administración electrónica. No se te olvide marcar la casilla de "correos electrónicos".', 1, 0, 14, 5 ),  -- rguzman (pdi) / lmoreno
  ( 11, 'incidencia', 'comunicaciones', 'correo_electronico', '2022-12-12', 'Voy a estar ausente un tiempo y deseo que otra persona pueda acceder a la cuenta institucional para poder contestar a los correos nuevos.', 'Lo siento, pero por motivos de privacidad de datos no se permite esa posibilidad. Sin embargo siempre puedes activar la opción de reenvío automático para correos entrantes. Cuando la marques se te habilitará el campo "cuenta de destino", en el que deberás escribir la dirección de correo electrónico de la persona que quieres que los reciba. Otra opción es la de "respuesta automática", en la que puedes poner un texto como "estoy de vacaciones y no puedo atenderte". Pero acuérdate de desactívala cuando vuelvas.', 1, 0, 13, 4 ),  -- maranda (pdi) / pjuarez
  ( 12, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-01-19', 'No puedo iniciar sesión en mi correo de la UCM.', 'Se han restablecido las credenciales. Por favor, intente de nuevo.', 1, 0, 16, 1),  -- agarrido (pas) / aortiz
  ( 13, 'sugerencia', 'docencia', 'aula_virtual', '2023-01-20', 'Habría que añadir un rol para el delegado de clase.', 'Este aviso ha sido eliminado por el técnico Alexander Ortiz debido a:\n\nEso no es posible. Los alumnos no tienen asignado un campo de rol.', 0, 1, 4, 5),  -- msalas (alumno) / lmoreno
  ( 14, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-01-23', 'No recibo correos de mis profesores.', 'Se ha revisado la configuración del filtro de spam y se han ajustado los ajustes.', 1, 0, 18, 3),  -- mhall (pas) / hsmith
  ( 15, 'felicitacion', 'informatica', NULL, '2023-01-24', 'El nuevo sistema de reserva de aulas es excelente.', 'Gracias por tus comentarios. Nos alegra que te guste.', 1, 0, 19, 4),  -- rsantos (pas) / pjuarez
  ( 16, 'incidencia', 'docencia', 'aula_virtual', '2023-01-25', 'No puedo ver las tareas para mi clase de física.', 'Se ha actualizado la lista de tareas en el aula virtual.', 1, 0, 12, 5),  -- jsantaolalla (pdi) / lmoreno
  ( 17, 'incidencia', 'comunicaciones', 'cuenta_alumno', '2023-01-26', 'No puedo iniciar sesión en mi cuenta de estudiante.', 'Se han restablecido las credenciales. Por favor, intente de nuevo.', 1, 0, 9, 1),  -- vramirez (alumno) / aortiz
  ( 18, 'sugerencia', 'docencia', 'aula_virtual', '2023-01-27', 'Sería útil tener una función de búsqueda en el aula virtual.', 'Se ha enviado la sugerencia al equipo de desarrollo.', 1, 0, 15, 2),  -- smontes (pdi) / csolis
  ( 19, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-01-30', 'No puedo enviar correos desde mi cuenta de UCM.', 'Se ha revisado y corregido el problema con el servidor de correo.', 1, 0, 23, 3),  -- lmarin (aa) / hsmith
  ( 20, 'felicitacion', 'informatica', NULL, '2023-01-31', 'Los ordenadores del laboratorio de informática son muy rápidos.', 'Gracias por tus comentarios. Nos esforzamos por ofrecer el mejor equipamiento.', 1, 0, 5, 4),  -- nroca (alumno) / pjuarez
  ( 21, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-02-01', 'He olvidado la contraseña de mi correo de la UCM.', 'Se ha enviado un enlace para restablecer la contraseña a tu correo alternativo.', 1, 0, 16, 2),  -- agarrido (pas) / csolis
  ( 22, 'incidencia', 'docencia', 'aula_virtual', '2023-02-02', 'No puedo descargar los archivos de las asignaturas en el aula virtual.', 'Se ha resuelto el problema con los archivos, ya deberías poder descargarlos.', 1, 0, 4, 1),  -- msalas (alumno) / aortiz
  ( 23, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-02-03', 'No puedo adjuntar archivos en mis correos de la UCM.', 'Se ha corregido un error en la función de adjuntar archivos. Por favor, intente de nuevo.', 1, 0, 18, 3),  -- mhall (pas) / hsmith
  ( 24, 'felicitacion', 'informatica', NULL, '2023-02-06', 'Es genial la cantidad de programas de software que hay disponibles en los laboratorios.', 'Gracias por tu comentario. Intentamos que dispongáis de lo mejor de lo mejor.', 1, 0, 6, 5),  -- rcarrasco (alumno) / lmoreno
  ( 25, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-02-08', 'Mi correo de la UCM no recibe mensajes.', 'Hemos resuelto un problema con el servidor de correo. Deberías recibir correos normalmente ahora.', 1, 0, 1, 1),
  ( 26, 'sugerencia', 'docencia', 'aula_virtual', '2023-02-09', 'Sería útil tener un calendario de eventos en el aula virtual.', 'Gracias por tu sugerencia. La pasaremos al equipo encargado.', 1, 0, 2, 1),
  ( 27, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-02-10', 'No puedo cambiar la contraseña de mi correo de la UCM.', 'Se ha solucionado el problema con la función de cambio de contraseña.', 1, 0, 3, 2),
  ( 28, 'felicitacion', 'informatica', NULL, '2023-02-13', 'El servicio de atención al cliente es excepcional. ¡Gran trabajo!', 'Agradecemos tus comentarios positivos. ¡Nuestro objetivo es proporcionar el mejor servicio posible!', 1, 0, 4, 3),
  ( 29, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-02-14', 'No estoy recibiendo correos en mi cuenta de la UCM.', 'Estamos investigando el problema, por favor, ten paciencia.', 1, 0, 1, 3),
  ( 30, 'incidencia', 'docencia', 'aula_virtual', '2023-02-15', 'No puedo subir archivos al aula virtual.', 'Hemos resuelto el problema, ya deberías poder subir archivos.', 1, 0, 2, 2),
  ( 31, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-02-16', 'Mi correo de la UCM parece haber sido hackeado.', 'Por seguridad, hemos bloqueado tu cuenta mientras investigamos.', 1, 0, 3, 4),
  ( 32, 'incidencia', 'docencia', 'aula_virtual', '2023-02-17', 'Mi portátil de la UCM no se enciende.', 'Este aviso ha sido cancelado por el técnico Pablo Juarez debido a: \n\nEl usuario resolvió el problema por su cuenta.', 0, 1, 4, 4),
  ( 33, 'sugerencia', 'docencia', 'aula_virtual', '2023-02-20', 'Sería útil poder ver las calificaciones en el aula virtual.', 'Estamos considerando la implementación de esta funcionalidad. Gracias por tu sugerencia.', 1, 0, 5, 3),
  ( 34, 'felicitacion', 'informatica', NULL, '2023-02-21', 'La nueva actualización del sistema es increíble, ¡gracias!', 'Agradecemos tus comentarios positivos. ¡Trabajamos duro para mejorar nuestros servicios!', 1, 0, 1, 1),
  ( 35, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-02-22', 'Todos los correos que envío desde mi cuenta de la UCM están yendo a la carpeta de spam.', 'Estamos trabajando en este problema, agradecemos tu paciencia.', 1, 0, 3, 1),
  ( 36, 'sugerencia', 'docencia', 'aula_virtual', '2023-02-23', 'El aula virtual podría tener un diseño más atractivo.', 'Gracias por tu sugerencia, se la haremos llegar al equipo de diseño.', 1, 0, 2, 1),
  ( 37, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-02-24', 'He olvidado la contraseña de mi correo de la UCM.', 'Este aviso ha sido cancelado por el técnico Lucas Moreno debido a: \n\nEl usuario recordó su contraseña.', 0, 1, 5, 4),
  ( 38, 'felicitacion', 'informatica', NULL, '2023-02-27', 'Sois unos maquinas', '¡Gracias por el cunmplido!. Intentamos hacerlo lo mejor posible.', 1, 0, 4, 4),
  ( 39, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-02-28', 'No puedo enviar correos desde mi cuenta de UCM.', 'Se ha revisado y corregido el problema con el servidor de correo.', 1, 0, 3, 1),
  ( 40, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-03-01', 'El viento sopla mensajes perdidos en el ciberespacio', '¡Palabras de solución brillan en la oscuridad del correo!', 1, 0, 11, 1),
  ( 41, 'incidencia', 'conectividad', 'vpn', '2023-03-02', 'En el túnel virtual, la conexión se desvanece en la bruma', 'El velo de la VPN se disipa, la conexión restablecida en plenitud', 1, 0, 12, 2),
  ( 42, 'incidencia', 'docencia', 'aula_virtual', '2023-03-03', 'En el aula virtual, un eco de preguntas sin respuesta', 'Este aviso ha sido cancelado por el técnico Pablo Juarez debido a: \n\nEl usuario resolvió el problema por su cuenta.', 0, 1, 13, 3),
  ( 43, 'incidencia', 'web', 'analitica_web', '2023-03-06', 'En los números se pierde el rastro de la analítica web', 'Los números bailan al ritmo de la analítica web, el misterio revelado', 1, 0, 14, 4),
  ( 44, 'incidencia', 'comunicaciones', 'cuenta_alumno', '2023-03-07', 'En el reino estudiantil, una cuenta perdida en la nebulosa', 'La cuenta de alumno resurge, la nebulosa se despeja', 1, 0, 15, 1),
  ( 45, 'incidencia', 'conectividad', 'wifi_visitantes', '2023-03-08', 'En la onda del visitante, la conexión se desvanece en la distancia', 'El visitante se conecta, la señal Wi-Fi lo abraza con alegría', 1, 0, 16, 2),
  ( 46, 'incidencia', 'docencia', 'moodle', '2023-03-09', 'En la plataforma virtual moodle no me aclaro', 'Este aviso ha sido cancelado por el técnico Pablo Juarez debido a: \n\nEl problema no tiene solución', 0, 1, 17, 3),
  ( 47, 'incidencia', 'web', 'certificado_ssl', '2023-03-10', 'En la red segura, el certificado se pierde en la oscuridad', 'La seguridad resplandece, el certificado SSL encuentra su camino', 1, 0, 18, 4),
  ( 48, 'incidencia', 'administracion', 'certificado_electronico', '2023-03-13', 'En el laberinto de certificados, uno se extravía', 'Este aviso ha sido cancelado por el técnico Alexander Ortiz debido a: \n\nEl usuario resolvió el problema por su cuenta.', 0, 1, 19, 1),
  ( 49, 'incidencia', 'web', 'portal_eventos', '2023-03-14', 'El portal de eventos en sombras y misterio se sumerge', '¡La luz se encendió, el problema resuelto en plenitud!', 1, 0, 20, 2),
  ( 50, 'incidencia', 'comunicaciones', 'correo_electronico', '2023-03-15', 'El viento sopla mensajes perdidos en el ciberespacio', '¡Palabras de solución brillan en la oscuridad del correo!', 1, 0, 1, 3),
  ( 51, 'incidencia', 'conectividad', 'vpn', '2023-03-16', 'En el túnel virtual, la conexión se desvanece en la bruma', 'El velo de la VPN se disipa, la conexión restablecida en plenitud', 1, 0, 2, 4),
  ( 52, 'sugerencia', 'administracion', 'certificado_digital', '2023-03-17', '¡Una brisa misteriosa solicita el certificado digital!', NULL, 0, 0, 1, 2),
  ( 53, 'sugerencia', 'comunicaciones', 'google_meet', '2023-03-20', 'El canto del encuentro virtual se desvanece en el éter', NULL, 0, 0, 2, 2),
  ( 54, 'sugerencia', 'conectividad', 'wifi_eduroam', '2023-03-21', 'Entre las ondas se pierde la conexión, en busca de Eduroam', NULL, 0, 0, 3, 1),
  ( 55, 'sugerencia', 'docencia', 'blackboard_collaborate', '2023-03-22', 'En el aula virtual, susurros de colaboración se desvanecen', NULL, 0, 0, 4, 3),
  ( 56, 'sugerencia', 'web', 'portal_eventos', '2023-03-23', 'El portal de eventos en sombras y misterio se sumerge', NULL, 0, 0, 5, 3),
  ( 57, 'sugerencia', 'administracion', 'certificado_electronico', '2023-03-24', 'En el archivo perdido, un eco de certificados electrónicos', NULL, 0, 0, 11, 3),
  ( 58, 'sugerencia', 'administracion', 'portafirmas', '2023-03-27', 'La firma espera en el umbral del portafirmas', NULL, 0, 0, 13, 2),
  ( 59, 'sugerencia', 'administracion', 'certificado_electronico', '2023-03-28', 'En el rincón de la biblioteca, un susurro de registro electrónico', NULL, 0, 0, 10, 4),
  ( 60, 'sugerencia', 'administracion', 'sede_electronica', '2023-03-29', 'En el centro de información, un portal hacia la sede electrónica', NULL, 0, 0, 9, 4),
  ( 61, 'sugerencia', 'administracion', 'certificado_digital', '2023-03-30', 'En los departamentos docentes, un eco de certificados digitales', NULL, 0, 0, 10, 2),
  ( 62, 'incidencia', 'administracion', 'certificado_electronico', '2023-04-03', 'Me ha caducado. ¿Cómo lo puedo renovar?', NULL, 0, 0, 16, 2),  -- agarrido (pas) / csolis
  ( 63, 'felicitacion', 'departamentos_docentes', NULL, '2023-04-04', 'Todo está muy bien organizado.', NULL, 0, 0, 12, 3),  -- jsantaolalla (pdi) / hsmith
  ( 64, 'sugerencia', 'docencia', 'moodle', '2023-04-05', 'El enlace no es fácil de encontrar. Sería mejor ponerlo con los demás.', NULL, 0, 0, 13, 4),  -- maranda (pdi) / pjuarez
  ( 65, 'incidencia', 'conectividad', 'conexion_cable', '2023-04-06', 'No me va muy bien. La conexión se pierde de vez en cuando.', NULL, 0, 0, 14, 5),  -- rguzman (pdi) / lmoreno
  ( 66, 'felicitacion', 'biblioteca', NULL, '2023-04-07', 'Disponéis de un excelente catalogo. Es impresionante.', NULL, 0, 0, 15, 1),  -- smontes (pdi) / aortiz
  ( 67, 'incidencia', 'web', 'hosting', '2023-04-10', 'Algo no va bien con el blog personal de usuario. No guarda las nuevas entradas.', NULL, 0, 0, 12, 2),  -- jsantaolalla (pdi) / csolis
  ( 68, 'incidencia', 'administracion', 'sede_electronica', '2023-04-11', 'Tenemos problemas para registrar los cambios de turnos. Los compañeros no reciben el aviso de confirmación.', NULL, 0, 0, 16, NULL),  -- agarrido (pas) / NULL
  ( 69, 'incidencia', 'comunicaciones', 'cuenta_generica', '2023-04-12', 'El algunos compañeros del turno de tarde dicen que no pueden ver los correos de secretaria@ucm.es . Sin embargo, en el turno de mañana nadie tiene ese problema.', NULL, 0, 0, 17, NULL),  -- csamper (pas) / NULL
  ( 70, 'sugerencia', 'web', 'portal_eventos', '2023-04-13', 'En el portal aparecen los eventos ordenados cronológicamente en orden ascendente. Sería mejor que pusierais arriba los nuevos eventos o que colocaseis los eventos ya pasados en otro apartado. ', NULL, 0, 0, 18, NULL),  -- mhall (pas) / NULL
  ( 71, 'incidencia', 'docencia', 'listado_clase', '2023-04-14', 'Nos han informado que los listados de alumnos no incluyen a  los estudiantes de Erasmus.', NULL, 0, 0, 19, NULL),  -- rsantos (pas) / NULL
  ( 72, 'felicitacion', 'centro_informacion', NULL, '2023-04-17', 'Gracias por la nueva interfaz de búsqueda. Es mucho más intuitiva que la que había antes.', NULL, 0, 0, 20, NULL),  -- tbrown (pas) / NULL
  ( 73, 'sugerencia', 'comunicaciones', 'cuenta_personal', '2023-04-18', 'Seria muy útil que incluyeseis en el perfil también el número del teléfono interno.', NULL, 0, 0, 16, NULL),  -- agarrido (pas) / NULL
  ( 74, 'incidencia', 'comunicaciones', 'google_meet', '2023-04-19', 'En la sala de reuniones no va bien el micrófono.', NULL, 0, 0, 17, NULL),  -- csamper (pas) / NULL
  ( 75, 'incidencia', 'administracion', 'registro_electronico', '2023-04-20', 'Los antiguos títulos no tienen el código de identificación del Ministerio.', NULL, 0, 0, 21, NULL),  -- avillar (aa) / NULL
  ( 76, 'incidencia', 'web', 'portal_eventos', '2023-04-21', 'Los eventos de la Asociación de Antiguos Alumnos no aparecen. ', NULL, 0, 0, 22, NULL),  -- jmolina (aa) / NULL
  ( 77, 'sugerencia', 'comunicaciones', 'correo_electronico', '2023-04-24', 'Sería bueno añadir listas de distribución por año de promoción además de por carrera.', NULL, 0, 0, 23, NULL),  -- lmarin (aa) / NULL
  ( 78, 'felicitacion', 'departamentos_docentes', NULL, '2023-04-25', 'Enhorabuena por los cursos online para mantener al día a los antiguos alumnos. Han gustado mucho.', NULL, 0, 0, 24, NULL),  -- tmorgan (aa) / NULL
  ( 79, 'incidencia', 'administracion', 'registro_electronico', '2023-04-26', 'Las certificaciones académicas no se pueden descargar.', NULL, 0, 0, 1, NULL),  -- anuñez (alumno) / NULL
  ( 80, 'incidencia', 'conectividad', 'cortafuegos', '2023-04-27', 'Parece que cortafuegos no permite la conexión con wifi con la aplicación móvil de consulta de exámenes, porque con datos me funciona bien,', NULL, 0, 0, 2, NULL),  -- alozano (alumno) / NULL
  ( 81, 'incidencia', 'docencia', 'cursos_online', '2023-04-28', 'No se le a dado acceso a los profesores auxiliares.', NULL, 0, 0, 12, NULL);  -- jsantaolalla (pdi) / NULL
  