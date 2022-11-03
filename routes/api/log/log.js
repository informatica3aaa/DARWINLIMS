import { Router } from 'express';
import * as CoreLog from './core-log';

class Log{
    constructor(){
        const api = Router();

        api.post('/add',this.add); 
        return api;
    };

    async add(req, res) {
        try {
            const result = await CoreLog.addHistory(req.body, req.user)
            return res.status(200).json({ ok: true, data: result });   
        } catch (error) {
            console.log("error", error);
            return res.status(204).json({ ok: false ,msg:error.message });   
        }

    }

}
export default Log;