import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import Cotizaciones from '../../../lib/models/icp/icpSQL';



export const base64 = async (data)=>{}

export const validateExtension = async (file)=>{

    if (file) {
        const ext_validas = ['xml', 'txt', 'csv', 'xls','xlsx'];
        const nombre_cortado = file.split('.');
        const extension = nombre_cortado[nombre_cortado.length - 1];

        if (ext_validas.indexOf(extension.toLowerCase()) < 0){
            throw  { message : 'Extension de archivo no permitida, utilice un tipo de archivo valido' } 
        }
        
        return 'Archivo valido'



    }



}

export const add = async (data)=>{

}