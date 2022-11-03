import axios from 'axios';
import Logs from '../../../lib/models/logs/logSql';

export const addHistory = async (form, user)=>{
        const history = await Logs.creaHistory(form, user);
        console.log("history ret:::", history);
        if(!history)   throw  { message : `Error no se logra crear la historia ${ form.ruta }, revise su información`};
        console.log("history guardada", history);
        return history[0]; 
    

}