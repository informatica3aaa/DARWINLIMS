import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import Cotizaciones from '../../../lib/models/cotizacion/cotizacionSQL';
import Requisitions from '../../../lib/models/Requisition/RequisitionSQL';
import Requisition from './requisitions';




export const validaListar = async (data)=>{
let v = await validateAll(data, {
    active:'required|range:-1,2',
    offset:'required|integer',
    limit:'required|integer'   
    },
   mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada fuera de rango o no corresponde, revise su información'}});
  
   return v
}

export const contador = async (data)=>{
    const contador = await Requisitions.contador(data);
    if(!contador)  throw  { message : `Error no se logra contar requisiciones, revise su información`};
       return contador[0].total; 
}

export const getAll = async (data)=>{
        const requi = await Requisitions.getAll(data);
        if(!requi)  throw  { message : `Error no se logra consultar por estado ${ data.active }, revise su información`};
        if(requi.length == 0){ throw  { message : `Sin resultados para estado  ${ data.active }, revise su información`}};

return requi;

}

export const validaBuscar = async (data)=>{
    let v = await validateAll(data, {
        active:'required|range:-1,2',
        id:'required|integer'  
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada fuera de rango o no corresponde, revise su información'}});
      
       return v
    }

export const getUni = async (data)=>{
    let requi = await Requisitions.getUni(data);
                if(!requi)  throw  { message : `Error no se logra consultar por requisicion Nro ${ data.id }, revise su información`};
                if(requi.length == 0){ throw  { message : `Sin resultados para requisicion Nro  ${ data.id }, revise su información`}};

                let mail = await Requisitions.mail(requi);
                    if(!mail)  throw  { message : `Error no se logra consultar por Mail requisicion Nro ${ requi.id }, revise su información`};
                 requi.mail = mail

                 let adjunto = await Requisitions.adjuntos(requi);
                 if(!adjunto)  throw  { message : `Error no se logra consultar por adjuntos requisicion Nro ${ requi.id }, revise su información`};
                 requi.adjuntos = adjunto
                

                const datos ={
                    active: null,
                    id: requi.quotation_id
                 }
                 let cotizaciones = await Cotizaciones.getCotizacionesId(datos);
                 if(!cotizaciones)  throw  { message : `Error no se logra consultar por cotizaciones requisicion Nro ${ requi.id }, revise su información`};
                 
                 requi.cotizaciones = cotizaciones

                 let detalle = await Cotizaciones.getDetallesCotizacion(requi.quotation_id);
                 if(!detalle)  throw  { message : `Error no se logra consultar por detalle de cotizaciones requisicion Nro ${ requi.id }, revise su información`};
                 requi.cotizaciones[0].detalles = detalle

                 let historia = await Requisitions.historia(requi);
                 if(!historia)  throw  { message : `Error no se logra consultar por historia requisicion Nro ${ requi.id }, revise su información`};
                 requi.historia = historia




    return requi;
    }
    
export const validarFiltros = async (data)=>{
    let v = await validateAll(data, {
        active:'required|range:-1,2',
        offset:'required|integer' ,
        limit:'required|integer' 
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada fuera de rango o no corresponde, revise su información'}});
      
       return v 
}

export const getFiltros = async (data)=>{
    let where ='';
        if(data.active == 2){
            where += ` re.[active] in (0,1) `
        }
        if(data.active != 2){
        where += ` re.[active] = ${ Number(data.active)}`
    }
    
    if(data.documento) where += ` and re.[name]  like '%${data.documento}%'`
    if(data.cliente) where += ` and co.[name] '%${data.cliente}%'`


   let  requi = await Requisitions.getAllFilter(data, where)
    if(!requi)  throw  { message : `Error no se logra consultar por filtros, revise su información`};
    // if(requi.length == 0){ throw  { message : `Sin resultados para filtro seleccionado, revise su información`}};

    return requi;
}

export const validaAdd = async (data)=>{
    let v = await validateAll(data, {
        quotation_id:'required|integer',
        company_id:'required|integer',
        name:'required|string',
        destinatario:'required',
        observations:'required',
        has_insert:'required|boolean'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { console.log("errores:::", e); throw  { message : 'Datos de entrada fuera de rango o no corresponde, revise su información'}});
      
       return v
}

export const add = async (data, user)=>{
    let requisicion = await Requisitions.addPaso1(data, user)
         if(!requisicion)  throw  { message : `Error al crear la requisición, revise su información`};

    return  requisicion;
}


export const validaQuo = async (data)=>{

    let cotizacion = await Cotizaciones.existeCotizacionId(data.quotation_id, data.company_id);
            if(!cotizacion)  throw  { message : `Error al consultar por cotizacion, revise su información`};

             if(cotizacion.length == 0)  throw  { message : `Cotizacion Nro ${data.quotation_id} no pertenece a la compañia , revise su información`};
    
    return cotizacion[0];

}
