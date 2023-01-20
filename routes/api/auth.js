import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../lib/models/user';

class AuthRouter {

  constructor(){
    const api = Router();
    api.post('/login', async (req, res) => {
      console.log("backs", req.body);
      const validPassword = await User.verifyPassword(req.body.username, req.body.password);
      console.log("valid::", validPassword);
      if (validPassword) {
        const user = await User.getByUsername(req.body.username);
        await User.registerLastLogin(user.id);
        const token = jwt.sign(user, process.env.SESSION_SECRET, { algorithm: 'RH256', allowInsecureKeySizes: true, expiresIn: process.env.TOKEN_EXPIREIN });
        const menu = await User.getMenuUser(user.group_id);
        return res.status(200).json({ ok: true, user, token, menu });
      } else {
        return res.status(200).json({ ok: false });
      }
      
    });

    api.post('/setpassword',  async (req, res, next) => {
      const result = await User.setNewPassword(req.body.username,req.body.password);
      console.log("resultado:::", result);
      return res.json(result);
    });


    api.post('/getmenuuser',  async (req, res, next) => {
      const result = await User.getMenuUser(2);
      return res.json(result);
    });

    
    

    return api;
  }

};

export default AuthRouter;
