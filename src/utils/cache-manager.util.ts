import { FileReaderUtil } from './file-reader.util';

class CacheManagerUtil {
  private cache: any = {};
  private isCacheValid = false;

  private updateCache(): void {
    this.cache = JSON.parse(FileReaderUtil.read());

    this.isCacheValid = true;
  }

  public getCache(key: string): { status: number; data: Record<string, unknown> } {
    if (!this.isCacheValid) {
      this.updateCache();
    }

    return this.cache[key];
  }

  public setCache(key: string, value: Record<string, unknown>): void {
    this.cache[key] = value;

    FileReaderUtil.write(JSON.stringify(this.cache, null, 4));

    this.isCacheValid = false;
  }

  public clearCache(): void {
    this.cache = {};
  }
}

export const cacheManagerUtil = new CacheManagerUtil();
