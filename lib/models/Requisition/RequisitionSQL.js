import sql, { Bit } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';

class Requisitions {

    static async contador(data, query){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
       return pool.request()
       .input('active', sql.Bit, Number(data.active))
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
      .input('active', sql.Bit, Number(data.active))
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
      .input('active', sql.Bit, Number(data.active))
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





}
export default Requisitions;