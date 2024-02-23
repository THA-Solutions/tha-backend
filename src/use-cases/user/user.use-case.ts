import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../../core/dto';
import { UserFactoryService } from './user-factory.service';
import { IDataServices, IGenericRepository } from '../../core/abstracts';
import * as crypto from 'crypto';
import { MailService } from '../mail/mail.use-case';
import { ConfigService } from '@nestjs/config';
import { AccountToken, Image, User } from 'src/core/entities';
import {
  AccountTokenRepository,
  ImageRepository,
  UserRepository,
} from 'src/frameworks/data-services/database';

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

    return this.userService.create(user).then((user) => {
      user.password = undefined;
      return user;
    });
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    const user = await this.userService.findById(id);

    if (!user) {
      throw new Error('User doesn´t exists');
    }

    const updateUser = await this.userFactoryService.updateUser(updateUserDto);

    return await this.userService.update(id, updateUser);
  }

  async remove(id: string) {
    const user = await this.userService.findByField('id', id);

    if (!user) {
      throw new Error('User doesn´t exists');
    }

    if (user.id_image) {
      await this.imageService.delete(user.id_image);
    }

    return this.userService.delete(id);
  }

  async forgotPassword(email: string, request: any) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw Error('User not found');
    }

    const resetToken = await this.createResetToken(user);

    const resetUrl = `http://localhost:4200/recuperar-senha/${resetToken.resetToken}`;

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

    //this.mailService.passResetMail({
    //  email,
    //  subject: '',
    //  message: message,
    //});

    return;
  }

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
      ...user,
      password: newPassword,
    });

    await this.accountTokenService.delete(accountToken.id);

    return;
  }

  async createResetToken(user: any) {
    const resetToken = crypto.randomBytes(32).toString('hex');

    //await this.prisma.account_Token.deleteMany({
    //  where: { id_user: user.id },
    //});

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const resetPasswordExpire = new Date(Date.now() + 10 * 60000);

    //await this.prisma.account_Token.create({
    //  data: {
    //    token: resetPasswordToken,
    //    expires: resetPasswordExpire,
    //    User: { connect: { id: user.id } },
    //  },
    //});

    return { resetToken, resetPasswordToken, resetPasswordExpire };
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
