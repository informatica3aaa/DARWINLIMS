import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import Cotizaciones from '../../../lib/models/cotizacion/cotizacionSQL';


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
             id:'required|integer',
             active:'required|range:-1,2'     
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
                if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            }
     console.log(tool); 
    return tool;
}

export const getCotizacionDown = async (data)=>{

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
            if(tool.length ==0)  throw  { message : 'No se logro encontrar todos servicios, revise su información'};

        break;  
        case 'servicio':
            tool= await Cotizaciones.getServiciosAnaliticos(data);
            if(!tool)  throw  { message : 'Error no se logro encontrar el servicio, revise su información' };
            if(tool.length ==0)  throw  { message : 'No se logro encontrar el servicio, revise su información'};
              for(let index = 0; index < tool.length; index++){
                    let fases= await Cotizaciones.getFasesServiciosAnaliticos(tool[index] );
                    tool[index].fases= fases;
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
        if(data.active == 2){
            where += ` quo.[active] in (0,1) `
        }
        if(data.active != 2){
        where += ` quo.[active] = ${ Number(data.active)}`
    }
    
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
    
    if(data.assay_type_id) where += ` and ass.[assay_type_id] =${data.assay_type_id}`
    if(data.sample_type_id) where += ` and ass.[sample_type_id] =${data.sample_type_id}`
    if(data.digestion_id) where += ` and ass.[digestion_id] = ${ data.digestion_id}`
    if(data.technique_id) where += ` and ass.[technique_id] = ${ data.technique_id}`
    // if(data.vigencia) where += ` and vigencia like%${data.vigencia}%`
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
                quotation_state_id:'required|integer'             
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        case 'detalle_cotizacion':
            v = await validateAll(data, {
                active:'required|in:1',
                quotation_id:'required|integer',
                assay_id:'required|integer',
                price:'required|integer'
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
                active:'required|in:0',
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
                quotation_state_id:'required|integer',
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
                id:'required|integer',
                state_id:'required|range:1,3',
                active:'required|range:0,2',
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada aprobar_venta fuera de rango, revise su información' }});
        break;
        case 'aprobar_produccion':
            v = await validateAll(data, {
                id:'required|integer',
                state_id:'required|range:1,3',
                active:'required|range:0,2',
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada aprobar_produccion fuera de rango, revise su información'}});
        break;
        case 'rechazar':
            v = await validateAll(data, {
                id:'required|integer',
                state_id:'required|range:2,4',
                comentario:"required|string",
                active:'required|range:0,2',
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e =>  { console.log(e); throw  { message : 'Datos de entrada rechazar fuera de rango, revise su información'}});
        break;
       
            v = await validateAll(data, {
                active:'required|in:0',
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
                quotation_state_id:'required|integer',
                parent_id:"required|integer"           
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
        break;
        default:
            throw  { message : 'No existe el tipo acción, revise su información'};
    }

       return v.ok;
}

export const validaNew = async (data)=>{
    let v = await validateAll(data, {
                active:'required|range:-1,1',
                quotation_number:'required|string',
                start_date:'required',
                expiration_date:'required|date',
                company_id:'required|integer',
                estimated_days:'required|integer',
                destinatario:'required|string',
                general_condition_id:'required|integer',
                specific_condition:'required|string',               
                currency_id:'required|integer',
                quotation_state_id:'required|integer'             
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información'}});
       
       return v.ok;
}

export const validaNewDetail = async (data)=>{
    let v = await validateAll(data, {
                active:'required|range:0,2',
                quotation_id:'required|integer',
                assay_id:'required|integer',
                price:'required|integer'
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
        // const usuario ={user_id:533 }; 
        let accion;
        let estado;
       switch(data.accion){
        case 'aprobar_venta':
            accion= await Cotizaciones.updateAccion(data, usuario);
                if(!accion)  throw  { message : 'Error al aprobar venta de la cotización, revise su información'};
                if(accion.length ==0)  throw  { message : 'No se logro aprobar venta  de la cotización, revise su información'};
            estado = await Cotizaciones.consultaEstadoCotizacion(data);
                if(!estado)  throw  { message : 'Error al consultar el estado de la cotizacion, revise su información'};
                if(estado.length ==0)  throw  { message : 'No se logro consultar el estado de la cotización, revise su información'};
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
                    if(estado.length ==0)  throw  { message : 'No se logro consultar el estado de la cotización, revise su información'};
            if(estado.length == 1){ 
                let cambiarEstado = Cotizaciones.cambiaEstadoCotizacion(data, usuario) 
                if(!cambiarEstado)  throw  { message : 'Error no al cambiar el estado de la cotización, revise su información'};
                if(cambiarEstado.length ==0)  throw  { message : 'No se logro cambiar el estado de la cotización, revise su información'};
            }
        break;
        case 'rechazar':
            accion= await Cotizaciones.updateAccion(data, usuario);
            console.log("accion", accion);
            if(!accion)  throw  { message : 'Error no se logro rechazar la cotización, revise su información' };
            if(accion.length ==0)  throw  { message : 'No se logro rechazar la cotización, revise su información' };
        break;
        case 'nueva_cotizacion':
            accion= await Cotizaciones.addCotizacion(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro crear la cotización, revise su información'};
            if(accion.length ==0)  throw  { message : 'No se logro crear la nueva cotización, revise su información'};

        break;
        case 'detalle_cotizacion':
            accion= await Cotizaciones.addDetallesCotizacion(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro crear detalle de  cotización, revise su información' };
            if(accion.length ==0)  throw  { message : 'No se logro crear la nueva cotización, revise su información' };

        break;
        case 'nueva_cotizacion_fin':
            accion= await Cotizaciones.addCotizacionFin(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro finalizar la creacion de la cotización, revise su información'};
            if(accion.length ==0)  throw  { message : 'No se logro finalizar la creacion de la cotización, revise su información'};
        break;
        case 'nueva_version':
            accion= await Cotizaciones.addCotizacion(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro crear nueva version de la  cotización, revise su información'};
            if(accion.length ==0)  throw  { message : 'No se logro crear la nueva version de la cotización, revise su información'};

        break;
        case 'nuevo_proyecto':
            accion= await Cotizaciones.addProyecto(data, usuario);
            if(!accion)  throw  { message : 'Error no se logro crear nueva version de la  cotización, revise su información'};
            if(accion.length ==0)  throw  { message : 'No se logro crear la nueva version de la cotización, revise su información'};

        break;

        default:
            throw  { message : `No existe el tipo acción ${ data.tipo}, revise su información`};
    }
    return accion;
}

export const validarCotizacion =async (form, usuario)=>{

    const cotizacion= await Cotizaciones.getCotizacionXuser(form, usuario);
            if(!cotizacion)  throw  { message : 'Error no se logro finalizar la creacion de la cotización, revise su información'};

            let contador=0;
            if(cotizacion.length > 0) {
                for(let index = 0; index < cotizacion.length; index++){
                    const detalle = await Cotizaciones.getCotizacionXDetalle(cotizacion[index].id);
                    if(detalle.length == 0){
                        throw  { message : 'El usuario tiene Cotizaciones pendientes por terminar'};
                    }
                }
            }

            return contador;
}

export const cotizacionPendientes =async (form, usuario)=>{

            const cotizacion= await Cotizaciones.getCotizacionXuserDetalle(form, usuario);
                    if(!cotizacion)  throw  { message : 'Error no se logro consultar por cotizaciones, revise su información'};
        
            return cotizacion;
}