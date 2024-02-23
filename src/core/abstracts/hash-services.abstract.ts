export abstract class IHashService {
  abstract hashPassword(password: string): Promise<string>;

  abstract decipherPassword(password: string): string;
}
