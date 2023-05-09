import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import fs from 'fs';
import Notificaciones from '../../../lib/models/notificaciones/notificacionesSQL';


export const listarNotificaciones = async (data)=>{
    const result = await Notificaciones.get(data);
    console.log("result;:::", result);
    if(!result)  throw  { message : `Error no se logra Listar las Notificaciones`};
       return result; 
}

export const add = async (data, user)=>{
    const result = await Notificaciones.add(data.modulo, data.id, 'CREADO', data.active, user.user_id);
    if(!result)  throw  { message : `Error no se logra Listar las Notificaciones`};
       return result;   
}