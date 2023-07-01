import sql, { Bit, DateTime } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';

class Bodega {
    // ``
static async getMuestras(data){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .query(`SELECT [id]
          FROM [quotation_details]
          WHERE quotation_id =  @quotation_id AND assay_id = @assay_id AND active = 1
    `)
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
    

    export default Bodega;