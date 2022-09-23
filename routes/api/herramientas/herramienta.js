import { Router } from 'express';
import * as CoreHerramienta from './core-herramienta';

class Herramienta{
    constructor(){
        const api = Router();
        api.post('/getregiones', this.getregiones); 
        return api;
    };

    async getregiones(req, res) {
        try {
            const regiones = await CoreHerramienta.getRegiones();
            return res.status(200).json({ ok: true, data: regiones }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: JSON.stringify(error.message) });  
        }

    }

}
export default Herramienta;