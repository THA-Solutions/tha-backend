import { Injectable } from '@nestjs/common';
import { Image } from 'src/core/entities';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
} from 'src/core/dto/request/company.dto';
import { Company } from 'src/core/entities';
import { ImageService } from '../image/image.use-case';
import { CompanyRepository } from 'src/frameworks/data-services/database';

@Injectable()
export class CompanyFactoryService {
  constructor(
    private imageUseCase: ImageService,
    private companyService: CompanyRepository,
  ) {}

  async createNewCompany(createCompanyDto: CreateCompanyDto) {
    const newCompany = new Company();

    newCompany.cnpj = createCompanyDto.cnpj;

    newCompany.legal_name = createCompanyDto.legal_name;

    newCompany.trade_name = createCompanyDto.trade_name;

    newCompany.description = createCompanyDto.description;

    newCompany.cep = createCompanyDto.cep;

    newCompany.street = createCompanyDto.street;

    newCompany.number = createCompanyDto.number;

    newCompany.complement = createCompanyDto.complement;

    newCompany.city = createCompanyDto.city;

    newCompany.state = createCompanyDto.state;

    newCompany.neighborhood = createCompanyDto.neighborhood;

    if (createCompanyDto.image) {
      newCompany.image = await this.createImage(createCompanyDto.image);
    }

    return newCompany;
  }

  async updateCompany(update: UpdateCompanyDto) {
    const updatedCompany = new Company();

    const company = await this.companyService.findById(update.id);

    if (update.cnpj) {
      updatedCompany.cnpj = update.cnpj;
    }

    if (update.legal_name) {
      updatedCompany.legal_name = update.legal_name;
    }

    if (update.trade_name) {
      updatedCompany.trade_name = update.trade_name;
    }

    if (update.description) {
      updatedCompany.description = update.description;
    }

    if (update.cep) {
      updatedCompany.cep = update.cep;
    }

    if (update.street) {
      updatedCompany.street = update.street;
    }

    if (update.number) {
      updatedCompany.number = update.number;
    }

    if (update.complement) {
      updatedCompany.complement = update.complement;
    }

    if (update.city) {
      updatedCompany.city = update.city;
    }

    if (update.state) {
      updatedCompany.state = update.state;
    }

    if (update.neighborhood) {
      updatedCompany.neighborhood = update.neighborhood;
    }

    if (update.image) {
      if (!company.image) {
        updatedCompany.image = await this.createImage(update.image);
      } else {
        this.imageUseCase.remove(company.image.id);
        updatedCompany.image = await this.createImage(update.image);
      }
    }

    return updatedCompany;
  }

  private async createImage(imageFile: Image): Promise<Image> {
    let postedImage = new Image();

    postedImage = await this.imageUseCase.create({
      imageFile: imageFile as unknown as Image,
    });

    return postedImage;
  }
}
