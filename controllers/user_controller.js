const User = require('../models/user');



// let's keep it same as before
module.exports.profile = function(req, res){
   
        return res.render('profile', {
            title: "User Profile|Profile"
    })

};
// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('sign_up', {
        title: "Auth-App | Sign Up"
    })
};


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile'); //profile is of a user and the link should have an id a?sorry 
    }
    return res.render('sign_in', {
        title: "Auth-App| Sign In"
    })
};

// get the sign up data..this one
module.exports.create = function(req, res){
    

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            if (req.body.password != req.body.confirm_password){
                req.flash('error', "Passwords do not match");
                return res.redirect('back');
            }
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}
                req.flash('success','Sign-up Successfully!');
                return res.redirect('/users/sign-in');
               
            })
        }else{
            req.flash('success', 'You have already signed up, login to continue!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/users/profile');
    req.flash('success', 'Logged in Successfully');

     //can you talk on the phone its very diffi?ok wait 7379213884 my no
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}
module.exports.forgetpassword=function(req,res){
    return res.render('forgetpassword',{
        title:"Auth-App| Forget-password"
    });
}