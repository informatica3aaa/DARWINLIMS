import { Router } from 'express';
import * as CoreIcp from './core-icp';
import { validateAll } from 'indicative';
import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import util from 'util';

class Herramienta{
    constructor(){
        const api = Router();
        api.post('/add', this.add);
        return api;
    };

async add (req, res){
    const parser = new xml2js.Parser();
    let filePath =  `/files/${Date.now()}_${req.body.name}`;
    let buffer =Buffer.from(req.body.base64.split(',')[1],"base64");
    fs.writeFileSync(path.join(__dirname, filePath),buffer);
    // res.json(filePath);

    fs.readFile(path.join(__dirname, filePath), (err, data)=>{
        if(!err){
            parser.parseString(data, (error, result)=>{
                if(!error){
                    console.log("resultado", util.inspect(result, false, null, true));
                }

            })

        }
    });

    try {
        const validacion = await CoreIcp.validateExtension(filePath);

        const result = await CoreIcp.add(req.body);
       return res.status(200).json({ ok: true, data: result }); 

    } catch (error) {
        return res.status(200).json({ ok: false ,msg: error.message });   
    }
}
}
export default Herramienta;