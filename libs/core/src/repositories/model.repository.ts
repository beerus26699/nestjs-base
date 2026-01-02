import {
    Attributes,
    CountOptions,
    CreateOptions,
    DestroyOptions,
    FindAndCountOptions,
    FindOptions,
    UpdateOptions,
    WhereOptions,
  } from 'sequelize';
  import { Model, ModelCtor } from 'sequelize-typescript';
  
  export abstract class BaseRepository<T extends Model> {
    protected model: ModelCtor<T>;
  
    constructor(model: ModelCtor<T>) {
      this.model = model;
    }
  
    async findAll(options?: FindOptions<T>): Promise<T[]> {
      return this.model.findAll(options);
    }
  
    async findOne(options: FindOptions<T>): Promise<T | null> {
      return this.model.findOne(options);
    }
  
    async findByPk(
      id: string | number,
      options?: Omit<FindOptions<Attributes<T>>, 'where'>,
    ): Promise<T | null> {
      return this.model.findByPk(id, options);
    }
  
    async create(data: Partial<T>, options?: CreateOptions<Attributes<T>>): Promise<T> {
      return this.model.create(data as any, options);
    }
  
    async update(data: Partial<T>, options: UpdateOptions<T>): Promise<number> {
      const [affectedCount] = await this.model.update(data, options);
      return affectedCount;
    }
  
    async delete(options: DestroyOptions<T>): Promise<number> {
      return await this.model.destroy(options);
    }
  
    async findAndCountAll(
      findOptions: FindAndCountOptions<T>,
    ): Promise<{ rows: T[]; count: number }> {
      return await this.model.findAndCountAll(findOptions);
    }
  
    async count(
      options?: Omit<CountOptions<Attributes<T>>, 'group'>,
    ): Promise<number> {
      return this.model.count(options);
    }
  
    async exists(where: WhereOptions<T>): Promise<boolean> {
      const count = await this.model.count({ where });
      return count > 0;
    }
  
    async bulkCreate(data: Partial<T>[]): Promise<T[]> {
      return this.model.bulkCreate(data as any[]);
    }
  
    async bulkUpdate(
      values: Partial<T>,
      where: WhereOptions<T>,
    ): Promise<number> {
      const [affectedCount] = await this.model.update(values, { where });
      return affectedCount;
    }
  
    async bulkDelete(where: WhereOptions<T>): Promise<number> {
      return this.model.destroy({ where });
    }
  }
  