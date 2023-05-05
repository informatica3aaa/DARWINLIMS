import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import Cotizaciones from '../../../lib/models/cotizacion/cotizacionSQL';
import fs from 'fs';

export const nuevaCotizacion = async (data)=>{
    const cm = new HelperEmail()  
    try {
        const destinatarios  = await Cotizaciones.getDestinatario(data.company_id, data.modulo)   
        if(!destinatarios)  throw  { message : 'Error al buscar destinatarios, revise su información'};

        await cm.sendQuotation(destinatarios, data)   
        
    } catch (error) {

        const fallidos = await mailfallido(data.id, error.message, data)
        
    }

}

