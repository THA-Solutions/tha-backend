import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/core/dto';
import { Image, User } from 'src/core/entities';
import { HashService } from '../auth/hash-repository';
import { ImageService } from '../image/image.use-case';
import {
  AccountTokenRepository,
  CompanyRepository,
  RoleRepository,
  UserRepository,
} from 'src/frameworks/data-services/database';
import PrismaService from 'src/frameworks/data-services/database/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class UserFactoryService {
  constructor(
    private prisma: PrismaService,
    private userService: UserRepository,
    private companyService: CompanyRepository,
    private roleService: RoleRepository,
    private accountTokenService: AccountTokenRepository,
    private hashService: HashService,
    private imageUseCase: ImageService,
  ) {}

  async createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();

    newUser.password = await this.hashService.hashPassword(
      createUserDto.password,
    );

    newUser.email = createUserDto.email;

    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;

    if (createUserDto.id_company) {
      newUser.company = await this.companyHandler(createUserDto.id_company);
    }

    if (createUserDto.id_role || createUserDto.role) {
      if (createUserDto.role) {
        newUser.role = await this.roleHandler('name', createUserDto.role);
      }
    } else {
      newUser.role = await this.roleHandler('name', 'user');
    }

    if (createUserDto.image) {
      newUser.image = await this.imageHandler(createUserDto.image);
    }

    return newUser;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const updatedUser = new User();
    let user = await this.userService.findById(updateUserDto.id);

    if (updateUserDto.email) {
      user = await this.userService.findByField('email', updateUserDto.email);
      if (user && user.id !== updateUserDto.id) {
        throw new Error('Email already exists');
      }
      updatedUser.email = updateUserDto.email;
    }

    if (updateUserDto.firstName) {
      updatedUser.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      updatedUser.lastName = updateUserDto.lastName;
    }

    if (updateUserDto.image) {
      if (!user.image) {
        const image = await this.imageHandler(updateUserDto.image);
        updatedUser.id_image = image.id;
      } else {
        this.imageUseCase.remove(user.image.id);
        const image = await this.imageHandler(updateUserDto.image);
        updatedUser.id_image = image.id;
      }
    }

    if (updateUserDto.id_company) {
      updatedUser.id_company = await this.companyHandler(
        updateUserDto.id_company,
      ).then((company) => {
        if (company) return company.id;
      });
    }

    if (updateUserDto.id_role) {
      updatedUser.id_role = await this.roleHandler(
        'id',
        updateUserDto.id_role,
      ).then((role) => {
        if (role) return role.id;
      });
    }

    return updatedUser;
  }

  async findByRole(name: string) {
    if (name == 'admin') {
      throw new Error('You cannot list an admin');
    }

    const role = await this.roleService.findByField('name', name);



    if (role) {
      return await this.userService.findByRole(role.id);
    } 

  }

  private async imageHandler(imageFile: Image): Promise<Image> {
    let postedImage = new Image();

    postedImage = await this.imageUseCase.create({
      imageFile: imageFile as unknown as File,
    });

    return postedImage;
  }

  private async companyHandler(companyId: string) {
    return await this.companyService.findById(companyId).then((company) => {
      if (!company) {
        throw new Error('Company doesn´t exists');
      }
      return company;
    });
  }

  private async roleHandler(field: string, value: string) {
            const defaultRoles = {
              Supplier: 'Supplier',
              Customer: 'Customer',
              Integrator: 'Integrator',
              User: 'User',
            };

            return await this.roleService
              .findByField(field, value)
              .then((role) => {
                if (!role) {
                  if (defaultRoles[value]) {
                    return this.roleService.create({
                      name: defaultRoles[value],
                    } as any);
                  }
                  throw new Error('Role not found');
                }
                return role;
              });
  }

  async createResetToken(user: User) {
    const resetToken = crypto.randomBytes(32).toString('hex');

    await this.prisma.account_Token.deleteMany({
      where: { id_user: user.id },
    });

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const resetPasswordExpire = new Date(Date.now() + 10 * 60000);

    await this.accountTokenService.create({
      token: resetPasswordToken,
      expires: resetPasswordExpire,
      id_user: user.id,
    });

    return { resetToken, resetPasswordToken, resetPasswordExpire };
  }
}
