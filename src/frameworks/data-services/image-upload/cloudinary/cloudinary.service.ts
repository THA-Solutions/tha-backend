import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { IUploadImageServices } from '../../../../core/abstracts';

@Injectable()
export class CloudinaryService implements IUploadImageServices {
  constructor(private configService: ConfigService) {
    v2.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_SECRET_KEY'),
    });
  }

  async uploadImage(image: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: this.configService.get<string>('CLOUDINARY_FOLDER') },
        (error, result) => {
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(error);
          }
        },
      );
      return upload.end(image.buffer);
    });
  }

  async deleteImage(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.destroy(id, (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      });
      return upload;
    });
  }
}
