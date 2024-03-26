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
    },
    score: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Account', schema);