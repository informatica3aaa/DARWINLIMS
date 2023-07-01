import sql, { Bit } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';

class Requisitions {

    static async contador(data, query){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
       return pool.request()
       .input('active', sql.Bit, Number(1))
       .query(`SELECT count(re.[id]) as total
                    FROM [requisitions] re inner join companies co on re.company_id = co.id inner join quotations quo on re.quotation_id = quo.id
                    left join projects pr on quo.project_id = pr.id
                    where re.active =@active`)
                    }).then(result => {
       let rows = result.recordset;
       sql.close();
       return rows;
 
       }).catch(err => {
       console.error(err);
       sql.close();
       });
   
 }

 static async getAll(data){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('active', sql.Bit, Number(1))
      .input('offset', sql.Int, Number(data.offset))
      .input('limit', sql.Int, Number(data.limit))
      .query(`SELECT re.[id]
      ,re.[company_id]
	  ,co.[name] as company_name
      ,re.[quotation_id]
	  ,pr.[name] as project_name
      ,re.[entry_id]
      ,re.[box_id]
      ,re.[name]
      ,re.[sample_quantity]
      ,re.[observations]
      ,re.[created]
      ,re.[user_creator_id]
      ,re.[user_modifier_id]
      ,re.[in_warehouse]
      ,re.[active]
      ,re.[ot_number]
      ,re.[closed]
      ,re.[has_insert]
      ,re.[invoice_id]
      ,re.[requisition_stage_id]
      ,re.[adjunto]
      ,re.[con_resultados]
      ,re.[resultados_aprobados]
      ,re.[con_certificado]
      ,re.[certificado_aprobado]
      ,re.[certificado_rechazado]
      ,re.[returned]
      ,re.[returned_text]
      ,re.[returned_date]
      ,re.[returned_user_id]
      ,re.[observations_ingreso]
      ,re.[observations_aprobacion]
      ,re.[aprobado_cliente]
      ,re.[observacion_conformidad]
      ,re.[documento_aprobacion]
      ,re.[recepcion_conforme]
      ,re.[fecha_con_certificado]
      ,re.[fecha_resultados_aprobados]
      ,re.[usuario_certificado]
      ,re.[ot_repeticion]
      ,re.[ot_padre]
      ,re.[bin_reject_id]
      ,re.[approve_results_user]
      ,re.[eliminate_ot_file]
      ,re.[incomplete_text]
      ,re.[con_inserto]
      ,re.[inserto_finalizado]
      ,re.[inserto_fecha_fin]
      ,re.[modified]
      ,re.[destinatario]
      ,re.[iva]
      ,re.[neto]
      ,re.[bruto]
      ,re.[informe_enviado]
      ,re.[certificado_enviado]
  FROM [requisitions] re inner join companies co on re.company_id = co.id inner join quotations quo on re.quotation_id = quo.id
  left join projects pr on quo.project_id = pr.id
  where re.active=@active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  } 

  static async getUni(data){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('active', sql.Bit, Number(1))
      .input('id', sql.Int, Number(data.id))
      .query(`SELECT re.[id]
      ,re.[company_id]
	  ,co.[name] as company_name
      ,re.[quotation_id]
	  ,pr.[name] as project_name
      ,re.[entry_id]
      ,re.[box_id]
      ,re.[name]
      ,re.[sample_quantity]
      ,re.[observations]
      ,re.[created]
      ,re.[user_creator_id]
      ,re.[user_modifier_id]
      ,re.[in_warehouse]
      ,re.[active]
      ,re.[ot_number]
      ,re.[closed]
      ,re.[has_insert]
      ,re.[invoice_id]
      ,re.[requisition_stage_id]
      ,re.[adjunto]
      ,re.[con_resultados]
      ,re.[resultados_aprobados]
      ,re.[con_certificado]
      ,re.[certificado_aprobado]
      ,re.[certificado_rechazado]
      ,re.[returned]
      ,re.[returned_text]
      ,re.[returned_date]
      ,re.[returned_user_id]
      ,re.[observations_ingreso]
      ,re.[observations_aprobacion]
      ,re.[aprobado_cliente]
      ,re.[observacion_conformidad]
      ,re.[documento_aprobacion]
      ,re.[recepcion_conforme]
      ,re.[fecha_con_certificado]
      ,re.[fecha_resultados_aprobados]
      ,re.[usuario_certificado]
      ,re.[ot_repeticion]
      ,re.[ot_padre]
      ,re.[bin_reject_id]
      ,re.[approve_results_user]
      ,re.[eliminate_ot_file]
      ,re.[incomplete_text]
      ,re.[con_inserto]
      ,re.[inserto_finalizado]
      ,re.[inserto_fecha_fin]
      ,re.[modified]
      ,re.[destinatario]
      ,re.[iva]
      ,re.[neto]
      ,re.[bruto]
      ,re.[informe_enviado]
      ,re.[certificado_enviado]
  FROM [requisitions] re inner join companies co on re.company_id = co.id inner join quotations quo on re.quotation_id = quo.id
  left join projects pr on quo.project_id = pr.id
  where re.active=@active and re.id = @id`)
    }).then(result => {
      let rows = result.recordset[0];
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  } 

  static async mail(data){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int, Number(data.id))
      .query(`SELECT ma.[id]
      ,ma.[company_id]
      ,ma.[mail]
      ,ma.[name]
      ,ma.[active]
        FROM [company_mails] ma inner join  [requisition_company_mails] cm on ma.id = cm.company_mail_id 
        WHERE cm.requisition_id = @id`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  } 

  static async adjuntos(data){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int, Number(data.id))
      .query(`SELECT [id]
      ,[model]
      ,[requisition_id]
      ,[name]
      ,[attachment]
      ,[dir]
      ,[type]
      ,[size]
      ,[active]
      ,[module]
  FROM [requisition_attachments]
  where [requisition_id] = @id`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  } 

  static async historia(data){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int, Number(data.id))
      .query(`SELECT 
      re.[id]
      ,re.[requisition_id]
      ,et.[name]
      ,re.[requisition_stage_id]
      ,re.[created]
      FROM [requisitions_requisition_stages] re INNER JOIN [dbo].[requisition_stages] et
      on re.requisition_stage_id = et.id
      where re.[requisition_id] = @id`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  } 

  static async getAllFilter(data, where){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('offset', sql.Int, Number(data.offset))
      .input('limit', sql.Int, Number(data.limit))
      .query(`SELECT re.[id]
      ,re.[company_id]
	  ,co.[name] as company_name
      ,re.[quotation_id]
	  ,pr.[name] as project_name
      ,re.[entry_id]
      ,re.[box_id]
      ,re.[name]
      ,re.[sample_quantity]
      ,re.[observations]
      ,re.[created]
      ,re.[user_creator_id]
      ,re.[user_modifier_id]
      ,re.[in_warehouse]
      ,re.[active]
      ,re.[ot_number]
      ,re.[closed]
      ,re.[has_insert]
      ,re.[invoice_id]
      ,re.[requisition_stage_id]
      ,re.[adjunto]
      ,re.[con_resultados]
      ,re.[resultados_aprobados]
      ,re.[con_certificado]
      ,re.[certificado_aprobado]
      ,re.[certificado_rechazado]
      ,re.[returned]
      ,re.[returned_text]
      ,re.[returned_date]
      ,re.[returned_user_id]
      ,re.[observations_ingreso]
      ,re.[observations_aprobacion]
      ,re.[aprobado_cliente]
      ,re.[observacion_conformidad]
      ,re.[documento_aprobacion]
      ,re.[recepcion_conforme]
      ,re.[fecha_con_certificado]
      ,re.[fecha_resultados_aprobados]
      ,re.[usuario_certificado]
      ,re.[ot_repeticion]
      ,re.[ot_padre]
      ,re.[bin_reject_id]
      ,re.[approve_results_user]
      ,re.[eliminate_ot_file]
      ,re.[incomplete_text]
      ,re.[con_inserto]
      ,re.[inserto_finalizado]
      ,re.[inserto_fecha_fin]
      ,re.[modified]
      ,re.[destinatario]
      ,re.[iva]
      ,re.[neto]
      ,re.[bruto]
      ,re.[informe_enviado]
      ,re.[certificado_enviado]
  FROM [requisitions] re inner join companies co on re.company_id = co.id inner join quotations quo on re.quotation_id = quo.id
  left join projects pr on quo.project_id = pr.id
  WHERE ${where}  ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  } 

  static async addPaso1(data, user){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('company_id', sql.Int, Number(data.company_id))
      .input('quotation_id', sql.Int, Number(data.quotation_id))
      .input('name', sql.VarChar, data.name)
      .input('destinatario', sql.VarChar, data.destinatario)
      .input('observations', sql.VarChar, data.observations)
      .input('has_insert', sql.Bit, Number(data.has_insert))
      .input('sample_quantity', sql.Int, Number(data.sample_quantity))
      .input('user_creator_id', sql.Int, Number(user.id))
      .input('active', sql.Int, Number(0))
      .query(`INSERT INTO [requisitions] 
      (  [company_id]
        ,[quotation_id]
        ,[name]
        ,[destinatario]
        ,[observations]
        ,[has_insert]
        ,[sample_quantity]
        ,[created]
        ,[user_creator_id]
        ,[active]
        )  OUTPUT Inserted.*
         VALUES
        (
          @company_id
          ,@quotation_id
          ,@name
          ,@destinatario
          ,@observations
          ,@has_insert
          ,@sample_quantity
          ,CURRENT_TIMESTAMP
          ,@user_creator_id
          ,@active

        )`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async getMailClientes(id){
    console.log("333", id);
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int, Number(id))
      .query(`SELECT [id]
      ,[company_id]
      ,[mail]
      ,[name]
      ,[user_creator_id]
      ,[user_modifier_id]
      ,[created]
      ,[modified]
      ,[active]
      FROM [company_mails]
      where company_id= @id`)
    }).then(result => {
      console.log("result", result);
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async getListarIngresos(offset, limit){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('offset', sql.Int, Number(offset))
      .input('limit', sql.Int, Number(limit))
      .query(`
      select 
      en.id
      ,en.created
      ,UPPER(co.name) as cliente
      ,pr.name as proyecto
      ,re.name as requisicion
      ,re.ot_number
      ,en.sample_quantity
      ,st.name as tipo_muestra
      ,est.name as estado
      ,en.observation as observacion_ingreso
      ,re.observations
      ,tra.name as trasporte
      ,en.delivered_by as entregado_por
      ,concat (us1.name , ' ',  us1.lastname_f, ' ', us1.lastname_m) as recibido_por
      ,en.lumps_number as numero_bultos
      ,en.transport_guide_number as guia_despacho
      from
      entries en inner join companies co on 
      en.company_id = co.id left join projects pr on
      en.project_id = pr.id left join requisitions re on
      en.requisition_id = re.id left join sample_types st on
      en.sample_type_id = st.id left join states est on 
      en.state_id = est.id left join transport_types tra on
      en.transport_type_id = tra.id left join users us1 on 
      en.received_by = us1.id
      order by en.[id] desc OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
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

  static async getListarIngresoByEstado(offset, limit, state_id){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('offset', sql.Int, Number(offset))
      .input('limit', sql.Int, Number(limit))
      .input('state_id', sql.Int, Number(state_id))
      .query(`
      select 
      en.id
      ,en.created
      ,UPPER(co.name) as cliente
      ,pr.name as proyecto
      ,re.name as requisicion
      ,re.ot_number
      ,en.sample_quantity
      ,st.name as tipo_muestra
      ,est.name as estado
      ,en.observation as observacion_ingreso
      ,re.observations
      ,tra.name as trasporte
      ,en.delivered_by as entregado_por
      ,concat (us1.name , ' ',  us1.lastname_f, ' ', us1.lastname_m) as recibido_por
      ,en.lumps_number as numero_bultos
      ,en.transport_guide_number as guia_despacho
      from
      entries en inner join companies co on 
      en.company_id = co.id left join projects pr on
      en.project_id = pr.id left join requisitions re on
      en.requisition_id = re.id left join sample_types st on
      en.sample_type_id = st.id left join states est on 
      en.state_id = est.id left join transport_types tra on
      en.transport_type_id = tra.id left join users us1 on 
      en.received_by = us1.id
      where en.state_id = @state_id
      order by en.[id] desc OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
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

  static async contadorIngresos(){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .query(`
      select 
      count (en.id) as cantidad
      from
      entries en inner join companies co on 
      en.company_id = co.id left join projects pr on
      en.project_id = pr.id left join requisitions re on
      en.requisition_id = re.id left join sample_types st on
      en.sample_type_id = st.id left join states est on 
      en.state_id = est.id left join transport_types tra on
      en.transport_type_id = tra.id left join users us1 on 
      en.received_by = us1.id
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

  static async contadorIngresosByEstado(state_id){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('state_id', sql.Int, Number(state_id))
      .query(`
      select 
      count (en.id) as cantidad
      from
      entries en inner join companies co on 
      en.company_id = co.id left join projects pr on
      en.project_id = pr.id left join requisitions re on
      en.requisition_id = re.id left join sample_types st on
      en.sample_type_id = st.id left join states est on 
      en.state_id = est.id left join transport_types tra on
      en.transport_type_id = tra.id left join users us1 on 
      en.received_by = us1.id
      where en.state_id = @state_id
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
export default Requisitions;