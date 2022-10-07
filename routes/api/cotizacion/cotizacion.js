import { Router } from 'express';
import * as CoreCotizacion from './core-cotizacion';

class Cotizacion{
    constructor(){
        const api = Router();

        api.post('/',this.listar); 
        api.post('/ver', this.getCotizacion);

        
        return api;
    };

    async listar(req, res) {

        try {
            let result;
            let validacion;
            let contador;
            switch(req.body.tipo){
                case 'cotizaciones':
                    validacion = await CoreCotizacion.validaActive(req.body);//[quotations]
                    result = await CoreCotizacion.getCotizacion(req.body);
                    contador = await CoreCotizacion.getContadores(req.body)
                break;  
                case 'cotizacion':
                    if(!req.body.id){
                        throw new Error('ID es necesario, revise su información')  
                    }
                        validacion = await CoreCotizacion.validaActive(req.body);//[detalle_compañia]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break; 
                case 'filtros':
                        validacion = await CoreCotizacion.validaActive(req.body);//[detalle_compañia]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break; 
                case 'historial':
                    validacion = await CoreCotizacion.validaActive(req.body);//[historial]
                    result = await CoreCotizacion.getCotizacion(req.body);
                    contador = await CoreCotizacion.getContadores(req.body)
            break; 
                default:
                    throw new Error('No existe el tipo, revise su información')  
            }
            return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
        } catch (error) {
            return res.status(401).json({ ok: false ,msg: JSON.stringify(error.message) });  
        }
    }
    async getCotizacion(req, res) {

    }

}
export default Cotizacion;