import { Router } from 'express';
import Cliente from './cliente';

class RouteCliente{
    constructor(){
        const api = Router();

        api.use('', new Cliente()); 
        return api;
    }
}
export default RouteCliente;