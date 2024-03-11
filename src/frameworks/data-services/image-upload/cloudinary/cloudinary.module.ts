import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { IUploadImageServices } from '../../../../core/abstracts';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    { provide: IUploadImageServices, useClass: CloudinaryService },
    ConfigService,
  ],
  exports: [IUploadImageServices],
})
export class CloudinaryModule {}
