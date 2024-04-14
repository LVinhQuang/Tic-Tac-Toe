import accountM from './models/account.m.js'
import bcrypt from 'bcrypt'
import passportLocal from 'passport-local'
import GoogleStrategy from "passport-google-oauth20";

function initialize(passport) {
    const LocalStrategy = passportLocal.Strategy;
    const authenticateUser = async (email,password, done) => {
        const user = await accountM.findOne({email})
        if (user == null) {
            return done(null, false, {message: 'No user with that email'})
        }
        try {
            if (bcrypt.compareSync(password, user.password)) {
                console.log("AUTHENTICATE USER:",user)
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
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"    
    }, async (accessToken, refreshToken, profile, done) => { 
        const email = profile.emails[0].value;
        const displayName = profile.displayName;
        const user = await accountM.findOne({email: email});
        if (user) {
            return done(null, user);
        }
        else {
            const newUser = new accountM({
                fullname: displayName,
                email: email,
                password: null,
                score: 0,
            });
            newUser.save();
            return done(null, newUser);
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    passport.deserializeUser(async (id, done) => {
        const user = await accountM.findById(id);
        return done(null, user)
    })
}

export default initialize