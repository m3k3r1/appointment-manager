import nodemailer, { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Mail;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const trasporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = trasporter;
    });
  }

  async sendMail(to: string, body: string): Promise<void> {
    const message: SentMessageInfo = await this.client.sendMail({
      from: 'Team <miguel@mail.pt>',
      to,
      subject: 'Password Recovery',
      text: body,
    });

    console.log('Message Sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
