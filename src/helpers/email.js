import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service          : 'Gmail',
  secureConnection : false, // TLS requires secureConnection to be false
  port             : 465, // port for secure SMTP - TLS
  tls              : {
    ciphers : 'SSLv3',
  },
  auth : {
    user : process.env.EMAIL,
    pass : process.env.EMAIL_PASS,
  }
});


export function sendEmailServiceRequest (message, contacts) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    to   : 'admin@tavuel506.com',
    html : `<h1>En hora buena tavuel506</h1>
    <hr/>
    <p>Un nuevo usuario desea contratar vuestros servicios: ${message}</p>,
    <p>Los contactos que pude obtener del usuario registrado son: ${contacts} </p>`,
    subject : 'SOLICITUD DE SERVICIO',
  };

  transporter.sendMail(mailOptions, {});
}

export function sendEmailActivationCode (to, subject, text) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `<h1>Bienvenido a tavuel506</h1>
    <hr/>
    <p>Su código de activación es: ${text}</p>`,
    // <p>También puedes activar la cuenta <a href="https://tavuel506/login/${text}">aquí</a></p>`,
    to,
    subject,
    // text,
  };

  transporter.sendMail(mailOptions, {});
}

export function sendEmailCreateCompany (to, NameCompany, LogoCompany, NextPay) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `
    <img style="height:40px;" src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2Flogo_tavuel506.png?alt=media&token=329c4e70-ef1a-4f5f-b950-6681b3562888" alt="Tavuel506"/>
    <h2>El equipo de <b>Tavuel506<b/> le saluda</h2>
    <img style="height:40px;" src="${LogoCompany}" alt="${NameCompany}"/>
    <h2><b>${NameCompany}<b/>, bienvenido a los servicios de tavuel506</h2>
    <hr/>
    <p>Se ha registrado su plan para nuestros servicios correctamente, la fecha del próximo pago es el <b>${NextPay}</b></p>
    <p>Saludos cordiales</p>
    `,
    to,
    subject : 'Registro nuevo plan TAVUEL506',
    // text,
  };

  transporter.sendMail(mailOptions, {});
}

export function sendEmailUpdateCompany (to, NameCompany, LogoCompany) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `
    <img style="height:40px;" src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2Flogo_tavuel506.png?alt=media&token=329c4e70-ef1a-4f5f-b950-6681b3562888" alt="Tavuel506"/>
    <h2>El equipo de <b>Tavuel506<b/> le saluda</h2>
    <img style="height:40px;" src="${LogoCompany}" alt="${NameCompany}"/>
    <h2><b>${NameCompany}<b/>, Tavuel506 le saluda</h2>
    <hr/>
    <p>Se ha actualizado información relacionada a su empresa, de no ser usted por favor comuniquesé con servicio al cliente.</b></p>
    <a href="tel:(+506)8306-7007">Teléfono (+506)8306-7007</a>
    <a href="https://tavuel.com/aboutUs">Tavuel506</a>
    <p>Saludos cordiales</p>
    `,
    to,
    subject : 'Actualización de la información TAVUEL506',
    // text,
  };

  const info = transporter.sendMail(mailOptions);
  info.then(() => null);
}


export function sendEmailBillCompany (to, NameCompany, LogoCompany, NextPay, Total_CompanyBill) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `
    <img style="height:40px;" src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2Flogo_tavuel506.png?alt=media&token=329c4e70-ef1a-4f5f-b950-6681b3562888" alt="Tavuel506"/>
    <h2>El equipo de <b>Tavuel506<b/> le saluda!</h2>
    <img style="height:40px;" src="${LogoCompany}" alt="${NameCompany}"/>
    <h2><b>${NameCompany}<b/>, hemos recibido sus $${Total_CompanyBill} correctamente, le agradecemos y esperamos que estes a gusto con nuestros servicios.</h2>
    <hr/>
    <p>De tener alguna duda visita nuestro sitio <a href="https://tavuel.com/aboutUs">Tavuel506</a> o contacte con servicio al cliente, la fecha del próximo pago es el <b>${NextPay}</b></p>
    <p>Saludos cordiales</p>
    `,
    to,
    subject : 'Servicios mensuales de TAVUEL506',
    // text,
  };

  const info = transporter.sendMail(mailOptions);
  info.then(() => null);
}

