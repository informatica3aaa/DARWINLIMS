import dotenv from 'dotenv';

dotenv.config();
export const sqlConfig ={
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    server:process.env.DATABASE_SERVER,
    database:process.env.DATABASE_NAME,
    port:1433,
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 30000
      },
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
       },
}

export const sqlConfigIcp ={
  user: process.env.DATABASE_USER,
  password:process.env.DATABASE_PASS,
  server:process.env.DATABASE_SERVER,
  database:process.env.DATABASE_NAME_ICP,
  port:1433,
  pool: {
      max: 100,
      min: 0,
      idleTimeoutMillis: 30000
    },
  options: {
      encrypt: true,
      trustServerCertificate: true,
      enableArithAbort: true
     },
}


