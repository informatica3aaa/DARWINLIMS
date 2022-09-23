import { Router } from 'express';
import * as CoreBodega from './core-bodega';

class Bodega{
    constructor(){
        const api = Router();

        api.post('/add',this.add); 
        return api;
    };

    async add(req, res) {

    }

}
export default Bodega;