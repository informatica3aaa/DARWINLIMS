import { Router } from 'express';
import * as CoreHerramienta from './core-herramienta';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';

class Herramienta{
    constructor(){
        const api = Router();
/**
 * @openapi
 * tags:
 *  name:   Herramientas
 *  description: API para herramientas del sistema
 */

/**
 * @openapi
 * paths:
 *  /api/herramientas/pais/{id}:
 *   get:
 *      summary: Lista todos los paises en estado activo o inactivo
 *      tags: [Herramientas]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *              minimum: 1
 *              example: 1
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: OK
 */
api.get('/pais/:id', this.getPais); 

/**
 * @openapi
 * paths:
 *  /api/herramientas/addpais:
 *   post:
 *      summary: crear un pais nuevo
 *      tags: [Herramientas]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: text
 *                              maximun: 70
 *                              required: true
 *                          user_id:
 *                              type: integer
 *                              example: 1225 
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: true
 *                              data:
 *                                  type: array
 *                                  example:  [{}]
 *                          
 */
api.post('/addpais', this.addPais); 
/**
 * @openapi
 * paths:
 *  /api/herramientas/addreg:
 *   post:
 *      summary: crear una nueva region
 *      tags: [Herramientas]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          country_id:
 *                              type: integer
 *                              example: 1
 *                          name:
 *                              type: string
 *                              example: region
 *                          user_id:
 *                              type: integer
 *                              example: 125
 *                          order:
 *                              type: integer
 *                              example: 12
 *                          active:
 *                              type: boolean
 *                              example: 1
 *      responses:
 *          200:
 *              description: respuesta correcta
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: true
 *                              data:
 *                                  type: array
 *                                  example: [{},{}]
 */
api.post('/addreg', this.addRegion); 
api.get('/getregiones/:id', this.getregiones); 
api.get('/getcomunas/:id', this.getComunas); 
api.post('/editregpais', this.editarRegionPais); 
api.post('/activaregion', this.activarRegionPais); 
api.post('/gettool', this.getTools); 
api.post('/edittools', this.editTools);
api.post('/comprobar', this.comprobar)
return api;
};
//TECNICAS
async editTools (req, res){
    try {
        let result;
        let validacion
        switch(req.body.tipo){
            case 'tecnica':
             validacion = await CoreHerramienta.validaEditTools(req.body);
             result = await CoreHerramienta.editTools(req.body);
            return res.status(200).json({ ok: true, data: result }); 
            break;
            case 'elemento_tipo':
             validacion = await CoreHerramienta.validaEditTools(req.body);
            result = await CoreHerramienta.editTools(req.body);
            return res.status(200).json({ ok: true, data: result }); 
            break;
            case 'digestiones':
            validacion = await CoreHerramienta.validaEditTools(req.body);
            result = await CoreHerramienta.editTools(req.body);
            return res.status(200).json({ ok: true, data: result }); 
            break;
            default:
            throw new Error('No existe el tipo de herramienta, revise su información')  
            
            
        } 

    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });   
    }
}

