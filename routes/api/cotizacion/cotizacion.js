import { Router } from 'express';
import * as CoreCotizacion from './core-cotizacion';

class Cotizacion{
    constructor(){
        const api = Router();

        api.post('/add',this.add); 
        api.post('/get', this.get);
        
        return api;
    };

    async add(req, res) {

    }
    async get(req, res) {

    }

}
export default Cotizacion;