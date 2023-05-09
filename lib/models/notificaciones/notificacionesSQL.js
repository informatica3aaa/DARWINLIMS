import sql, { Bit, DateTime } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';
class Notificaciones {


    static async getAll(offset, limit, modulo){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('offset', sql.Int, Number(offset))
          .input('limit', sql.Int, Number(limit))
          .input('modulo', sql.VarChar, modulo)
          .query(`SELECT * from notification WHERE modulo=@modulo ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      } 
    
    static async add(modulo,id,estado,active,user_id){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('modulo', sql.VarChar, Number(modulo))
            .input('id', sql.Int, Number(id))
            .input('estado', sql.Int, Number(estado))
            .input('active', sql.Int, Number(active))
            .input('user_id', sql.Int, user_id)
            .query(`INSERT INTO [notification]
                  ([modulo]
                  ,[modulo_id]
                  ,[estado]
                  ,[active]
                  ,[user_creator_id]
                  ,[created]) OUTPUT Inserted.* 
                   VALUES (@modulo,
                          ,@id
                          ,@estado
                          ,@active
                          ,@user_id
                          ,CURRENT_TIMESTAMP)`
                          )
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
        } 

    static async updateEstado(id,estado){
          return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('id', sql.Int, Number(id))
              .input('estado', sql.Int, Number(estado))
              .query(`UPDATE [notification] SET
                    ,[estado]=@estado
                    ,[modified]=CURRENT_TIMESTAMP
                     WHERE id =@id`
                     )
            }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;
      
            }).catch(err => {
              console.error(err);
              sql.close();
            });
          }
    //modulo 
    static async getById(modulo_id){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('modulo_id', sql.Int, Number(modulo_id))
        .query(`SELECT * from notification WHERE [modulo_id]=@modulo_id`)
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