import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../../core/dto';
import { CategoryFactoryService } from './category-factory.service';
import { Category } from 'src/core/entities';
import { CategoryRepository } from 'src/frameworks/data-services/database';

@Injectable()
export class CategoryService {
  constructor(
    private categoryFactoryService: CategoryFactoryService,
    private CategoryService: CategoryRepository,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    if (
      await this.CategoryService.findByField('name', createCategoryDto.name)
    ) {
      throw new Error('Category already exists');
    }

    const category =
      await this.categoryFactoryService.createNewCategory(createCategoryDto);

    return this.CategoryService.create(category);
  }

  async findAll() {
    return await this.CategoryService.findAll();
  }

  async findOne(id: string) {
    return await this.CategoryService.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.CategoryService.findById(id);

    if (!category) {
      throw new Error('Category doesn´t exists');
    }

    const updateCategory =
      await this.categoryFactoryService.updateCategory(updateCategoryDto);

    return await this.CategoryService.update(id, updateCategory);
  }

  async remove(id: string) {
    const category = await this.CategoryService.findById(id);

    if (!category) {
      throw new Error('Category doesn´t exists');
    }

    return this.CategoryService.delete(id);
  }
}
