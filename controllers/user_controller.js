const User = require('../models/user');
//Using bcrypt,salt,cryptofor password encryption
const bcrypt = require('bcrypt');                          
const saltRounds = 10;
const crypto=require('crypto');    
const Token=require('../models/token');
const resetMailers=require('../mailers/passwordreset');  



// rendering the profile page
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
       
        return res.redirect('/users/profile'); 
    }
    return res.render('sign_in', {
        title: "Auth-App| Sign In"
    })
};

// get the sign up data..
module.exports.create = function(req, res){
         if (req.body.password != req.body.confirm_password){
            req.flash('error', "Passwords do not match");
            return res.redirect('back');
        }
        User.findOne({email: req.body.email}, function(err, user){
            if(err){req.flash('error', err); return}
        if (!user){
            const name=req.body.name;
            const email=req.body.email;
            const password=req.body.password;
            //encryting the password
               bcrypt.hash(password,saltRounds,function(err,hash){
                   let c={email:email,password:hash,name:name};
             
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}
                req.flash('success','Sign-up Successfully!');
                return res.redirect('/users/sign-in');
            })
            })
        }else{
            req.flash('success', 'You have already signed up, login to continue!');
            return res.redirect('back');
        }

    });
}
// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/users/profile');
    
}
//logout rendering
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!'); 
    return res.redirect('/');
}
//render the forget password page
module.exports.forgetpassword=function(req,res){
    return res.render('forgetpassword',{
        title:"Auth-App| Forget-password"
    });
}
//resetting the password in the database
module.exports.reset=function(req,res){
    
    // console.log(req.body.email);
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding the user in reset password');return;}

        if(user){
            let new_pass=crypto.randomBytes(20).toString('hex');
            // console.log(new_pass);
            let updatedStatus = user;

            bcrypt.hash(new_pass, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                updatedStatus.password=hash;

                User.findByIdAndUpdate(user._id, updatedStatus, function(err, updatedData){
                if(err){ console.log(err)}
                else { 
                console.log("New Password Generated!");
                 req.flash('success','New password sent to email');
                }
            })
        });
    
resetMailers.newReset(user,new_pass);

        return res.render('passwordrecovery',{
            title:'Auth-App | Reset password'
        });
}else{
    // console.log('Invalid Email!');
    req.flash('error','Email not registered!')
    return res.redirect('back');
}
})
}
// Changing passsword in user profile 
module.exports.changePwd=function(req,res)
{
    if(req.body.new_pass!=req.body.confirm_pass)
    {
        req.flash('error','Password and confirm password should match!');
        return res.redirect('back');
    }

    // use bcrypt to compare between plaintext from input and encrypted password in DB
    bcrypt.compare(req.body.old_pass, req.user.password, function(err, result) {
        // result == true
        if(!result)
        {
            req.flash('error','Password is wrong!');
            return res.redirect('back');
        }
        else{
            let updatedStatus = req.user;

            bcrypt.hash(req.body.new_pass, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                updatedStatus.password=hash;
                User.findByIdAndUpdate(req.user._id, updatedStatus, function(err, updatedData){
                    if(err){ console.log(err)}
                     else { 
                         console.log("Password Updated!")
                        }
                })
                req.flash('success','Password changed!');
                return res.redirect('back');
                
            });
        }
    });

}
