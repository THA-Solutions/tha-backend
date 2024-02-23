import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/core/dto';
import { Category } from 'src/core/entities';

@Injectable()
export class CategoryFactoryService {
  constructor() {}

  async createNewCategory(createCategoryDto: CreateCategoryDto) {
    const newCategory = new Category();

    return newCategory;
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = new Category();

    return updatedCategory;
  }
}
