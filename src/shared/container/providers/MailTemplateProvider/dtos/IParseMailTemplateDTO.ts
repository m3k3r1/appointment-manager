interface ITemplateVars {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  vars: ITemplateVars;
}
