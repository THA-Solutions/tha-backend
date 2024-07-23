import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/core/dto';
import { Category } from 'src/core/entities';
import { CategoryRepository } from 'src/frameworks/data-services/database';

@Injectable()
export class CategoryFactoryService {
  constructor(private categoryService: CategoryRepository) {}

  async createNewCategory(createCategoryDto: CreateCategoryDto) {
    const newCategory = new Category();

    newCategory.name = createCategoryDto.name;

    newCategory.description = createCategoryDto.description;

    return newCategory;
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = new Category();

    this.findCategoryByField('name', updateCategoryDto.name);

    if (updateCategoryDto.name) {
      updatedCategory.name = updateCategoryDto.name;
    }

    if (updateCategoryDto.description) {
      updatedCategory.description = updateCategoryDto.description;
    }

    return updatedCategory;
  }

  private async findCategoryByField(field: string, value: string) {
    const category = this.categoryService.findByField(field, value);
    return category;
  }
}
