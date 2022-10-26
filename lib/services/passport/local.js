import { Strategy as LocalStrategy } from 'passport-local'
import User from '../../models/user';

module.exports = new LocalStrategy({ session: false }, async (username, password, callback) =>  {
  //aqui buscar usuario en base de datos
  const validPassword = await User.verifyPassword(username, password);
  if (validPassword) {
    const user = await User.getByUsername(username);
    await User.registerLastLogin(user.id);
    callback(null, { user })
  } else
    callback(null, false);
});