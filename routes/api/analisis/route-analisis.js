import { Router } from 'express';
import Analisis from './analisis';

class RouteAnalisis{
    constructor(){
        const api = Router();

        api.use('', new Analisis()); 
        return api;
    }
}
export default RouteAnalisis;