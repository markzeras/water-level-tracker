import axios, {AxiosResponse} from 'axios';

export class TelegramClient {
  constructor(protected baseUrl: string) {}

  public async send(message: string, userId: string): Promise<void> {
    let url = `${this.baseUrl}/send-message?userId=${userId}`;

    const formattedMessage = message.replace(/ /g, '%20');

    url += `&msg=${formattedMessage}`;

    await axios.get(url);
  }

  public async ping(): Promise<AxiosResponse> {
    const url = `${this.baseUrl}/ping`;
    return await axios.get(url);
  }

  public async isOnline(): Promise<boolean> {
    try {
      await this.ping();
      return true;
    } catch (error) {
      console.error('Telegram client is offline');
      return false;
    }
  }
}
