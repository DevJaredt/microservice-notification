export enum TEMPLATE_EMAIL {
  WELCOME = "welcome",
}

export interface IMail {
  to: string;
  subject: string;
  template?: TEMPLATE_EMAIL;
  context?: Record<string, any>;
  body?: string;
}
