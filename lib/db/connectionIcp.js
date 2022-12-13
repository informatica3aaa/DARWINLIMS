import sql from 'mssql';
import {sqlConfigIcp } from './connection';

async function connectionIcp(){
  await new sql.ConnectionPool(sqlConfigIcp).connect().then(pool => {
    return pool.request().query("SELECT 1")
    }).then(result => {
      console.error("ICP Conectada correctamente.");
      sql.close();
    }).catch(err => {
      console.error("ICP No se pudo conectar:", err);
      sql.close();
    });
}


export default connectionIcp;
