import sql from 'mssql';
import {sqlConfig} from './../../lib/db/connection';
import bcrypt from 'bcrypt';

class User {
  //buscar usuario por rut sin dv
  static async getByRut(rut) {
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('rut', sql.VarChar , rut)
            .query(`select * from users where rut = @rut`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async registerLastLogin(id) {
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int , id)
            .query(`UPDATE users SET new_last_login = CURRENT_TIMESTAMP WHERE id = @id`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async addUser(group_id, username, rut, dv, name, email, lastname_f, lastname_m, charge, phone, celphone, 
      address, status, created, modified, last_login, commune_id, country_id, company_id, signature, counter, project_id, new_password, new_last_login) {
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('group_id', sql.Int , group_id)
      .input('username', sql.VarChar , username)
      .input('rut', sql.VarChar , rut)
      .input('dv', sql.Char , dv)
      .input('name', sql.VarChar , name)
      .input('email', sql.VarChar , email)
      .input('lastname_f', sql.VarChar , lastname_f && lastname_f.length > 0 ? lastname_f : null)
      .input('lastname_m', sql.VarChar , lastname_m && lastname_m.length > 0 ? lastname_m : null)
      .input('charge', sql.VarChar , charge && charge.length > 0 ? charge : null)
      .input('phone', sql.VarChar , phone && phone.length > 0 ? phone : null)
      .input('celphone', sql.VarChar , celphone && celphone.length > 0 ? celphone : null)
      .input('address', sql.VarChar , address)
      .input('status', sql.DateTime , status)
      .input('created', sql.DateTime , created)
      .input('modified', sql.DateTime , modified)
      .input('last_login', sql.DateTime , last_login)
      .input('commune_id', sql.Int , commune_id)
      .input('country_id', sql.Int , country_id)
      .input('company_id', sql.Int , company_id)
      .input('signature', sql.VarChar , signature)
      .input('counter', sql.VarChar , counter)
      .input('project_id', sql.Int , project_id)
      .input('new_password', sql.VarChar , new_password)
      .input('new_last_login', sql.DateTime , new_last_login)
      .query(`
            INSERT INTO users
           ([group_id]
           ,[username]
           ,[rut]
           ,[dv]
           ,[name]
           ,[lastname_f]
           ,[lastname_m]
           ,[charge]
           ,[phone]
           ,[celphone]
           ,[email]
           ,[address]
           ,[status]
           ,[created]
           ,[modified]
           ,[commune_id]
           ,[country_id]
           ,[company_id]
           ,[signature]
           ,[counter]
           ,[project_id]
           ,[new_password]
           ,[new_last_login])
           ,[new_status]
     VALUES
          (@group_id
            ,@username
            ,@rut
            ,@dv
            ,@name
            ,@lastname_f
            ,@lastname_m
            ,@charge
            ,@phone
            ,@celphone
            ,@email
            ,@address
            ,@status
            ,@created
            ,@modified
            ,@last_login
            ,@commune_id
            ,@country_id
            ,@company_id
            ,@signature
            ,@counter
            ,@project_id
            ,@new_password
           ,1
            )`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async updateUser(current_username, username, is_admin, nombres, apellidos, email, partido) {

    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int , id)
            .query(`
            UPDATE [dbo].[users]
            SET [group_id] = <group_id, int,>
               ,[username] = <username, nvarchar(60),>
               ,[rut] = <rut, nvarchar(14),>
               ,[dv] = <dv, char(1),>
               ,[name] = <name, nvarchar(255),>
               ,[lastname_f] = <lastname_f, nvarchar(255),>
               ,[lastname_m] = <lastname_m, nvarchar(255),>
               ,[charge] = <charge, nvarchar(255),>
               ,[password] = <password, nvarchar(255),>
               ,[temp_pass] = <temp_pass, nvarchar(255),>
               ,[phone] = <phone, nvarchar(25),>
               ,[celphone] = <celphone, nvarchar(25),>
               ,[email] = <email, nvarchar(255),>
               ,[address] = <address, nvarchar(255),>
               ,[key] = <key, nvarchar(255),>
               ,[status] = <status, bit,>
               ,[created] = <created, datetime,>
               ,[modified] = <modified, datetime,>
               ,[last_login] = <last_login, datetime,>
               ,[commune_id] = <commune_id, int,>
               ,[country_id] = <country_id, int,>
               ,[company_id] = <company_id, int,>
               ,[signature] = <signature, varchar(255),>
               ,[counter] = <counter, nvarchar(255),>
               ,[project_id] = <project_id, int,>
               ,[new_password] = <new_password, nchar(255),>
               ,[new_last_login] = <new_last_login, datetime,>
          WHERE id = @id
                          `)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }


  static async verifyPassword(username, password) {
    const dbpass = await User.getPassword(username);
    if(dbpass)
      return bcrypt.compareSync(password, dbpass.new_password);
    else 
      return false;
  }

  static async setNewPassword(username, newpassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newpassword, salt);
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('username', sql.VarChar , username)
      .input('newpassword', sql.VarChar , hash)
            .query(`update users set new_password = @newpassword where username = @username`)
    }).then(result => {
      sql.close();
      if(result.rowsAffected > 0) {
        return true;
      } 
      return false;
    }).catch(err => {
      console.error(err);
      sql.close();
      return false;
    });
  }

  static async activate(id) {
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int , id)
            .query(`update users set new_active = 1 where id = @id`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async deactivate(id) {
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int , id)
            .query(`update users set new_active = 0 where id = @id`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async getByID(id) {
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int , id)
            .query(`select * from users where id = @id`)
    }).then(result => {
      let rows = result.recordset[0];
      sql.close();
      delete rows.temp_pass;
      delete rows.password;
      delete rows.new_password;
      delete rows.key;
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async getByUsername(username) {
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('username', sql.VarChar , username)
            .query(`select * from users where username = @username`)
    }).then(result => {
      let rows = result.recordset[0];
      sql.close();
      delete rows.temp_pass;
      delete rows.password;
      delete rows.new_password;
      delete rows.key;

      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async getPassword(username) {
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('username', sql.VarChar , username)
            .query(`select new_password from users where username = @username`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows[0];

    }).catch(err => {
      console.error(err);
      sql.close();
    });
  }

  static async getAllUsers() {
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
            .query(`select * from users`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });

  }

}

export default User;
