import sql from 'mssql';
import {sqlConfig} from '../../db/connection';

class Herramientas {

    static async getRegiones(){
       return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request().query("SELECT * from regions")
            }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;

            }).catch(err => {
              console.error(err);
              sql.close();
            });
    }

}
export default Herramientas;