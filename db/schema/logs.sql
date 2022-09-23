-- ----------------------------
-- Table structure for logs
-- ----------------------------
drop sequence if EXISTS logs_id_logs_seq;
create sequence logs_id_logs_seq
minvalue 1
maxvalue 999999
increment by 1;


DROP TABLE IF EXISTS "public"."logs";
CREATE TABLE "public"."logs" (
  "id_logs" int8 NOT NULL DEFAULT nextval('logs_id_logs_seq'::regclass),
  "type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "action" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "scope" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "message" varchar(255) COLLATE "pg_catalog"."default",
  "data" jsonb,
  "event_date" timestamp(6),
  "useragent" jsonb
)
;

-- ----------------------------
-- Primary Key structure for table logs
-- ----------------------------
ALTER TABLE "public"."logs" ADD CONSTRAINT "logs_pkey" PRIMARY KEY ("id_logs");
