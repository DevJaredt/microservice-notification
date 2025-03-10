import nodemailer from "nodemailer";
import { INotificationService } from "../../domain/interfaces/INotificationService";
import { TEMPLATE_EMAIL } from "../../domain/enums/TemplateEmail";
import { IMail } from "../../domain/interfaces/IMail";

export class NotificationService implements INotificationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendTemplateMail(mail: IMail): Promise<void> {
    const { default: hbs } = await import("nodemailer-express-handlebars");

    console.log(mail.template);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mail.to,
      subject: mail.subject,
      template: mail.template,
      context: mail.context,
    };

    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".hbs",
          layoutsDir: "src/infrastructure/templates",
          defaultLayout: '',
        },
        viewPath: "src/infrastructure/templates",
        extName: ".hbs",
      })
    );

    return await this.transporter.sendMail(mailOptions);
  }
}
