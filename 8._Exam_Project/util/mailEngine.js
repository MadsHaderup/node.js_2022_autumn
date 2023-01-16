import nodemailer from "nodemailer";


export async function sendMail(recieveAddress, file, fileName) {
  
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
        from: '"PDF Generator" <"madsstudiemail@gmail.com">', 
        to: recieveAddress, 
        subject: "PDF" + fileName, 
        text: "Hey", 
        html: "<b>Hello world?</b>", 
        attachments: [{
            filename: fileName,
            content: file
        }]
    });
    console.log(info.messageId);
    
}