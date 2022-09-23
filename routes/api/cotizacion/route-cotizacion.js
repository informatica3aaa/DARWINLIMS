import { Router } from 'express';
import Cotizacion from './cotizacion';

class RouteCotizacion{
    constructor(){
        const api = Router();

        api.use('', new Cotizacion()); 
        return api;
    }
}
export default RouteCotizacion;