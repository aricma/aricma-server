const {transporter} = require('./transporter.js')

// send email
function sendEmailHandler(req, res, next) {
  const {
    body: {
      from,
      to = 'adrian@aricma.com',
      name = 'No Name',
      subject = 'New Message from aricma.com',
      text = 'No Text'
    }} = req

  /* EXAMPLE BODY
    {
      from: 'aricma@icloud.com',
      to: 'adrian@aricma.com',
      text: 'Hi adrian, how are you. Best Adrian'
    }
  */

  const html = `
    <div style="
      width: 100%;
      max-width: 800px;
      border-radius: 20px;
      padding: 10px;
      box-sizing: border-box;
      background-color: #0E0B16;
      color: #E7DFDD;
    ">
      <h1 style="
        text-align: center;
        ">${subject}</h1>
      <p style="
        text-align: justify;
        ">${text}</p>
    </div>
  `
  var messageToMe = {
    headers: {
      "Reply-To": from,
    },
    from: `"Aricma Server" <server@aricma.com>`,
    to,
    subject,
    // text: 'Just some Feedback from the costumer',
    html,
  }

  var messageToCostumer = {
    headers: {
      "Reply-To": "adrian@aricma.com",
    },
    from: `"Aricma Server" <server@aricma.com>`,
    to: from,
    subject: "Confirmation // Aricma",
    text: 'Thank you for contacting me. I will resond to you asap. Best, Adrian',
    // html,
  }

  Promise.all([
    transporter.sendMail(messageToMe),
    transporter.sendMail(messageToCostumer)
  ])
  .then(() => {
    const succsessMessage = 'all emails were send'
    // console.log(succsessMessage);
    res.status(200).send(succsessMessage)
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Sending emails caused Server Error. Please reach out to adrian@aricma.com.')
  })
}

module.exports = {sendEmailHandler}
