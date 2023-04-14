import sql, { Bit } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';

class Cotizaciones {
    // ``
    static async creaHistory(data, user){
        console.log("data:::", data);
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('user_id', sql.Int, Number(user.id))
          .input('model', sql.VarChar, data.model)
          .input('method', sql.VarChar, data.method)
          .input('ruta', sql.Text, data.text)
          .query(`INSERT INTO [histories]
          ([user_id],[model],[method],[text],[created] ) 
            VALUES
            (@user_id
            ,@model
            ,@method
            ,@ruta
            ,CURRENT_TIMESTAMP)`)
        }).then(result => {
        //   let rows = result.recordset;
          let rows = result.rowsAffected;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      } 
    }

    export default Cotizaciones;