import { FileReaderUtil } from './file-reader.util';

class CacheManagerUtil {
  private cache: any = {};
  private isValid = false;

  private async updateCache(): Promise<void> {
    this.cache = JSON.parse(FileReaderUtil.read());

    this.isValid = true;
  }

  public async get(key: string): Promise<{ status: number; data: Record<string, unknown> }> {
    if (!this.isValid) {
      await this.updateCache();
    }

    return Promise.resolve(this.cache[key]);
  }

  public async set(key: string, value: Record<string, unknown>): Promise<void> {
    this.cache[key] = value;

    FileReaderUtil.write(JSON.stringify(this.cache, null, 4));

    this.isValid = false;

    return Promise.resolve();
  }

  public clear(): void {
    this.cache = {};
  }
}

export const cacheManagerUtil = new CacheManagerUtil();
