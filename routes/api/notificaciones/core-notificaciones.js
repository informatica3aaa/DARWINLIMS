import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import fs from 'fs';
import Notificaciones from '../../../lib/models/notificaciones/notificacionesSQL';


export const listarNotificaciones = async (data)=>{
    const result = await Notificaciones.get(data);
    // console.log("result;:::", result);
    if(!result)  throw  { message : `Error no se logra Listar las Notificaciones`};
       return result; 
}

export const add = async (quo, req)=>{
    console.log("req", req.body);
    const data = await Notificaciones.add(req.body.modulo, quo.id, 'CREADO',req.user.id);
                if(!data)  throw  { message : `Error no se creo la Notificación`};
       return data[0];   
}

export const actulizarEstado = async (id, estado , mensaje)=>{
    // console.log("actualiza", id, estado, mensaje);
    const resp = await Notificaciones.updateEstado(id, estado, JSON.stringify(mensaje));
    // console.log("resp", resp);
    if(!resp)  throw  { message : `Error no se logro actulizar el estado ${ resp}`};
    return resp;   
}