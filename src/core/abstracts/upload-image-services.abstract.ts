export abstract class IUploadImageServices {
  abstract uploadImage(image: File): Promise<string>;
  abstract deleteImage(id: string): Promise<string>;
}
