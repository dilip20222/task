
 const validate = (inputs) => {
    //Username
   const errors = ({});
   if (!inputs.username) {
       errors.username = 'Please Enter Username';
   }
    if(!inputs.email || inputs.email== null)
        {
       errors.email = "Enter valid Email"
   }
   //Password Errors
   if(!inputs.password  || inputs.password.length<6){
       errors.password = 'Check Password'
       console.log("Not valid Password")
   }
   if(inputs.confirmpassword !== inputs.password )
   {
       errors.confirmpassword = "Not Matched"
   }
   return errors;
 }
 export default validate;