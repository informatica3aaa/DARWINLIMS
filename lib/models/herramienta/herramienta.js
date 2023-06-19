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
        .query(`select 
                [id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              from [countries] where id = @id and active = @active`)
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
        .query(`select                 
                [id]
                ,[name]
                ,[active]
                ,[user_creator_id]
                ,[user_modifier_id]
                ,[created]
                ,[modified] from countries where id = @id`)
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
        .query(`select 
              [id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              from countries where name = @name `)
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
            .query(`SELECT 
                    [id]
                  ,[order]
                  ,[country_id]
                  ,[name]
                  ,[user_creator_id]
                  ,[user_modifier_id]
                  ,[created]
                  ,[modified]
                  ,[active]
                from regions where active = @active and country_id = @id`)
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
        .query(`select 
                [id]
              ,[order]
              ,[country_id]
              ,[name]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              ,[active]
              from regions where id = @id and active = @active`)
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
        .query(`select 
              [id]
            ,[order]
            ,[country_id]
            ,[name]
            ,[user_creator_id]
            ,[user_modifier_id]
            ,[created]
            ,[modified]
            ,[active]
            from regions where id = @id and country_id = @country_id and active= @active`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getQuotationNumber(){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .query(`SELECT count(id) + 2000  as cant FROM [quotations]`)
      }).then(result => {
        let rows = result.recordset[0];
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
        .query(`select 
                [id]
              ,[region_id]
              ,[name]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              ,[active]
              from communes where region_id = @id and active = @active`)
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
        .query(`select 
                [id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
                from countries where active = @active`)
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
        .query(`select 
                  [id]
                ,[name]
                ,[active]
                ,[user_creator_id]
                ,[user_modifier_id]
                ,[created]
                ,[modified]
                from techniques where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
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
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
                [id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
        from element_types where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
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
        .query(`select 
                [id]
                ,[name]
                ,[active]
                ,[user_creator_id]
                ,[user_modifier_id]
                ,[created]
                ,[modified]
                from [digestions] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
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
        .query(`select 
              [id]
              ,[name]
              ,[name_1]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
        from [unit_types] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
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
        .query(`select 
              [id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              from [assay_types] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
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
        .query(`select 
        [id]
        ,[name]
        ,[active]
        ,[user_creator_id]
        ,[user_modifier_id]
        ,[created]
        ,[modified]
        from [methods] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
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
        .query(`select 
              [id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              from [standards] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
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
        .query(`select 
                [id]
                ,[name]
                ,[active]
                ,[user_creator_id]
                ,[user_modifier_id]
                ,[created]
                ,[modified]
                from [transport_types] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
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
        .query(`select 
                [id]
              ,[description]
              ,[unit_type_id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
        from [units] where active = @active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getEstados(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select  
                [id]
                ,[name] 
                from [states] ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getEscalas(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
                [id]
                ,[name]
                ,[bitrate]
                ,[parity]
                ,[stopbit]
                ,[databit]
                ,[portname]
                ,[calibracion]
                ,[patron_a]
                ,[patron_a_min]
                ,[patron_a_max]
                ,[patron_b]
                ,[patron_b_min]
                ,[patron_b_max]
                ,[patron_c]
                ,[patron_c_min]
                ,[patron_c_max]
                from [scales] ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getEtapaSolicitud(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
              [id]
              ,[name]
              ,[description]
              ,[created]
              ,[modified]
              from [requisition_stages] ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getEstadoCita(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
                [id]
                ,[name]
                ,[quotation_class]
                ,[description]
                from [quotation_states] ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getEstadoMaterial(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
        [id]
        ,[nombre]
        from [estado_material] ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getFormulas(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
              [id]
              ,[formula]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              ,[name]
              ,[technique_id]
        from [formulas] where active=@active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getMallas(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
              [id]
              ,[name]
              ,[opening]
              ,[certified]
              ,[unit_id]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              from [meshes] where active=@active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }

    static async getMonedas(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
              [id]
              ,[name]
              ,[valor]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              ,[prefix]
              from [currencies] where active=@active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    } 
    
    static async getSampleTypes(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .query(`select  id, name ,description, active  from [sample_types] where active=@active ORDER BY ID ASC`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    } 

    static async getCondiciones(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .query(`select [id]
        ,[paragraph_1]
        ,[paragraph_2]
        ,[paragraph_3]
        ,[paragraph_4]
        ,[active]
        ,[title] from [general_conditions] where active=@active ORDER BY ID ASC`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    } 

    static async getElementosQuimicos(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
                [id]
              ,[name]
              ,[symbol]
              ,[element_type_id]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              from [chemical_elements] where active=@active ORDER BY NAME ASC`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }    

    static async getTipoDireccion(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
                [id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
        from [address_types] where active=@active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }   

    static async getCompanias(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('offset', sql.Int, Number(data.offset))
        .input('limit', sql.Int, Number(data.limit))
        .query(`select 
              [id]
              ,[rut]
              ,[dv]
              ,UPPER([name]) as [name]
              ,[fantasy_name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
              ,[allow_mails]
              from [companies] where active=@active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }  
    
    static async getCompaniasAll(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .query(`select 
                    [id]
                    ,[rut]
                    ,[dv]
                    ,UPPER([name]) as [name]
                    ,[fantasy_name]
                    ,[active]
                 from [companies] where active=@active ORDER BY [name] ASC `)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }   

    static async getCompaniaId(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('id', sql.Int, Number(data.id))
        .query(`select 
                 [id]
                ,[rut]
                ,[dv]
                ,UPPER([name]) as [name]
                ,[fantasy_name]
                ,[active]
        from [companies] where active=@active and id=@id`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }   

    static async getCompaniaRut(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('rut', sql.VarChar, String(data.rut))
        .query(`select 
                 [id]
                ,[rut]
                ,[dv]
                ,UPPER([name]) as [name]
                ,[fantasy_name]
                ,[active]
        from [companies] where active=@active and rut=@rut`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }   
    
    static async getDireccion(data, id){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('id', sql.Int, Number(id))
        .query(`SELECT ad.[id]
        ,ad.[address_street]
        ,ad.[address_number]
        ,ad.[observations]
        ,ad.[primary_email]
        ,ad.[secondary_email]
        ,ad.[primary_phone]
        ,ad.[secondary_phone]
        ,ad.[active]
        ,ad.[created]
        ,ad.[modified]
        ,com.[id] as id_comuna
        ,com.[name] as comuna
      ,reg.[id] as id_region
        ,reg.[name] as region
        ,pa.[id] as id_pais
        ,pa.[name] as pais
        ,adt.[id] as id_tipo_direccion
        ,adt.[name] as tipo_direccion
        ,ad.user_creator_id
        ,us.[username] as creator_user
        ,ad.user_modifier_id
        ,us2.[username] as modifier_user   
    FROM [addresses] ad INNER JOIN
    communes com ON ad.commune_id = com.id INNER JOIN 
    [countries] pa ON ad.country_id = pa.id INNER JOIN
    [address_types] adt ON ad.address_type_id = adt.id INNER JOIN 
    [users] us ON ad.user_creator_id = us.id INNER JOIN 
    [users] us2 ON ad.user_modifier_id = us2.id INNER JOIN 
    [regions] reg ON com.region_id = reg.id
    where ad.[company_id]=@id
    order by ad.id desc`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }    

    static async getMails(data, id){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('id', sql.Int, Number(id))
        .query(`select 
                [id]
                ,[company_id]
                ,[mail]
                ,[name]
                ,[user_creator_id]
                ,[user_modifier_id]
                ,[created]
                ,[modified]
                ,[active]
                from [company_mails] where active=@active and [company_id]=@id`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    } 

    static async getProyectos(data, id){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('id', sql.Int, Number(id))
        .query(`SELECT pr.[id]
        ,UPPER(pr.[name]) as proyecto
        ,pr.[active]
        ,pr.[user_creator_id]
        ,us.username as creador 
        ,pr.[created]
        FROM [projects] pr INNER JOIN users us  ON pr.user_creator_id = us.id
        left JOIN users mo ON pr.user_modifier_id = mo.id where pr.active=@active and pr.[company_id]=@id`)
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
        .query(`select 
        [id]
        ,[name]
        ,[active]
        ,[user_creator_id]
        ,[user_modifier_id]
        ,[created]
        ,[modified]
        from techniques where active = @active and id=@id`)
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
        .query(`select 
                [id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
        from [element_types] where active = @active and id=@id`)
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
        .query(`select 
                [id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[user_modifier_id]
              ,[created]
              ,[modified]
               from digestions where active = @active and id=@id`)
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
        case 'estados':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [states]`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break;      
        case 'escalas':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [scales]`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break;
        case 'etapas_de_requisicion':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [requisition_stages]`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break; 
        case 'estado_de_cotizacion':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [quotation_states]`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break; 
        case 'formulas':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [formulas] where active = @active`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break;       
        case 'mallas':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [meshes] where active = @active`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break;  
        case 'estado_material':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [estado_material]`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break; 
        case 'monedas':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [currencies] where active = @active`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break;   
        case 'elementos_quimicos':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [chemical_elements] where active = @active`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break;  
        case 'tipo_de_direccion':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [address_types] where active = @active`)
                }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
          
                }).catch(err => {
                  console.error(err);
                  sql.close();
                });
        break; 
        case 'compañias':
                return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('active', sql.Bit, Number(data.active))
                  .query(`select count(id) as total  from [companies] where active = @active`)
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