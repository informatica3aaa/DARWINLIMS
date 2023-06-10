import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../lib/models/user';
import * as CoreCotizacion from '../api/cotizacion/core-cotizacion';


class AuthRouter {

  constructor(){
    const api = Router();
/**
 * @openapi
 * paths:
 *  /auth/login:
 *   post:
 *      summary: aaceso al sistema
 *      tags: [Login]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: text
 *                              maximun: 70
 *                              required: true
 *                          password:
 *                              example: text
 *                              maximun: 70
 *                              required: true
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: OK
 */
    api.post('/login', async (req, res) => {
    const validPassword = await User.verifyPassword(req.body.username, req.body.password);
    if (validPassword) {
      const user = await User.getByUsername(req.body.username);
      await User.registerLastLogin(user.id);
      const token = jwt.sign(user, process.env.SESSION_SECRET, { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: process.env.TOKEN_EXPIREIN });
      const menu = await User.getMenuUser(user.group_id);
      // console.log("menu", menu);

      return res.status(200).json({ ok: true, user, token, menu });
    } else {
      return res.status(200).json({ ok: false });
    }

    }
    );

    api.post('/setpassword',  async (req, res, next) => {
      const result = await User.setNewPassword(req.body.username,req.body.password);
      console.log("resultado:::", result);
      return res.json(result);
    });

    api.post('/confirmacion',async (req, res)=>{
    // const   CoreCotizacion = require ('../api/cotizacion/core-cotizacion')
      try {
        req.body.modulo='cotizaciones'
       let  decoded = jwt.verify(req.body.token, process.env.SEDD_LOGIN);
       decoded.data.estado =  req.body.estado
       decoded.data.token =req.body.token
       const validacion = await CoreCotizacion.validarConfirmacion(decoded.data)
       const confirmacion = await CoreCotizacion.confimarQuo(decoded.data)
       if(decoded.data.estado == 2){
         const acepta = await CoreCotizacion.aceptaOferta(confirmacion[0], req);
       }
       if(decoded.data.estado==3){
        const rechazo = await CoreCotizacion.rechazoOferta(confirmacion[0], req);
       }
       return res.status(200).json({ ok: true, data: confirmacion[0] });
        
      } catch (error) {
        console.log("error", error);
        return res.status(400).json({ ok: false, error });
      }

    })




   
    

    return api;
  }

};

export default AuthRouter;
