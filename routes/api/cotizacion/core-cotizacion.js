import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import Cotizaciones from '../../../lib/models/cotizacion/cotizacionSQL';


export const validaActive = async (data)=>{
    let v = await validateAll(data, {
        tipo:'required|in:cotizaciones,cotizacion,filtros,historial',
        active:'required|in:0,1,2',
        offset:'required|integer',
        limit:'required|integer'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Dato de entrada fuera de rango, revise su información') });
        
       if(data.id && data.tipo =='cotizacion'){
         v = await validateAll(data, {
            id:'required|integer'
            },
           mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Dato de entrada debe ser número y es requerido, revise su información') });
       }

       if(data.tipo =='historial'){
        v = await validateAll(data, {
            company_id:'required|integer',
            project_id:'required|integer'
         
        },
          mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Dato de entrada debe ser número y es requerido, revise su información') });
      }

      if(data.tipo =='por_aprobar'){
        v = await validateAll(data, {
            quotation_state_id:'required|integer'         
        },
          mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Dato de entrada debe ser número y es requerido, revise su información') });
      }

       return v.ok;
}

export const getContadores = async(data)=>{
    const query = await getCotizacionFiltros(data);
    const contador = await Cotizaciones.ContTools(data, query);
    if(contador.length == 0){
        throw new Error('No se pudo contar registros, revise su información')  
    }

    return contador[0].total; 
}

export const getCotizacion = async (data)=>{
    let tool;
    let condicionesEspecificas;
    let emails;
    let proyectos;
    let contizaciones;
    switch(data.tipo){
        case 'cotizaciones':
            tool = await Cotizaciones.getCotizaciones(data);
            if(tool.length == 0){
                throw new Error('No se encontraron cotizaciones, revise su información')  
            }
        break ;
        case 'cotizacion':
            tool = await Cotizaciones.getCotizacionesId(data);
            if(tool.length == 0){
                throw new Error('No se encontraron cotizaciones, revise su información')  
            }
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
                if(tool.length == 0){
                    throw new Error('No se encontraron cotizaciones según los filtros ingresados, revise su información')  
                }

        break ;    
        case 'historial':
            tool = await Cotizaciones.getCotizacionesHistorial(data)
            if(tool.length == 0){
                throw new Error('No se encontraron cotizaciones según los filtros ingresados, revise su información')  
            }

    break ;                               
        case 'por_aprobar':
            tool = await Cotizaciones.getCotizaciones(data);
            if(tool.length == 0){
                throw new Error('No se encontraron cotizaciones, revise su información')  
            }
        break ;   
    default:
            throw new Error('No existe el tipo para realizar la busqueda, revise su información')  
    }
    return tool;
}

export const getCotizacionFiltros = async (data)=>{
    let where ='';
    if(data.active){
        if(Number(data.active) == 2){
            where += ` quo.[active] in (0,1) `
        }
        if(Number(data.active) != 2){
        where += ` quo.[active] = ${ Number(data.active)}`
        }
    }
    if(data.estado) where += ` and quo.[state_id] =${data.state_id}`
    if(data.cliente) where += ` and com.[name] like '%${data.cliente}%'`
    if(data.quotation_state_id) where += ` and quo.[quotation_state_id] = ${ data.quotation_state_id}`
    if(data.creador) where += ` and us.[username] like '%${ data.creador}%'`
    // if(data.vigencia) where += ` and vigencia like%${data.vigencia}%`
    return where;
}

export const validaAccion = async (data)=>{
    let v = await validateAll(data, {
        accion:'required|in:aprobar_venta,aprobar_produccion,rechazar,nueva_cotizacion,detalle_cotizacion'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Tipo de accion fuera de rango, revise su información') });
        
       switch(data.accion){
        case 'aprobar_venta':
            v = await validateAll(data, {
                id:'required|integer',
                state_id:'required|in:2',
                active:'required|in:1'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada aprobar_venta fuera de rango, revise su información') });
        break;
        case 'aprobar_produccion':
            v = await validateAll(data, {
                id:'required|integer',
                state_id:'required|in:2',
                active:'required|in:1'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada aprobar_produccion fuera de rango, revise su información') });
        break;
        case 'rechazar':
            v = await validateAll(data, {
                id:'required|integer',
                state_id:'required|in:3',
                comentario:"required|required",
                active:'required|in:1'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada rechazar fuera de rango, revise su información') });
        break;
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
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw new Error('Datos de entrada para crear cotizacion nueva fuera de rango o no corresponde, revise su información') });
        break;
        case 'detalle_cotizacion':
            v = await validateAll(data, {
                active:'required|in:1',
                quotation_id:'required|integer',
                assay_id:'required|integer',
                price:'required|integer'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw new Error('Datos de entrada detalles de cotizacion fuera de rango o no corresponde, revise su información') });
        break
        case 'nueva_cotizacion_fin':
            v = await validateAll(data, {
                active:'required|in:1',
                quotation_id:'required|integer'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw new Error('Datos de entrada detalles de cotizacion fuera de rango o no corresponde, revise su información') });
        break
        default:
            throw new Error('No existe el tipo acción, revise su información')  
    }

       return v.ok;
}

export const cotizacionAccion = async (data)=>{
const usuario ={
    user_id:533
}; 
let accion;
let estado;
       switch(data.accion){
        case 'aprobar_venta':
            accion= await Cotizaciones.updateAccion(data, usuario);
            estado = await Cotizaciones.consultaEstadoCotizacion(data);
            if(estado.length == 1){ let cambiarEstado = Cotizaciones.cambiarEstado(data, usuario) }

        break;
        case 'aprobar_produccion':
            accion= await Cotizaciones.updateAccion(data, usuario);
            estado = await Cotizaciones.consultaEstadoCotizacion(data);
            if(estado.length == 1){ let cambiarEstado = Cotizaciones.cambiarEstado(data, usuario) }
        break;
        case 'rechazar':
            accion= await Cotizaciones.updateAccion(data, usuario);
        break;
        case 'nueva_cotizacion':
            accion= await Cotizaciones.addCotizacion(data, usuario);
            if(!accion)  throw new Error('No se logro crear la cotización, revise su información')   ;
            if(accion.length ==0)  throw new Error('No se logro crear la nueva cotización, revise su información')   ;
            console.log("RETORNO DE BD", accion);
        break;
        case 'detalle_cotizacion':
            accion= await Cotizaciones.addDetallesCotizacion(data, usuario);
            if(!accion)  throw new Error('No se logro crear detalle de  cotización, revise su información')   ;
            if(accion.length ==0)  throw new Error('No se logro crear la nueva cotización, revise su información')   ;
            console.log("RETORNO DE BD", accion);
        break;
        case 'nueva_cotizacion_fin':
            accion= await Cotizaciones.addDetallesCotizacion(data, usuario);
            if(!accion)  throw new Error('No se logro crear detalle de  cotización, revise su información')   ;
            if(accion.length ==0)  throw new Error('No se logro crear la nueva cotización, revise su información')   ;
            console.log("RETORNO DE BD", accion);
        break;
        default:
            throw new Error('No existe el tipo acción, revise su información')  
    }
    return accion;
}