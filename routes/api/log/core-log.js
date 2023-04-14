import axios from 'axios';
import Logs from '../../../lib/models/logs/logSql';
import { validateAll } from 'indicative';
import mensajes from '../../../lib/helpers/mensajes'; 

export const addHistory = async (form, user)=>{

        if(form.path){

             let   v = await validateAll(form, {
                        path:'required|string'
                        },
                       mensajes).then(d => {return  {ok: true, d}}).catch(e => { throw  { message : 'Debe contener un string, revise su información'}});
               
                const data = {
                        model : String(form.path).split('/')[1],
                        method : String(form.path).split('/')[2],
                        text: form.path
                        };
                const history = await Logs.creaHistory(data, user);
                if(!history)   throw  { message : `Error no se logra crear la historia ${ form.path }, revise su información`};
                return history[0]; 
        }else{
                return 0;
        }
    
}