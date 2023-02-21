import { Router } from 'express';
import User from './../../lib/models/user';

class APIUsersRouter {

  static create(api = Router()) {
    const router = new APIUsersRouter();

    api.post('/test', router.tester);
    api.post('/change_password', router.setNewPassword);
    api.get('/get_user', router.getUser)
    api.post('/user_edit', router.updateUser);

    return api;
  }

  getUser(req, res) {
    const current_user = req.user;

      return User.getByUsername(current_user.username).then((user) => {
        res.json(user);
      }).catch((error) => {
        console.log(error);
        res.status(401);
        res.json({
          message: "Usuario no existe."
        });
      })
  }

  activateUser(req, res) {
    const current_application = req.current_application;
    const current_user = req.current_user
    const current_application_user = req.current_application_user;

    const username = req.params.username && req.params.username.length > 0 ? req.params.username : null;

    if(current_application_user.isAdmin() && username) {
      User.getByUsername(username).then((user) => {
        return User.activate(username).then((result) => {
          res.json({success: true, active: result});
        }).catch((error) => {
          console.log(error);
          res.status(403);
          res.json({message: "Ha ocurrido un error al intentar activar usuario."});
        });
      }).catch((error) => {
        console.log(error);
        res.status(404);
        res.json({message: "Usuario no existe."});
      })
    }
    else {
      res.status(403);
      res.json({message: "No esta autorizado para realizar la acción"});
    }
  }

  deactivateUser(req, res) {
    const current_application = req.current_application;
    const current_user = req.current_user
    const current_application_user = req.current_application_user;

    const username = req.params.username && req.params.username.length > 0 ? req.params.username : null;

    if(current_application_user.isAdmin() && username) {
      User.getByUsername(username).then((user) => {
        return User.deactivate(username).then((result) => {
          res.json({success: true, active: result});
        }).catch((error) => {
          console.log(error);
          res.status(403);
          res.json({message: "Ha ocurrido un error al intentar activar usuario."});
        });
      }).catch((error) => {
        console.log(error);
        res.status(404);
        res.json({message: "Usuario no existe."});
      })
    }
    else {
      res.status(403);
      res.json({message: "No esta autorizado para realizar la acción"});
    }
  }

  //cambiar mi contraseña
  async setNewPassword(req, res) {
    const current_user = req.user;

    const username = current_user.username;
    const current_password = req.body.current_password;
    const new_password = req.body.new_password;
    const new_password_confirmation = req.body.new_password_confirmation;

    if(!current_password || current_password.length == 0) {
      return res.status(200).json({ ok: false, message: "Contraseña actual no es válida." });
    }

    if(new_password != new_password_confirmation) {
      return res.status(200).json({ ok: false, message: "Nueva contraseña no coincide." });
    }

    const result = await User.setNewPassword(username,new_password);
    if(result) {
      return res.status(200).json({ ok: true, message: "Contraseña modificada correctamente." });
    } else {
      return res.status(200).json({ ok: false, message: "No se pudo modificar la contraseña." });
    }
    
  }

  createUser(req, res) {
    res.status(501);
    res.json({});
  }

  //editar mis datos
  async updateUser(req, res) {
    const current_user = req.user;
    const form_data = req.body;
    console.log(current_user);
    const result = await User.updateUser(current_user.id, form_data.name, form_data.lastname_f, form_data.lastname_m, form_data.address, form_data.country_id, form_data.phone, form_data.celphone);
    if(result) {
      return res.status(200).json({ ok: true, message: "Datos de usuario modificados correctamente." });
    } else {
      return res.status(200).json({ ok: false, message: "No se pudo modificar los datos de usuario." });
    }

        
  }

  tester(req, res){
    console.log("tester:::", req.body);
  }
}

export default APIUsersRouter;
