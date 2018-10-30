const express = require('express');
const bodyPArser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser=require('cookie-parser');
const validator=require('express-validator');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const mongoose=require('mongoose');
const flash=require('connect-flash');
const passport=require('passport');

const container= require("./container");

const port = 3000;

container.resolve(function (users) {

    function ConfigureExpress(app){
        require('./passport/passport-local');

        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine','ejs');
        app.use(bodyPArser.json());
        app.use(bodyPArser.urlencoded({extended:true}));
        app.use(validator());
        app.use(session({secret:'secretKey2018', resave:true,saveUninitialized:true,
            store:new MongoStore({mongooseConnection:mongoose.connection})}));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
    }

    function SetupExpress() {
        /**
         * setup server
         * @type {Function}
         */
        const app=express();
        const server = http.createServer(app);
        server.listen(port,function () {
            console.log('Listening on port 3000')
        });

        ConfigureExpress(app);
        /**
         * setup router
         */
        const router= require('express-promise-router')();

        /**
         * routes
         */
        users.setRouting(router);

        app.use(router);
    }

    /**
     * connect to mongoDB database
     * @type {function()}
     */
    mongoose.Promise=global.Promise;
    mongoose.connect('mongodb://localhost/KOZA',{ useNewUrlParser: true});

    const app=SetupExpress();
});