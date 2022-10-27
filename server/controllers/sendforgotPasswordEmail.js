const nodemailer = require("nodemailer");


const sendforgotPasswordEmail = async (email, token) => {
const transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
               user: process.env.EMAIL_FROM,
               pass: process.env.EMAIL_PASS,
        }
  });
    
  let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Password Reset Link`, // Subject line
    html: `
    <h1>Please use the following link to reset you password</h1>
    <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
    <hr />
    <p>This email may contain sensetive information</p>
    <p>${process.env.CLIENT_URL}</p>
    `,
  });



  transporter.sendMail(info, (err, infor) => {
    if(err) {
        console.log('Error Occurs');
    }else{
        return infor
    } 
    
})
}



module.exports = sendforgotPasswordEmail