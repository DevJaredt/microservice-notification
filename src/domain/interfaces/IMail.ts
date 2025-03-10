import { TEMPLATE_EMAIL } from "../enums/TemplateEmail";

export interface IMail {
  to: string;
  subject: string;
  template?: TEMPLATE_EMAIL;
  context?: Record<string, any>;
  body?: string;
}