export function sendEmailPayBill (to, NamePerson, QRCode) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `
    <img style="height:40px;" src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2Flogo_tavuel506.png?alt=media&token=329c4e70-ef1a-4f5f-b950-6681b3562888" alt="Tavuel506"/>
    <h2>El equipo de <b>Tavuel506<b/> le saluda!</h2>
    <h2><b>${NamePerson}<b/>, hemos recibido su orden correctamente, podrá revisar el progreso de su pedido en <a href="https://tavuel.market/orders">Ordenes</a>.</h2>
    <h3>le agradecemos y estamos felices de servirle, pronto tendrá su pedido.</h3>
    <img style="height:40px;" src="${QRCode}" alt="factura" />
    <hr/>
    <p>De tener alguna duda visita nuestro sitio <a href="https://tavuel506.com/aboutUs">Tavuel506</a> o contacte con servicio al cliente.</p>
    <p>Saludos cordiales</p>
    `,
    to,
    subject : 'Servicios mensuales de TAVUEL506',
    // text,
  };

  const info = transporter.sendMail(mailOptions);
  info.then(() => null);
}

export function sendEmailWithoutTavuelsCompany (to, NameCompany, LogoCompany, NextPay, Total_CompanyBill) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `
    <img style="height:40px;" src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2Flogo_tavuel506.png?alt=media&token=329c4e70-ef1a-4f5f-b950-6681b3562888" alt="Tavuel506"/>
    <h2>El equipo de <b>Tavuel506<b/> le saluda</h2>
    <img style="height:40px;" src="${LogoCompany}" alt="${NameCompany}"/>
    <h2><b>${NameCompany}<b/>, lastimosamente no pudimos renovar sus servicios. Tavuels insuficientes, necesitas al menos $${Total_CompanyBill} para renovar el plan de servicios.</h2>
    <hr/>
    <p>Póngase en contacto con servicio al cliente de <a href="https://tavuel506.com/aboutUs">Tavuel506</a>, para volver a activar los servicios, la fecha del próximo pago es el <b>${NextPay}</b></p>
    <p>Saludos cordiales</p>
    `,
    to,
    subject : 'Error en plan TAVUEL506',
    // text,
  };

  const info = transporter.sendMail(mailOptions);
  info.then(() => null);
}

export function sendEmailBillAd (to, person, ad, NextPay, Total_AdBill) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `
    <img style="height:40px;" src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2Flogo_tavuel506.png?alt=media&token=329c4e70-ef1a-4f5f-b950-6681b3562888" alt="Tavuel506"/>
    <h2>El equipo de <b>Tavuel506<b/> le saluda!</h2>
    <img style="height:40px;" src="${ad}" alt="publicidad" />
    <h2><b>${person.Name_Person} ${person.Lastname_Peson}<b/>,hemos recibido sus $${Total_AdBill} correctamente, le agradecemos y esperamos que estes a gusto con nuestros servicios.</h2>
    <hr/>
    <p>De tener alguna duda visita nuestro sitio <a href="https://tavuel506.com/aboutUs">Tavuel506</a> o contacte con servicio al cliente, la fécha del próximo pago es el <b>${NextPay}</b></p>
    <p>Saludos cordiales</p>
    `,
    to,
    subject : 'Servicios mensuales de TAVUEL506',
    // text,
  };

  const info = transporter.sendMail(mailOptions);
  info.then(() => null);
}

export function sendEmailWithoutTavuelsAd (to, person, ad, NextPay, Total_AdBill) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `
    <img style="height:40px;" src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2Flogo_tavuel506.png?alt=media&token=329c4e70-ef1a-4f5f-b950-6681b3562888" alt="Tavuel506"/>
    <h2>El equipo de <b>Tavuel506<b/> le saluda</h2>
    <img style="height:40px;" src="${ad}" alt="publicidad" />
    <h2><b>${person.Name_Person} ${person.Lastname_Peson}<b/>, lastimosamente no pudimos renovar sus servicios de publicidad. Tavuels insuficientes, necesitas al menos $${Total_AdBill} para renovar tu publicidad.</h2>
    <hr/>
    <p>Póngase en contacto con servicio al cliente de <a href="https://tavuel506.com/aboutUs">Tavuel506</a>, para volver a activar los servicios, la fecha del próximo pago es el <b>${NextPay}</b></p>
    <p>Saludos cordiales</p>
    `,
    to,
    subject : 'Error en publicidad TAVUEL506',
    // text,
  };

  const info = transporter.sendMail(mailOptions);
  info.then(() => null);
}

