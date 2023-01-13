import { Router } from 'express';
import * as CoreCotizacion from './core-cotizacion';
import * as CoreLog from '../log/core-log'
import { QuotationPDF, QuotationWord } from '../../../lib/themplates/pdf/quotation';

class Cotizacion{

    constructor(){
        /**
         * @openapi
         * tags:
         *  name:  quotations
         *  description: API para Cotizaciones
        */

const api = Router();
        api.post('/', this.listar); 
        api.post('/all', this.getAllQuotations);
        //refactorizacion
        api.post('/allquo', this.getAllQuotationsV1);
        api.post('/download', this.dowloadQuotation);
        api.post('/quo', this.getQuo);
        api.get('/:id/:active', this.getQuotation);
        // api.post('/filter', this.getAllQuotationsFilter);
        api.post('/filter', this.getAllFilter);
        api.get('/history/:company_id/project/:project_id', this.getHistory);
        api.post('/history', this.getHistoryCompany);
        api.get('/project/:active/company/:company_id', this.getProject);
        api.get('/services/active/:active', this.getServicios );
        api.get('/service/active/:active/assay/:assay_id', this.getService);
        api.post('/accion',this.acciones); 
        api.post('/action',this.approveQuotation); 
        api.post('/new',this.newQuotation);
        api.post('/new/detail',this.newQuotationDetail);
        api.post('/new/end',this.newQuotationEnd);
        api.get('/validate',this.validateQuotation);
        api.get('/pending',this.pendingQuotation);
        
        return api;
    };

    async listar(req, res) {
console.log("aca..a");
        try {
            const log = CoreLog.addHistory(req, req.user)
            let result;
            let validacion;
            let contador;
            switch(req.body.tipo){
                case 'cotizaciones':
                        validacion = await CoreCotizacion.validaActive(req.body);//[quotations]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break;  
                case 'cotizacion':
                        validacion = await CoreCotizacion.validaActive(req.body);//[quotations_con_detalles]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break; 
                case 'filtros':
                        validacion = await CoreCotizacion.validaActive(req.body);//[busqueda de cotizacion por filtros dinamicos]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break; 
                case 'historial':
                        validacion = await CoreCotizacion.validaActive(req.body);//[historial]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break;
                case 'proyectos':
                        validacion = await CoreCotizacion.validaActive(req.body);//[project x company_id]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break;  
                case 'servicios':
                    validacion = await CoreCotizacion.validaActive(req.body);//[project x company_id]
                    result = await CoreCotizacion.getCotizacion(req.body);
                break; 
                case 'servicio':
                    validacion = await CoreCotizacion.validaActive(req.body);//[project x company_id]
                    result = await CoreCotizacion.getCotizacion(req.body);
                break;   
                default:
                    throw new Error(`No existe el tipo acción ${ req.body.tipo}, consulte listado valido`)  
            }
            return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }
    }
    
    async getAllQuotations (req, res){
        try {
            req.body.tipo='cotizaciones';
            const validacion = await CoreCotizacion.validaActive(req.body);//[quotations]
            const result = await CoreCotizacion.getCotizacion(req.body);
            const contador = await CoreCotizacion.getContadores(req.body) 
            return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
        }

    } 


    async getAllQuotationsV1 (req, res){
        console.log("aca:::.");
        try {
            const validacion = await CoreCotizacion.validaActiveAllQuo(req.body);//[quotations]
            const result = await CoreCotizacion.getCotizacionAllQuo(req.body);
            const contador = await CoreCotizacion.getContadoresAllQuo(req.body) 
            return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
        }

    } 

    async getQuo (req, res){
        try {
            const validacion = await CoreCotizacion.validaActiveQuo(req.body);//[quotations]
            const result = await CoreCotizacion.getCotizacionQuo(req.body);
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
        }

    } 

    async getQuotation(req, res){

        try {
            req.params.tipo='cotizacion';
            let validacion = await CoreCotizacion.validaActive(req.params);//[quotations_con_detalles]
            let result = await CoreCotizacion.getCotizacion(req.params);
            let contador = await CoreCotizacion.getContadores(req.params)
            return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
        }
        
    }

    async getAllFilter(req, res){
        console.log("filter", req.body);
        try {
        const  validacion = await CoreCotizacion.validaActiveFilter(req.body);//[busqueda de cotizacion por filtros dinamicos]
        const  result = await CoreCotizacion.getCotizacionFilter(req.body);
        const  contador = await CoreCotizacion.getContadoresFilter(req.body)
         return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
     } catch (error) {
         return res.status(200).json({ ok: false ,msg: error.message });  
     }
     }

