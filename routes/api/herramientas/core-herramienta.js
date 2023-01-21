import axios from 'axios';
import Herramienta from '../../../lib/models/herramienta/herramienta';
import Cotizaciones from '../../../lib/models/cotizacion/cotizacionSQL';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';

export const getRegiones = async (id)=>{

    const regiones = await Herramienta.getRegiones(id);

    if(regiones.length == 0){
        throw  { message : 'No se encontraron regiones, revise su información'};
    }
    return regiones;
}

export const getComunas = async (region_id)=>{

    const comunas = await Herramienta.getComunas(region_id);
    
    if(comunas.length == 0){
        throw  { message : 'No se encontraron comunas, revise su información'};
    }


    return comunas;
}

export const validaIdRegion = async (data)=>{
    let v = await validateAll(data, {
        id:'required|integer'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Dato de entrada debe ser número, revise su información'}});
  
        const region  = await Herramienta.getRegionId(data.id);
        if(region.length == 0){
            throw  { message : 'Region no existe o está inactiva, revise su información'};
        }

       return v.ok;
}

export const validaIdPais = async (data)=>{
    let v = await validateAll(data, {
        id:'required|integer'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Dato de entrada debe ser número, revise su información' }});
  
       const pais  = await Herramienta.getContryId(data.id, 1);

       if(pais.length == 0){
           throw  { message : 'El pais no existe o está inactivo, revise su información'};
       }


       return v.ok;
}

export const validaEstadoActive = async (data)=>{
    let v = await validateAll(data, {
        id:'required|in:0,1'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Error dato de entrada debe ser número y/o fuera de rango, revise su información' }});
  
       return v.ok;
}


export const validaActive = async (data)=>{
    console.log("DATA:::::", data)
    let v = await validateAll(data, {
        tipo:'required|in:tecnica,elemento_tipo,digestiones,tipos_de_unidad,tipos_de_ensayo,metodos,estandares,transporte_tipo,unidad_tipo,unidades,estados,escalas,etapas_de_requisicion,estado_de_cotizacion,formulas,mallas,estado_material,monedas,elementos_quimicos,tipo_de_direccion,compañias,compañia',
        active:'required|in:0,1',
        offset:'required|integer',
        limit:'required|integer'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch( e => { throw  { message : `Error en los datos de entrada, revise su información`}})
      
       switch(data.tipo){
        case 'compañias':
            v = await validateAll(data, {
                id:'required|integer',
                todas:'required|in:si,no',
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada fuera de rango, revise su información' }});
        break;
        case 'compañia':
            v = await validateAll(data, {
                id:'required|integer'
                },
               mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada fuera de rango, revise su información'}});
        break;

        default:
            throw  { message : 'No existe el tipo para realizar la consulta, revise su información'};
        }  

       return v.ok;
}

export const validaComprobar = async (data)=>{
    let v = await validateAll(data, {
        tipo:'required|in:compañia',
        active:'required|in:0,1',
        offset:'required|integer',
        limit:'required|integer',
        rut:'required|integer'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch( e => { throw  { message : `Error en los datos de entrada, revise su información`}})
       
       return v.ok;   
}

export const validaAddRegion = async (data)=>{
    let v = await validateAll(data, {
        country_id:'required|integer',
        name:'required|string|max:70',
        user_id:'required|integer',
        order:'required|integer',
        active:'required|in:0,1' 
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada debe no son validos, revise su información' }});
  
        const pais  = await Herramienta.getContryId(data.country_id, data.active);
        if(pais.length == 0){
            throw  { message : 'El pais no existe o está inactivo, revise su información'};
        }

       return v.ok;
}

export const validaEditRegion = async (data)=>{
    let v = await validateAll(data, {
        id:'required|integer',
        country_id:'required|integer',
        name:'required|string|max:70',
        user_id:'required|integer',
        order:'required|integer',
        active:'required|in:0,1'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada debe no son validos, revise su información'}});
  
        const region  = await Herramienta.getEditRegion(data);
        if(region.length == 0){
            throw  { message : 'La region No existe, revise su información'};
        }

       return v.ok;
}

export const addRegion = async (data)=>{
    const region = await Herramienta.addRegion(data);

    if(region.length == 0){
        throw  { message : 'No se logro la creación de la region, revise su información'};
    }
    return region;

}

export const addPais = async (data)=>{
    const pais = await Herramienta.addPais(data);
    if(pais.length == 0){
        throw  { message : 'No se logro la creación del pais, revise su información'};
    }
    return pais;

}

export const editarRegion = async (data)=>{

    const region = await Herramienta.editarRegion(data);
    if(region.length == 0){
        throw  { message : 'No se logro la editar de la region, revise su información'};
    }
    return region;

}

export const validaDelRegion = async (data)=>{
    let v = await validateAll(data, {
        id:'required|integer',
        country_id:'required|integer',
        user_id:'required|integer',
        active:'required|in:0,1'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada debe no son validos, revise su información'}});
  
        const region  = await Herramienta.getEditRegion(data);
        if(region.length == 0){
            throw  { message : 'La region No existe, revise su información'};
        }

       return v.ok;
}

export const validaDelPais = async (data)=>{

    let v = await validateAll(data, {
        country_id:'required|integer',
        user_id:'required|integer',
        active:'required|in:0,1'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada debe no son validos, revise su información'}});
  
       const pais  = await Herramienta.getContry(data.country_id );

       if(pais.length == 0){
           throw  { message : 'El pais no existe, revise su información'};
       }


       return v.ok;
}

export const validaAddPais = async (data)=>{
    let v = await validateAll(data, {
        user_id:'required|integer',
        name:'required|string|max:70'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada debe no son validos, revise su información'}});

       const pais  = await Herramienta.getContryName(data.name);

       if(pais.length != 0){
           throw  { message : 'El pais existe, revise su información'};
       }


       return v.ok;
}

export const delRegion = async (data)=>{
    const region = await Herramienta.delRegion(data);
   
    if(region.length == 0){
        throw  { message : 'No se logro la editar de la region, revise su información'};
    }
    return region;

}

export const delPais = async (data)=>{
    const pais = await Herramienta.delPais(data);
    if(pais.length == 0){
        throw  { message : 'No se logro la actulaización de  pais, revise su información'};
    }
    return pais;

}

export const validaEditPais = async (data)=>{
    let v = await validateAll(data, {
        country_id:'required|integer',
        user_id:'required|integer',
        active:'required|in:0,1',
        name:'required|string|max:70'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada debe no son validos, revise su información'}});
  
       const pais  = await Herramienta.getContry(data.country_id );

       if(pais.length == 0){
           throw  { message : 'El pais no existe, revise su información'};
       }


       return v.ok;   
}

export const editarPais = async (data)=>{
    const pais = await Herramienta.editarPais(data);
    if(pais.length == 0){
        throw  { message : 'No se logro la editar el pais, revise su información'};
    }
    return pais;
}

export const getPaises = async(active)=>{
    const paises = await Herramienta.getPaises(active);
    
    if(paises.length == 0){
        throw  { message : 'No se encontraron paises, revise su información'};
    }


    return paises; 
}
//TECNICAS
export const getTecnicas = async(active)=>{
    const tecnicas = await Herramienta.getTecnicas(active);
    
    if(tecnicas.length == 0){
        throw  { message : 'No se encontraron tecnicas, revise su información'};
    }

    return tecnicas; 
}


export const validaEditTools = async(data)=>{
    let v = await validateAll(data, {
        tipo:'required|string|in:tecnica,elemento_tipo,digestiones',
        id:'required|integer',
        user_id:'required|integer',
        active:'required|in:0,1',
        name:'required|string|max:70'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Datos de entrada debe no son validos, revise su información'}});

      let consul;
      switch(data.tipo){
        case 'tecnica':
            consul = await Herramienta.getTecnicasId(data);
            if(consul.length == 0){
                throw  { message : 'Techniques no existe, revise su información'};
            } 
        break;
        case 'elemento_tipo':
            consul = await Herramienta.getElemento_tipoId(data);
            console.log("consul::::", consul);
            if(consul.length == 0){
                throw  { message : 'Element_type no existe, revise su información'};
            } 
        break;
        case 'digestiones':
            consul = await Herramienta.getDigestionId(data);
            console.log("consul::::", consul);
            if(consul.length == 0){
                throw  { message : 'Digestions no existe, revise su información'};
            } 
        break;
        default:
            throw  { message : 'No existe el tipo en validación, revise su información'};

        }
       return v.ok;  
}

export const editTools = async (data)=>{
    let tool;
    switch(data.tipo){
        case 'tecnica':
            tool = await Herramienta.editarTecnica(data);
            if(tool.length == 0){
                throw  { message : 'No se logro la tecnica, revise su información'};
            }
        break;
        case 'elemento_tipo':
            tool = await Herramienta.editarElemento_tipo(data);
            if(tool.length == 0){
                throw  { message : 'No se logro la tecnica, revise su información'};
            }
        break;
        case 'digestiones':
            tool = await Herramienta.editarDigestiones(data);
            if(tool.length == 0){
                throw  { message : 'No se logro la tecnica, revise su información'};
            }
        break;
        default:
        throw  { message : 'No existe el tipo en editar, revise su información'};
    }

    return tool;
}

export const getTools = async (data)=>{
    let tool;
    let direccion;
    let emails;
    let proyectos;
    let contizaciones;
    switch(data.tipo){
        case 'tecnica':
                tool = await Herramienta.getTecnicas(data);
                if(!tool)  throw  { message : `Error no se logra consultar por ${ data.tipo}, revise su información` };
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            break;
        case 'elemento_tipo':
            tool = await Herramienta.getElementotipo(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            break;
        case 'digestiones':
                tool = await Herramienta.getDigestiones(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            break;
        case 'tipos_de_unidad':
                tool = await Herramienta.getTipoUnidad(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
             break;
        case 'tipos_de_ensayo':
                tool = await Herramienta.getTipoEnsayo(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break;
        case 'metodos':
                tool = await Herramienta.getMetodos(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break;
        case 'estandares':
                tool = await Herramienta.getEstandares(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break;
        case 'transporte_tipo':
                tool = await Herramienta.getTransporteTipo(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
                break;
        case 'unidades':
                tool = await Herramienta.getUnidades(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break;       
        case 'estados':
                tool = await Herramienta.getEstados(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break;      
        case 'escalas':
                tool = await Herramienta.getEscalas(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break;      
        case 'etapas_de_requisicion':
                tool = await Herramienta.getEtapaSolicitud(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break;
        case 'estado_de_cotizacion':
                tool = await Herramienta.getEstadoCita(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break ;     
        case 'formulas':
                tool = await Herramienta.getFormulas(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break ;    
        case 'mallas':
                tool = await Herramienta.getMallas(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break ; 
        case 'estado_material':
                tool = await Herramienta.getEstadoMaterial(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break ; 
        case 'monedas':
                tool = await Herramienta.getMonedas(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break ;   
        case 'elementos_quimicos':
                tool = await Herramienta.getElementosQuimicos(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break ; 
        case 'tipo_de_direccion':
                tool = await Herramienta.getTipoDireccion(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
        break ; 
        case 'compañias':
            if(data.todas =='si'){
                tool = await Herramienta.getCompaniasAll(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            }else{
                tool = await Herramienta.getCompanias(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};
            }
        break; 
        case 'compañia':
                tool = await Herramienta.getCompaniaId(data);
                if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
                    if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};

                for(let index = 0; index < tool.length; index++){
                            direccion= await Herramienta.getDireccion(data,tool[index].id );
                            tool[index].direccion= direccion;
                }
                for(let index1 = 0; index1 < tool.length; index1++){
                        emails= await Herramienta.getMails(data, tool[index1].id );
                        tool[index1].emails= emails;2
                }
                for(let index2 = 0; index2 < tool.length; index2++){
                        proyectos= await Herramienta.getProyectos(data, tool[index2].id );
                        tool[index2].proyectos= proyectos;
                }
                    // for(let index3 = 0; index3 < tool.length; index3++){
                    //     contizaciones= await Cotizaciones.getCotizacionesId(data, tool[index3].id );
                    //     tool[index3].contizaciones= contizaciones;
                    // }
        break; 
        default:
            throw  { message : 'No existe el tipo para realizar la busqueda, revise su información'};
    }
    return tool;
}

export const getCompaniaRut = async (data)=>{
    let tool = await Herramienta.getCompaniaRut(data);
    if(!tool)  throw  { message :  `Error no se logra consultar por ${ data.tipo}, revise su información`};
        if(tool.length == 0){ throw  { message : `Sin resultados para ${ data.tipo}, revise su información`}};

    for(let index = 0; index < tool.length; index++){
                let direccion= await Herramienta.getDireccion(data,tool[index].id );
                tool[index].direccion= direccion;
    }
    for(let index1 = 0; index1 < tool.length; index1++){
            let emails= await Herramienta.getMails(data, tool[index1].id );
            tool[index1].emails= emails;2
    }
    for(let index2 = 0; index2 < tool.length; index2++){
           let  proyectos= await Herramienta.getProyectos(data, tool[index2].id );
            tool[index2].proyectos= proyectos;
    }
    return tool;
}

export const getContadores = async(data)=>{
    let cont=0;
    const contador = await Herramienta.ContTools(data);
        if(!contador)  throw  { message : 'Error no se logro contar, revise su información'};
        cont = contador[0].total;
    if(contador.length == 0){
        cont = 0;
    }

    return cont; 
}
