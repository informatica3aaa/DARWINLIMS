import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../lib/models/user';

class AuthRouter {

  constructor(){
    const api = Router();
    api.post('/login', async (req, res) => {
      const validPassword = await User.verifyPassword(req.body.username, req.body.password);
      if (validPassword) {
        const user = await User.getByUsername(req.body.username);
        await User.registerLastLogin(user.id);
        const token = jwt.sign(user, process.env.SESSION_SECRET, { expiresIn: process.env.TOKEN_EXPIREIN });
        return res.status(200).json({ ok: true, user, token });
      } else {
        return res.status(200).json({ ok: false });
      }
      
    });

    api.post('/setpassword',  async (req, res, next) => {
      const result = await User.setNewPassword(req.body.username,req.body.password);
      return res.json(result);
    });


    return api;
  }

};

export default AuthRouter;
