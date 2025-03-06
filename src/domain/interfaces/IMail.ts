export enum TEMPLATE_EMAIL {
  WELCOME = "welcome",
}

export interface IMail {
  to: String;
  subject: String;
  template: TEMPLATE_EMAIL;
  context?: Record<string, any>;
}
