import passport from 'passport';
import LocalStrategy from './local';

passport.use(LocalStrategy);

module.exports = passport;
