import accountM from "../models/account.m.js";

export default {
    updateScore: async (req, res) => {
        try {
            const { user, score } = req.body;
            const filter = { email: user.email }; 
            const update = { score: score };
            console.log(filter, update);
            let temp = await accountM.findOneAndUpdate(filter, {$inc: update}, {new: true});
            console.log('SAU KHI THAY DOI: ',temp);
        }
        catch (e) {
            console.log(e);
            res.status(501).send('FAIL');
        }
    }
}