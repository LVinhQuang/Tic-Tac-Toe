import accountM from './models/account.m.js'
import bcrypt from 'bcrypt'

import {Strategy as LocalStrategy} from 'passport-local'
function initialize(passport) {
    const authenticateUser = async (email,password, done) => {
        const user = await accountM.findOne({email})
        if (user == null) {
            return done(null, false, {message: 'No user with that email'})
        }
        try {
            if (bcrypt.compareSync(password, user.password)) {
                return done(null, user)
            }
            else {
                return done(null, false, {message: 'Password incorrect'})
            }
        }
        catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await accountM.findById(id);
        return done(null, user)
    })
}

export default initialize