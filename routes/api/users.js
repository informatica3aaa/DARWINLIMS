import { Router } from 'express';
import User from './../../lib/models/user';

class APIUsersRouter {

  static create(api = Router()) {
    const router = new APIUsersRouter();

    api.post('/test', router.tester);
    api.put('/change_password', router.setNewPassword);
    api.put('/:username/activate', router.activateUser);
    api.put('/:username/deactivate', router.deactivateUser);
    api.post('/create', router.createUser);
    api.get('/:username', router.getUser)
    api.put('/:username', router.updateUser);

    return api;
  }

  getUser(req, res) {
    const current_user = req.current_user
    const current_application_user = req.current_application_user;

    const username = req.params.username && req.params.username.length > 0 ? req.params.username : null;

    if(current_application_user.isAdmin() && username) {
      return User.getByUsername(username).then((user) => {
        res.json(user);
      }).catch((error) => {
        console.log(error);
        res.status(401);
        res.json({
          message: "Usuario no existe."
        });
      })
    }
    else {
      res.status(401);
      res.json({
        message: "No esta autorizado para realizar la acción"
      });
    }
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

  setNewPassword(req, res) {
    const current_application = req.current_application;
    const current_user = req.current_user
    const current_application_user = req.current_application_user;

    const username = current_user.attributes.username;
    const current_password = req.body.current_password;
    const new_password = req.body.new_password;
    const new_password_confirmation = req.body.new_password_confirmation;

    if(!current_password || current_password.length == 0) {
      res.status(401);
      res.json({message: "Contraseña actual no es válida."});
      return;
    }

    if(new_password != new_password_confirmation) {
      res.status(401);
      res.json({message: "Nueva contraseña no coincide."});
      return;
    }

    return User.getByUsername(username).then((user) => {
      return user.setNewPassword(current_password, new_password).then((response) => {
        const result = response.data && response.data.success ? response.data.success : false;
        const result_message = response.data && response.data.message ? response.data.message : false;
        if(result) {
          res.json({});
        }
        else {
          console.log(response.data)
          res.status(422);
          res.json({message: result_message});
        }
      }).catch((e) => {
        console.log(e);
        const data = e.response && e.response.data ? e.response.data : {message: "Ha ocurrido un error al intentar cambiar la contraseña."};
        const error_message = data.message;
        res.status(422);
        res.json({message: error_message});
      });
    }).catch((error) => {
      console.log(error)
      res.status(404);
      res.json({message: "Usuario no existe."});
    })
  }

  createUser(req, res) {
    res.status(501);
    res.json({});
  }

  updateUser(req, res) {
    const current_application = req.current_application;
    const current_user = req.current_user
    const current_application_user = req.current_application_user;

    const original_username = req.params.username;
    const form_data = req.body || {};

    if(current_application_user.isAdmin()) {
      form_data.is_admin = form_data.is_admin || false;
      if(!form_data.username || !form_data.first_name || !form_data.last_name || !form_data.email) {
        res.status(422);
        res.json({message: "Faltan datos."});
        return;
      }

      return User.getByUsername(original_username).then((user) => {
        return User.updateUser(original_username, form_data.username, form_data.email, form_data.first_name, form_data.last_name).then((updated_user) => {
          res.json(true);
        }).catch((e) => {
          console.error(e);
          const response_data = e.response && e.response.data ? e.response.data : {message: "Error al actualizar usuario"}
          const error_message = response_data.message
          res.status(422);
          res.json({message: error_message});
        })
      }).catch((e) => {
        console.error("Usuario no existe.");
        console.error(e);
        res.status(404);
        res.json({message: "Usuario no existe."});
      })
    }
    else {
      res.status(403);
      res.json({
        message: "No esta autorizado para realizar esta acción"
      });
    }
  }

  tester(req, res){
    console.log("tester:::", req.body);
  }
}

export default APIUsersRouter;
