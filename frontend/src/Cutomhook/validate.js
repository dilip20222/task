const validate = (inputs) => {
    //Username
    const errors = ({});

    if (!inputs.email || inputs.email == null) {
        errors.email = "Enter valid Email"
        console.log('Please Enter Valid Email');

    }
    //Password Errors
    if (!inputs.password || inputs.password.length < 6) {
        errors.password = 'Check Password'
        console.log("Not valid Password")
    }
    return errors;
}
export default validate;