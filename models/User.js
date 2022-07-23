const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        // required : true
    },
    email : {
        type : String,
        required : true,
        validate : {
            validator(v){
            return  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: props => `${props.value} is not a valid email!`
    }
    },
    password : {
        type : String,
        required : true,
        minlength : [6, "This password is too short"],
    },
    confirmPassword : {
        type : String,
        required : true
    },
    roles : {
        type : [String],
        required : true,
        default : ["Student"]
    },
    accountStatus : {
        type : String,
        enum : ["Pending", "Active", "Rejected"],
        default : "Pending",
        required : true
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User