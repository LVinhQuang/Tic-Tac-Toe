import express from 'express';
var router = express.Router();
import authC from "../controllers/auth.c.js";
import passport from 'passport'


router.post('/signup', authC.signup)

router.get('/login', authC.login);

router.get('/login/failure', (req,res) => {
    res.status(401).send('Authentication failed')
})

router.post('/login',passport.authenticate('local', {
    failureRedirect: '/auth/login/failure',
}), authC.login)


router.post('/logout',authC.logout)

router.get('/google',passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/google/callback',passport.authenticate('google', {failureRedirect: '/auth/login/failure'}), function (req,res) {console.log("SESSION: ",req.session);res.redirect(process.env.CLIENT_URL)})


router.get('/google/success', async (req,res) => {
    if (req.user) {
        const user = req.user;
        console.log("AUTH ROUTER:",user)
        res.json({user: user, message: 'Logged in'})
    }
    else {
        res.status(401).json({user: null, message: 'Invalid: unauthorized'})
    }
})

export default router;