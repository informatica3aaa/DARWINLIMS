import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import Cotizaciones from '../../../lib/models/cotizacion/cotizacionSQL';


export const validaActive = async (data)=>{
    let v = await validateAll(data, {
        tipo:'required|in:cotizaciones,cotizacion,filtros',
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

       return v.ok;
}

export const getContadores = async(data)=>{
    const contador = await Cotizaciones.ContTools(data);
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
