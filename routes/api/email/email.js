import { Router } from 'express' 
import HelperEmail  from './../../../lib/helpers/email_helper'
import * as CoreCotizacion from '../cotizacion/core-cotizacion';
import * as CoreNotificaciones from '../notificaciones/core-notificaciones';
import * as CoreEmail from './core-email';
import Notificaciones from '../../../lib/models/notificaciones/notificacionesSQL';

 

class Email{

    constructor()
    {
        const api = Router()

        api.post('/send', this.send)
        api.post('/cotizacion', this.cotizacion)
        api.post('/pago-previo', this.pagoPrevio)
        api.post('/requisicion', this.requisicion)
        
        return api
    }

    async send(req, res) 
    {
        const cm = new HelperEmail()  
        try {
            await cm.sendQuotation({correo: 'dcarrascocid@gmail.com'})   
            console.log('enviado')
            res.status(200).json({ok: true})
         } catch (error) {
            console.error('Error: ', error)
            res.status(200).json({ok: false})
        }

        console.log('paso todo')

    } 

    async cotizacion(req, res){
        try {
            console.log("USUARIO:::", req.body);
            const cm = new HelperEmail()  
            const result = await CoreCotizacion.getCotizacionQuoV2(req.body)
            const token = await CoreEmail.generarToken(req.body)
            const notificacion = await  CoreNotificaciones.add(result[0], req)
            await cm.sendQuotation(result[0], token)  
            return res.status(200).json({ ok: true, data: result[0]}); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });       
        }
    }

    async pagoPrevio(req, res){
        try {
            
        } catch (error) {
            
        }
    }

    async requisicion(req, res){
        try {
            
        } catch (error) {
            
        }
    }


}
export default Email;