import nodemailer from "nodemailer";


export async function sendMail(recieveAddress, subject, text) {
    //let testAccount = await nodemailer.createTestAccount();

  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: "madsstudiemail@gmail.com", 
        pass: "itwvcsnuxqnorquj", 
    },
    });


    const info = await transporter.sendMail({
        from: '"Mads P" <"madsstudiemail@gmail.com">', // sender address
        to: recieveAddress, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log(info.messageId);
    
}