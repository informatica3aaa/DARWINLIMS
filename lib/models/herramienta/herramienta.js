import sql, { Bit } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';


class Herramientas {
  // ``

    static async getContryId(id, active){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int , id)
        .input('active', sql.Bit, Number(active))
        .query(`select * from countries where id = @id and active = @active`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getContry(id){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int , id)
        // .input('active', sql.Bit, Number(active))
        .query(`select * from countries where id = @id`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getContryName(name){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('name', sql.VarChar , name)
        .query(`select * from countries where name = @name `)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }
    
    static async addRegion(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('order', sql.Int , data.order)
        .input('country_id', sql.Int, data.country_id)
        .input('name', sql.VarChar, data.name)
        .input('user', sql.Int , data.user_id)
        .input('active', sql.Bit, 1)
        .query(`INSERT INTO regions ( [order], [country_id], [name], [user_creator_id], [created], [active]) OUTPUT Inserted.*
        values (@order, @country_id, @name, @user ,CURRENT_TIMESTAMP, @active)`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        // console.log("acacacac",err);
        console.error("ERROR:::::::::::::::",err);
        sql.close();
      });
    }

    static async addPais(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('name', sql.VarChar, data.name)
        .input('user', sql.Int , data.user_id)
        .input('active', sql.Bit, 1)
        .query(`INSERT INTO countries ( [name], [user_creator_id], [created], [active]) OUTPUT Inserted.*
        values (@name, @user ,CURRENT_TIMESTAMP, @active)`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        // console.log("acacacac",err);
        console.error("ERROR:::::::::::::::",err);
        sql.close();
      });
    }

