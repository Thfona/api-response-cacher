import { GeneralFunctionsUtil } from './general-functions.util';

export class ErrorMessageUtil {
  public static parseErrorMessage(message: string): string {
    if (!message) {
      return '';
    }

    const parsedMessage = GeneralFunctionsUtil.capitalizeFirstLetter(message.replace(/"/g, '').replace(/\\/g, ''));

    if (!(parsedMessage.slice(-1) === '.')) {
      parsedMessage.concat('.');
    }

    return parsedMessage;
  }
}
