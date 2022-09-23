import pgp from './../db/pgp';
import db from './../db/connection';
import moment from 'moment';
import _ from 'lodash';
import passwordHelper from './../helpers/password';

import BaseModel from './../base_model';

class User extends BaseModel {

  loadData(data) {
    this.id = data.id_usuario;
    this.attributes = data;
    return this;
  }

  isAdmin() {
    return this.attributes && this.attributes.perfil && (this.attributes.perfil.toUpperCase() == "ADMINISTRADOR" || this.attributes.perfil.toUpperCase() == "TI") ? true : false;
  }

  isActive() {
    return this.attributes && this.attributes.estado_usuario && (this.attributes.estado_usuario == 1) ? true : false;
  }

  static getByRUN(run) {
    const query = "SELECT * FROM t_usuarios WHERE run = $1";
    const values = [
      run
    ];

    return db.one(query, values).then((data) => {
      return new User(data);
    });
  }

  registerLastLogin() {
    const query = "UPDATE t_usuarios SET fecha_last_log = NOW() WHERE username = $1";
    const values = [
      this.attributes.username
    ];
    return db.none(query, values);
  }

  getNombreCompleto() {
    const parts = [];
    if(this.attributes.nombres) {
      parts.push(this.attributes.nombres)
    }
    if(this.attributes.apellidos) {
      parts.push(this.attributes.apellidos)
    }
    return parts.join(' ');
  }

  verifyPassword(password) {
    return passwordHelper.verify(password, this.attributes.password);
  }

  static addUser(username, password, is_admin, nombres, apellidos, email, partido) {
    return passwordHelper.hash(password).then((result) => {
      const encrypted_password = result.encrypted_password;

      const perfil = is_admin ? "ADMINISTRADOR" : "NORMAL"
      const estado_usuario = 1;
      const fecha_alta = moment().format();
      const id_partido = partido && partido != "" ? partido : null;

      const query = "INSERT INTO t_usuarios(perfil, estado_usuario, username, password, nombres, apellidos, email, fecha_alta) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
      const values = [
        perfil,
        estado_usuario,
        username,
        encrypted_password,
        nombres,
        apellidos,
        email,
        fecha_alta
      ]
      return db.none(query, values);
    });
  }

  static updateUser(current_username, username, is_admin, nombres, apellidos, email, partido) {
    const perfil = is_admin ? "ADMINISTRADOR" : "NORMAL"
    const fecha_alta = moment().format();
    const id_partido = partido && partido != "" ? partido : null;

    const query = "UPDATE t_usuarios SET perfil = $1, username = $2, nombres = $3, apellidos = $4, email = $5 WHERE username = $6 RETURNING id_usuario"
    const values = [
      perfil,
      username,
      nombres,
      apellidos,
      email,
      current_username
    ]
    return db.one(query, values);
  }

  static setNewPassword(username, password) {
    return passwordHelper.hash(password).then((result) => {
      const encrypted_password = result.encrypted_password;
      const query = "UPDATE t_usuarios SET password = $1, password_recovery_token = null WHERE username = $2";
      const values = [
        encrypted_password,
        username
      ];
      return db.none(query, values);
    });
  }

  static setRecoveryToken(username, token) {
    const query = "UPDATE t_usuarios SET password_recovery_token = $1 WHERE username = $2";
    const values = [
      token,
      username
    ];
    return db.none(query, values);
  }

  static activate(username) {
    const query = "UPDATE t_usuarios SET estado_usuario = 1 WHERE username = $1";
    const values = [
      username
    ];
    return db.none(query, values);
  }

  static deactivate(username) {
    const query = "UPDATE t_usuarios SET estado_usuario = 0 WHERE username = $1";
    const values = [
      username
    ];
    return db.none(query, values);
  }

  static getByID(id) {
    const query = "SELECT * FROM t_usuarios WHERE id_usuario = $1";
    const values = [
      id
    ];

    return db.one(query, values).then((data) => {
      return new User(data);
    });
  }

  static getByUsername(username) {
    const query = "SELECT * FROM t_usuarios WHERE username = $1";
    const values = [
      username
    ];

    return db.one(query, values).then((data) => {
      return new User(data);
    });
  }

  static getByUsernameAndToken(username, token) {
    const query = "SELECT * FROM t_usuarios WHERE username = $1 AND password_recovery_token = $2";
    const values = [
      username,
      token
    ];

    return db.one(query, values).then((data) => {
      return new User(data);
    });
  }

  static getAll() {
    const query = `SELECT
                    t_usuarios.id_usuario,
                    t_usuarios.perfil,
                    t_usuarios.estado_usuario,
                    t_usuarios.username,
                    t_usuarios.password,
                    upper(t_usuarios.nombres) as nombres,
                    upper(t_usuarios.apellidos) as apellidos,
                    t_usuarios.email,
                    t_usuarios.fecha_last_log,
                    t_usuarios.fecha_alta,
                    t_usuarios.fecha_baja
                    FROM
                    t_usuarios
                    ORDER BY
                    t_usuarios.username ASC`;

    return db.any(query).then((data) => {
      const users = [];
      for (let o of data) {
        const user = new User(o);
        users.push(user);
      }
      return users;
    });
  }

}

export default User;
