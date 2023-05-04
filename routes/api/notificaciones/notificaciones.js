import { Router } from 'express';
import fs from 'fs';
import * as CoreNotificaciones from './core-notificaciones';
import * as CoreCotizaciones from '../cotizacion/core-cotizacion'

class Notificaciones{
    constructor(){
        /**
         * @openapi
         * tags:
         *  name:  Notificaciones
         *  description: API para las notificaciones via correo electronico
        */

const api = Router();
            api.post('/', this.listar); 
            api.post('/add', this.add)
            return api;
};

async listar (req, res){
    try {
        const result = await CoreNotificaciones.listarNotificaciones(req.body, req.user)
        return res.status(200).json({ ok: true, data: result }); 
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });
        
    }
}

async add (req, res){
    try {
        const quo = await CoreCotizaciones.getCotizacionQuo(data)
        const result = await CoreNotificaciones.add(req.body, req.user)
        return res.status(200).json({ ok: true, data: result }); 
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });
        
    }
}

}
    export default Notificaciones;