import pgp from './../db/pgp';
import db from './../db/connection';

const DEBUG = 'debug';
const INFO = 'info';
const ERROR = 'error';

const ACTION_CREATE = 'create';
const ACTION_REMOVE = 'remove';
const ACTION_UPDATE = 'update';

const ACTION_LOGIN = 'login';
const ACTION_LOGOUT= 'logout';

import BaseModel from './../base_model';

class Log extends BaseModel {

  loadData(data) {
    this.id = data.id;
    this.attributes = data;
    return this;
  }

  static event(type, action, username, scope, message, data, useragent) {
    const query = "INSERT INTO logs(type, action, username, scope, message, data, useragent) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const values = [
      type,
      action,
      username,
      String(scope),
      message,
      data,
      useragent
    ];

    return db.none(query, values);
  }

  static get DEBUG() {
    return INFO;
  }

  static get INFO() {
    return INFO;
  }

  static get ERROR() {
    return ERROR;
  }

  static get ACTION_CREATE() {
    return ACTION_CREATE;
  }

  static get ACTION_UPDATE() {
    return ACTION_UPDATE;
  }

  static get ACTION_REMOVE() {
    return ACTION_REMOVE;
  }

  static get ACTION_LOGIN() {
    return ACTION_LOGIN;
  }

  static get ACTION_LOGOUT() {
    return ACTION_LOGOUT;
  }
}

export default Log;
