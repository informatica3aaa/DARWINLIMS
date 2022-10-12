import { Router } from 'express';
import jwt from 'jsonwebtoken';

class AuthRouter {

  constructor(){
    const api = Router();
    api.post('/login',  async (req, res, next) => {
      const user = req.user;
      const token = jwt.sign(user, process.env.SESSION_SECRET);
      return res.json({user, token});
    });
    return api;
  }

};

export default AuthRouter;
