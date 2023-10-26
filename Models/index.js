const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { default: isEmail } = require('validator/lib/isEmail');
const scheme = {
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:  [isEmail,  'Please enter a valid Email']
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    }
};
const schema = new mongoose.Schema(scheme);
schema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await  bcrypt.hash(this.password, salt);
    next();
})
schema.statics.login = async function(username, email, password) {
    const user= await this.findOne({username});
    if(user){
        const result = await bcrypt.compare(password, user.password);
        if(result){
            return user;
        } throw Error('Incorrect Password');
    } throw Error('User does not exist');
}
const User = mongoose.model('users', schema);
module.exports = User;
