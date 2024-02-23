import { Injectable } from '@nestjs/common';
import { CompanyFactoryService } from './company-factory.service';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
} from 'src/core/dto/request/company.dto';
import { CompanyRepository } from 'src/frameworks/data-services/database';

@Injectable()
export class CompanyService {
  constructor(
    private companyFactoryService: CompanyFactoryService,
    private companyService: CompanyRepository,
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
    return await this.companyService.update(id, updateCompanyDto);
  }

  async remove(id: string) {
    return await this.companyService.delete(id);
  }
}
