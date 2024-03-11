import { Injectable } from '@nestjs/common';
import { InverterFactoryService } from './inverter-factory.service';
import { CreateInverterDto, UpdateInverterDto } from 'src/core/dto';
import {
  ImageRepository,
  InverterRepository,
} from 'src/frameworks/data-services/database';

@Injectable()
export class InverterService {
  constructor(
    private inverterFactoryService: InverterFactoryService,
    private inverterService: InverterRepository,
    private imageService: ImageRepository,
  ) {}

  async create(createInverterDto: CreateInverterDto) {
    const inverter =
      await this.inverterFactoryService.createNewInverter(createInverterDto);

    return this.inverterService.create(inverter);
  }

  async findAll() {
    return this.inverterService.findAll();
  }

  async findOne(id: string) {
    return this.inverterService.findById(id);
  }

  async findByTitle(title: string) {
    return this.inverterService.findByField('title', title);
  }

  async update(id: string, updateInverterDto: UpdateInverterDto) {
    const inverter = await this.inverterFactoryService.updateInverter({
      id,
      ...updateInverterDto,
    });

    return this.inverterService.update(id, inverter);
  }

  async remove(id: string) {
    const inverter = await this.findOne(id);

    if (inverter.image) {
      this.imageService.delete(inverter.image.id);
    }

    return this.inverterService.delete(id);
  }
}
