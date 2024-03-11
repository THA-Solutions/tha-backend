import { Injectable } from '@nestjs/common';
import { CompanyFactoryService } from './company-factory.service';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
} from 'src/core/dto/request/company.dto';
import {
  CompanyRepository,
  ImageRepository,
} from 'src/frameworks/data-services/database';

@Injectable()
export class CompanyService {
  constructor(
    private companyFactoryService: CompanyFactoryService,
    private companyService: CompanyRepository,
    private imageService: ImageRepository,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company =
      await this.companyFactoryService.createNewCompany(createCompanyDto);

    return this.companyService.create(company);
  }

  async findAll() {
    return await this.companyService.findAll();
  }

  async findOne(id: string) {
    return await this.companyService.findById(id);
  }

  async findByTitle(title: string) {
    return await this.companyService.findByField('title', title);
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = this.companyService.findById(id);

    if (!company) {
      return this.create(updateCompanyDto);
    }

    const updateCompany = await this.companyFactoryService.updateCompany({
      id: id,
      ...updateCompanyDto,
    });
    return await this.companyService.update(id, updateCompany);
  }

  async remove(id: string) {
    const company = await this.companyService.findById(id);

    if (!company) {
      throw new Error('Company doesn´t exists');
    }

    if (company.id_image) {
      await this.imageService.delete(company.id_image);
    }

    return await this.companyService.delete(id);
  }
}
