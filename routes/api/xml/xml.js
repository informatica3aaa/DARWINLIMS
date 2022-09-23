import { Router } from 'express';
import * as CoreXml from './core-xml';

class Xml{
    constructor(){
        const api = Router();

        api.post('/add',this.add); 
        return api;
    };

    async add(req, res) {

    }

}
export default Xml;