async getTools (req, res){
    // console.log("req:::::tools", req.body.tipo);
    try {
        let result;
        let validacion;
        let contador;
        switch(req.body.tipo){
            case 'tecnica':
                 validacion = await CoreHerramienta.validaActive(req.body);//[techniques]
                 result = await CoreHerramienta.getTools(req.body);
                 contador = await CoreHerramienta.getContadores(req.body); 
            break;
            case 'elemento_tipo':
                validacion = await CoreHerramienta.validaActive(req.body);//[element_types]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;
            case 'digestiones':
                validacion = await CoreHerramienta.validaActive(req.body);//[digestions]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;
            case 'tipos_de_unidad':
                validacion = await CoreHerramienta.validaActive(req.body);//[unit_types]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)

            break;
            case 'tipos_de_ensayo':
                validacion = await CoreHerramienta.validaActive(req.body);//assay_types
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;
            case 'metodos':
                validacion = await CoreHerramienta.validaActive(req.body);//[methods]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;
            case 'estandares':
                validacion = await CoreHerramienta.validaActive(req.body);//[[standards]]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;
            case 'transporte_tipo':
                validacion = await CoreHerramienta.validaActive(req.body);//[transport_types]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;
            case 'unidades':
                validacion = await CoreHerramienta.validaActive(req.body);//[unit]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;
            case 'estados':
                validacion = await CoreHerramienta.validaActive(req.body);//[states]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;
            case 'escalas':
                validacion = await CoreHerramienta.validaActive(req.body);//[scales]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;
            case 'etapas_de_requisicion':
                validacion = await CoreHerramienta.validaActive(req.body);//[requisition_stages]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;            
            case 'estado_de_cotizacion':
                validacion = await CoreHerramienta.validaActive(req.body);//[quotation_states]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;            
            case 'formulas':
                validacion = await CoreHerramienta.validaActive(req.body);//[formulas]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break; 
            case 'mallas':
                validacion = await CoreHerramienta.validaActive(req.body);//[meshes]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;  
            case 'estado_material':
                validacion = await CoreHerramienta.validaActive(req.body);//[estado_material]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;     
            case 'monedas':
                validacion = await CoreHerramienta.validaActive(req.body);//[currencies]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;    
            case 'elementos_quimicos':
                validacion = await CoreHerramienta.validaActive(req.body);//[chemical_elements]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;  
            case 'tipo_de_direccion':
                validacion = await CoreHerramienta.validaActive(req.body);//[address_types]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;  
            case 'compañias':
                validacion = await CoreHerramienta.validaActive(req.body);//[[companies]]
                result = await CoreHerramienta.getTools(req.body);
                contador = await CoreHerramienta.getContadores(req.body)
            break;  
            case 'compañia':
                validacion = await CoreHerramienta.validaActive(req.body);//[[companies x ID]]
                result = await CoreHerramienta.getTools(req.body);
            break;   
            case 'tipo_muestra':
                validacion = await CoreHerramienta.validaActive(req.body);//[[companies x ID]]
                // console.log("validacion", validacion);
                result = await CoreHerramienta.getTools(req.body);
            break; 
            case 'condiciones':
                validacion = await CoreHerramienta.validaActive(req.body);//[[general_conditions]]
                result = await CoreHerramienta.getTools(req.body);
            break;                              
            default:
                throw new Error(`No existe el tipo ${ req.body.tipo}, revisar el listado valido`)  
        }

        // if(result.length == 0 ){
        //     return res.status(204).json({ ok: false, total_registros: contador, data: result }); 
        // }

        return res.status(200).json({ ok: true, total_registros: contador, data: result }); 
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });  
    }
}

//PAIS , REGION, COMUNAS
    async getPais (req, res){
        try {
            const validacion = await CoreHerramienta.validaEstadoActive(req.params);
            const paises = await CoreHerramienta.getPaises(Number(req.params.id));
            return res.status(200).json({ ok: true, data: paises }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }
    }

    async activarRegionPais (req, res){
        try {
            let result;
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
            return res.status(200).json({ ok: false ,msg: error.message });   
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
            return res.status(200).json({ ok: false ,msg: error.message });  
        }

    }
    
    async addPais (req, res){
        try {
            let resultado;
            const validacion = await CoreHerramienta.validaAddPais(req.body);
            resultado = await CoreHerramienta.addPais(req.body); 

            return res.status(200).json({ ok: true, data: resultado }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });    
        }

    }

    async addRegion (req, res){
        try {
            let resultado;
                const validacion = await CoreHerramienta.validaAddRegion(req.body);
                resultado = await CoreHerramienta.addRegion(req.body);
            return res.status(200).json({ ok: true, data: resultado }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });    
        }

    }

    async getregiones(req, res) {
        try {
            const validacion = await CoreHerramienta.validaIdPais(req.params);
              const regiones = await CoreHerramienta.getRegiones(req.params.id);
            return res.status(200).json({ ok: true, data: regiones }); 
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });  
        }

    }

    async getComunas(req, res){
            try {
                const validacion = await CoreHerramienta.validaIdRegion(req.params);
                const comunas = await CoreHerramienta.getComunas(Number(req.params.id));
                return res.status(200).json({ ok: true, data: comunas }); 
            } catch (error) {
                return res.status(200).json({ ok: false ,msg: error.message });  
            }
    }

    async comprobar(req, res){

        try {
            let result = null

            switch(req.body.tipo)
            {
                case 'compañia':

                    try {
                        await CoreHerramienta.validaComprobar(req.body)

                    } catch (error) {
                        console.error('comprobar, validaComprobar::', error)
                        throw error  

                    }


                   try {
                       result = await CoreHerramienta.getCompaniaRut(req.body)
                       
                   } catch (error) {
                       console.error('comprobar, getCompaniaRut::', error)
                       throw error  
                   }
                break;
                default:
                    throw new Error(`No existe el tipo ${ req.body.tipo}, revisar el listado valido`)  
            }
            return res.status(200).json({ ok: true, data: result , id: 1})
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message })
        }
    }
}
export default Herramienta;