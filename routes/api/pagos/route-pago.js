import { Router } from 'express';
import Pago from './pago';

class RoutePago{
    constructor(){
        const api = Router();

        api.use('', new Pago()); 
        return api;
    }
}
export default RoutePago;