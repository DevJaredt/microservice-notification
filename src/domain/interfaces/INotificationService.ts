import { IMail } from "./IMail";

export interface INotificationService {
  sendTemplateMail(mail: IMail): Promise<void>;
}
