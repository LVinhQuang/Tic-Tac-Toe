import accountM from '../models/account.m.js'
import bcrypt from 'bcrypt'

export default {
    signup: (req,res,next) => {
        try {
            const acc = req.body;
            console.log(acc);
            var pw = bcrypt.hashSync(acc.password, 10);
            acc.password = pw;
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
    login: async (req,res,next) => {
        try {
            const acc = req.body;
            console.log(acc);
            const user = await accountM.findOne({email:acc.email });
            if (!user) {
                return res.status(404).send('User not found')
            }
            console.log(user);
            if (!bcrypt.compareSync(acc.password, user.password)) {
                return res.status(401).send('Wrong password')
            }
            res.status(200).send('OK')
        }
        catch(e) {
            console.log(e);
            res.status(501).send('FAIL')
            next(e);
        }
    }
}