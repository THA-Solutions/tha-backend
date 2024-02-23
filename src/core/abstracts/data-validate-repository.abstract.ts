export abstract class IDataValidate<T> {
  abstract validate(data: string): Promise<T> | Promise<T[]>;
}
