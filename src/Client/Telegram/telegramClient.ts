import axios from 'axios';

export class TelegramClient {
  constructor(protected baseUrl: string) {}

  public async send(message: string, userId: string): Promise<void> {
    let url = `${this.baseUrl}/send-message?userId=${userId}`;

    const formattedMessage = message.replace(/ /g, '%20');

    url += `&msg=${formattedMessage}`;

    await axios.get(url);
  }
}