    static async getRegiones(id){
       return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, id)
            .input('active', sql.Bit, 1)
            .query(`SELECT * from regions where active = @active and country_id = @id`)
            }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;

            }).catch(err => {
              console.error(err);
              sql.close();
            });
    }

    static async getRegionId(id){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int , id)
        .input('active', sql.Bit, 1)
        .query(`select * from regions where id = @id and active = @active`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getEditRegion(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int , data.id)
        .input('country_id', sql.Int , data.country_id)
        .input('active', sql.Bit, data.active)
        .query(`select * from regions where id = @id and country_id = @country_id and active= @active`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getComunas(id){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int , id)
        .input('active', sql.Bit, 1)
        .query(`select * from communes where region_id = @id and active = @active`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async editarRegion(data){

      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int , data.id)
        .input('order', sql.Int , data.order)
        .input('country_id', sql.Int, data.country_id)
        .input('name', sql.VarChar, data.name)
        .input('user', sql.Int , data.user_id)
        .input('active', sql.Bit, Number(data.active))
        .query(`UPDATE regions SET [order] = @order , [name] = @name, [user_modifier_id]= @user, [modified]=CURRENT_TIMESTAMP, [active] = @active  OUTPUT Inserted.* WHERE [id]=@id and  [country_id] = @country_id `)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;
      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async editarPais(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('country_id', sql.Int, data.country_id)
        .input('name', sql.VarChar, data.name)
        .input('user', sql.Int , data.user_id)
        .input('active', sql.Bit, Number(data.active))
        .query(`UPDATE countries SET [name] = @name, [user_modifier_id]= @user, [modified]=CURRENT_TIMESTAMP, [active] = @active  OUTPUT Inserted.* WHERE [id]=@country_id `)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;
      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async delRegion (data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int , data.id)
        .input('country_id', sql.Int, data.country_id)
        .input('user', sql.Int , data.user_id)
        .input('active', sql.Bit, Number(data.active))
        .query(`UPDATE regions SET [user_modifier_id]= @user, [modified]=CURRENT_TIMESTAMP, [active] = @active  OUTPUT Inserted.* WHERE [id]=@id  and  [country_id] = @country_id `)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async delPais (data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('country_id', sql.Int, data.country_id)
        .input('user', sql.Int , data.user_id)
        .input('active', sql.Bit, Number(data.active))
        .query(`UPDATE countries SET [user_modifier_id]= @user, [modified]=CURRENT_TIMESTAMP, [active] = @active  OUTPUT Inserted.* WHERE [id]=@country_id `)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getPaises(active){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, active)
        .query(`select * from countries where active = @active`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }
    //TECNICAS
    static async getTecnicas(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select * from techniques where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getElementotipo(data){
      console.log("dat;;;;", data);
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select * from element_types where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getDigestiones(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select * from [digestions] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getTipoUnidad(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select * from [unit_types] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getTipoEnsayo(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select * from [assay_types] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }
   
    static async getMetodos(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select * from [methods] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getEstandares(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select * from [standards] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getTransporteTipo(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select * from [transport_types] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getUnidades(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select * from [units] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }


    static async getTecnicasId(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, data.id)
        .input('active', sql.Bit, Number(data.active))
        .query(`select * from techniques where active = @active and id=@id`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }
    
    static async getElemento_tipoId(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, data.id)
        .input('active', sql.Bit, Number(data.active))
        .query(`select * from [element_types] where active = @active and id=@id`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }
    
    static async getDigestionId(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, data.id)
        .input('active', sql.Bit, Number(data.active))
        .query(`select * from digestions where active = @active and id=@id`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async editarTecnica(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, data.id)
        .input('name', sql.VarChar, data.name)
        .input('user', sql.Int , data.user_id)
        .input('active', sql.Bit, Number(data.active))
        .query(`UPDATE techniques SET [name] = @name, [user_modifier_id]= @user, [modified]=CURRENT_TIMESTAMP, [active] = @active  OUTPUT Inserted.* WHERE [id]=@id `)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;
      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    
    static async editarElemento_tipo(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, data.id)
        .input('name', sql.VarChar, data.name)
        .input('user', sql.Int , data.user_id)
        .input('active', sql.Bit, Number(data.active))
        .query(`UPDATE element_types SET [name] = @name, [user_modifier_id]= @user, [modified]=CURRENT_TIMESTAMP, [active] = @active  OUTPUT Inserted.* WHERE [id]=@id `)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;
      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }
    
    static async editarDigestiones(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, data.id)
        .input('name', sql.VarChar, data.name)
        .input('user', sql.Int , data.user_id)
        .input('active', sql.Bit, Number(data.active))
        .query(`UPDATE digestions SET [name] = @name, [user_modifier_id]= @user, [modified]=CURRENT_TIMESTAMP, [active] = @active  OUTPUT Inserted.* WHERE [id]=@id `)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;
      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async ContTools(data){
      switch(data.tipo){
        case 'tecnica':
          return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('active', sql.Bit, Number(data.active))
            .query(`select count(id)  from techniques where active = @active`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
          break;
        case 'elemento_tipo':
          return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('active', sql.Bit, Number(data.active))
            .query(`select count(id) as total  from [element_types] where active =@active`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
          break;
        case 'digestiones':
          return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('active', sql.Bit, Number(data.active))
            .query(`select count(id) as total  from [digestions] where active = @active`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });

          break;
        case 'tipos_de_unidad':
          return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('active', sql.Bit, Number(data.active))
            .query(`select count(id) as total  from [unit_types] where active = @active`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
          break;
        case 'tipos_de_ensayo':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('active', sql.Bit, Number(data.active))
              .query(`select count(id) as total  from [assay_types] where active = @active`)
            }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;
      
            }).catch(err => {
              console.error(err);
              sql.close();
            });
            break;
        case 'metodos':
              return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                return pool.request()
                .input('active', sql.Bit, Number(data.active))
                .query(`select count(id) as total  from [methods] where active = @active`)
              }).then(result => {
                let rows = result.recordset;
                sql.close();
                return rows;
        
              }).catch(err => {
                console.error(err);
                sql.close();
              });
              break;
        case 'estandares':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [standards] where active = @active`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break;
        case 'transporte_tipo':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [transport_types] where active = @active`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break;
        case 'unidades':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [units] where active = @active`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break;          
          default:
            throw new Error('No existe tipo para realizar consulta, revise su información')  
    }

      

    }
}
export default Herramientas;