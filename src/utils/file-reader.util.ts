import * as fs from 'fs';
import * as path from 'path';

export class FileReaderUtil {
  private static cacheDirectory = '.cache';
  private static cacheFile = path.join(FileReaderUtil.cacheDirectory, 'api-responses.json');

  private static createDirectory(): void {
    if (!fs.existsSync(this.cacheDirectory)) {
      fs.mkdirSync(this.cacheDirectory);
    }
  }

  private static createFile(overwrite = false): void {
    if (!fs.existsSync(this.cacheFile) || overwrite) {
      this.write('{}');
    }
  }

  public static read(): string {
    this.createFile();

    return fs.readFileSync(this.cacheFile, 'utf8');
  }

  public static write(data: string): void {
    this.createDirectory();

    fs.writeFileSync(this.cacheFile, data, 'utf8');
  }

  public static clearFile(): void {
    this.createFile(true);
  }
}
