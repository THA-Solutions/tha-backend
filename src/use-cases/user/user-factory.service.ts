import { Injectable } from '@nestjs/common';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { CreateUserDto, UpdateUserDto } from 'src/core/dto';
import { Company, Image, Role, User } from 'src/core/entities';
import { HashService } from '../auth/hash-repository';
import { ImageService } from '../image/image.use-case';
import {
  CompanyRepository,
  InverterRepository,
  RoleRepository,
  UserRepository,
} from 'src/frameworks/data-services/database';
import PrismaService from 'src/frameworks/data-services/database/prisma.service';

@Injectable()
export class UserFactoryService {
  constructor(
    private prisma: PrismaService,
    private userService: UserRepository,
    private companyService: CompanyRepository,
    private roleService: RoleRepository,
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
      newUser.id_company = await this.companyHandler(createUserDto.id_company);
    }

    newUser.role = createUserDto.id_role
      ? await this.roleHandler('id', createUserDto.id_role)
      : await this.roleHandler('name', 'guest');

    if (createUserDto.image) {
      newUser.image = await this.imageHandler(createUserDto.image);
    }

    return newUser;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const updatedUser = new User();

    if (updateUserDto.email) {
      const user = await this.userService.findByField(
        'email',
        updateUserDto.email,
      );
      if (user) {
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
      updatedUser.image = await this.imageHandler(updateUserDto.image);
    }

    if (updateUserDto.id_company) {
      updatedUser.id_company = await this.companyHandler(
        updateUserDto.id_company,
      );
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

  private async imageHandler(imageFile: Image): Promise<Image> {
    let postedImage = new Image();
    console.log('entrou1');
    postedImage = await this.imageUseCase.create({
      imageFile: imageFile as unknown as File,
    });
    return postedImage;
  }

  private async companyHandler(companyId: string) {
    console.log('entrou2');
    return await this.companyService.findById(companyId).then((company) => {
      if (!company) {
        throw new Error('Company doesn´t exists');
      }
      return company.id;
    });
  }

  private async roleHandler(field: string, value: string) {
    console.log('entrou3', field, value);
    return await this.roleService.findByField(field, value).then((role) => {
      return role;
    });
  }
}
