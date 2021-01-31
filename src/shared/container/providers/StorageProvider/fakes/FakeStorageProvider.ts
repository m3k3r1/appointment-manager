import IDiskStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IDiskStorageProvider {
  private storage: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file: string): Promise<void> {
    this.storage = this.storage.filter(storagedFile => storagedFile !== file);
  }
}
