import accountM from '../models/account.m.js'

export default {
    signup: (req,res,next) => {
        try {
            const acc = req.body;
            console.log(acc);
            const newAcc = new accountM(acc);
            res.status(200).send('OK')
            newAcc.save();
        }
        catch(e) {
            console.log(e);
            res.status(501).send('FAIL')
            next(e);
        }
    }
}