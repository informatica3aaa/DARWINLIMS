import { Router } from 'express';
import * as CoreBodega from './core-bodega';

class Bodega{
    constructor(){
        const api = Router();

       api.get('/muestras', this.getMuestras)
        return api;
    };

    async getMuestras(req, res) {

        try {
            let requi = await CoreBodega.mailClientes(req.body)
            return res.status(200).json({ ok: true, data: requi, }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }

    }

}
export default Bodega;