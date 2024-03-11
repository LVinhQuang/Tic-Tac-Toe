import mongoose from "mongoose";

const schema = new mongoose.Schema({ 
    fullname: String,
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

export default mongoose.model('Account', schema);