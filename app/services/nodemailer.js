const nodemailer = require("nodemailer");

const user = process.env.EMAIL_REPLY;
const pass = process.env.EMAIL_PASS;

const transport = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendEmail = ({firstname, lastname, email, phone, projectDescription, projectType}) => {
  const response = transport.sendMail({
    from: user,
    to: 'kingzo974@hotmail.fr',
    subject: "Prise de contact - " + firstname + ' ' + lastname,
    html: `
          <h1>Prise de Contact</h1>
          <p>Prénom : ${firstname}</p>
          <p>Nom : ${lastname}</p>
          <p>Adresse email : ${email}</p>
          <p>Numéro de téléphone : ${phone}</p>
          <p>Type de projet : ${projectType}</p>
          <p>Description du besoin :</p>
          <p>${projectDescription}</p>
        `,
  }).catch(err => console.log(err));

  return response;
};