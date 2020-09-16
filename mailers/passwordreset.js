const nodeMailer=require('../config/nodemailer');
//It will send to user mail account
//Using new way of exporting
exports.newReset=(user,password)=>{

    nodeMailer.transporter.sendMail({
        from:'auth.com',
        to:user.email,
        subject:"New Password generated!",
        html:`<p>Your password is reset and the new password is : <b>${password}<b></p>`
    },(err,info)=>{
        if(err){
        console.log('error in sending mail',err);
        return;
    }

    console.log('Message sent',info);
    return;
    })
}