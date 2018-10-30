'use strict';

module.exports=function (_, test) {
    return {
        setRouting:function(router){
            router.get('/', this.indexPage,test.MyTest);
            router.get('/signup', this.singupPage);
            /**
             * Post data
             */
            // router.post('/', this.indexPage,test.MyTest);
        },

        indexPage:function(req, res){
            return res.render('index',{test:'This is Index PAge where it all starts'})
        },

        singupPage:function(req, res){
            return res.render('signup')
        }
    }
};