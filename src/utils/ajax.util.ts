import axios, { AxiosRequestConfig } from 'axios';
import { RequestResultInterface } from '../interfaces/request-result.interface';
import { cacheManagerUtil } from './cache-manager.util';
import { blacklist } from '../constants/blacklist.constant';

export class AjaxUtil {
  private static generateCacheKey(options: AxiosRequestConfig): string {
    return `${options.method}|${options.url}`;
  }

  private static async sendWithCache(options: AxiosRequestConfig): Promise<RequestResultInterface> {
    const key = this.generateCacheKey(options);

    if (!blacklist.includes(key)) {
      const response = await cacheManagerUtil.get(key);

      if (response) {
        return response;
      }
    }

    try {
      const response = await axios(options);

      await cacheManagerUtil.set(key, { status: response.status, data: response.data });

      return { status: response.status, data: response.data };
    } catch (error) {
      return { status: error.response.status, data: error.response.data };
    }
  }

  public static async send(options: AxiosRequestConfig): Promise<RequestResultInterface> {
    return this.sendWithCache(options);
  }
}
