import { Router } from 'express';
import * as CoreCotizacion from './core-cotizacion';
import * as CoreLog from '../log/core-log'
import { QuotationPDF,QuotationPDF64, QuotationWord } from '../../../lib/themplates/pdf/quotation';
import fs from 'fs';

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
        api.post('/services', this.getServiciosFilter );
        api.get('/service/active/:active/assay/:assay_id', this.getService);
        api.post('/accion',this.acciones); 
        api.post('/action',this.approveQuotation); 
        api.post('/new',this.newQuotation);
        api.post('/new/detail',this.newQuotationDetail);
        api.post('/new/end',this.newQuotationEnd);
        api.get('/validate',this.validateQuotation);
        api.get('/pending',this.pendingQuotation);
        api.get('/number/:id',this.buscarXnumber);
        api.post('/cargarservicios',this.cargarService);        
        api.post('/buscar',this.cargarService);  
        api.get('/list',this.listarQuotationAll);   
        api.post('/parent', this.parent);
        api.post('/upestado',this.upestado)
        api.post('/pendingquotations', this.listarPendientes)
        api.post('/por_vencer', this.por_vencer)
        api.post('/quotation_validity', this.estadoInterno)
        api.post('/clonar', this.clonarPaso1)
        api.post('/clonar-fin', this.clonarPaso2)
        api.post('/anular-det', this.anularDetalle)
        api.post('/destinatarios', this.getDestinatarios)
        api.post('/destinatario/crear', this.creaDestinatario)
        api.post('/quo-status', this.quoStatus)


  
        
        return api;
    };

async quoStatus (req, res){
        try {
            const result = await CoreCotizacion.getStados(req.body, req.user)
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });
            
        }
    }

async creaDestinatario (req, res){
        try {
            const validar = await CoreCotizacion.validaCreaDestinatario(req.body)
            const result = await CoreCotizacion.addDestinatario(req.body, req.user)
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });
            
        }
    }

async getDestinatarios (req, res){
        try {
            const validar = await CoreCotizacion.validaBusquedaDestinatarios(req.body)
            const result = await CoreCotizacion.getDestinatario(req.body, req.user)
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });
            
        }
    }

async anularDetalle (req, res){
        try {
            // const validar = await CoreCotizacion.validarQuo(req.body)
            const result = await CoreCotizacion.eliminarDetalles(req.body, req.user)
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });
            
        }
    }

async clonarPaso1 (req, res){
    try {
        const validar = await CoreCotizacion.validarQuo(req.body)
        const result = await CoreCotizacion.getCotizacionQuo(req.body)
        const crear = await CoreCotizacion.clonarPaso1(req.body, result[0], req.user)
        const result2 = await CoreCotizacion.getCotizacionQuo(crear[0])
        
        return res.status(200).json({ ok: true, data: result2 }); 
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });
        
    }
    }

async clonarPaso2 (req, res){

    try {
        const validar = await CoreCotizacion.validarQuo(req.body)
        const actulizar = await CoreCotizacion.actualizarQuo(req.body, req.user)
        const result = await CoreCotizacion.actualizarDetalles(req.body, req.user)
        
        return res.status(200).json({ ok: true, data: validar }); 
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });
        
    }
    }

async estadoInterno(req, res){
    try {
        const validar = await CoreCotizacion.validarValidity(req.body); 
        const result = await CoreCotizacion.actualizarEstadoInterno(req.body, req.user);
        return res.status(200).json({ ok: true, data: result}); 
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });
        
    }
    }       

async por_vencer(req, res){
    try {
        const validarPaginado = await CoreCotizacion.validarPaginado(req.body)
        const contador = await CoreCotizacion.getContPorVencer();
        const result = await CoreCotizacion.getPorVencer(req.body);
        return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });
        
    }
    }

async listarPendientes (req, res){
    try {
        const validarPaginado = await CoreCotizacion.validarPaginado(req.body)
        const contador = await CoreCotizacion.getContPendientes();
        const result = await CoreCotizacion.getPendientes(req.body);
        return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });  
        
    }

    }

