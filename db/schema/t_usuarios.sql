-- ----------------------------
-- Table structure for t_usuarios
-- ----------------------------
DROP TABLE IF EXISTS "public"."t_usuarios";

drop sequence if EXISTS t_usuarios_id_usuario_seq;
create sequence t_usuarios_id_usuario_seq
minvalue 1
maxvalue 999999
increment by 1;

CREATE TABLE "public"."t_usuarios" (
  "id_usuario" int8 NOT NULL DEFAULT nextval('t_usuarios_id_usuario_seq'::regclass),
  "perfil" varchar(255) COLLATE "pg_catalog"."default",
  "estado_usuario" int2,
  "username" varchar(50) COLLATE "pg_catalog"."default",
  "password" varchar(50) COLLATE "pg_catalog"."default",
  "nombres" varchar(255) COLLATE "pg_catalog"."default",
  "apellidos" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "fecha_last_log" timestamptz(6),
  "fecha_alta" timestamptz(6),
  "fecha_baja" timestamptz(6),
  "password_recovery_token" varchar(255) COLLATE "pg_catalog"."default",
  "id_partido" int8,
  "run" int8,
  "dv" varchar(1) COLLATE "pg_catalog"."default",
  "cargo" varchar(255) COLLATE "pg_catalog"."default",
  "telefono_fijo" varchar(255) COLLATE "pg_catalog"."default",
  "telefono_movil" varchar(255) COLLATE "pg_catalog"."default",
  "titulo" varchar(255) COLLATE "pg_catalog"."default",
  "region" varchar(255) COLLATE "pg_catalog"."default",
  "comuna" varchar(255) COLLATE "pg_catalog"."default",
  "direccion" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of t_usuarios
-- ----------------------------
INSERT INTO "public"."t_usuarios" VALUES (5, 'NORMAL', 1, 'qq', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'qq', 'ww', 'glamura@servel.cl', '2018-09-04 14:16:52.034505-03', '2018-08-29 19:57:11-03', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."t_usuarios" VALUES (2, 'TI', 1, 'adminti', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'Admin', 'Ti', 'glamura@servel.cl', '2018-08-29 17:20:15.78932-03', '2018-08-29 13:21:54-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."t_usuarios" VALUES (4, 'ADMINISTRADOR', 1, 'qwerty', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'aaaa', 'bbbb', 'glamura@servel.cl', NULL, '2018-08-29 19:20:23-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."t_usuarios" VALUES (3, 'AGF', 1, 'usuario', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'Usuario', 'Normal', 'glamura@servel.cl', '2019-01-15 11:54:46.556679-03', '2018-08-29 13:23:30-03', NULL, NULL, 1, 16644046, '7', 'Administrador General de Fondos', '123456789', '123456789', 'Titulo Profesional', 'Metropolitana', 'Santiago', 'Direccion particular #123');
INSERT INTO "public"."t_usuarios" VALUES (1, 'ADMINISTRADOR', 1, 'admin', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'Admin', 'admin', 'glamura@servel.cl', '2019-01-15 12:42:04.645522-03', '2018-08-28 18:00:27.950286-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Primary Key structure for table t_usuarios
-- ----------------------------
ALTER TABLE "public"."t_usuarios" ADD CONSTRAINT "t_usuarios_pkey" PRIMARY KEY ("id_usuario");