    async getAllQuotationsFilter(req, res){
       try {
       req.body.tipo='filtros'
       const  validacion = await CoreCotizacion.validaActive(req.body);//[busqueda de cotizacion por filtros dinamicos]
       const  result = await CoreCotizacion.getCotizacion(req.body);
       const  contador = await CoreCotizacion.getContadores(req.body)
        return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });  
    }
    }

    async getHistory(req, res){
        try {
            req.params.tipo ='historial';
            const validacion = await CoreCotizacion.validaActive( req.params);//[historial]
            const result = await CoreCotizacion.getCotizacion( req.params);
            const contador = await CoreCotizacion.getContadores( req.params) 
            return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }
    }

    async getHistoryCompany(req, res){
        try {
            req.body.tipo ='historialxcompañia';
            const validacion = await CoreCotizacion.validaActive( req.body);//[historialxconañia]
            const result = await CoreCotizacion.getCotizacion( req.body);
            const contador = await CoreCotizacion.getContadores( req.body) 
            return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }
    }

    async getProject(req, res){
            try {
                req.params.tipo = 'proyectos'
                const validacion = await CoreCotizacion.validaActive(req.params);//[project x company_id]
                const result = await CoreCotizacion.getCotizacion(req.params);
                const contador = await CoreCotizacion.getContadores(req.params)
                return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
            } catch (error) {
                return res.status(200).json({ ok: false ,msg: error.message });  
                
            }
    }

    async getServicios(req, res){
        try {
            req.params.tipo = 'servicios'
            const validacion = await CoreCotizacion.validaActive(req.params);//[project x company_id]
            const result = await CoreCotizacion.getCotizacion(req.params);
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }
    }

    async getService(req, res){
        try {
            req.params.tipo = 'servicio'
            const validacion = await CoreCotizacion.validaActive(req.params);//[project x company_id]
            const result = await CoreCotizacion.getCotizacion(req.params);
            return res.status(200).json({ ok: true,  data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }
    }


    async acciones(req, res){
        let result;
        let validacion;
        try {
            // const log = CoreLog.addHistory(req, req.user)
            validacion = await CoreCotizacion.validaAccion(req.body);
            result = await CoreCotizacion.cotizacionAccion(req.body,  req.user);
                return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }  
    }

    //ACCIONES
    async approveQuotation(req, res){
        try {
          const  validacion = await CoreCotizacion.validaAction(req.body);
          const result = await CoreCotizacion.cotizacionAccion(req.body,  req.user);
                return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }  
    }

    async newQuotation(req, res){
        try {
          req.body.accion ='nueva_cotizacion'
          const cotizacion = await CoreCotizacion.validarCotizacion(req.body, req.user);
          const validacion = await CoreCotizacion.validaNew(req.body);
          const result = await CoreCotizacion.cotizacionAccion(req.body,  req.user);
                return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }  
    }

    async newQuotationDetail(req, res){
        try {
            req.body.accion ='detalle_cotizacion'
          const  validacion = await CoreCotizacion.validaNewDetail(req.body);
          const result = await CoreCotizacion.cotizacionAccion(req.body,  req.user);
                return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }  
    }
  
    async newQuotationEnd(req, res){
        try {
          req.body.accion ='nueva_cotizacion_fin'
          const  validacion = await CoreCotizacion.validaNewEnd(req.body);
          const result = await CoreCotizacion.cotizacionAccion(req.body,  req.user);
                return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }  
    }

    async validateQuotation(req, res){
        try {
            const result = await CoreCotizacion.validarCotizacion(req.body, req.user);
                  return res.status(200).json({ ok: true, data: 'no tiene cotizaciones pendientes por terminar' }); 
          } catch (error) {
              return res.status(200).json({ ok: false ,msg: error.message });  
          }   
    }

    async pendingQuotation(req, res){
        try {
            const result = await CoreCotizacion.cotizacionPendientes(req.body, req.user);
                  return res.status(200).json({ ok: true, data: result}); 
          } catch (error) {
              return res.status(200).json({ ok: false ,msg: error.message });  
          }   
    }

    // DESCARGAS
    async dowloadQuotation(req, res){
        try {
            let validacion = await CoreCotizacion.validaActiveQuo(req.body);//[quotations_con_detalles]
            let result = await CoreCotizacion.getCotizacionDown(req.body);
            // console.log("falta desarrollo");
            if(!req.body.download){
                return res.status(200).json({ ok: false ,msg: "Falta el tipo de documento que desea descargar" }); 
            }
            if(req.body.download == 'pdf'){
                let pdfDoc = await QuotationPDF(result);
                res.setHeader('Content-type', 'application/pdf')
                res.setHeader('Content-disposition', 'inline; filename="CertificadoRendiciones.pdf"')
                pdfDoc.pipe(res); 
                pdfDoc.end();
            }
            if(req.body.download == 'word'){
                
            }
            
        } catch (error) {
            console.log("error pdf::::", error);
            return res.status(200).json({ ok: false ,msg: error.message }); 
        }
    }

}
export default Cotizacion;