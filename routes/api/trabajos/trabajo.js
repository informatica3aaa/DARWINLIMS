import { Router } from 'express';
import * as CoreTrabajo from './core-trabajo';

class Trabajo{
    constructor(){
        const api = Router();

        api.post('/add',this.add); 
        return api;
    };

    async add(req, res) {

    }

}
export default Trabajo;