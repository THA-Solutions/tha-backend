import { IHashService } from '../../core/abstracts/hash-services.abstract';
import * as crypto from 'crypto';

export class HashService implements IHashService {
  async hashPassword(password: string) {
    const iv = Buffer.from(crypto.randomBytes(16));

    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      process.env.CRYPTO_SECRET,
      iv,
    );

    let crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');

    password = `${iv.toString('hex')}:${crypted}`;
    return password;
  }

  decipherPassword(password: string) {
    const [iv, encryptedPassword] = password.split(':');

    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      process.env.CRYPTO_SECRET,
      Buffer.from(iv, 'hex'),
    );

    const decrypted =
      decipher.update(encryptedPassword, 'hex', 'utf8') +
      decipher.final('utf8');

    return decrypted;
  }
}
