import { Router } from 'express';
import Bodega from './bodega';

class RouteBodega{
    constructor(){
        const api = Router();

        api.use('', new Bodega()); 
        return api;
    }
}
export default RouteBodega;