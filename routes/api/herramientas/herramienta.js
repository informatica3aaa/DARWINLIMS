import { Router } from 'express';
import * as CoreHerramienta from './core-herramienta';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';

class Herramienta{
    constructor(){
        const api = Router();
        api.get('/getregiones/:id', this.getregiones); 
        api.get('/getcomunas/:id', this.getComunas); 
        api.post('/addregpais', this.addRegionPais); 
        api.post('/editregpais', this.editarRegionPais); 
        api.post('/activaregion', this.activarRegionPais); 
        return api;
    };
    

    async activarRegionPais (req, res){
        try {
            let result;
            console.log(req.body);
             if(req.body.tipo=='region'){
                const validacion = await CoreHerramienta.validaDelRegion(req.body);
                result = await CoreHerramienta.delRegion(req.body);
             }
             if(req.body.tipo=='pais'){
                       const validacion = await CoreHerramienta.validaDelPais(req.body);
                result = await CoreHerramienta.delPais(req.body);
             }

            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(401).json({ ok: false ,msg: JSON.stringify(error.message) });  
        }

    }

    async editarRegionPais (req, res){
        try {
            let result;
            if(req.body.tipo =="region"){
                const validacion = await CoreHerramienta.validaEditRegion(req.body);
                result = await CoreHerramienta.editarRegion(req.body);
            }
            if(req.body.tipo =="pais"){
                const validacion = await CoreHerramienta.validaEditPais(req.body);
                result = await CoreHerramienta.editarPais(req.body);
            }

            return res.status(200).json({ ok: true, data: result }); 
        } catch (error) {
            return res.status(401).json({ ok: false ,msg: JSON.stringify(error.message) });  
        }

    }
    
    async addRegionPais (req, res){
        try {
            let resultado;
            if(req.body.tipo=='region'){
                const validacion = await CoreHerramienta.validaDelPais(req.body);
                resultado = await CoreHerramienta.addRegion(req.body);
            }
            if(req.body.tipo=='pais'){
                const validacion = await CoreHerramienta.validaAddPais(req.body);
                resultado = await CoreHerramienta.addPais(req.body); 
            }

            return res.status(200).json({ ok: true, data: resultado }); 
        } catch (error) {
            return res.status(401).json({ ok: false ,msg: JSON.stringify(error.message) });  
        }

    }

    async getregiones(req, res) {
        try {
            const validacion = await CoreHerramienta.validaIdPais(req.params);
              const regiones = await CoreHerramienta.getRegiones(req.params.id);
            return res.status(200).json({ ok: true, data: regiones }); 
        } catch (error) {
            return res.status(401).json({ ok: false ,msg: JSON.stringify(error.message) });  
        }

    }

    async getComunas(req, res){
            try {
                const validacion = await CoreHerramienta.validaIdRegion(req.params);
                const comunas = await CoreHerramienta.getComunas(Number(req.params.id));
                return res.status(200).json({ ok: true, data: comunas }); 
            } catch (error) {
                return res.status(401).json({ ok: false ,msg: JSON.stringify(error.message) });  
            }
    }

}
export default Herramienta;