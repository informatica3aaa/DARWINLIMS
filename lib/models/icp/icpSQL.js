import sql, { Bit } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';


class Icp {
  // ``

    static async add(id, active){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int , id)
        .input('active', sql.Bit, Number(active))
        .query(`select 
                [id]
                ,[name]
                ,[active]
                ,[user_creator_id]
                ,[user_modifier_id]
                ,[created]
                ,[modified]
                from countries where id = @id and active = @active`)
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
export default Icp;