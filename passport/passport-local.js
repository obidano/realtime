'use strict';


const passport=require('passport');
const User=require('../models/userModel');
const LocalStrategy=require('passport-local').Strategy;

passport.serializeUser((user, done)=>{
    done(null, user.id) // save user_id in session
});

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
       done(err, user); // return data or error
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField:'email', passwordField:'password', passReqToCallback: true},
    (req, email, password, done)=>{
    /**
     * check data
     */
    User.findOne({'email':email},(err, user)=>{
        if(err){ return done(err);}

        if(user){return done(null, false, req.flash('error','User with email already exists'))}

        /**
         * insert data
         */
        const newUSer=new User();
        newUSer.username= req.body.username;
        newUSer.email= req.body.email;
        newUSer.password= req.body.password;
        newUSer.save((err)=>{
            done(null, newUSer)
        })
    });
}));