import axios from 'axios';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes';
import Bodega from '../../../lib/models/bodega/bodegaSQL';

export const getMuestras = async ()=>{
const form = await Bodega.getMuestras(data, query);
if(!contador)  throw  { message : `Error no se logra contar ${ data.id}, revise su información`};
   return contador[0].total; 

return form;
}