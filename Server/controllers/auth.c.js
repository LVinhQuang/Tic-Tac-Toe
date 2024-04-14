import accountM from '../models/account.m.js'
import bcrypt from 'bcrypt'

export default {
    signup: (req,res,next) => {
        try {
            const acc = req.body;
            var pw = bcrypt.hashSync(acc.password, 10);
            acc.password = pw;
            acc.score = 0;
            const newAcc = new accountM(acc);
            newAcc.save();
            res.status(200).send('OK')
        }
        catch(e) {
            console.log(e);
            res.status(501).send('FAIL')
            next(e);
        }
    },
    login: (req,res,next) => {
        const user = req.user;
        console.log("AUTH CONTROLLER:",user)
        console.log("COOKIES: ",req.cookies)
        res.json({user: user, message: 'Logged in'})
    },
    logout: async (req,res,next) => {
        req.logout(function(err) {
            if (err) return next(err);
        });
        res.json({message: 'Logged out'})
    }
}