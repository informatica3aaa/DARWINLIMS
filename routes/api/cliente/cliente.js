import { Router } from 'express';
import * as CoreCliente from './core-cliente';

class Cliente{
    constructor(){
        const api = Router();

        api.post('/add',this.add); 
        api.post('/get',this.get); 
        return api;
    };

    async add(req, res) {

    }
    async get(req, res) {
        console.log("req:::", req.body);
        try {
        const  clientes = await CoreCliente.get();
         
        } catch (error) {
            
        }

    }

}
export default Cliente;