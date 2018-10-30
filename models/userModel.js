const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');
const userSchema=mongoose.Schema({
    username:{type:String, unique:true},
    fullname:{type:String, unique:true, default:''},
    email:{type:String, unique:true},
    password:{type:String, unique:true, default:''},
    userImage:{type:String, default:'default.png'},
    facebook:{type:String, default:''},
    fbTokens:Array,
    google:{type:String, default:''},
    googleTokens:Array,
});

userSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.export=mongoose.model('User', userSchema);

