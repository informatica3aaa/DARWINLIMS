import db from '../../db/connection';
import * as AnalisisSql from './analisisSql';
import moment from 'moment';
class Analisis {

    static mensajes(){
        return db.any(AnalisisSql.getMensaje,[])
    }


}
export default Analisis;