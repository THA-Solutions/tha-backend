import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/config/decorators/public.decorator';
import { Roles } from 'src/config/decorators/role.decorator';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
} from 'src/core/dto/request/company.dto';
import { Image } from 'src/core/entities';
import { Role } from 'src/use-cases/auth/enums';
import { CompanyService } from 'src/use-cases/company/company.use-case';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('imageFile'))
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() imageFile?: Image,
  ) {
    return this.companyService.create({
      ...createCompanyDto,
      image: imageFile as Image,
    });
  }

  @Get()
  @Public()
  findAll() {
    return this.companyService.findAll();
  }

  @Get('/title/:title')
  @Public()
  findByTitle(@Body() title: string) {
    return this.companyService.findByTitle(title);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imageFile'))
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() imageFile?: Image,
  ) {
    return this.companyService.update(id, {
      ...updateCompanyDto,
      image: imageFile,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
