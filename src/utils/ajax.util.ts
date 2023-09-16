import axios, { AxiosRequestConfig } from 'axios';
import { RequestResultInterface } from '../interfaces/request-result.interface';
import { cacheManagerUtil } from './cache-manager.util';
import { blocklist } from '../constants/blocklist.constant';

export class AjaxUtil {
  private static generateCacheKey(options: AxiosRequestConfig): string {
    return `${options.method}|${options.url}`;
  }

  private static async sendWithCache(options: AxiosRequestConfig): Promise<RequestResultInterface> {
    const key = this.generateCacheKey(options);

    if (!blocklist.includes(key)) {
      const response = cacheManagerUtil.getCache(key);

      if (response) {
        return response;
      }
    }

    try {
      const response = await axios(options);

      cacheManagerUtil.setCache(key, { status: response.status, data: response.data });

      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error && error.response && error.response.status,
        data: error && error.response && error.response.data,
        error: error
      };
    }
  }

  public static async send(options: AxiosRequestConfig): Promise<RequestResultInterface> {
    return this.sendWithCache(options);
  }
}
