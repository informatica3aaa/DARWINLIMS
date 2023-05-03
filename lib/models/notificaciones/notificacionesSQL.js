import sql, { Bit, DateTime } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';
class Notificaciones {


    static async get(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('offset', sql.Int, Number(data.offset))
          .input('limit', sql.Int, Number(data.limit))
          .query(`SELECT * from notifications  ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      } 
    
    static async add(data, user){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('offset', sql.Int, Number(data.offset))
            .input('limit', sql.Int, Number(data.limit))
            .query(`SELECT * from notifications  ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
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


    

    export default Notificaciones;