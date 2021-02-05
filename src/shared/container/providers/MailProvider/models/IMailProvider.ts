import { ISendMailDTO } from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(sendMailDTO: ISendMailDTO): Promise<void>;
}
