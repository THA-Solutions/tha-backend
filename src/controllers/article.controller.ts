import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/config/decorators/public.decorator';
import { Roles } from 'src/config/decorators/role.decorator';
import { CreateArticleDto, UpdateArticleDto } from 'src/core/dto';
import { Image } from 'src/core/entities';
import { ArticleService } from 'src/use-cases/article/article.use-case';
import { Role } from 'src/use-cases/auth/enums';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPPLIER)
  @UseInterceptors(FilesInterceptor('imageFile'))
  create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFiles() imageFile?: Image[],
  ) {
    const images = imageFile
      ? imageFile.map((image) => ({
          ...JSON.parse(createArticleDto.image as unknown as string),
          imageFile: image as File,
        }))
      : null;

    return this.articleService.create({
      ...createArticleDto,
      image: images,
    });
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPPLIER)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('imageFile'))
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @UploadedFiles() imageFile?: Image[],
  ) {
    const images = updateArticleDto.image
      ? updateArticleDto.image.map((img) => {
          return JSON.parse(img as any) as Image;
        })
      : null;

    return this.articleService.update(id, {
      ...updateArticleDto,
      image: images,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPPLIER)
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
