import { Router } from 'express';
import * as CoreAnalisis from './core-analisis';

class Analisis{
    constructor(){
        const api = Router();

        api.post('/add',this.add); 
        return api;
    };

    async add(req, res) {
        console.log("req.:::", req.body);

        try {
            const mensajes = await CoreAnalisis.add();
            console.log("mensajes", mensajes);
            return res.status(200).json({ ok: true, data: mensajes });
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: JSON.stringify(error.message) });    
        }
    }

}
export default Analisis;