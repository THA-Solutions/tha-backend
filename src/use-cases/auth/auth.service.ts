import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.use-case';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
  ) {}

  decrypter(password: string) {
    let passParts = password.split(':');

    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      this.configService.get<string>('CRYPTO_SECRET')!,
      Buffer.from(passParts[0], 'hex'),
    );

    let plaintext =
      decipher.update(passParts[1], 'hex', 'utf8') + decipher.final('utf8');

    return plaintext;
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (pass !== this.decrypter(user.password)) {
      throw new UnauthorizedException('Senha inválida');
    }
    return user;
  }
}
