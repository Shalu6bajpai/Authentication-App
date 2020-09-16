# authentication-system

This is a general authentication system that can be used in any web application.I used node.js for this purpose.
Passport.js has been used for authentication.

## How to use

1. Clone this repository
2. Navigate to the project directory in the terminal
3. Install MongoDB and NodeJS
4. Run the following command from the directory to install all the required packages 

  `npm install`  
7. To start the server, run the following command
  
  `node index.js` or `node index.js`  

8. In your browser, open <http://localhost:YOUR-PORT-NUMBER> to view the Home page.

# Directory Structure

-assets\
    &emsp;--css\
    &emsp;&emsp;---footer.css\
    &emsp;&emsp;---header.css\
        &emsp;&emsp;---home.css\
        &emsp;&emsp;---layout.css\
         &emsp;&emsp;---user.css\
        &emsp;&emsp;---sign_in.css\
    &emsp;--images\
    &emsp;--js\
        &emsp;&emsp;---sign-in.js\
-config\
    &emsp;--middleware.js\
    &emsp;--mongoose.js\
    &emsp;--nodemailer.js\
    &emsp;--passport-google-oauth2-strategy.js\
    &emsp;--passport-local-strategy.js\
-controllers\
     &emsp;--users_controller.js\
-mailers\
    &emsp;--passwordreset.js\
   
    &emsp;--user.js\
-routes\
    &emsp;--index.js\
    &emsp;--users.js\
-views\
    &emsp;--_footer.ejs\
    &emsp;--_header.ejs\
    &emsp;--forgot_password.ejs\
    &emsp;--home.ejs\
    &emsp;--layout.ejs\
    &emsp;--sendMail.ejs\
    &emsp;--profile.ejs\
    &emsp;--sign_in.ejs\
    &emsp;--sign_up.ejs\
-index.js\
-package.lock.json\
-package.json\
## Features

### Sign in

Authentication used : 
1. local authentication
2. Google oauth 2.0

Create your account by local or google authentication both are available.
-->Google Recaptcha V2 has been used for verification during Sign in and Sign Up.

### Profile page
Here, the user can view the email id and the Username.

### Account recovery

If you forget your password just use forget password on sign-in page.You will get mail with new password generated!

