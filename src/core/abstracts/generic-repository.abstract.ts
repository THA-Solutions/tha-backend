export abstract class IGenericRepository<T> {
  abstract create(entity: T): Promise<T>;

  abstract update(id: string, entity: T): Promise<T>;

  abstract delete(id: string): void;

  abstract findAll(id?: string): Promise<T[]>;

  abstract findById(id: string): Promise<T>;

  abstract findByField(
    param: string,
    value: string | number | boolean,
    relations?: string[],
  ): Promise<T>;
}
