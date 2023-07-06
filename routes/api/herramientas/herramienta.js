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
api.post('/adjuntar', this.adjuntar)
api.post('/descargar', this.descargar)
api.post('/servicios', this.getServicios)
api.post('/balanzas', this.getBalanzas)
api.post('/balanzas/patron', this.balPatrones)
api.post('/balanzas/editar', this.balEditar)
api.post('/balanzas/eliminar', this.balEliminar)
api.post('/balanzas/calibracion', this.balCalibracion)
api.post('/balanzas/add', this.addBalanzas)

return api;
};

async addBalanzas(req, res){
    try {
        const result = await CoreHerramienta.balAdd(req.body)
        return res.status(200).json({ ok:true, data:result })
    } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
    }
}



async balPatrones(req, res){
    try {
        const result = await CoreHerramienta.balPatrones(req.body)
        return res.status(200).json({ ok:true, data:result })
    } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
    }
}

async balEditar(req, res){
    try {
        const result = await CoreHerramienta.balEditar(req.body)
        return res.status(200).json({ ok:true, data:result })
    } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
    }
}

async balEliminar(req, res){
    try {
        const result = await CoreHerramienta.balEliminar(req.body)
        return res.status(200).json({ ok:true, data:result })
    } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
    }
}

async balCalibracion(req, res){
    try {
        const result = await CoreHerramienta.balCalibracion(req.body)
        const contador = await CoreHerramienta.balCalibracionCont(req.body)
        return res.status(200).json({ ok:true, cantidad :contador, data:result })
    } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message });   
    }
}

async getPatrones(req, res){
    try {
        const result = await CoreHerramienta.getBalanzas(req.body);
        const contador = await CoreHerramienta.getBalanzasCont()
        return res.status(200).json({ ok: true, cantidad :contador,  data: result });
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });   
    }
    
    }



async getBalanzas(req, res){
    try {
        const result = await CoreHerramienta.getBalanzas(req.body);
        const contador = await CoreHerramienta.getBalanzasCont()
        return res.status(200).json({ ok: true, cantidad :contador,  data: result });
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });   
    }
    
    }


async getServicios(req, res){
    try {
        let query = await CoreHerramienta.filtrosServicios(req.body);
        const result = await CoreHerramienta.getServicios(query);
        return res.status(200).json({ ok: true, data: result });
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });   
    }
    
    }
    


//ARCHIVOS
async adjuntar(req, res){
try {
    const result = null
    return res.status(200).json({ ok: true, data: result });
} catch (error) {
    return res.status(200).json({ ok: false ,msg: error.message });   
}

}

async descargar(req, res){
    try {
        const result = null
        return res.status(200).json({ ok: true, data: result });
    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });   
        
    }
    
    }


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
    // console.log("req.body.tipo:::::::", req.body.tipo);
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
                // console.log("ENTRO:::unid");
                validacion = await CoreHerramienta.validaActive(req.body);//[unit]
                // console.log("validacion", validacion);
                result = await CoreHerramienta.getTools(req.body);
                // console.log("RESULTADO::::::", result)
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
                // console.log("entro:::::: quimicos")
                validacion = await CoreHerramienta.validaActive(req.body);//[chemical_elements]
                // console.log("validacion", validacion);
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
        console.log("error", error);
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
            let numero = null
            switch(req.body.tipo)
            {
                case 'compañia':
                    const valida = await CoreHerramienta.validaComprobar(req.body)
                    result = await CoreHerramienta.getCompaniaRut(req.body)
                    console.log("teste:::");
                break;
                default:
                    throw new Error(`No existe el tipo ${ req.body.tipo}, revisar el listado valido`)  
            }
            return res.status(200).json({ ok: true, data: result})
        } catch (error) {
            return res.status(200).json({ ok: false ,msg: error.message })
        }
    }
}
export default Herramienta;