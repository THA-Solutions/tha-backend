import { Injectable } from '@nestjs/common';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
} from 'src/core/dto/request/company.dto';
import { Company } from 'src/core/entities';

@Injectable()
export class CompanyFactoryService {
  constructor() {}

  async createNewCompany(createCompanyDto: CreateCompanyDto) {
    const newCompany = new Company();

    return newCompany;
  }

  async updateCompany(update: UpdateCompanyDto) {
    const updatedCompany = new Company();

    return updatedCompany;
  }
}
