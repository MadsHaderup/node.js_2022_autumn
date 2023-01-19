import nodemailer from "nodemailer";


export async function sendMail(recieveAddress, file, fileName) {
  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: "minnodekonto@gmail.com", 
        pass: process.env.EMAIL_PASSWORD, 
    },
    });


    const info = await transporter.sendMail({
        from: '"PDF Generator" <"madsstudiemail@gmail.com">', 
        to: recieveAddress, 
        subject: fileName + ".pdf", 
        text: "", 
        html: "<b>Her er din PDF</b>", 
        attachments: [{
            filename: fileName,
            content: file
        }]
    });
    
}