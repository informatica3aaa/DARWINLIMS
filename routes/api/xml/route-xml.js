import { Router } from 'express';
import Xml from './xml';

class RouteXml{
    constructor(){
        const api = Router();

        api.use('', new Xml()); 
        return api;
    }
}
export default RouteXml;