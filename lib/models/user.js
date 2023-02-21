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

  static async updateUser(id, name, lastname_f, lastname_m, address, country_id, phone, celphone) {

    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('id', sql.Int , id)
      .input('name', sql.NVarChar , name)
      .input('lastname_f', sql.NVarChar , lastname_f)
      .input('lastname_m', sql.NVarChar , lastname_m)
      .input('country_id', sql.Int , country_id)
      .input('address', sql.NVarChar , address)
      .input('phone', sql.NVarChar , phone)
      .input('celphone', sql.NVarChar , celphone)
      .query(`
            UPDATE [dbo].[users]
            SET 
               [name] = @name
               ,[lastname_f] = @lastname_f
               ,[lastname_m] = @lastname_m
               ,[phone] = @phone
               ,[celphone] = @celphone
               ,[address] = @address
               ,[country_id] = @country_id
            WHERE id = @id
                          `)
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

  static async verifyPassword(username, password) {
    const dbpass = await User.getPassword(username);
    if(dbpass) {
      console.log("verifypass: ", password, dbpass.new_password);
      let match  = bcrypt.compareSync(password, dbpass.new_password);
      if(match) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
      
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


  static async getMenuUser(group_id) {
    var menuUser = [];
    var rows = await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('group_id', sql.Int , group_id)
            .query(`
              select 
               m.name as 'text'
              ,m.icon
              ,m.id
               from menu_access ma
              inner join menu m on m.id = ma.menu_id
              where group_id = @group_id  
              order by [order]
            `)
    }).then(result => {
      console.log("result::", result)
      let rows = result.recordset;
      sql.close();
      return rows;
    }).catch(err => {
      console.error(err);
      sql.close();
    });
    for (let i = 0; i < rows.length; i++) {
      const menu = rows[i];
      menuUser[i] = menu;
      var id = menu.id;
      var submenus = await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int , id)
              .query(`
              select 
              name as 'text'
              ,url
              from menu 
              where parent_id = @id 
              order by [order] 
              `)
      }).then(result => {
        let rows2 = result.recordset;
        sql.close();
        return rows2;
      }).catch(err => {
        console.error(err);
        sql.close();
      });
      menuUser[i].menu = submenus;
      delete menuUser[i].id;
    }
    

    return menuUser;
    
  }

}

export default User;
