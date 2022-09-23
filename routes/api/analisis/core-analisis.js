import axios from 'axios';
import T_Analisis from '../../../lib/models/analisis/analisis';

export const add = async (form)=>{
 const mensajes = await T_Analisis.mensajes()
                .then(d=>{ return {ok: true, d}})
                .catch(e=>{ console.log(e); throw new Error(`No se realizar la consulta, consulte al administrador`) }); 

    return mensajes.d;
}