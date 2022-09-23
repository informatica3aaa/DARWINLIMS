import jwt from 'jsonwebtoken';
import  moment from 'moment';

const verificaToken = (req, res, next) =>{

    let token = req.get('token', req);

    jwt.verify(token, process.env.SEDD_LOGIN, async (err, decoded)=>{

        // console.log("auth::::125", err);        
        if(err){
            return res.status(401).json({ok: false, msg: "Por su seguridad, inicie nuevamente su sesión"});
        }
        const existe = await Redis.getBalckListTokens(token)
                .then(d=> { return {ok: d }})
                .catch(e=>{ return {ok: false }});

        // console.log("auth::::133", decoded);
        let step = decoded.step;
        if('step_three' != step)
                return res.status(401).json({ok: false, msg: "Por su seguridad, inicie nuevamente su sesión"});

        if(!existe.ok) 
            return res.status(401).json({ ok: false, msg: "Por su seguridad, inicie nuevamente su sesión"});
        
        req.usuario = decoded.usuario;
        req.token = token;
        next();
            
    });
   
};


module.exports = {
    verificaToken
};