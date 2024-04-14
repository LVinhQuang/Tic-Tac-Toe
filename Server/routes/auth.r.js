import express from 'express';
var router = express.Router();
import authC from "../controllers/auth.c.js";
import passport from 'passport'


router.post('/signup', authC.signup)
router.get('/login', authC.login);
router.post('/login',passport.authenticate('local'), authC.login)
router.post('/logout',authC.logout)

router.get('/google',passport.authenticate('google', {scope: ['profile', 'email']}))
router.get('/google/callback',passport.authenticate('google', {successRedirect:'google/temp', failureRedirect: '/google/failure'}))
router.get('/google/failure', (req,res) => {
    res.send('Google authentication failed')
})
router.get('google/temp', (req,res) => {
    console.log(req.cookies);
    res.send('Google authentication success')
})
router.get('/google/success', async (req,res) => {
    if (req.user) {
        const user = req.user;
        console.log("AUTH ROUTER:",user)
        res.json({user: user, message: 'Logged in'})
    }
})

export default router;