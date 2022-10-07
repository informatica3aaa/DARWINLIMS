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
      INNER JOIN users us  ON quo.id = us.id 
      INNER JOIN states st ON quo.state_id = st.id
      INNER JOIN general_conditions gc ON quo.general_condition_id = gc.id
      INNER JOIN users us1  ON quo.user_creator_id = us1.id
      INNER JOIN quotation_states qs ON quo.quotation_state_id = qs.id
      INNER JOIN companies com ON quo.company_id = com.id
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
            INNER JOIN users us  ON quo.id = us.id 
            INNER JOIN states st ON quo.state_id = st.id
            INNER JOIN general_conditions gc ON quo.general_condition_id = gc.id
            INNER JOIN users us1  ON quo.user_creator_id = us1.id
            INNER JOIN quotation_states qs ON quo.quotation_state_id = qs.id
            INNER JOIN companies com ON quo.company_id = com.id
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
                    INNER JOIN users us  ON quo.id = us.id 
                    INNER JOIN states st ON quo.state_id = st.id
                    INNER JOIN general_conditions gc ON quo.general_condition_id = gc.id
                    INNER JOIN users us1  ON quo.user_creator_id = us1.id
                    INNER JOIN quotation_states qs ON quo.quotation_state_id = qs.id
                    INNER JOIN companies com ON quo.company_id = com.id
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
          default:
              throw new Error('No existe tipo para realizar consulta, revise su información')  
      }
  
        
  
      }
    }
    export default Cotizaciones;