import { Router } from 'express';
import Trabajo from './trabajo';

class RouteTrabajo{
    constructor(){
        const api = Router();

        api.use('', new Trabajo()); 
        return api;
    }
}
export default RouteTrabajo;