import { Router } from 'express';
import { validateAll } from 'indicative';
import jwt from 'jsonwebtoken';

class Token {

  static create(api = Router()) {
    api.post('/token', Token.generateToken);
    return api;
  }

  static async generateToken(req, res)
  {
    const client_secret = req.body.client_secret;
    const client_id = req.body.client_id;
    const scope = req.body.scope;
    const grant_type = req.body.grant_type; //authorization_code
    const mensajes = {
    'required': 'Parametros invalidos (1)',
    'min': 'Parametros invalidos (2)',
    'max': 'Parametros invalidos (3)',
    'string': 'Parametros invalidos (4)'
    };
    const v = await validateAll({client_secret, client_id, scope, grant_type}, {
      client_secret:'required|string|max:40',
      client_id:'required|string|max:40',
      scope:'required|string|max:100',
      grant_type:'required|string|max:40|equals:authorization_code'
    }, mensajes).then(d => {return  {ok: true, d}}).catch(e => {return  {ok: false, error: e}});

    if(!v.ok) return res.status(401).json(v);


    //const result = await Acceso.tieneAcceso(scope, client_secret).then(d=> {return {ok:true, d}}).catch(r=> {return {ok:false, r}});
    const result = true;
    if(result) {

      /*let form = {
        id_acceso : result.d.id_acceso,
        nombre_app : result.d.nombre,
        id_servicio : result.d.id_servicio,
        id_app : result.d.id_app
      };*/
      let form = {
        id_acceso : "result.d.id_acceso",
        nombre_app : "result.d.nombre",
        id_servicio : "result.d.id_servicio",
        id_app : "result.d.id_app"
      };
      const expirein = process.env.TOKEN_INTEGRACION_EXPIREIN;

      const token = jwt.sign(form, process.env.SESSION_SECRET, { expiresIn: expirein });

      return res.status(200).json({ token_type:"bearer", access_token: token, "expires_in":expirein});
    } else {
      console.log("OBTENER TOKEN - NO AUTORIZADO : ",result.r);
      return res.status(401).json("Acceso no autorizado");
    }
    
  }

}

export default Token;
