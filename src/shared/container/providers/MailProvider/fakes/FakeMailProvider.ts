import { ISendMailDTO } from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  async sendMail(sendMailDTO: ISendMailDTO): Promise<void> {
    this.messages.push(sendMailDTO);
  }
}