export function sendEmailChangePassCode (to, subject, text) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `<h1>Tavuel506 quiere cambiar su contraseña</h1>
    <hr/>
    <p>Su código de cambio de contraseña es: ${text}</p>`,
    // <p>También puedes activar la cuenta <a href="https://tavuel506/login/${text}">aquí</a></p>`,
    to,
    subject,
    // text,
  };

  const info = transporter.sendMail(mailOptions);
  info.then(() => null);
}

export function sendEmailBadAccess (text) {
  const mailOptions = {
    from : `"muytico" <${process.env.EMAIL}>`,
    html : `<h1>Tavuel506 tenemos un problema</h1>
    <hr/>
    <p>Alguien esta tratando de entrar al sistema, la sesión es: ${text}</p>`,
    to      : process.env.EMAIL,
    subject : 'ALERTA DE MAL ACCESO AL BACK END',
  };

  transporter.sendMail(mailOptions, {});
}

exports.generateHTML = () => {
  const html = `<!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">

  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

      <meta name="viewport" content="width=device-width">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel=stylesheet>
      <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet">
      <title></title>

      <style>
          html,
          body {
              margin: 0 auto !important;
              padding: 0 !important;
              height: 100% !important;
              width: 100% !important;
              background: #f1f1f1;
              font-family: "Roboto Condensed";
          }

          /* What it does: Stops email clients resizing small text. */
          * {
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
          }

          /* What it does: Centers email on Android 4.4 */
          div[style*="margin: 16px 0"] {
              margin: 0 !important;
          }

          /* What it does: Stops Outlook from adding extra spacing to tables. */
          table,
          td {
              mso-table-lspace: 0pt !important;
              mso-table-rspace: 0pt !important;
          }

          /* What it does: Fixes webkit padding issue. */
          table {
              border-spacing: 0 !important;
              border-collapse: collapse !important;
              table-layout: fixed !important;
              margin: 0 auto !important;
          }

          /* What it does: Uses a better rendering method when resizing images in IE. */
          img {
              -ms-interpolation-mode: bicubic;
          }

          /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
          a {
              text-decoration: none;
          }

          /* What it does: A work-around for email clients meddling in triggered links. */
          *[x-apple-data-detectors],
          /* iOS */
          .unstyle-auto-detected-links *,
          .aBn {
              border-bottom: 0 !important;
              cursor: default !important;
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: "Roboto Condensed";
              font-weight: inherit !important;
              line-height: inherit !important;
          }

          /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
          .a6S {
              display: none !important;
              opacity: 0.01 !important;
          }

          /* What it does: Prevents Gmail from changing the text color in conversation threads. */
          .im {
              color: inherit !important;
          }

          /* If the above doesn't work, add a .g-img class to any image in question. */
          img.g-img+div {
              display: none !important;
          }

          /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
          /* Create one of these media queries for each additional viewport size you'd like to fix */

          /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
          @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
              u~div .email-container {
                  min-width: 320px !important;
              }
          }

          /* iPhone 6, 6S, 7, 8, and X */
          @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
              u~div .email-container {
                  min-width: 375px !important;
              }
          }

          /* iPhone 6+, 7+, and 8+ */
          @media only screen and (min-device-width: 414px) {
              u~div .email-container {
                  min-width: 414px !important;
              }
          }
      </style>


      <style>
          .primary {
              background: #f3a333;
          }

          .bg_white {
              background: #ffffff;
          }

          .bg_light {
              background: #fafafa;
          }

          .bg_black {
              background: #000000;
          }

          .bg_dark {
              background: #304269;
          }


          .email-section {
              padding: 2.5em;
          }

          /*BUTTON*/
          .btn {
              padding: 10px 15px;
          }

          .btn.btn-primary {

              cursor: pointer;
              padding: 10px 50px;
              background: #A2A62E;
              border-radius: 30px;
              color: white;
              width: 150px !important;
              outline: none !important;
              -webkit-appearance: none !important;
              -moz-appearance: none !important;
              -ms-appearance: none !important;
              -o-appearance: none !important;
              appearance: none !important;
              transition: all 0.3s ease-in-out;
          }

          .btn.btn-primary:hover {
              background: rgb(212, 214, 167);
              color: #304269;
          }



          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
              font-family: "Roboto Condensed";
              color: #000000;
              margin-top: 0;
          }

          body {
              font-family: "Roboto Condensed";
              font-weight: 400;
              font-size: 15px;
              line-height: 1.8;
              color: rgba(0, 0, 0, .4);
          }

          a {
              color: #304269;
          }

          p {
              font-size: 19px;
          }

          table {}

          /*LOGO*/

          .logo h1 {
              margin: 0;
          }

          .logo h1 a {
              color: #000;
              font-size: 20px;
              font-weight: 700;
              text-transform: uppercase;
              font-family: "Roboto Condensed";
          }

          /*HERO*/
          .hero {
              position: relative;
          }

          .hero img {}

          .hero .text {
              color: rgba(255, 255, 255, .8);
          }

          .hero .text h2 {
              color: #ffffff;
              font-size: 34px;
              margin-bottom: 0;
          }


          /*HEADING SECTION*/
          .heading-section {
              padding: 0px 60px;
              justify-content: center !important;
              text-align: center !important;
          }

          .heading-section h2 {
              color: #000000;
              font-size: 32px;
              margin-top: 0;
              line-height: 1.4;
          }

          .heading-section .subheading {
              margin-bottom: 20px !important;
              display: inline-block;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: rgba(0, 0, 0, .4);
              position: relative;
          }

          .heading-section .subheading::after {
              position: absolute;
              left: 0;
              right: 0;
              bottom: -10px;
              content: '';
              width: 100%;
              height: 2px;
              background: #A2A62E;
              margin: 0 auto;
          }

          .heading-section-white {
              color: rgba(255, 255, 255, .8);
          }

          .heading-section-white h2 {
              font-size: 30px;
              line-height: 1;
              padding-bottom: 0;
          }

          .heading-section-white .top-60 {
              color: white;
              padding-top: 60px;
          }

          .heading-section-white .top-150 {
              padding-top: 150px;
          }

          .heading-section-white .top-30 {
              padding-top: 30px;
          }


          .heading-section-white h2 {
              color: #ffffff;
          }

          .heading-section-white p {
              color: #ffffff;
              font-size: 19px;
          }


          .heading-section-white .subheading {
              margin-bottom: 0;
              display: inline-block;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: white;
          }


          .icon {
              text-align: center;
          }

          .icon img {}


          /*SERVICES*/
          .text-services {
              padding: 10px 10px 0;
              text-align: center;
          }

          .text-services h3 {
              font-size: 20px;
          }

          /*BLOG*/
          .text-services .meta {
              text-transform: uppercase;
              font-size: 14px;
          }

          /*TESTIMONY*/
          .text-testimony .name {
              margin: 0;
          }

          .text-testimony .position {
              color: rgba(0, 0, 0, .3);

          }


          /*VIDEO*/
          .img {
              width: 100%;
              height: auto;
              position: relative;
          }

          .img .icon {
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              bottom: 0;
              margin-top: -25px;
          }

          .img .icon a {
              display: block;
              width: 60px;
              position: absolute;
              top: 0;
              left: 50%;
              margin-left: -25px;
          }



          /*COUNTER*/
          .counter-text {
              text-align: center;
          }

          .counter-text .num {
              display: block;
              color: #ffffff;
              font-size: 34px;
              font-weight: 700;
          }

          .counter-text .name {
              display: block;
              color: rgba(255, 255, 255, .9);
              font-size: 13px;
          }


          /*FOOTER*/

          .footer {
              color: rgba(255, 255, 255, .5);

          }

          .footer .heading {
              color: #ffffff;
              font-size: 20px;
          }

          .footer ul {
              margin: 0;
              padding: 0;
          }

          .footer ul li {
              list-style: none;
              margin-bottom: 10px;
          }

          .footer ul li a {
              color: rgba(255, 255, 255, 1);
          }


          @media screen and (max-width: 500px) {

              .icon {
                  text-align: left;
              }

              .text-services {
                  padding-left: 0;
                  padding-right: 20px;
                  text-align: left;
              }

          }
      </style>
  </head>

  <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
      <center style="width: 100%; background-color: #f1f1f1;">
          <div
              style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: "Roboto Condensed";">
              ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
          </div>
          <div style="max-width: 712px; margin: 0 auto;" class="email-container">

              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                  style="margin: auto;">
                  <tbody>
                      <tr>
                          <td>
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tbody>
                                      <tr>
                                          <td class="bg_dark " style="text-align:center;">
                                              <div class="heading-section heading-section-white"
                                                  style="background-image: url(https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FFondos%2Femail%2Fbg_1.png?alt=media&token=8eabfd07-bebd-475a-9e08-3604b0dd8670.png); background-size: cover; height: 400px;">
                                                  <h2 class="top-60">Somos muytico</h2><br />
                                                  <p>Tu nuevo supermercado online donde podrás encontrar tus productos
                                                      favoritos
                                                      en Pérez Zeledón</p><br />
                                                  <p><a href="https://muytico.com" class="btn btn-primary"
                                                          target="_blank">Comenzar</a></p>
                                              </div>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td class="bg_dark email-section">
                                              <div class="heading-section heading-section-white"
                                                  style="text-align: center; padding: 0 30px;">
                                                  <h1 class="subheading">Bienvenid@</h1><br />
                                                  <h2>Gracias por formar parte de nuestra comunidad</h2><br />
                                                  <h2>El envío sera completamente gratuito, en su primer compra utilizando el cuṕon antes de realizar la compra</h2>
                                                  <br />
                                                  <p>Encuentra una gran variedad de productos dentro de nuestra plataforma
                                                      y
                                                      cómpralos sin salir de tu
                                                      casa, nosotros te lo llevamos.</p>
                                              </div>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td class="bg_white">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tbody>
                                      <tr>
                                          <td class="bg_white email-section">
                                              <div class="heading-section" style="text-align: center; padding: 0 30px;">
                                                  <span class="subheading">Proceso</span>
                                                  <h2>Compra en 3 pasos</h2>
                                                  <p>Comprar con nosotros es muy fácil:</p>
                                              </div>
                                              <table role="presentation" border="0" cellpadding="0" cellspacing="0"
                                                  width="100%">
                                                  <tbody>
                                                      <tr>
                                                          <td valign="top" width="50%" style="padding-top: 20px;">
                                                              <table role="presentation" cellspacing="0" cellpadding="0"
                                                                  border="0" width="100%">
                                                                  <tr>
                                                                      <td class="icon">
                                                                          <img src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FFondos%2Femail%2F001-diet.png?alt=media&token=62a4ea9b-31c1-4587-81cd-d1c3b4b35641.png"
                                                                              alt="Carrito"
                                                                              style="width: 60px; max-width: 600px; height: auto; margin: auto; display: block;">
                                                                      </td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td class="text-services">
                                                                          <h3>1. Elige tus compras</h3>
                                                                          <p>Más de 3000 productos de supermercado</p>
                                                                      </td>
                                                                  </tr>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td valign="top" width="50%" style="padding-top: 20px;">
                                                              <table role="presentation" cellspacing="0" cellpadding="0"
                                                                  border="0" width="100%">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="icon">
                                                                              <img src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FFondos%2Femail%2F003-recipe-book.png?alt=media&token=f7247ca6-a731-41fc-bd75-dcbeae986697.png"
                                                                                  alt="Hacer compra"
                                                                                  style="width: 60px; max-width: 600px; height: auto; margin: auto; display: block;">
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td class="text-services">
                                                                              <h3>2. Realiza tu pedido</h3>
                                                                              <p>Fácil y sencillo con cualquier tarjeta
                                                                                  débito o crédito</p>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td valign="top" width="50%" style="padding-top: 20px;">
                                                              <table role="presentation" cellspacing="0" cellpadding="0"
                                                                  border="0" width="100%">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td class="icon">
                                                                              <img src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FFondos%2Femail%2F004-delivery.png?alt=media&token=5d80f3b4-8e1b-4d7e-a8f5-5a0c6d78ba93.png"
                                                                                  alt="Recibir mi pedido"
                                                                                  style="width: 60px; max-width: 600px; height: auto; margin: auto; display: block;">
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td class="text-services">
                                                                              <h3>3. Recibe tu pedido</h3>
                                                                              <p>Te lo llevamos hasta la puerta de tu casa
                                                                              </p>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>

                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td valign="middle" class="hero">
                              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0"
                                  width="100%" style="margin: auto;">
                                  <tbody>
                                      <tr>
                                          <td class="bg_dark " style="text-align:center;">
                                              <div class="heading-section heading-section-white"
                                                  style="background-image: url(https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FFondos%2Femail%2Fbg_2.png?alt=media&token=fead4dab-b1db-4394-ac19-5f0e4e80496a.png); background-size: cover; height: 600px;">
                                                  <h2 class="top-150">Prueba tu suerte</h2><br />
                                                  <p>Todos los días tienes 3 nuevos intentos para ganar cupones de
                                                      descuento desde nuestro mini-juego</p><br />
                                                  <p><a href="https://muytico.com" class="btn btn-primary"
                                                          target="_blank">Jugar</a></p>
                                              </div>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td class="bg_white">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tbody>
                                      <tr>
                                          <td class="bg_dark email-section" style="text-align:center;width:50%;">
                                              <div class="heading-section heading-section-white">
                                                  <h2 class="top-30">Síguenos</h2>
                                              </div>
                                          </td>
                                          <td class="icon">
                                              <a href="https://facebook.com/MuyTicoCR" target="_blank">
                                                  <img src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FFondos%2Femail%2Ffacebook.png?alt=media&token=1597b5a7-3b9f-463e-b19d-d6e8d6a94dd3.png"
                                                      alt="Facebook"
                                                      style="width: 40px; max-width: 50px; height: auto; margin: auto; display: block;">
                                              </a>
                                          </td>
                                          <td class="icon">
                                              <a href="https://instagram.com/muy.tico" target="_blank">
                                                  <img src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FFondos%2Femail%2Finstagram.png?alt=media&token=28502e96-f6b7-4476-83d5-57ffaed8c193.png"
                                                      alt="Instagram"
                                                      style="width: 40px; max-width: 50px; height: auto; margin: auto; display: block;">
                                              </a>
                                          </td>
                                          <td class="icon">
                                              <a href="https://muytico.com" target="_blank">
                                                  <img src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FFondos%2Femail%2Fwebsite.png?alt=media&token=978468e4-837f-45fe-ad16-d1c096b75e1d.png"
                                                      alt="Website"
                                                      style="width: 40px; max-width: 50px; height: auto; margin: auto; display: block;">
                                              </a>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td class="bg_white">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">

                                  <tbody>
                                      <tr>
                                          <td valign="top" width="50%" style="padding-top: 20px;">
                                              <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                                                  width="100%">
                                                  <tr>
                                                      <td class="icon">
                                                          <a href="https://bit.ly/AppMuyTico" target="_blank">
                                                              <img src="https://firebasestorage.googleapis.com/v0/b/tavuel506.appspot.com/o/utilities%2FFondos%2Femail%2Fgoogle-play.png?alt=media&token=14ef9c72-909a-4461-91f0-e4f3f7791d12.png"
                                                                  alt="Google Play"
                                                                  style="width: 70%; max-width: 70%; height: auto; margin: auto; display: block;">
                                                          </a>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </center>
  </body>

  </html>`;
  return html;
};


export function newUserEmail (to) {
  const html = exports.generateHTML();
  const mailOptions = {
    html,
    to,
    from    : `"muytico" <${process.env.EMAIL}>`,
    subject : 'Bienvenid@ a muytico.com',
  };

  const info = transporter.sendMail(mailOptions);
  info.then(data => data)
    .catch(() => null);
}
