import { Router } from 'express';
import * as CoreCotizacion from './core-cotizacion';
import * as CoreLog from '../log/core-log'

class Cotizacion{
    constructor(){
        const api = Router();

        api.post('/',this.listar); 
        api.post('/accion',this.acciones); 

        
        return api;
    };

    async listar(req, res) {

        try {
            const log = CoreLog.addHistory(req, req.user)
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
                        validacion = await CoreCotizacion.validaActive(req.body);//[quotations_con_detalles]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break; 
                case 'filtros':
                        validacion = await CoreCotizacion.validaActive(req.body);//[busqueda de cotizacion por filtros dinamicos]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break; 
                case 'historial':
                        validacion = await CoreCotizacion.validaActive(req.body);//[historial]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break;
                case 'proyectos':
                        validacion = await CoreCotizacion.validaActive(req.body);//[project x company_id]
                        result = await CoreCotizacion.getCotizacion(req.body);
                        contador = await CoreCotizacion.getContadores(req.body)
                break;  
                case 'servicios':
                    validacion = await CoreCotizacion.validaActive(req.body);//[project x company_id]
                    result = await CoreCotizacion.getCotizacion(req.body);
                break; 
                case 'servicio':
                    validacion = await CoreCotizacion.validaActive(req.body);//[project x company_id]
                    result = await CoreCotizacion.getCotizacion(req.body);
                break;   
                default:
                    throw new Error(`No existe el tipo acción ${ req.body.tipo}, consulte listado valido`)  
            }
            return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }
    }

    async acciones(req, res){
        let result;
        let validacion;
        try {
            const log = CoreLog.addHistory(req, req.user)
            validacion = await CoreCotizacion.validaAccion(req.body);
            result = await CoreCotizacion.cotizacionAccion(req.body,  req.user);
                return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }  
    }


}
export default Cotizacion;