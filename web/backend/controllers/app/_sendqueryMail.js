import nodemailer from "nodemailer";

const _sendqueryMail = async (req, res) => {
  try {
    const shop = res.locals.shopify.session.shop;
    // console.log(req.body, shop, "query request-----");

    const transporter = nodemailer.createTransport({
      host: "smtp-pulse.com",
      port: 465,
      secure: true,
      auth: {
        user: "yogesh.khasturi00001@gmail.com",
        pass: "kijaT5f9n9qW",
      },
    });

    const { fromName, fromEmail, body } = req.body;

    const mailOptions = {
      from: `"${fromName}" <support@webiators.com>`,
      replyTo: fromEmail,
      to: "support@webiators.freshdesk.com",
      subject: `New request from ${shop} regarding Webiators AI: SEO Optimizer`,
      text: body,
    };
    // console.log(mailOptions, "mail options");

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Error sending email");
      }
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent");
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Unexpected error occurred");
  }
};

export default _sendqueryMail;
