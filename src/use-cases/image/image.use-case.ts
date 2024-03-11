import { Injectable } from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from '../../core/dto';
import { ImageFactoryService } from './image-factory.service';
import { Image } from '../../core/entities';
import { ImageRepository } from 'src/frameworks/data-services/database';

@Injectable()
export class ImageService {
  constructor(
    private imageFactoryService: ImageFactoryService,
    private imageService: ImageRepository,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const image = await this.imageFactoryService.createNewImage(createImageDto);
    const createdImage = await this.imageService.create(image);

    return createdImage;
  }

  async findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  async findOne(id: string): Promise<Image> {
    return this.imageService.findById(id);
  }

  async findByField(field: string, value: string): Promise<Image> {
    return this.imageService.findByField(field, value);
  }

  async update(id: string, updateImageDto: UpdateImageDto): Promise<Image> {
    const image = await this.imageService.findById(id);

    if (!image) {
      return this.create(updateImageDto);
    }

    const updateImage =
      await this.imageFactoryService.updateImage(updateImageDto);

    return this.imageService.update(id, updateImage);
  }

  async remove(id: string) {
    const image = await this.imageService.findById(id);

    if (!image) {
      throw new Error('Image doesn´t exists');
    }
    await this.imageFactoryService.removeCloudImage(image.url);
    return this.imageService.delete(id);
  }
  //criar novo repositorio para imagens de artigos

  async findArticleImages(id: string): Promise<Image[]> {
    return this.imageService.findArticleImages(id);
  }

  async deleteRelatedImages(id: string) {
    const images = await this.imageService
      .findArticleImages(id)
      .then((images) => {
        if (!images) {
          return [];
        }
        return images.map((image) => {
          this.imageService.deleteArticleRelatedImages(image.id_article);

          return image.url;
        });
      });

    await this.imageFactoryService.removeCloudImage(images);
  }

  async deleteArticleOffSetImages(id: string, images: string[]) {
    const deletedImages = await this.imageService.deleteArticleOffSetImages(
      id,
      images,
    );
    return this.imageFactoryService.removeCloudImage(deletedImages);
  }
}
