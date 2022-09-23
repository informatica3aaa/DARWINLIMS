import { Router } from 'express';
import Herramienta from './herramienta';

class RouteHerramienta{
    constructor(){
        const api = Router();

        api.use('', new Herramienta()); 
        return api;
    }
}
export default RouteHerramienta;