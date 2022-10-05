import axios from 'axios';
import Herramienta from '../../../lib/models/herramienta/herramienta';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';

export const getRegiones = async (id)=>{

    const regiones = await Herramienta.getRegiones(id);

    if(regiones.length == 0){
        throw new Error('No se encontraron regiones, revise su información')  
    }
    return regiones;
}

export const getComunas = async (region_id)=>{

    const comunas = await Herramienta.getComunas(region_id);
    
    if(comunas.length == 0){
        throw new Error('No se encontraron comunas, revise su información')  
    }


    return comunas;
}

export const validaIdRegion = async (data)=>{
    let v = await validateAll(data, {
        id:'required|integer'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Dato de entrada debe ser número, revise su información') });
  
        const region  = await Herramienta.getRegionId(data.id);
        if(region.length == 0){
            throw new Error('Region no existe o está inactiva, revise su información')  
        }

       return v.ok;
}

export const validaIdPais = async (data)=>{
    let v = await validateAll(data, {
        id:'required|integer'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Dato de entrada debe ser número, revise su información') });
  
       const pais  = await Herramienta.getContryId(data.id);

       if(pais.length == 0){
           throw new Error('El pais no existe o está inactivo, revise su información')  
       }


       return v.ok;
}

export const validaActive = async (data)=>{
    let v = await validateAll(data, {
        tipo:'required|in:tecnica,elemento_tipo,digestiones,tipos_de_unidad,tipos_de_ensayo,metodos,estandares,transporte_tipo,unidad_tipo,unidades,estados,escalas,etapas_de_solicitud,estado_de_cita,formulas,mallas,estado_material,monedas,elementos_quimicos,tipo_de_direccion,compañias,cotizaciones',
        active:'required|in:0,1',
        offset:'required|integer',
        limit:'required|integer'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Dato de entrada fuera de rango, revise su información') });
  
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
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada debe no son validos, revise su información') });
  
        const pais  = await Herramienta.getContryId(data.country_id, data.active);
        if(pais.length == 0){
            throw new Error('El pais no existe o está inactivo, revise su información')  
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
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada debe no son validos, revise su información') });
  
        const region  = await Herramienta.getEditRegion(data);
        if(region.length == 0){
            throw new Error('La region No existe, revise su información')  
        }

       return v.ok;
}

export const addRegion = async (data)=>{
    const region = await Herramienta.addRegion(data);

    if(region.length == 0){
        throw new Error('No se logro la creación de la region, revise su información')  
    }
    return region;

}

export const addPais = async (data)=>{
    const pais = await Herramienta.addPais(data);
    if(pais.length == 0){
        throw new Error('No se logro la creación del pais, revise su información')  
    }
    return pais;

}


export const editarRegion = async (data)=>{

    const region = await Herramienta.editarRegion(data);
    if(region.length == 0){
        throw new Error('No se logro la editar de la region, revise su información')  
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
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada debe no son validos, revise su información') });
  
        const region  = await Herramienta.getEditRegion(data);
        if(region.length == 0){
            throw new Error('La region No existe, revise su información')  
        }

       return v.ok;
}

export const validaDelPais = async (data)=>{

    let v = await validateAll(data, {
        country_id:'required|integer',
        user_id:'required|integer',
        active:'required|in:0,1'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada debe no son validos, revise su información') });
  
       const pais  = await Herramienta.getContry(data.country_id );

       if(pais.length == 0){
           throw new Error('El pais no existe, revise su información')  
       }


       return v.ok;
}

export const validaAddPais = async (data)=>{
    let v = await validateAll(data, {
        user_id:'required|integer',
        name:'required|string|max:70'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada debe no son validos, revise su información') });
  
       const pais  = await Herramienta.getContryName(data.name );

       if(pais.length != 0){
           throw new Error('El pais existe, revise su información')  
       }


       return v.ok;
}

export const delRegion = async (data)=>{
    const region = await Herramienta.delRegion(data);
   
    if(region.length == 0){
        throw new Error('No se logro la editar de la region, revise su información')  
    }
    return region;

}

export const delPais = async (data)=>{
    const pais = await Herramienta.delPais(data);
    if(pais.length == 0){
        throw new Error('No se logro la actulaización de  pais, revise su información')  
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
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada debe no son validos, revise su información') });
  
       const pais  = await Herramienta.getContry(data.country_id );

       if(pais.length == 0){
           throw new Error('El pais no existe, revise su información')  
       }


       return v.ok;   
}

export const editarPais = async (data)=>{
    const pais = await Herramienta.editarPais(data);
    if(pais.length == 0){
        throw new Error('No se logro la editar el pais, revise su información')  
    }
    return pais;
}

export const getPaises = async(active)=>{
    const paises = await Herramienta.getPaises(active);
    
    if(paises.length == 0){
        throw new Error('No se encontraron paises, revise su información')  
    }


    return paises; 
}
//TECNICAS
export const getTecnicas = async(active)=>{
    const tecnicas = await Herramienta.getTecnicas(active);
    
    if(tecnicas.length == 0){
        throw new Error('No se encontraron tecnicas, revise su información')  
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
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada debe no son validos, revise su información') });

      let consul;
      switch(data.tipo){
        case 'tecnica':
            consul = await Herramienta.getTecnicasId(data);
            if(consul.length == 0){
                throw new Error('Techniques no existe, revise su información')  
            } 
        break;
        case 'elemento_tipo':
            consul = await Herramienta.getElemento_tipoId(data);
            console.log("consul::::", consul);
            if(consul.length == 0){
                throw new Error('Element_type no existe, revise su información')  
            } 
        break;
        case 'digestiones':
            consul = await Herramienta.getDigestionId(data);
            console.log("consul::::", consul);
            if(consul.length == 0){
                throw new Error('Digestions no existe, revise su información')  
            } 
        break;
        default:
            throw new Error('No existe el tipo en validación, revise su información')  

        }
       return v.ok;  
}

export const editTools = async (data)=>{
    let tool;
    switch(data.tipo){
        case 'tecnica':
            tool = await Herramienta.editarTecnica(data);
            if(tool.length == 0){
                throw new Error('No se logro la tecnica, revise su información')  
            }
        break;
        case 'elemento_tipo':
            tool = await Herramienta.editarElemento_tipo(data);
            if(tool.length == 0){
                throw new Error('No se logro la tecnica, revise su información')  
            }
        break;
        case 'digestiones':
            tool = await Herramienta.editarDigestiones(data);
            if(tool.length == 0){
                throw new Error('No se logro la tecnica, revise su información')  
            }
        break;
        default:
        throw new Error('No existe el tipo en editar, revise su información')  
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
            if(tool.length == 0){
                throw new Error('No se encontraron tecnicas, revise su información')  
            }
            break;
        case 'elemento_tipo':
            tool = await Herramienta.getElementotipo(data);
                if(tool.length == 0){
                throw new Error('No se encontraron elemento_tipo, revise su información')  
            }
            break;
        case 'digestiones':
            tool = await Herramienta.getDigestiones(data);
            if(tool.length == 0){
                throw new Error('No se encontraron digestiones, revise su información')  
            }
            break;
        case 'tipos_de_unidad':
                tool = await Herramienta.getTipoUnidad(data);
                if(tool.length == 0){
                    throw new Error('No se encontraron tipo de unidad, revise su información')  
                }
             break;
        case 'tipos_de_ensayo':
                tool = await Herramienta.getTipoEnsayo(data);
                if(tool.length == 0){
                    throw new Error('No se encontraron tipo de ensayo, revise su información')  
                }
        break;
        case 'metodos':
            tool = await Herramienta.getMetodos(data);
            if(tool.length == 0){
                throw new Error('No se encontraron metodos, revise su información')  
            }
    break;
        case 'estandares':
        tool = await Herramienta.getEstandares(data);
        if(tool.length == 0){
            throw new Error('No se encontraron estandares, revise su información')  
        }
        break;
        case 'transporte_tipo':
            tool = await Herramienta.getTransporteTipo(data);
            if(tool.length == 0){
                throw new Error('No se encontraron trasportes tipo, revise su información')  
            }
            break;
        case 'unidades':
                tool = await Herramienta.getUnidades(data);
                if(tool.length == 0){
                    throw new Error('No se encontraron Unidades, revise su información')  
                }
        break;       
        case 'estados':
                tool = await Herramienta.getEstados(data);
                if(tool.length == 0){
                    throw new Error('No se encontraron estados, revise su información')  
                }
        break;      
        case 'escalas':
                tool = await Herramienta.getEscalas(data);
                if(tool.length == 0){
                    throw new Error('No se encontraron escalas, revise su información')  
                }
        break;      
        case 'etapas_de_solicitud':
                tool = await Herramienta.getEtapaSolicitud(data);
                if(tool.length == 0){
                    throw new Error('No se encontraron etapas_de_solicitud, revise su información')  
                }
        break;
        case 'estado_de_cita':
            tool = await Herramienta.getEstadoCita(data);
            if(tool.length == 0){
                throw new Error('No se encontraron estado_de_cita, revise su información')  
            }
        break ;     
        case 'formulas':
            tool = await Herramienta.getFormulas(data);
            if(tool.length == 0){
                throw new Error('No se encontraron formulas, revise su información')  
            }
        break ;    
        case 'mallas':
            tool = await Herramienta.getMallas(data);
            if(tool.length == 0){
                throw new Error('No se encontraron mallas, revise su información')  
            }
        break ; 
        case 'estado_material':
            tool = await Herramienta.getEstadoMaterial(data);
            if(tool.length == 0){
                throw new Error('No se encontraron estado_material, revise su información')  
            }
        break ; 
        case 'monedas':
            tool = await Herramienta.getMonedas(data);
            if(tool.length == 0){
                throw new Error('No se encontraron monedas, revise su información')  
            }
        break ;   
        case 'elementos_quimicos':
            tool = await Herramienta.getElementosQuimicos(data);
            if(tool.length == 0){
                throw new Error('No se encontraron elementos_quimicos, revise su información')  
            }
        break ; 
        case 'tipo_de_direccion':
            tool = await Herramienta.getTipoDireccion(data);
            if(tool.length == 0){
                throw new Error('No se encontraron tipo_de_direccion, revise su información')  
            }
        break ; 
        case 'compañias':
            tool = await Herramienta.getCompanias(data);
            if(tool.length == 0){
                throw new Error('No se encontraron compañias, revise su información')  
            }
            // for(let index = 0; index < tool.length; index++){
            //         direccion= await Herramienta.getDireccion(data,tool[index].id );
            //         tool[index].direccion= direccion;
            // }
            // for(let index = 0; index < tool.length; index++){
            //         emails= await Herramienta.getMails(data, tool[index].id );
            //           tool[index].emails= emails;
            // }
            // for(let index = 0; index < tool.length; index++){
            //         proyectos= await Herramienta.getProyectos(data, tool[index].id );
            //         tool[index].proyectos= proyectos;
            // }
            for(let index = 0; index < tool.length; index++){
                    contizaciones= await Herramienta.getCotizaciones(data, tool[index].id );
                    tool[index].contizaciones= contizaciones;
        }
        case 'cotizaciones':
            tool = await Herramienta.getCotizaciones(data);
            if(tool.length == 0){
                throw new Error('No se encontraron compañias, revise su información')  
            }
            // for(let index = 0; index < tool.length; index++){
            //         direccion= await Herramienta.getDireccion(data,tool[index].id );
            //         tool[index].direccion= direccion;
            // }
            // for(let index = 0; index < tool.length; index++){
            //         emails= await Herramienta.getMails(data, tool[index].id );
            //           tool[index].emails= emails;
            // }
            // for(let index = 0; index < tool.length; index++){
            //         proyectos= await Herramienta.getProyectos(data, tool[index].id );
            //         tool[index].proyectos= proyectos;
            // }
        //     for(let index = 0; index < tool.length; index++){
        //             contizaciones= await Herramienta.getCotizaciones(data, tool[index].id );
        //             tool[index].contizaciones= contizaciones;
        // }
        break ;                                 
        default:
            throw new Error('No existe el tipo para realizar la busqueda, revise su información')  
    }
    return tool;
}

export const getContadores = async(data)=>{
    const contador = await Herramienta.ContTools(data);
    console.log("contador", contador);
    
    if(contador.length == 0){
        throw new Error('No se pudo contar registros, revise su información')  
    }

    return contador[0].total; 
}
