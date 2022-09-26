import sql from 'mssql';
import {sqlConfig} from './connection';

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

export default testConnection;
