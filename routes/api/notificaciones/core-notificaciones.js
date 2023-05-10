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

export const add = async (result,req)=>{
    const data = await Notificaciones.add(req.body.modulo, result.id, 'CREADO',req.usuario);
    console.log("data");
    if(!data)  throw  { message : `Error no se crear la Notificación`};
       return data;   
}