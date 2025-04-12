import 'dotenv/config';

export class EnvVarsHelper {
  public readonly telegramUrl: string;
  public readonly markTelegramUserId: string;

  public constructor(env: Record<string, string>) {
    this.markTelegramUserId = env.MARK_USER_ID;
    this.telegramUrl = env.TELEGRAM_URL;
  }
}
