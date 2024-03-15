import express from 'express';
var router = express.Router();
import authC from "../controllers/auth.c.js";
import passport from 'passport'

router.post('/signup', authC.signup)
router.post('/login',passport.authenticate('local'),authC.login)
router.post('/logout',authC.logout)

export default router;