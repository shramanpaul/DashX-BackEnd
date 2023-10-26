const User = require('../Models');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        username:'',
        email: '',
        password: ''
    };
    if(err.message.includes('users validation failed')){
        console.log(Object.values(err.errors).forEach(x => {
            errors[x.properties.path] = x.properties.message;
        }));
    }
    if (err.code === 11000) {
        if (err.keyPattern.hasOwnProperty('username')) {
            errors.username = "Username already taken!";
        }
        if (err.keyPattern.hasOwnProperty('email')) {
            errors.email = "Email already registered!";
        }
    }
    return errors;
};
const maxAge = 1*24*60*60;
const createToken = (id) => {
    return jwt.sign({id}, 'pred codes', {
        expiresIn: maxAge,
    });
}

module.exports.info = async(req,resp) => {
    try{
        let result = await User.find();
        resp.send(result);
    }catch(err){
        resp.send(err);
    }
};
module.exports.signup = async(req, resp) => {
    const {username, password, email} = req.body;
    try{
        let user = await User.create(req.body);
        const token = createToken(user._id);    //jwt token created
        resp.cookie('jwt', token, {
            httpOnly:true,
            maxAge: maxAge*1000
        });
        resp.status(200).send(user);
    }catch(err){
       const errors = handleErrors(err);
       resp.status(404).send({errors});
    }
}
module.exports.login = async (req, resp) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.login(username, email, password);
        const token = createToken(user._id);
        resp.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // Corrected to set the maxAge in milliseconds
        });
        resp.status(200).send(`${user.username} successfully logged in`);
    } catch (err) {
        throw err;
    }
}
