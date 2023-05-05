import { Router } from 'express' 
import HelperEmail  from './../../../lib/helpers/email_helper'
import * as CoreCotizacion from '../cotizacion/core-cotizacion';

 

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
            const quo = await CoreCotizacion.getCotizacionQuo(req.body)
            const form ={
                company_id:quo[0].company_id,
                modulo: req.body.modulo
            }
            const destinatarios = await CoreCotizacion.getDestinatario(form)
            console.log("destinatarios", destinatarios);
            return res.status(200).json({ ok: true, data: quo }); 
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