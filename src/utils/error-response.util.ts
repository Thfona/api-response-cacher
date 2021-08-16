import { ErrorResponseInterface } from '../interfaces/error-response.interface';

export class ErrorResponseUtil {
  public static getErrorResponse(
    codeSuffix: string,
    status: number,
    message: string,
    redirect?: boolean
  ): ErrorResponseInterface {
    return redirect == null
      ? {
          error: {
            status: status,
            code: status.toString().concat(codeSuffix),
            message: message
          }
        }
      : {
          error: {
            status: status,
            code: status.toString().concat(codeSuffix),
            message: message,
            redirect: redirect
          }
        };
  }
}
