import { Strategy as LocalStrategy } from 'passport-local'

module.exports = new LocalStrategy({ session: false }, (username, password, callback) => {
  //aqui buscar usuario en base de datos
  console.log("local passport")
  if (username === '123' && password === '123') {
    callback(null, { id: 1, username })
  } else
    callback(null, false);
});