import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../lib/models/user';
import passport from './../../lib/services/passport';


class AuthRouter {

  constructor(){
    const api = Router();
    api.post('/login',  passport.authenticate('local', { session: false }), async (req, res, next) => {
      const user = await User.getByUsername(req.body.username);
      const token = jwt.sign(user, process.env.SESSION_SECRET, { expiresIn: process.env.TOKEN_EXPIREIN });
      return res.json({user, token});
    });

    api.post('/setpassword',  async (req, res, next) => {
      const result = await User.setNewPassword(req.body.username,req.body.password);
      return res.json(result);
    });


    return api;
  }

};

export default AuthRouter;
