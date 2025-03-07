import nodemailer from "nodemailer";
import { injectable } from "inversify";
import nodemailerExpressHandlebars from "nodemailer-express-handlebars";
import { nodeModuleNameResolver } from "typescript";

@injectable()
export class NodemailerService{
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tu-email@gmail.com",
        pass: "tu-contraseña-de-aplicación",
      },
    });

    this.transporter.use(
      "compile",
      nodemailerExpressHandlebars({
        viewEngine: {
          extname: ".hbs",
          partialsDir: "./src/templates/",
          defaultLayout: "",
        },
        viewPath: "./src/templates/",
      })
    );
  }

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    context: object
  ): Promise<void> {
    const mailOptions = {
      from: "tu-email@gmail.com",
      to,
      subject,
      template: templateName,
      context: context,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Correo enviado");
    } catch (error) {
      console.error("Error al enviar correo:", error);
    }
  }
}
