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
       console.log("pais", pais);
       if(pais.length == 0){
           throw new Error('El pais no existe o está inactivo, revise su información')  
       }


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
    console.log("region", region);
    if(!region){
        throw new Error('No se logro la creación de la region, revise su información')  
    }
    return region;

}

export const editarRegion = async (data)=>{

    const region = await Herramienta.editarRegion(data);
    console.log("region::::", region);
   
    if(!region){
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
    console.log("data", data);
    let v = await validateAll(data, {
        country_id:'required|integer',
        user_id:'required|integer',
        active:'required|in:0,1'
        },
       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw new Error('Datos de entrada debe no son validos, revise su información') });
  
       const pais  = await Herramienta.getContryId(data.country_id, data.active );
       console.log("pais::::::", pais);
       if(pais.length == 0){
           throw new Error('El pais no existe, revise su información')  
       }


       return v.ok;
}

export const delRegion = async (data)=>{
    const region = await Herramienta.delRegion(data);
   
    if(!region){
        throw new Error('No se logro la editar de la region, revise su información')  
    }
    return region;

}

export const delPais = async (data)=>{
    const region = await Herramienta.delPais(data);
   
    if(!region){
        throw new Error('No se logro la editar de la region, revise su información')  
    }
    return region;

}

