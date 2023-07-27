
import nodemailer from "nodemailer";

const sendEmail= async( {to,cc,bcc,subject,text,html,emailHash}={})=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL,
          pass: process.env.GMAIL_PASS
        }
      });

      const info = await transporter.sendMail({
        from: `"OmarMouslam" <${process.env.EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html,
        // list: {
        //   unsubscribe: {
        //     url: `${req.protocol}://${req.headers.host}/auth/Unsubscribe/${to}`,
        //     comment: 'Unsubscribe from Daily Updates',
        //   },
        // }
         // html body
      });
      // console.log(info);
}

export default sendEmail