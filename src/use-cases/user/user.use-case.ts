import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../../core/dto';
import { UserFactoryService } from './user-factory.service';
import * as crypto from 'crypto';
import { MailService } from '../mail/mail.use-case';
import { ConfigService } from '@nestjs/config';
import {
  AccountTokenRepository,
  ImageRepository,
  UserRepository,
} from 'src/frameworks/data-services/database';
import { User } from 'src/core/entities';

@Injectable()
export class UserService {
  constructor(
    private userFactoryService: UserFactoryService,
    private userService: UserRepository,
    private imageService: ImageRepository,
    private accountTokenService: AccountTokenRepository,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userFactoryService.createNewUser(createUserDto);

    try {
      return this.userService.create(user).then((user) => {
        user.password = undefined;
        return user;
      });
    } catch (error) {
      if (user.image) {
        this.imageService.delete(user.image.id);
      }
    }
  }

  async findAll() {
    return await this.userService.findAll().then((users) => {
      return users.map((user) => {
        user.password = undefined;
        return user;
      });
    });
  }

  async findOne(id: string) {
    const user = await this.userService.findById(id);
    user.password = undefined;

    user.role.name = undefined;

    if (!user) {
      throw new Error('User doesn´t exists');
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.userService.findByField('email', email);
  }

  async findByField(field: string, value: string) {
    return await this.userService.findByField(field, value);
  }

  async findByRole(role: string) {
    const users = await this.userFactoryService.findByRole(role);
    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userService.findById(id);

    const updateUser = await this.userFactoryService.updateUser({
      ...updateUserDto,
      id: id,
    });

    try {
      if (!user) {
        throw new Error('User doesn´t exists');
      }

      return await this.userService.update(id, updateUser);
    } catch (error) {
      if (updateUserDto.image) {
        this.imageService.delete(updateUser.id_image);
      }
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User doesn´t exists');
    }

    if (user.image) {
      await this.imageService.delete(user.image.id);
    }

    return this.userService.delete(id);
  }

  async forgotPassword(email: string, request: any) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw Error('User not found');
    }

    const resetToken = await this.createResetToken(user);

    const resetUrl = `${this.configService.get<string>('PAGES_URL')}/recuperar-senha/${resetToken.resetToken}`;

    const message = `
      <div style="text-align: center; color: #ffffff; background-color: #242130;">
        <header style="background-color: #1B1924;">
          <p style="padding: 10px; font-size: 20px; font-weight: bold; color: #cacaca;">
            THA SOLUTIONS
          </p>
        </header>
        <div style="padding: 20px;">
          <p style="font-size: 18px;">Para realizar a alteração da sua senha acesse o link abaixo:</p>
          <p>
            <a href="${resetUrl}"
              style="display: inline-block; padding: 10px 20px; background-color: #f01966; color: #242130; text-decoration: none; font-size: 16px; font-weight: 700; text-transform: uppercase; margin-top: 25px; margin-bottom: 25px;">
              Trocar Senha
            </a>
          </p>
          <p style="font-size: 18px;">
            O link de acesso expira em
            <strong style="color: #f01966;">10 minutos</strong>.
          </p>
          <p style="font-size: 14px; color: lightslategray;">
            Se você não solicitou esta alteração, por favor ignore este e-mail ou entre em contato conosco.
          </p>
        </div>
      </div>
    `;

    this.mailService.passResetMail({
      firstName: user.firstName,
      lastName: user.lastName,
      email,
      subject: '',
      message: message,
    });

    return;
  }
  //TO-DO \/
  async resetPassword(resetToken: string, password: string) {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const accountToken = await this.accountTokenService.findByField(
      'token',
      resetPasswordToken,
    );

    if (!accountToken) {
      throw Error('Invalid token');
    }

    const user = await this.userService.findById(accountToken.id_user);

    if (!user) {
      throw Error('User not found');
    }

    const newPassword = this.crypter(password);

    await this.userService.update(user.id, {
      password: newPassword,
    });

    await this.accountTokenService.delete(accountToken.id);

    return;
  }

  async createResetToken(user: User) {
    const resetToken = this.userFactoryService.createResetToken(user);

    return resetToken;
  }

  crypter(password: string) {
    try {
      const iv = Buffer.from(crypto.randomBytes(16));

      const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        this.configService.get<string>('CRYPTO_SECRET')!,
        iv,
      );

      let crypted = cipher.update(password, 'utf8', 'hex');
      crypted += cipher.final('hex');

      password = `${iv.toString('hex')}:${crypted}`;

      return password;
    } catch (error) {
      throw Error(`Error in cryptography ${error}`);
    }
  }
}
