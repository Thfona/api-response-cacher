export class EnvironmentUtil {
  public static isProduction(): boolean {
    if (process.env.NODE_ENV) {
      return process.env.NODE_ENV === 'production';
    }

    throw new Error('Node Environment is undefined.');
  }

  public static serverPort(): string {
    if (process.env.PORT) {
      return process.env.PORT;
    }

    throw new Error('Server Port is undefined.');
  }
}
