export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  comparesHash(payload: string, hashed: string): Promise<boolean>;
}
