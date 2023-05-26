import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import Cotizaciones from '../../../lib/models/cotizacion/cotizacionSQL';
import fs from 'fs';
import * as CoreNotificacion from '../notificaciones/core-notificaciones';
import HelperEmail  from './../../../lib/helpers/email_helper'
import * as CoreEmail from '../../api/email/core-email';

const cm = new HelperEmail()  

export const validaActiveAllQuo = async (data)=>{
    let v;
         v = await validateAll(data, {
             active:'required|range:-1,3',
             offset:'required|integer',
             limit:'required|integer'      
             },
            mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
   
    return v.ok;
}

export const validaActiveQuo = async (data)=>{
    let v = await validateAll(data, {
             id:'required|integer'
             },
            mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
   return v.ok;
}

export const validaActiveFilter = async (data)=>{
    let v = await validateAll(data, {
             active:'required|range:-1,3',
             offset:'required|integer',
             limit:'required|integer'   
             },
            mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
    
    return v.ok;
}

export const validaActive = async (data)=>{
       let v;
       switch(data.tipo){
        case 'cotizaciones':
            v = await validateAll(data, {
                active:'required|range:-1,2',
                offset:'required|integer',
                limit:'required|integer'      
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        case 'download':
            v = await validateAll(data, {
                id:'required|integer' 
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        case 'cotizacion':
            v = await validateAll(data, {
                id:'required|integer',
                active:'required|in:0,1'     
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        case 'filtros':
            v = await validateAll(data, {
                active:'required|range:-1,3',
                offset:'required|integer',
                limit:'required|integer'   
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
               break;
        case 'historial':
            v = await validateAll(data, {
                company_id:'required|integer',
                project_id:'required|integer'      
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        case 'historialxcompañia':
            v = await validateAll(data, {
                company_id:'required|integer',
                active:'required|range:-1,2',
                offset:'required|integer',
                limit:'required|integer'   
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        // case 'por_aprobar':
        //     v = await validateAll(data, {
        //         active:'required|in:0,1,2',
        //         offset:'required|integer',
        //         limit:'required|integer',
        //         quotation_state_id:'required|integer'       
        //         },
        //        mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        // break;
        case 'proyectos':
            v = await validateAll(data, {
                active:'required|range:-1,2',
                company_id:'required|integer'      
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        case 'servicios':
            v = await validateAll(data, {
                active:'required|range:-1,2'      
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para consultar los servicios fuera de rango o no corresponde, revise su información'}});
        break;
        case 'servicio':
            v = await validateAll(data, {
                active:'required|range:-1,2'  ,
                assay_id:'required|integer'         
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        default:
            throw  { message : `No existe el tipo acción ${ data.tipo}, revise su información` };
    }





       return v.ok;
}

export const validaActiveDown = async (data)=>{
    let v;
         v = await validateAll(data, {
             id:'required|integer' 
             },
            mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
   return v.ok;
}

export const getContadoresAllQuo = async(data)=>{
    const query = await getCotizacionFiltros(data);
    const contador = await Cotizaciones.ContToolsAllQuo(data, query);
    if(!contador)  throw  { message : `Error no se logra contar ${ data.tipo}, revise su información`};
       return contador[0].total; 
}

export const getContadoresQuo = async(data)=>{
    const query = await getCotizacionFiltros(data);
    const contador = await Cotizaciones.ContToolsAllQuo(data, query);
    if(!contador)  throw  { message : `Error no se logra contar ${ data.tipo}, revise su información`};
       return contador[0].total; 
}

export const getContadoresQuoActive = async(data)=>{
    const query = await getCotizacionFiltros(data);
    const contador = await Cotizaciones.ContToolsAllQuoActive(data, query);
    if(!contador)  throw  { message : `Error no se logra contar ${ data.tipo}, revise su información`};
       return contador[0].total; 
}

export const getContadores = async(data)=>{
    const query = await getCotizacionFiltros(data);
    const contador = await Cotizaciones.ContTools(data, query);
    if(!contador)  throw  { message : `Error no se logra contar ${ data.id}, revise su información`};
       return contador[0].total; 
}

export const getContadoresFilter = async(data)=>{
    const query = await getCotizacionFiltros(data);
    const contador = await Cotizaciones.ContToolsFilter(data, query);
    if(!contador)  throw  { message : `Error no se logra contar ${ data.id}, revise su información`};
       return contador[0].total; 
}

export const getCotizacionAllQuo = async (data)=>{
    let tool;
            if(data.todas =='no'){
                tool = await Cotizaciones.getCotizaciones(data);
                if(!tool)  throw  { message : `Error no se logra consultar por ${ data.id}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.id}, revise su información`}};
            }
            if(data.todas =='yes'){
                tool = await Cotizaciones.getCotizacionesAll(data);
                console.log("data all", tool);
                if(!tool)  throw  { message : `Error no se logra consultar por estado ${ data.active }, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para estado  ${ data.active }, revise su información`}};
            }
     console.log(tool); 
    return tool;
}

export const getCotizacionDown = async (data)=>{

            let v = await validateAll(data, {
            download:'required|string|in:word,pdf'},mensajes)
            .then(d => {return  {ok: true, d}})
            .catch(e => { throw  { message : 'Datos de entrada para la busqueda de la cotización fuera de rango o no corresponde, revise su información'}});

           let tool = await Cotizaciones.getCotizacionesId(data);
            if(!tool)  throw  { message : `Error no se logra consultar por ${ data.id}, revise su información`};
            if(tool.length == 0){ throw  { message : `Sin resultados para Cotizacion Nro ${ data.id}, revise su información`}};
            for(let index = 0; index < tool.length; index++){
                let elemento=[];
                let etapa=[];
                let detalles= await Cotizaciones.getDetallesCotizacion(tool[index].id );
                for(let index1 = 0; index1 < detalles.length; index1++){
                    const elementos= await Cotizaciones.getDetallesElementosCotizacion(detalles[index1].assay_id);
                        elemento.push(elementos[0])
                        detalles[index1].elementos = elemento;

                        const etapas= await Cotizaciones.getEtapasCotizacion(detalles[index1].assay_id);
                        etapa.push(etapas) 
                        detalles[index1].etapas = etapas;

                }

                tool[index].analisis_asociado= detalles;
                }

            for(let index3 = 0; index3 < tool.length; index3++){
                const   condicionesEspecificas= await Cotizaciones.getCondicionesEspecificas(tool[index3].general_condition_id );
                    tool[index3].condiciones_especificas= condicionesEspecificas;            
            }
                

            for(let index4 = 0; index4 < tool.length; index4++){
                    const adjuntos= await Cotizaciones.getAdjuntosCotizacion(tool[index4].id );
                    tool[index4].adjuntos= adjuntos;
            }

            // for(let index = 0; index < tool.length; index++){
            //         proyectos= await Cotizaciones.getProyectos(data, tool[index].id );
            //         tool[index].proyectos= proyectos;
            // }
            //     for(let index = 0; index < tool.length; index++){
            //             contizaciones= await Cotizaciones.getCotizaciones(data, tool[index].id );
            //             tool[index].contizaciones= contizaciones;
            // }
            return tool;
}

export const getCotizacionQuo = async (data)=>{
    let tool = await Cotizaciones.getCotizacionesId(data);
            if(!tool)  throw  { message : `Error no se logra consultar por ${ data.id}, revise su información`};
            if(tool.length == 0){ throw  { message : `Sin resultados para registro Nro: ${ data.id}, revise su información`}};
            for(let index = 0; index < tool.length; index++){
                let elemento=[];
                let etapa=[];
                let detalles= await Cotizaciones.getDetallesCotizacion(tool[index].id );
                   for(let index1 = 0; index1 < detalles.length; index1++){
                       const elementos= await Cotizaciones.getDetallesElementosCotizacion(detalles[index1].assay_id);
                        elemento.push(elementos[0])
                        detalles[index1].elementos = elemento;

                        const etapas= await Cotizaciones.getEtapasCotizacion(detalles[index1].assay_id);
                        etapa.push(etapas) 
                        detalles[index1].etapas = etapas;

                        }
    
                tool[index].analisis_asociado= detalles;
            }

            for(let index3 = 0; index3 < tool.length; index3++){
                 const   condicionesEspecificas= await Cotizaciones.getCondicionesEspecificas(tool[index3].general_condition_id );
                    tool[index3].condiciones_especificas= condicionesEspecificas;            
            }
                
            
            for(let index4 = 0; index4 < tool.length; index4++){
                    const adjuntos= await Cotizaciones.getAdjuntosCotizacion(tool[index4].id );
                    tool[index4].adjuntos= adjuntos;
            }

            // for(let index = 0; index < tool.length; index++){
            //         proyectos= await Cotizaciones.getProyectos(data, tool[index].id );
            //         tool[index].proyectos= proyectos;
            // }
        //     for(let index = 0; index < tool.length; index++){
        //             contizaciones= await Cotizaciones.getCotizaciones(data, tool[index].id );
        //             tool[index].contizaciones= contizaciones;
        // }
       
    return tool;
}
export const getCotizacionQuoV2 = async (data)=>{
    let tool = await Cotizaciones.getCotizacionesId(data);
            if(!tool)  throw  { message : `Error no se logra consultar por ${ data.id}, revise su información`};
            if(tool.length == 0){ throw  { message : `Sin resultados para registro Nro: ${ data.id}, revise su información`}};
            for(let index = 0; index < tool.length; index++){
                let elemento=[];
                let etapa=[];
                let detalles= await Cotizaciones.getDetallesCotizacion(tool[index].id );
                   for(let index1 = 0; index1 < detalles.length; index1++){
                       const elementos= await Cotizaciones.getDetallesElementosCotizacion(detalles[index1].assay_id);
                        elemento.push(elementos[0])
                        detalles[index1].elementos = elemento;

                        const etapas= await Cotizaciones.getEtapasCotizacion(detalles[index1].assay_id);
                        etapa.push(etapas) 
                        detalles[index1].etapas = etapas;

                        }
    
                tool[index].analisis_asociado= detalles;
            }

            for(let index3 = 0; index3 < tool.length; index3++){
                 const   condicionesEspecificas= await Cotizaciones.getCondicionesEspecificas(tool[index3].general_condition_id );
                    tool[index3].condiciones_especificas= condicionesEspecificas;            
            }
                
            
            for(let index4 = 0; index4 < tool.length; index4++){
                    const adjuntos= await Cotizaciones.getAdjuntosCotizacion(tool[index4].id );
                    tool[index4].adjuntos= adjuntos;
            }

            for(let index5 = 0; index5 < tool.length; index5++){
                   const dest= await Cotizaciones.getDestinatarioCotizacion(tool[index5].destinatario_id );
                    tool[index5].destinatario= dest;
            }
        //     for(let index = 0; index < tool.length; index++){
        //             contizaciones= await Cotizaciones.getCotizaciones(data, tool[index].id );
        //             tool[index].contizaciones= contizaciones;
        // }
       
    return tool;
}

export const getCotizacionFilter = async (data)=>{
    let tool;
    let where = await getCotizacionFiltros(data);
                     tool = await Cotizaciones.getCotizacionesCondicional(where, data)
                   if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};

    return tool;
}

export const getCotizacion = async (data)=>{
    let tool;
    let condicionesEspecificas;
    let emails;
    let proyectos;
    let contizaciones;
    switch(data.tipo){
        case 'cotizaciones':
            if(data.todas =='no'){
                tool = await Cotizaciones.getCotizaciones(data);
                if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            }
            if(data.todas =='si'){
                tool = await Cotizaciones.getCotizacionesAll(data);
                if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            }
        break ;
        case 'cotizacion':
            tool = await Cotizaciones.getCotizacionesId(data);
            if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
            if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            for(let index = 0; index < tool.length; index++){
                let elemento=[];
                let etapa=[];
                let detalles= await Cotizaciones.getDetallesCotizacion(tool[index].id );
                   for(let index1 = 0; index1 < detalles.length; index1++){
                       const elementos= await Cotizaciones.getDetallesElementosCotizacion(detalles[index1].assay_id);
                        elemento.push(elementos[0])
                        detalles[index1].elementos = elemento;

                        const etapas= await Cotizaciones.getEtapasCotizacion(detalles[index1].assay_id);
                        etapa.push(etapas) 
                        detalles[index1].etapas = etapas;

                        }
    
                tool[index].analisis_asociado= detalles;
            }

            for(let index3 = 0; index3 < tool.length; index3++){
                 const   condicionesEspecificas= await Cotizaciones.getCondicionesEspecificas(tool[index3].general_condition_id );
                    tool[index3].condiciones_especificas= condicionesEspecificas;            
            }
                
            
            for(let index4 = 0; index4 < tool.length; index4++){
                    const adjuntos= await Cotizaciones.getAdjuntosCotizacion(tool[index4].id );
                    tool[index4].adjuntos= adjuntos;
            }

            // for(let index = 0; index < tool.length; index++){
            //         proyectos= await Cotizaciones.getProyectos(data, tool[index].id );
            //         tool[index].proyectos= proyectos;
            // }
        //     for(let index = 0; index < tool.length; index++){
        //             contizaciones= await Cotizaciones.getCotizaciones(data, tool[index].id );
        //             tool[index].contizaciones= contizaciones;
        // }
        break ;                                  
        case 'filtros':
                let where = await getCotizacionFiltros(data);
                     tool = await Cotizaciones.getCotizacionesCondicional(where, data)
                   if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};

        break ;    
        case 'historial':
                tool = await Cotizaciones.getCotizacionesHistorial(data)
                if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};

         break ;  
        case 'historialxcompañia':
            tool = await Cotizaciones.getCotizacionesHistorialComp(data)
            if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
            if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};

     break ;  
        case 'proyectos':
            tool = await Cotizaciones.getProjectIdCompany(data)
            if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
            if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};

     break ;                                
        // case 'por_aprobar':
        //     tool = await Cotizaciones.getCotizaciones(data);
        //     if(tool.length == 0){
        //         throw  { message : 'No se encontraron cotizaciones, revise su información') };
        //     }
        // break ; 
        case 'servicios':
            let query = await getFiltrosServicios(data);
            tool= await Cotizaciones.getServiciosAnaliticosAll(data, query);
            if(!tool)  throw  { message : 'Error no se logro encontrar los todos servicios, revise su información'};
            // if(tool.length ==0)  throw  { message : 'No se logro encontrar todos servicios, revise su información'};

        break;  
        case 'servicio':
            tool= await Cotizaciones.getServiciosAnaliticos(data);
            if(!tool)  throw  { message : 'Error no se logro encontrar el servicio, revise su información' };
            if(tool.length ==0)  throw  { message : 'No se logro encontrar el servicio, revise su información'};
            let elemento=[];
              for(let index = 0; index < tool.length; index++){
    
                    let fases= await Cotizaciones.getFasesServiciosAnaliticos(tool[index] );
                    tool[index].fases= fases;

                    const elementos= await Cotizaciones.getDetallesElementosCotizacion(tool[index].id);
                         tool[index].elemento = elementos[0];

             }

        break;
        case 'download':
            tool = await Cotizaciones.getCotizacionesId(data);
            if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
            if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            for(let index = 0; index < tool.length; index++){
                let elemento=[];
                let etapa=[];
                let detalles= await Cotizaciones.getDetallesCotizacion(tool[index].id );
                   for(let index1 = 0; index1 < detalles.length; index1++){
                       const elementos= await Cotizaciones.getDetallesElementosCotizacion(detalles[index1].assay_id);
                        elemento.push(elementos[0])
                        detalles[index1].elementos = elemento;

                        const etapas= await Cotizaciones.getEtapasCotizacion(detalles[index1].assay_id);
                        etapa.push(etapas) 
                        detalles[index1].etapas = etapas;

                        }
    
                tool[index].analisis_asociado= detalles;
            }

            for(let index3 = 0; index3 < tool.length; index3++){
                 const   condicionesEspecificas= await Cotizaciones.getCondicionesEspecificas(tool[index3].general_condition_id );
                    tool[index3].condiciones_especificas= condicionesEspecificas;            
            }
                
            
            for(let index4 = 0; index4 < tool.length; index4++){
                    const adjuntos= await Cotizaciones.getAdjuntosCotizacion(tool[index4].id );
                    tool[index4].adjuntos= adjuntos;
            }

            // for(let index = 0; index < tool.length; index++){
            //         proyectos= await Cotizaciones.getProyectos(data, tool[index].id );
            //         tool[index].proyectos= proyectos;
            // }
        //     for(let index = 0; index < tool.length; index++){
        //             contizaciones= await Cotizaciones.getCotizaciones(data, tool[index].id );
        //             tool[index].contizaciones= contizaciones;
        // }
        break ;   
    default:
            throw  { message : `No existe el tipo ${ data.tipo} para realizar la busqueda, revise su información`};
    }
    // console.log("tools", tool);
    return tool;
}

export const getCotizacionFiltros = async (data)=>{
    let where ='';
    //     if(data.active == 2){
    //         where += ` quo.[active] in (0,1) `
    //     }
    //     if(data.active != 2){
    //     where += ` quo.[active] = ${ Number(data.active)}`
    // }
    where += ` quo.[active] = 1`
    if(data.estado) where += ` and quo.[state_id] =${data.state_id}`
    if(data.cliente) where += ` and com.[name] like '%${data.cliente}%'`
    if(data.quotation_state_id) where += ` and quo.[quotation_state_id] = ${ data.quotation_state_id}`
    if(data.state_id) where += ` and quo.[state_id] = ${ data.state_id}`
    if(data.creador) where += ` and us.[user_creator] like '%${ data.creador}%'`
    if(data.quotation_number) where += ` and quo.[quotation_number] like '%${ data.quotation_number}%'`
    // if(data.vigencia) where += ` and vigencia like%${data.vigencia}%`
    return where;
}

export const getFiltrosServicios = async (data)=>{
    let where ='';
        if(data.active == 2){
            where += ` ass.[active] in (0,1) `
        }
        if(data.active != 2){
        where += ` ass.[active] = ${ Number(data.active)}`
    }
    
    if(data.assay_type_id) where += ` and ass.[assay_type_id] =${ data.assay_type_id }`
    if(data.sample_type_id) where += ` and ass.[sample_type_id] =${ data.sample_type_id }`
    if(data.digestion_id) where += ` and ass.[digestion_id] = ${ data.digestion_id }`
    if(data.technique_id) where += ` and ass.[technique_id] = ${ data.technique_id }`
    if(data.unit_id) where += ` and  ea.unit_id = ${ data.unit_id }`
    if(data.element_id) where += ` and ea.chemical_element_id =${ data.element_id }`
    console.log("query", where);
    return where;
}

export const validaAccion = async (data)=>{
    let v ;
       switch(data.accion){
        case 'nueva_cotizacion':
            v = await validateAll(data, {
                active:'required|in:0',
                quotation_number:'required|string',
                start_date:'required',
                expiration_date:'required|date',
                company_id:'required|integer',
                estimated_days:'required|integer',
                destinatario:'required|string',
                general_condition_id:'required|integer',
                specific_condition:'required|string',               
                currency_id:'required|integer',
                quotation_state_id:'required|integer',
                pago_previo:'required|range:-1,2'             
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        case 'detalle_cotizacion':
            v = await validateAll(data, {
                active:'required|in:1',
                quotation_id:'required|integer',
                assay_id:'required|integer',
                price:'required|number'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada detalles de cotizacion fuera de rango o no corresponde, revise su información'}});
        break;
        case 'nueva_cotizacion_fin':
            v = await validateAll(data, {
                active:'required|in:1',
                quotation_id:'required|integer'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada detalles de cotizacion fuera de rango o no corresponde, revise su información'}});
        break;
        case 'nueva_version':
            v = await validateAll(data, {
                quotation_id:'required|integer',
                quotation_number:'required|string',
                start_date:'required',
                expiration_date:'required|date',
                company_id:'required|integer',
                estimated_days:'required|integer',
                destinatario:'required|string',
                general_condition_id:'required|integer',
                specific_condition:'required|string',               
                currency_id:'required|integer',
                quotation_state_id:'required|integer|range:0,6',
                parent_id:"required|integer"           
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        case 'nuevo_proyecto':
            v = await validateAll(data, {
                company_id:'required|integer',
                name:'required|string'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        default:
            throw  { message : 'No existe el tipo acción, revise su información'};
    }

       return v.ok;
}

export const validaAction = async (data)=>{
    let v ;
       switch(data.accion){
        case 'aprobar_venta':
            v = await validateAll(data, {
                id:'required|integer'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada aprobar_venta fuera de rango, revise su información' }});
        break;
        case 'aprobar_produccion':
            v = await validateAll(data, {
                id:'required|integer'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada aprobar_produccion fuera de rango, revise su información'}});
        break;
        case 'rechazar':
            v = await validateAll(data, {
                id:'required|integer',
                comentario:"required|string"
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e =>  { console.log(e); throw  { message : 'Datos de entrada rechazar fuera de rango, revise su información'}});
        break;
       
       default:
            throw  { message : 'No existe el tipo acción, revise su información'};
    }

       return v.ok;
}

export const validaNew = async (data)=>{
    let v = await validateAll(data, {
                quotation_number:'required|string',
                start_date:'required',
                expiration_date:'required|date',
                company_id:'required|integer',
                estimated_days:'required|integer',
                destinatario:'required|string',
                general_condition_id:'required|integer',
                specific_condition:'required|string',               
                currency_id:'required|integer',
                destinatario_id:'required|integer'             
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
       
       return v.ok;
}

export const validaNewDetail = async (data)=>{
    let v = await validateAll(data, {
                active:'required|range:-1,1',
                quotation_id:'required|integer',
                assay_id:'required|integer',
                price:'required'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada detalles de cotizacion fuera de rango o no corresponde, revise su información'}});

       return v.ok;
}

export const validaNewEnd = async (data)=>{
    let v = await validateAll(data, {
        active:'required|range:0,2',
        quotation_id:'required|integer'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada detalles de cotizacion fuera de rango o no corresponde, revise su información'}});
 return v.ok;
}

export const cotizacionAccion = async (data, usuario)=>{
        let accion;
        let estado;
       switch(data.accion){
        case 'aprobar_venta':
            accion= await Cotizaciones.updateAccion(data, usuario);
                if(!accion)  throw  { message : 'Error al aprobar venta de la cotización, revise su información'};
                if(accion.length ==0)  throw  { message : 'No se logro aprobar venta  de la cotización, revise su información'};
            estado = await Cotizaciones.consultaEstadoCotizacion(data);
                if(!estado)  throw  { message : 'Error al consultar el estado de la cotizacion, revise su información'};
                // if(estado.length ==0)  throw  { message : 'No se logro consultar el estado de la cotización, revise su información'};
                if(estado.length > 0){ 
                    let cambiarEstado = Cotizaciones.cambiaEstadoCotizacion(data, usuario)
                    if(!cambiarEstado)  throw  { message : 'Error no al cambiar el estado de la cotización, revise su información'};
                    if(cambiarEstado.length ==0)  throw  { message : 'No se logro cambiar el estado de la cotización, revise su información'};
                }

        break;
        case 'aprobar_produccion':
            accion= await Cotizaciones.updateAccion(data, usuario);
                    if(!accion)  throw  { message : 'Error al aprobar produccion de la cotización, revise su información'};
                    if(accion.length ==0)  throw  { message : 'No se logro aprobar produccion de la cotización, revise su información'};
            estado = await Cotizaciones.consultaEstadoCotizacion(data);
                    if(!estado)  throw  { message : 'Error al consultar el estado de la cotizacion, revise su información'};
                    // if(estado.length ==0)  throw  { message : 'No se logro consultar el estado de la cotización, revise su información'};
            if(estado.length == 1){ 
                let cambiarEstado = Cotizaciones.cambiaEstadoCotizacion(data, usuario) 
                if(!cambiarEstado)  throw  { message : 'Error no al cambiar el estado de la cotización, revise su información'};
                if(cambiarEstado.length ==0)  throw  { message : 'No se logro cambiar el estado de la cotización, revise su información'};
            }
        break;
        case 'rechazar':
            accion= await Cotizaciones.updateAccion(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro rechazar la cotización, revise su información' };
            if(accion.length ==0)  throw  { message : 'No se logro rechazar la cotización, revise su información' };
        break;
        case 'nueva_cotizacion':
            accion= await Cotizaciones.addCotizacion(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro crear la cotización, revise su información'};
            if(accion.length ==0)  throw  { message : 'No se logro crear la nueva cotización, revise su información'};
            const servicios_basicos = await Cotizaciones.getDetallesAdmin()
            let data_form = {
                active: 1,
                quotation_id: accion[0].id,
                assay_id:null,
                price:null
            }
            for(let basic of servicios_basicos){
                // console.log("basic::::", basic);
                data_form.assay_id= basic.id
                data_form.price= basic.cost
                const detalles= await Cotizaciones.addDetallesCotizacion(data_form, usuario);
                if(!detalles)  throw  { message : 'Error no se logro crear detalle basicos de  cotización, revise su información' };
                if(detalles.length ==0)  throw  { message : 'No se logro crear detalle basicos de cotización, revise su información' };
            }
            const analisis_asociado = await Cotizaciones.getDetallesCotizacion( accion[0].id)
            // console.log("analisis_asoc", analisis_asociado);
            accion[0].analisis_asociado = analisis_asociado
        break;
        case 'detalle_cotizacion':
            accion= await Cotizaciones.addDetallesCotizacion(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro crear detalle de  cotización, revise su información' };
            if(accion.length ==0)  throw  { message : 'No se logro crear la nueva cotización, revise su información' };
            const analisis_asociadoV2 = await Cotizaciones.getDetallesCotizacionV2( accion[0].id)
            accion[0].analisis_asociado = analisis_asociadoV2

        break;
        case 'nueva_cotizacion_fin':
            accion= await Cotizaciones.addCotizacionFin(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro finalizar la creacion de la cotización, revise su información'};
            if(accion.length ==0)  throw  { message : 'No se logro finalizar la creacion de la cotización, revise su información'};
        break;
        case 'nueva_version':
            accion= await Cotizaciones.addCotizacion(data, usuario);
            console.log("nueva", accion);
            if(!accion)  throw  { message : 'Error no se logro crear nueva version de la  cotización, revise su información'};
            if(accion.length ==0)  throw  { message : 'No se logro crear la nueva version de la cotización, revise su información'};

        break;
        case 'nuevo_proyecto':
            accion= await Cotizaciones.addProyecto(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro crear nueva version de la  cotización, revise su información'};
            if(accion.length ==0)  throw  { message : 'No se logro crear la nueva version de la cotización, revise su información'};

        break;

        default:
            throw  { message : `No existe el tipo acción ${ data.accion}, revise su información`};
    }
    // console.log("action", accion);
    return accion;
}

export const validarCotizacion =async (form, usuario)=>{

    const cotizacion= await Cotizaciones.getCotizacionXuser(form, usuario);
            if(!cotizacion)  throw  { message : 'Error no se logro finalizar la creacion de la cotización, revise su información'};
            let contador=0;
            if(cotizacion.length > 0) {
                for(let index = 0; index < cotizacion.length; index++){
                    // console.log("entro ",cotizacion[index].id);
                    const detalle = await Cotizaciones.getCotizacionXDetalle(cotizacion[index].id);
                    // console.log("detalle");
                    if(detalle.length == 0){
                    //   throw  { message : 'El usuario No tiene Cotizaciones pendientes por terminar'};
                contador=0;    
                }
                }
            }
    
   
    return contador;
}

export const validarCotizacionV2 =async (form, usuario)=>{

    let  cotizacion= await Cotizaciones.getCotizacionXuserV2(form, usuario);
            if(!cotizacion)  throw  { message : 'Error no se logro validar las cotización pendiente, revise su información'};
            console.log("cotiza", cotizacion.length);
            if(cotizacion.length == 0) {
                throw  { message : 'El usuario No tiene Cotizaciones pendientes por terminar'};
            }

    return cotizacion;
}

export const cotizacionPendientes =async (form, usuario)=>{

            const cotizacion= await Cotizaciones.getCotizacionXuserDetalle(form, usuario);
                    if(!cotizacion)  throw  { message : 'Error no se logro consultar por cotizaciones, revise su información'};
        
            return cotizacion;
}

export const getCotizacionXNumber =async ()=>{
    const data ={active:1,
    state_id :1}
    const cotizacion= await Cotizaciones.getCotizacionXNumber(data);
    if(!cotizacion)  throw  { message : 'Error no se logro consultar por cotizaciones, revise su información'};

return cotizacion;

}

export const buscarServiciosXquotation =async (data)=>{
    let tool= await Cotizaciones.getCotizacionesId(data);
    if(!tool)  throw  { message : 'Error no se logro consultar por cotizaciones, revise su información'};
    for(let index = 0; index < tool.length; index++){
        
          let fases= await Cotizaciones.getFasesServiciosAnaliticosAssay_id(tool[index].id );
            tool[index].fases= fases;
          const elementos= await Cotizaciones.getDetallesElementosCotizacion(tool[index].id);
            tool[index].elemento = elementos;
   }

return tool;

}

export const buscarAllQuo =async ()=>{
    const cotizacion= await Cotizaciones.buscarAllQuo();
    if(!cotizacion)  throw  { message : 'Error no se logro consultar por cotizaciones, revise su información'};

return cotizacion;

}

export const validaGetCotizacionXNumber =async (data)=>{
    let v = await validateAll(data, {
        active:'required|range:-1,2',
        state_id:'required|integer'      
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
return v.ok
}

export const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export const getParent  = async (data)=>{
    let respuesta=[]
    let  cotizacion= await Cotizaciones.getCotizacionesId(data);
            if(!cotizacion)  throw  { message : 'Error no se logro validar las cotización pendiente, revise su información'};
            // console.log("cotiza", cotizacion);
            respuesta.push(cotizacion[0])
            if(cotizacion.length > 0){
                 let  parent = await Cotizaciones.getCotizacionesbyParent(cotizacion[0].id);
                    for(let par of parent){
                        respuesta.push(par)
                     }

            }if(cotizacion.length == 0){
                throw  { message : `No existe cotización Nro ${data.id} `};
            }


    return respuesta;

}

export const cambiaEstado = async (data, user)=>{
    let  cotizacion= await Cotizaciones.cambiaEstado(data, user);
    if(!cotizacion)  throw  { message : 'Error no se logro actualizar el estado de la cotización, revise su información'};
    
   if(cotizacion.length == 0){
    throw  { message : 'Error no se logro actualizar ningún estado de la cotización, revise su información'};
   }
    return cotizacion

}

export const validarEstadoId = async(data)=>{
    let v = await validateAll(data, {
        quotation_id:'required|integer',
        state_id:'required|range:0,5'      
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); 
       throw  { message : 'Datos de entrada para validar el estado fuera de rango o no corresponde, revise su información'}});
return v.ok 
}

export const validarPaginado = async(data)=>{
    let v = await validateAll(data, {
        offset:'required|integer',
        limit:'required|integer'      
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); 
       throw  { message : 'Datos de entrada para la paginación fuera de rango o no corresponde, revise su información'}});
return v.ok 
}

export const getPendientes =async(data)=>{
    let respuesta=[]
    let  cotizacion= await Cotizaciones.getCotizacionesPendientes(data);
            if(!cotizacion)  throw  { message : 'Error no se logro encontrar las cotizaciones pendientes, revise su información'};

    return cotizacion
}

export const getContPendientes =async(data)=>{
    let respuesta=[]
    let  cotizacion= await Cotizaciones.contarCotizacionesPendientes();
            if(!cotizacion)  throw  { message : 'Error no se logro encontrar las cotizaciones pendientes, revise su información'};

    return cotizacion[0].total
}

export const getContPorVencer =async(data)=>{
    let respuesta=[]
    let  cotizacion= await Cotizaciones.contarCotizacionesPorVencer();
            if(!cotizacion)  throw  { message : 'Error no se logro encontrar las cotizaciones pendientes, revise su información'};

    return cotizacion[0].total
}

export const getPorVencer =async(data)=>{
    let respuesta=[]
    let  cotizacion= await Cotizaciones.getCotizacionesPorVencer(data);
            if(!cotizacion)  throw  { message : 'Error no se logro encontrar las cotizaciones pendientes, revise su información'};

    return cotizacion
}

export const validarValidity = async(data)=>{
    let v = await validateAll(data, {
        quotation_state_id:'required|number|range:0,6',
        quotation_comment:'required|string',
        id:'required|integer'     
        },
       mensajes).then(d => {return  {ok: true, d}})
       .catch(e => { console.log("errores:::", e); 
       throw  { message : 'Datos de entrada para el cambio de estado interno fuera de rango o no corresponde, revise su información'}
        });
return v.ok 
}

export const actualizarEstadoInterno =async (data, user)=>{

    let  cotizacion= await Cotizaciones.cambiaEstadoIterno(data, user);
    if(!cotizacion)  throw  { message : 'Error no se logro encontrar la cotización para actulizar el estado interno, revise su información'};

return cotizacion
}

export const validarQuo =async (data)=>{
    let v = await validateAll(data, {
                    id:'required|integer'     
        },
       mensajes).then(d => {return  {ok: true, d}})
       .catch(e => { console.log("errores:::", e); 
       throw  { message : 'Datos de entrada para el cambio de estado interno fuera de rango o no corresponde, revise su información'}
        });

    let  cotizacion= await Cotizaciones.validaSiExiste(data);
    if(!cotizacion)  throw  { message : 'Error no se logro consultar por la cotización, revise su información'};
        if(cotizacion.length == 0) throw  { message : 'Cotización no existe, revise su información'};
    
    return cotizacion
}

export const clonarPaso1 = async(form, data, user)=>{
    let cotizacion;
    let analisis_asociado=[]
    if(form.tipo == 1){
        // console.log("entro en tipo", data.tipo);
        cotizacion = await Cotizaciones.addCotizacionClonCompany(data, user, form.id)
        if(!cotizacion)  throw  { message : 'Error al clonar con compañia, revise su información'};
    }
    if(form.tipo == 2){
        cotizacion = await Cotizaciones.addCotizacionClon(data, user)
        if(!cotizacion)  throw  { message : 'Error al clonar sin compañia, revise su información'};
    }
    let data_form;
    
    for(let index = 0; index < data.analisis_asociado.length; index++){
    // console.log("index:::", data.analisis_asociado[index].id);
    data_form = {
        active:data.analisis_asociado[index].active,
        quotation_id: cotizacion[0].id,
        assay_id:data.analisis_asociado[index].assay_id,
        price:data.analisis_asociado[index].price
    }

        let detalle_data_cotizacion = await  Cotizaciones.addDetallesCotizacion(data_form, user)
        if(!detalle_data_cotizacion)  throw  { message : 'Error no se logro crear el detalle de la cotización, revise su información'};
        // console.log("Aba", detalle_data_cotizacion);    
        analisis_asociado.push(detalle_data_cotizacion[0])
    }

   cotizacion[0].analisis_asociado = analisis_asociado //  console.log("analisis_asociado:::::::", analisis_asociado);
   return cotizacion 
}

export const actualizarDetalles =async (data, user)=>{
    const inicio = data.analisis_asociado.length
    let salida =0;
    for(let index = 0; index < data.analisis_asociado.length; index++){
      salida = salida + 1
            let detalle_data_cotizacion = await  Cotizaciones.updateDetalles(data, user)
            if(!detalle_data_cotizacion)  throw  { message : 'Error no se logro actulizar el detalle de la cotización, revise su información'};
          }
    const resultado = inicio - salida
    return resultado
}

export const eliminarDetalles =async (data, user)=>{
            let detalle_data_cotizacion = await  Cotizaciones.eliminaDetalles(data, user)
            if(!detalle_data_cotizacion)  throw  { message : 'Error no se logro actulizar el detalle de la cotización, revise su información'};
    return detalle_data_cotizacion
}

export const actualizarQuo = async (data, user)=>{
    const cotizacion = await Cotizaciones.actulizarQuoClon(data, user)
    if(!cotizacion)  throw  { message : 'Error al actualizar el clonar con compañia, revise su información'};
    return cotizacion;
}

export const addDetalle = async (data, user)=>{
     const detallesAdministrativos  = await Cotizaciones.getDetallesAdmin()   
        if(!detallesAdministrativos)  throw  { message : 'Error al actualizar el clonar con compañia, revise su información'};
        if(detallesAdministrativos.length == 0){throw  { message : 'No exiten servicios basicos que agregar'};};

        for(let analisis of detallesAdministrativos){
            let result = await buscarServiciosXquotation(data);
        }
        data[0].analisis_asociado = detallesAdministrativos

        return data

}

export const getDestinatario = async (data)=>{
    const destinatarios  = await Cotizaciones.getDestinatario(data.company_id, data.modulo)   
    if(!destinatarios)  throw  { message : 'Error al buscar destinatarios, revise su información'};
    // if(destinatarios.length == 0){throw  { message : 'No exiten destinatarios para la compañia'};};
 
    return destinatarios
}

export const addDestinatario = async (data, user)=>{
    const destinatarios  = await Cotizaciones.addDestinatario(data.company_id, data.mail, data.name, user.user_creator_id, data.telefono, data.modulo)   
    if(!destinatarios)  throw  { message : 'Error al crear destinatarios, revise su información'};
    if(destinatarios.length == 0){throw  { message : 'No exiten destinatarios'};};
 
    return destinatarios
}

export const validaBusquedaDestinatarios = async (data)=>{
                let v = await validateAll(data, {
                    company_id:'required|integer',
                    modulo:'required|string'     
            },
            mensajes).then(d => {return  {ok: true, d}})
            .catch(e => { console.log("errores:::", e); 
            throw  { message : 'Datos de entrada para el busqueda de destinatarios fuera de rango o no corresponde, revise su información'}
            });

            return v;
}

export const validaCreaDestinatario = async (data)=>{
    let v = await validateAll(data, {
        company_id:'required|integer',
        mail:'required|email', 
        name:'required|string',
        telefono:'required|string',
        modulo:'required|string'
},
mensajes).then(d => {return  {ok: true, d}})
.catch(e => { console.log("errores:::", e); 
throw  { message : 'Datos de entrada para crear destinatario fuera de rango o no corresponde, revise su información'}
});

return v;
}

export const getStados = async (data)=>{
    const estados  = await Cotizaciones.getStatusEstados()   
    if(!estados)  throw  { message : 'Error al crear destinatarios, revise su información'};

 
    return estados
}

export const getCotizacionXNotificar = async (data, user)=>{
    const quo  = await getCotizacionQuo(data)   
                if(!quo) throw { message : 'Error al buscar Cotizacion, revise su información'};
    if(quo.d){
        let form = {
            modulo: 'cotizaciones',
            id: quo[0].id,
            estado: 'creado',
            active: 1,
            user_id: user.id
        }
        try {
            const notificacion = await CoreNotificacion.add(form)
            
        } catch (error) {
            form.estado = error
            const notificacion = await CoreNotificacion.add(form)
        }

    }
    return quo

}

export const getCotizacionConDestinatario = async (quo, data)=>{

    const destinatarios  = await Cotizaciones.getDestinatario(quo[0].company_id, data.modulo)   
    if(!destinatarios)  throw  { message : 'Error al buscar destinatarios, revise su información'};
    // if(destinatarios.length == 0){throw  { message : 'No exiten destinatarios para la compañia'};};
    quo[0].destinatarios = destinatarios
    return quo


}



export const validarConfirmacion = async (data)=>{
            let v = await validateAll(data,{
            id:'required|integer',
            estado:'required|range:1,4'
            },mensajes).then(d => {return  {ok: true, d}})
            .catch(e => { throw  { message : `Datos de ingreso no validos ${ JSON.stringify(e)}`}});

            let  cotizacion= await Cotizaciones.getCotizacionesId(data);
            if(!cotizacion)  throw  { message : 'Error no se logro validar las cotización pendiente, revise su información'};
            if(cotizacion.length == 0) throw  { message : 'Cotizacion no valida'};

            return cotizacion
}

export const confimarQuo = async (data)=>{
    const quo  = await Cotizaciones.cambiarEstado(data.id, data.estado)   
    if(!quo)  throw  { message : 'Error al confirmar las cotización'};
    return quo  
}

export const NotificaNewCotizacion = async (data)=>{

    const result = await getCotizacionQuoV2(data.body)
    const token = await CoreEmail.generarToken(data.body)
    const notificacion = await  CoreNotificacion.add(result[0], data)
    await cm.sendQuotation(result[0], token, notificacion)  

    return notificacion
}

export const aceptaOferta = async (data, req)=>{
    const result = await getCotizacionQuoV2(data)
    const token = await CoreEmail.generarToken(req.body.id)
    req.user ={ id:result[0].user_id}
    const notificacion = await  CoreNotificacion.add(result[0], req)
    if(data.pago_previo == 1){
        await cm.sendQuotationPago(result[0], token, notificacion)  

    }
    if(data.pago_previo == 0){
        await cm.sendRequisition(result[0], token, notificacion)  
    }

    return notificacion

}

export const rechazoOferta = async (data, req)=>{
    const result = await getCotizacionQuoV2(data)
    req.user ={ id:result[0].user_id}
    const notificacion = await  CoreNotificacion.add(result[0], req)
    await cm.sendQuotationRechazo(result[0], notificacion)  
}


export const cambiarEstadoNotificacion =async (id, estado)=>{
    const cotizacion= await Cotizaciones.cambiarEstadoNotificacion(id, estado);
    if(!cotizacion)  throw  { message : 'Error no se logro actualizar el estado-notificacion de la cotizacion'};

return cotizacion;
}
export const getServicioClasico =async (query)=>{
    const cotizacion= await Cotizaciones.getServicioClasico(query);
    if(!cotizacion)  throw  { message : 'Error no se logro actualizar el estado-notificacion de la cotizacion'};

return cotizacion;

}