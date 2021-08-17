import { Request, Response, NextFunction } from 'express';
import { AjaxUtil } from '../utils/ajax.util';
import { FileReaderUtil } from '../utils/file-reader.util';
import { cacheManagerUtil } from '../utils/cache-manager.util';

export class CacheController {
  public static async index(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const response = await AjaxUtil.send(req.body);

      return res.status(response.status).send(response.data);
    } catch (error) {
      next(error);
    }
  }

  public static async clear(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      FileReaderUtil.clearFile();

      cacheManagerUtil.clearCache();

      return res.status(200).json({ message: 'Cache cleared!' });
    } catch (error) {
      next(error);
    }
  }
}
