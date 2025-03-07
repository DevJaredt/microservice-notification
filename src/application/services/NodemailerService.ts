import nodemailer from "nodemailer";

export class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    this.configureTemplateEngine();
  }

  private async configureTemplateEngine() {
    const { default: hbs } = await import("nodemailer-express-handlebars");

    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".hbs",
          layoutsDir: "src/views/email",
          defaultLayout: "template",
        },
        viewPath: "src/views/email",
        extName: ".hbs",
      })
    );
  }

  async sendMail(to: string, subject: string, body: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
      template: "template",
      context: { body },
    };

    return this.transporter.sendMail(mailOptions);
  }
}
