import { IGenericRepository } from 'src/core/abstracts';
import { Image } from 'src/core/entities';
import PrismaService from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageRepository implements IGenericRepository<Image> {
  constructor(private prismaService: PrismaService) {}

  async create(data: Image): Promise<Image> {
    return await this.prismaService.image.create({ data } as any);
  }

  async update(id: string, data: Image): Promise<Image> {
    return await this.prismaService.image.update({
      where: { id },
      data,
    } as any);
  }

  async delete(id: string) {
    return await this.prismaService.image.delete({ where: { id } });
  }

  async find(id: string): Promise<Image> {
    return await this.prismaService.image.findUnique({ where: { id } });
  }

  async findAll(): Promise<Image[]> {
    return await this.prismaService.image.findMany();
  }

  async findByField(param: string, value: string | number | boolean) {
    return await this.prismaService.image.findFirst({
      where: { [param]: value },
    });
  }

  async findById(id: string): Promise<Image> {
    return await this.prismaService.image.findUnique({ where: { id } });
  }
  //criar novo repositorio para imagens de artigos

  async findArticleImages(id: string): Promise<Image[]> {
    return await this.prismaService.image.findMany({
      where: {
        id_article: id,
      } as any,
    });
  }

  async deleteArticleRelatedImages(id: string) {
    const deletedImages = this.prismaService.image.deleteMany({
      where: {
        id_article: id,
      } as any,
    });

    return deletedImages;
  }

  async deleteArticleOffSetImages(id: string, images: string[]) {
    const oldImages = await this.prismaService.image
      .findMany({
        where: {
          url: {
            notIn: images,
          },
        } as any,
      })
      .then((images) => images.map((image) => image.url));

    await this.prismaService.image.deleteMany({
      where: {
        url: {
          notIn: images,
        },
        id_article: id,
      },
    });

    return oldImages;
  }
}
