$(document).ready(function(){
    $("#bt").click(function(){  
            var recaptcha=$("#g-recaptcha").val();

            //if recaptcha is not clicked
            if(recaptcha===""){
                    event.preventDefault();
                    alert("Please fill reCaptcha!");
            }
            else{
                $("#signInForm").submit();
            }
        });
});
