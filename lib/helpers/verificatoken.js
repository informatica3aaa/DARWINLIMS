import jwt from 'jsonwebtoken';

async function verificatoken(req,res,next){
    const token = req.headers['authorization'];
    if(!token) 
        return res.status(401).json('Usuario no autorizado')
    try{
            const decoded = jwt.verify(token, process.env.SESSION_SECRET);
            req.user = decoded;
            next();
    }catch(e){
        console.error(e);
            res.status(400).json('Token no valido')
    }
}

module.exports = verificatoken;