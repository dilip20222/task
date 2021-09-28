const validate = (inputs) => {
    //Username
    const errors = ({});
    // if (!inputs.username) {
    //     errors.username = 'Please Enter Username';
    // }
    // if (!inputs.fullname || inputs.fullname == null) {
    //     errors.fullname = "Enter Valid Full-name"
    // }
    if (!inputs.email || inputs.email == null) {
        errors.email = "Enter valid Email"
        console.log('Please Enter Valid Email');

    }
    //Password Errors
    if (!inputs.password || inputs.password.length < 6) {
        errors.password = 'Check Password'
        console.log("Not valid Password")
    }
    // if (inputs.confirmpassword !== inputs.password) {
    //     errors.confirmpassword = "Not Matched"
    // }
    // if (!inputs.gender) {
    //     errors.gender = "Please Your Gender";
    // }
    // if (!inputs.phone) {
    //     errors.phone = "please Enter Contact Info";
    // }
    return errors;
}
export default validate;