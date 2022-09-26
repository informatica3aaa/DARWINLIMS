import sql from 'mssql';
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

async function testConnection(){
  await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request().query("SELECT 1")
    }).then(result => {
      console.error("SQLSERVER Conectada correctamente.");
      sql.close();
    }).catch(err => {
      console.error("SQLSERVER No se pudo conectar:", err);
      sql.close();
    });
}

