const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const {dev} = require('./environment');
let transporter = nodemailer.createTransport({
//this whole will come under smtp?i dont get you then what will i write here okk wait ; c
    service:'gmail',
    host:'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: dev.USER_SMTP,//will hide it in production level
        pass:dev.USER_PASS //will hide it in production level

    }
});

//render reset password email
let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
         data,
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            }

            mailHTML = template;
        }
    )


    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}