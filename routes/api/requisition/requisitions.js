import { Router } from 'express';
import * as CoreRequisition from './core-requisition';

class Requisition{
    constructor(){
        const api = Router();

        api.post('/list',this.listar); 
        api.post('/buscar', this.buscar)
        api.post('/filter', this.filtros)
        api.post('/add', this.add)
        return api;
    };

    async listar(req, res) {

        try {
            const validar = await CoreRequisition.validaListar(req.body);
            let contador = await CoreRequisition.contador(req.body)
            let requi = await CoreRequisition.getAll(req.body)
            console.log("contador");
            return res.status(200).json({ ok: true, data: requi, cantidad: contador }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }

    }

    async buscar(req, res) {

        try {
            const validar = await CoreRequisition.validaBuscar(req.body);
            let requi = await CoreRequisition.getUni(req.body)
               return res.status(200).json({ ok: true, data: requi }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }

    }

    async filtros(req, res) {

        try {
            let validar = await CoreRequisition.validarFiltros(req.body);
            let requi = await CoreRequisition.getFiltros(req.body)
               return res.status(200).json({ ok: true, data: requi }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }

    }

    async add(req, res) {
        try {
            const validaAdd = await CoreRequisition.validaAdd(req.body);
            const validarQuo = await CoreRequisition.validaQuo(req.body);
            const requi = await CoreRequisition.add(req.body, req.user);
            return res.status(200).json({ ok: true, data: requi }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
            
        }
    }


}
export default Requisition;