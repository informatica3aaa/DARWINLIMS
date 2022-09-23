import { Router } from 'express';
import * as CorePago from './core-pago';

class Pago{
    constructor(){
        const api = Router();

        api.post('/add',this.add); 
        return api;
    };

    async add(req, res) {

    }

}
export default Pago;