async upestado(req, res){
try {
                const valida = await CoreCotizacion.validarEstadoId(req.body);
                const result = await CoreCotizacion.cambiaEstado(req.body, req.user)
                return res.status(200).json({ ok: true, data: result }); 
            } catch (error) {
                return res.status(200).json({ ok: false ,msg: error.message });  
                
            }
    }

async parent(req, res) {
        try {
            let result = await CoreCotizacion.getParent(req.body);
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }
    }

async listarQuotationAll(req, res) {
        try {
            let result = await CoreCotizacion.buscarAllQuo();
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }
    }
//cargar servicios
async cargarService(req, res) {
        try {
            // const validar = await CoreCotizacion.validaGetCotizacionXNumber(req.body)
            console.log("params", req.body);
            let result = await CoreCotizacion.getCotizacionQuo(req.body);
            // let result = await CoreCotizacion.buscarServiciosXquotation(req.body);

            // console.log("resulT:::::", result);
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }
    }

async buscarXnumber(req, res) {
        try {
            // const validar = await CoreCotizacion.validaGetCotizacionXNumber(req.body)
            let result = await CoreCotizacion.getCotizacionXNumber(req.body);
            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }
    }

async listar(req, res) {
        try {
            // const log = CoreLog.addHistory(req, req.user)
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
                    // console.log("validacion::::", validacion);
                    result = await CoreCotizacion.getCotizacion(req.body);
                     // console.log("result::::", result);
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
        // console.log("aca:::.");
        try {
            const validacion = await CoreCotizacion.validaActiveAllQuo(req.body);//[quotations]
            const result = await CoreCotizacion.getCotizacionAllQuo(req.body);
            const contador = await CoreCotizacion.getContadoresAllQuo(req.body) 
            return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
        }

    } 
//buscar Cotizaciones
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

async getServiciosFilter(req, res){
        try {
            const validacion = await CoreCotizacion.validaActive(req.body);//[project x company_id]
            const result = await CoreCotizacion.getCotizacion(req.body);
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
            // result = await CoreCotizacion.getCotizacionQuo(creada[0])
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
        //   const cotizacion = await CoreCotizacion.validarCotizacion(req.body, req.user);
          const validacion = await CoreCotizacion.validaNew(req.body);
          const result = await CoreCotizacion.cotizacionAccion(req.body,  req.user);
        //   const addDetallesbasicos = await CoreCotizacion.addDetalle(result, req.user)
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
            // console.log("req.body",req.body);  
          const  validacion = await CoreCotizacion.validaNewEnd(req.body);
          const result = await CoreCotizacion.cotizacionAccion(req.body,  req.user);
        //   await CoreCotizacion.getCotizacionXNotificar(result)
          return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }  
    }

async validateQuotation(req, res){
        try {
            const result = await CoreCotizacion.validarCotizacionV2(req.body, req.user);
                  return res.status(200).json({ ok: true, data: result }); 
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

                let pdfDoc = await QuotationPDF64(result);
                // res.setHeader('Content-type', 'application/pdf')
                // res.setHeader('Content-disposition', 'inline; filename="CertificadoRendiciones.pdf"')
                // pdfDoc.pipe(res); 
                // let finalString =''
                // const stream = pdfDoc.pipe(new Base64Encode())
                // pdfDoc.end();

                // stream.on('data',function(chunk){
                //     finalString +=chunk})
                // stream.on('end',function(){
                    return res.status(200).json({ ok: true ,data: pdfDoc }); 
                // });

               
            }
            if(req.body.download == 'doc'){
                return res.status(200).json({ ok: false ,data: result }); 
            }
            
        } catch (error) {
            console.log("error pdf::::", error);
            return res.status(200).json({ ok: false ,msg: error.message }); 
        }
    }

}
export default Cotizacion;