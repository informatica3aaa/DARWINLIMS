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

export const add = async (quo,req)=>{
    // console.log("req", req.usuario);
    const data = await Notificaciones.add(req.body.modulo, quo.id, 'CREADO',req.user.user_id);
    console.log("data0,", data);
    if(!data)  throw  { message : `Error no se crear la Notificación`};
       return data;   
}