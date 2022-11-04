import sql, { Bit } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';

class Cotizaciones {
    // ``
    static async getCotizaciones(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active))
          .input('offset', sql.Int, Number(data.offset))
          .input('limit', sql.Int, Number(data.limit))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[username] as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as quotation_state
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,quo.[ap_prod_user_id]
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
      FROM [quotations] quo 
      LEFT JOIN users us  ON quo.id = us.id 
      LEFT JOIN states st ON quo.state_id = st.id
      LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
      LEFT JOIN users us1  ON quo.user_creator_id = us1.id
      LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
      LEFT JOIN companies com ON quo.company_id = com.id
      LEFT JOIN projects pro ON quo.project_id = pro.id
      where quo.active=@active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      } 

      static async getCotizacionesAll(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active))
          .input('offset', sql.Int, Number(data.offset))
          .input('limit', sql.Int, Number(data.limit))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[username] as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as quotation_state
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,quo.[ap_prod_user_id]
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
      FROM [quotations] quo 
      LEFT JOIN users us  ON quo.id = us.id 
      LEFT JOIN states st ON quo.state_id = st.id
      LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
      LEFT JOIN users us1  ON quo.user_creator_id = us1.id
      LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
      LEFT JOIN companies com ON quo.company_id = com.id
      LEFT JOIN projects pro ON quo.project_id = pro.id
          where quo.active=@active ORDER BY ID DESC`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      } 
  
    static async getCotizacionesCondicional(query, data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('offset', sql.Int, Number(data.offset))
          .input('limit', sql.Int, Number(data.limit))
          .query(`SELECT quo.[id]
            ,quo.[user_id]
            ,us.[username]
            ,quo.[active]
            ,quo.[quotation_number]
            ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
            ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
            ,quo.[company_id]
            ,com.[name] as company_name
            ,com.[fantasy_name] 
            ,quo.[estimated_days]
            ,quo.[project_id]
            ,pro.[name] as project
            ,pro.[active] as project_state
            ,quo.[parent_id]
            ,quo.[version]
            ,quo.[state_id]
            ,st.[name] as estado
            ,quo.[currency_id]
            ,quo.[specific_condition]
            ,quo.[general_condition_id]
            ,gc.[title]
            ,quo.[user_creator_id]
            ,us1.[username] as user_creator
            ,quo.[user_modifier_id]
            ,CONVERT(varchar,quo.[created], 103) as created
            ,CONVERT(varchar,quo.[modified], 103) as modified
            ,quo.[adjunto]
            ,quo.[for]
            ,quo.[quotation_comment]
            ,quo.[quotation_state_id]
            ,qs.[name] as quotation_state
            ,qs.[quotation_class]
            ,qs.[description]
            ,quo.[ap_ventas]
            ,quo.[ap_prod]
            ,quo.[ap_ven_user_id]
            ,quo.[ap_prod_user_id]
            ,quo.[reject_comment]
            ,quo.[reject_user_id]
            ,quo.[ap_ven_date]
            ,quo.[ap_prod_date]
            FROM [quotations] quo 
            LEFT JOIN users us  ON quo.id = us.id 
            LEFT JOIN states st ON quo.state_id = st.id
            LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
            LEFT JOIN users us1  ON quo.user_creator_id = us1.id
            LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
            LEFT JOIN companies com ON quo.company_id = com.id
            LEFT JOIN projects pro ON quo.project_id = pro.id where ${ query }
            ORDER BY ID DESC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      } 

    static async getCotizacionesId(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active))
          .input('id', sql.Int, Number(data.id))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[username] as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as estado_interno
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,us2.username as ap_ven_user
          ,quo.[ap_prod_user_id]
          ,us3.username as ap_prod_user
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,us4.[username] as reject_user
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
      FROM [quotations] quo 
      LEFT JOIN users us  ON quo.id = us.id 
      LEFT JOIN states st ON quo.state_id = st.id
      LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
      LEFT JOIN users us1  ON quo.user_creator_id = us1.id
      LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
      LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
      LEFT JOIN users us4 ON quo.reject_user_id = us4.id
      LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
      LEFT JOIN companies com ON quo.company_id = com.id
      LEFT JOIN projects pro ON quo.project_id = pro.id
          where quo.active=@active and quo.id=@id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      }  

    static async getCotizacionesIdCompany(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active))
          .input('id', sql.Int, Number(data.id))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[username] as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as estado_interno
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,us2.username as ap_ven_user
          ,quo.[ap_prod_user_id]
          ,us3.username as ap_prod_user
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,us4.[username] as reject_user
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
          FROM [quotations] quo 
          LEFT JOIN users us  ON quo.id = us.id 
          LEFT JOIN states st ON quo.state_id = st.id
          LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
          LEFT JOIN users us1  ON quo.user_creator_id = us1.id
          LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
          LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
          LEFT JOIN users us4 ON quo.reject_user_id = us4.id
          LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
          LEFT JOIN companies com ON quo.company_id = com.id
          LEFT JOIN projects pro ON quo.project_id = pro.id
          where quo.active=@active and quo.company_id=@id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      }  
    
    static async getCotizacionesHistorial(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('company_id', sql.Int, Number(data.company_id))
          .input('project_id', sql.Int, Number(data.project_id))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[username] as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as estado_interno
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,us2.username as ap_ven_user
          ,quo.[ap_prod_user_id]
          ,us3.username as ap_prod_user
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,us4.[username] as reject_user
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
            FROM [quotations] quo 
            LEFT JOIN users us  ON quo.id = us.id 
            LEFT JOIN states st ON quo.state_id = st.id
            LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
            LEFT JOIN users us1  ON quo.user_creator_id = us1.id
            LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
            LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
            LEFT JOIN users us4 ON quo.reject_user_id = us4.id
            LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
            LEFT JOIN companies com ON quo.company_id = com.id
            LEFT JOIN projects pro ON quo.project_id = pro.id
            where quo.company_id=@company_id and quo.project_id=@project_id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      }  
      static async getCotizacionesHistorialComp(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('company_id', sql.Int, Number(data.company_id))
          .input('active', sql.Bit, Number(data.active))
          .input('offset', sql.Int, Number(data.offset))
          .input('limit', sql.Int, Number(data.limit))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[username] as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as estado_interno
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,us2.username as ap_ven_user
          ,quo.[ap_prod_user_id]
          ,us3.username as ap_prod_user
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,us4.[username] as reject_user
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
            FROM [quotations] quo 
            LEFT JOIN users us  ON quo.id = us.id 
            LEFT JOIN states st ON quo.state_id = st.id
            LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
            LEFT JOIN users us1  ON quo.user_creator_id = us1.id
            LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
            LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
            LEFT JOIN users us4 ON quo.reject_user_id = us4.id
            LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
            LEFT JOIN companies com ON quo.company_id = com.id
            LEFT JOIN projects pro ON quo.project_id = pro.id
            where quo.active=@active and quo.company_id=@company_id  ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
      }  

    static async getCondicionesEspecificas(id){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(id))
            .query(`SELECT [id]
                    ,[paragraph_1]
                    ,[paragraph_2]
                    ,[paragraph_3]
                    ,[paragraph_4]
                    , CONVERT(varchar,[created], 103) as created_cond
                    , CONVERT(varchar,[modified], 103) as modified_cond
                    ,[active] as estado_cond
                    ,[title]
                    FROM [general_conditions]
                    where id =@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
      }

    static async getAdjuntosCotizacion(id){

        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(id))
            .query(`SELECT * FROM  quotation_attachments where quotation_id =@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
      }      
    
    static async getDetallesCotizacion(id){

        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(id))
            .query(`SELECT qd.[id]
            ,qd.[assay_id]
            ,qd.[quotation_id]
            ,qd.[active]
            ,ass.[currency_id]
            ,qd.[price]
            ,ass.[cost]
            ,cu.prefix as divisa
            ,ass.[id] as id_assay
            ,ass.[assay_type_id]
            ,ast.[name] as tipo
            ,ass.[technique_id]
            ,tec.[name] as tecnica
            ,ass.[sample_type_id]
            ,sa.[name] as tipo_muestra
            ,ass.[digestion_id]
            ,dig.[name] as digestion
            ,ass.[name] as assay_name
            ,ass.[description]
            ,ass.[method_id]
            ,me.[name] as metodo
            ,ass.[nominal_weight]
            ,ass.[nominal_volume]
            ,ass.[volume_unity_id]
            ,vol.[name] as volumen
            ,ass.[mass_unity_id]
            ,ma.[name] as peso
            ,ass.[user_creator_id]
            ,ass.[user_modifier_id]
            , CONVERT(varchar,ass.[created], 103) as fecha_created
            , CONVERT(varchar,ass.[modified], 103) as fecha_modified
            ,ass.[unit_id]
            ,ass.[fin]
            ,ass.[assay_file]
            ,ass.[extensive_description]
            ,ass.[short_description]
        FROM [quotation_details] qd 
        INNER JOIN assays ass ON qd.assay_id = ass.id
        LEFT JOIN currencies cu ON ass.currency_id = cu.id
        LEFT JOIN assay_types ast ON ass.assay_type_id = ast.id
        LEFT JOIN techniques tec ON ass.technique_id = tec.id
        LEFT JOIN sample_types sa ON ass.sample_type_id = sa.id
        LEFT JOIN digestions dig ON ass.digestion_id = dig.id
        LEFT JOIN units vol ON ass.volume_unity_id = vol.id
        LEFT JOIN units ma ON ass.mass_unity_id = ma.id
        LEFT JOIN methods me ON ass.method_id = me.id where quotation_id =@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
    }

    static async getEtapasCotizacion(assay_id){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(assay_id))
            .query(`SELECT pa.[id]
            ,ph.[name] as etapa
            ,ph.[variable]
            ,pa.[phase_id]
            ,pa.[assay_id]
            ,pa.[order]
            FROM [phase_assays] pa 
            LEFT JOIN phases ph ON pa.phase_id = ph.id
            where pa.assay_id =@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
    }

    static async getDetallesElementosCotizacion(id){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(id))
            .query(`SELECT ea.[id]
                    ,ea.[chemical_element_id]
                    ,ce.[name] as elemento
                    ,ea.[unit_id]
                    ,un.[name] as unidad
                    ,ea.[assay_id]
                    ,ea.[valor_f]
                    ,ea.[formula_id]
                    ,fo.[formula] as formula
                    ,ea.[limite_inferior]
                    ,ea.[limite_superior]
                    ,ea.[active]
                    ,ea.[decimals]
                    ,ea.[symbol_limite_inferior]
                    ,ea.[symbol_limite_superior]
                    FROM [lims01].[dbo].[element_assays] ea
                    LEFT JOIN formulas fo ON ea.formula_id = fo.id
                    LEFT JOIN units un ON ea.unit_id = un.id
                    LEFT JOIN chemical_elements ce ON ea.chemical_element_id = ce.id
                    where assay_id =@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          }); 
    }

    static async ContTools(data, query){
        switch(data.tipo){
          case 'cotizaciones':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('active', sql.Bit, Number(data.active))
              .query(`select count(id) as total  from [quotations] where active = @active`)
            }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;
      
            }).catch(err => {
              console.error(err);
              sql.close();
            });
    break;
          case 'cotizacion':
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active))
          .input('id', sql.Bit, Number(data.id))
          .query(`select count(id) as total  from [quotations] where active = @active and id=@id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
break;  
          case 'filtros':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .query(`SELECT count(quo.[id]) as total
                    FROM [quotations] quo 
                    LEFT JOIN users us  ON quo.id = us.id 
                    LEFT JOIN states st ON quo.state_id = st.id
                    LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
                    LEFT JOIN users us1  ON quo.user_creator_id = us1.id
                    LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
                    LEFT JOIN companies com ON quo.company_id = com.id
                    LEFT JOIN projects pro ON quo.project_id = pro.id where ${ query }`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
        break; 
          case 'historial':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('company_id', sql.Int, Number(data.company_id))
            .input('project_id', sql.Int, Number(data.project_id))
            .query(`SELECT count(quo.[id]) as total
                    FROM [quotations] quo 
                    LEFT JOIN users us  ON quo.id = us.id 
                    LEFT JOIN states st ON quo.state_id = st.id
                    LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
                    LEFT JOIN users us1  ON quo.user_creator_id = us1.id
                    LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
                    LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
                    LEFT JOIN users us4 ON quo.reject_user_id = us4.id
                    LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
                    LEFT JOIN companies com ON quo.company_id = com.id
                    LEFT JOIN projects pro ON quo.project_id = pro.id
                    where quo.company_id=@company_id and quo.project_id=@project_id`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
          break;  
          case 'historialxcompañia':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('company_id', sql.Int, Number(data.company_id))
            .query(`SELECT count(quo.[id]) as total
                    FROM [quotations] quo 
                    LEFT JOIN users us  ON quo.id = us.id 
                    LEFT JOIN states st ON quo.state_id = st.id
                    LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
                    LEFT JOIN users us1  ON quo.user_creator_id = us1.id
                    LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
                    LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
                    LEFT JOIN users us4 ON quo.reject_user_id = us4.id
                    LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
                    LEFT JOIN companies com ON quo.company_id = com.id
                    LEFT JOIN projects pro ON quo.project_id = pro.id
                    where quo.company_id=@company_id`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
          break;    
          case 'proyectos':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('company_id', sql.Int, Number(data.company_id))
            .input('active', sql.Bit, Number(data.active))
            .query(`SELECT count([id]) as total FROM [projects] WHERE active=@active and company_id=@company_id`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
          break
          case 'servicios':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('company_id', sql.Int, Number(data.company_id))
            .input('active', sql.Bit, Number(data.active))
            .query(`SELECT count([id]) as total FROM [projects] WHERE active=@active and company_id=@company_id`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
          break
          default:
              throw new Error(`No existe tipo ${ data.tipo} para contar registros, revise su información`)  
      }
  
        
  
    }

    static async updateAccion(data, usuario){
      switch(data.accion){
          case 'aprobar_venta':
              return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('id', sql.Int, Number(data.id))
              .input('active', sql.Bit, Number(data.active))
              .input('state_id', sql.Int, Number(data.state_id))
              .input('user_id', sql.Int, Number(usuario.id))
              .query(`UPDATE [quotations] SET
                      [ap_ventas] = @active,
                      [ap_ven_user_id]= @user_id,
                      [ap_ven_date]= CURRENT_TIMESTAMP,
                      [modified]=CURRENT_TIMESTAMP OUTPUT Inserted.*
                      WHERE id=@id and active=@active`)
              }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;

              }).catch(err => {
              console.error(err);
              sql.close();
              });
            break;
          case 'aprobar_produccion':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('id', sql.Int, Number(data.id))
              .input('active', sql.Bit, Number(data.active))
              .input('state_id', sql.Int, Number(data.state_id))
              .input('user_id', sql.Int, Number(usuario.id))
              .query(`UPDATE [quotations] SET
                      [state_id] = @state_id,
                      [ap_prod] = @active,
                      [ap_prod_user_id]=@user_id,
                      [ap_prod_date]=CURRENT_TIMESTAMP,
                      [modified]=CURRENT_TIMESTAMP  OUTPUT Inserted.*
                      WHERE id=@id and active=@active`)
              }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;

              }).catch(err => {
              console.error(err);
              sql.close();
              });
            break;
          case 'rechazar':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('id', sql.Int, Number(data.id))
              .input('active', sql.Bit, Number(data.active))
              .input('state_id', sql.Int, Number(data.state_id))
              .input('user_id', sql.Int, Number(usuario.id))
              .input('comment', sql.Text, data.comentario)         
              .query(`UPDATE [quotations] SET
                      [state_id] = @state_id,
                      [user_modifier_id]=@user_id,
                      [reject_user_id] =@user_id,
                      [reject_comment]= @comment,
                      [modified]=CURRENT_TIMESTAMP OUTPUT Inserted.*
                      WHERE id=@id and active=@active`)
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
              throw new Error('No existe tipo accion para terminar el proceso, revise su información')  
          }
    }  

    static async consultaEstadoCotizacion(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, Number(data.id))
        .input('active', sql.Bit, Number(data.active))
        .query(`SELECT *  FROM [quotations] where ap_ventas = @active and ap_prod = @active and id=@id`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }   
    
    static async cambiaEstadoCotizacion(data, usuario){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, Number(data.id))
        .input('active', sql.Bit, Number(data.active))
        .input('state_id', sql.Int, Number(data.state_id))
        .input('user_id', sql.Int, Number(usuario.id))
        .query(`UPDATE [quotations] SET
                [state_id] = @state_id,
                [user_modifier_id]=@user_id,
                [modified]=CURRENT_TIMESTAMP OUTPUT Inserted.*
                WHERE id=@id and active=@active`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    }  
    
    static async addCotizacion(data, usuario){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('user_id', sql.Int, Number(usuario.id))
        .input('active', sql.Bit, Number(data.active))
        .input('quotation_number', sql.VarChar, data.quotation_number)
        .input('start_date', sql.VarChar, data.start_date)
        .input('expiration_date', sql.VarChar, data.expiration_date)
        .input('company_id', sql.Int, Number(data.company_id))
        .input('estimated_days', sql.Int, Number(data.estimated_days))
        .input('project_id', sql.Int, Number(data.project_id) ? Number(data.project_id) : null )
        .input('version', sql.Int, Number(data.version))
        .input('state_id', sql.Int, Number(data.state_id))
        .input('currency_id', sql.Int, Number(data.currency_id))
        .input('specific_condition', sql.VarChar, data.specific_condition)
        .input('general_condition_id', sql.Int, Number(data.general_condition_id))
        .input('for', sql.VarChar, data.destinatario)
        .input('quotation_state_id', sql.Int, Number(data.quotation_state_id))
        .input('parent_id', sql.Int, Number(data.parent_id))
        .query(`INSERT INTO [quotations]
                ([user_id]
                ,[active]
                ,[quotation_number]
                ,[start_date]
                ,[expiration_date]
                ,[company_id]
                ,[estimated_days]
                ,[project_id]
                ,[version]
                ,[state_id]
                ,[currency_id]
                ,[specific_condition]
                ,[general_condition_id]
                ,[user_creator_id]
                ,[created]
                ,[for]
                ,[quotation_state_id]
                ,[ap_ventas]
                ,[ap_prod]
                ,[parent_id]
                ) OUTPUT Inserted.* 
                VALUES(
                @user_id, 
                @active, 
                @quotation_number,
                @start_date, 
                @expiration_date,
                @company_id, 
                @estimated_days, 
                @project_id,
                @version,
                @state_id,
                @currency_id,
                @specific_condition,
                @general_condition_id,
                @user_id,
                CURRENT_TIMESTAMP,
                @for,
                @quotation_state_id,
                @active,
                @active,
                @parent_id)`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    } 
    
    static async addDetallesCotizacion(data, usuario){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('user_id', sql.Int, Number(usuario.id))
        .input('active', sql.Bit, Number(data.active))
        .input('quotation_id', sql.Int, Number(data.quotation_id))
        .input('assay_id', sql.Int, Number(data.assay_id))
        .input('price', sql.Float, data.price)
        .query(`INSERT INTO [quotation_details]
                 ([assay_id]
                ,[quotation_id]
                ,[active]
                ,[price]
                ,[user_creator_id]
                ,[created]) OUTPUT Inserted.* 
                VALUES (
                @assay_id, 
                @quotation_id,
                @active, 
                @price,
                @user_id, 
                CURRENT_TIMESTAMP )`)
        }).then(result => {
          console.log("resultado:::", result);
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    }

    static async addCotizacionFin(data, usuario){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('user_id', sql.Int, Number(usuario.id))
        .input('active', sql.Bit, Number(data.active))
        .input('quotation_id', sql.Int, Number(data.quotation_id))
         .query(`UPDATE [quotations] SET 
                [active]=@active
                ,[user_modifier_id]=@user_id
                ,[modified]=CURRENT_TIMESTAMP OUTPUT Inserted.* 
                where id = @quotation_id`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    } 

    static async getServiciosAnaliticos(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('id', sql.Int, Number(data.assay_id))
        .query(`SELECT 
                      ass.[id]
                      ,ass.[assay_type_id]
                      ,tp.[name] as assay_name
                      ,ass.[method_id]
                      ,mt.[name] as method_name
                      ,ass.[technique_id]
                      ,tc.[name]  as technique_name
                      ,ass.[sample_type_id]
                      ,st.[name] as sample_type_name
                      ,ass.[digestion_id]
                      ,dg.[name] as digestion_name
                      ,ass.[volume_unity_id]
                      ,ass.[nominal_volume]
                      ,un.[name] as volume_name
                      ,ass.[mass_unity_id]
                      ,ass.[nominal_weight]
                      ,un1.[name] as mass_name
                      ,ass.[unit_id]
                      ,ass.[currency_id]
                      ,cu.prefix as currency_name
                      ,ass.[name]
                      ,ass.[active]
                      ,ass.[description]
                      ,ass.[cost]
                      ,ass.[user_creator_id]
                      ,ass.[user_modifier_id]
                      ,ass.[created]
                      ,ass.[modified]
                      ,ass.[fin]
                      ,ass.[assay_file]
                      ,ass.[extensive_description]
                      ,ass.[short_description]
              FROM [lims01].[dbo].[assays] ass LEFT JOIN 
              assay_types tp ON ass.assay_type_id = tp.id LEFT JOIN 
              methods mt ON ass.method_id = mt.id LEFT JOIN 
              techniques tc ON ass.technique_id = tc.id LEFT JOIN 
              sample_types st ON ass.sample_type_id = st.id LEFT JOIN 
              digestions dg ON ass.digestion_id = dg.id LEFT JOIN
              currencies cu ON ass.currency_id = cu.id LEFT JOIN
              [units] un ON ass.volume_unity_id = un.id LEFT JOIN
              [units] un1 ON ass.mass_unity_id = un1.id
              WHERE ass.active=@active and ass.[id]= @id`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    }

    static async getFasesServiciosAnaliticos(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, Number(data.id))
        .query(`SELECT fa.[id]
                ,fa.[phase_id]
                ,fh.[name] as fase
                ,fa.[assay_id]
                ,fa.[order]
                FROM [lims01].[dbo].[phase_assays] fa LEFT JOIN phases fh On fa.phase_id = fh.id where fa.assay_id = @id order by fa.[order] asc`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    }

    static async getServiciosAnaliticosAll(data){
         return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .query(`SELECT 
                   ass.[id]
                  ,ass.[name]
                  ,ass.[extensive_description]
                  ,ass.[short_description]
                  FROM [lims01].[dbo].[assays] ass 
                  WHERE ass.active=@active ORDER BY ass.[name] ASC`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    } 
    
    static async getProjectIdCompany(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('company_id', sql.Int, Number(data.company_id))
        .query(`SELECT [id]
        ,[company_id]
        ,UPPER([name]) as name
        ,[active]
        ,[user_creator_id]
        ,[user_modifier_id]
        ,[created]
        ,[modified] FROM [projects] WHERE active=@active and company_id=@company_id ORDER BY [name] ASC`)
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

    export default Cotizaciones;