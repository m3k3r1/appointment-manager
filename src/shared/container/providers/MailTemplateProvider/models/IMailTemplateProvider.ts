import IParseMailTemplate from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(parseMailTemplateDTO: IParseMailTemplate): Promise<string>;
}
