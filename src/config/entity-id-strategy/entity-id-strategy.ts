import { InjectableStrategy } from './../../common/injectable-strategy';
export type PrimaryKeyType<T> = T extends 'uuid' ? string : T extends 'increment' ? bigint : any;

export interface EntityIdStrategy<T extends 'increment' | 'uuid' | 'hashids'>
  extends InjectableStrategy {
  /**
   * @description
   * Defines how the primary key will be stored in the database - either
   * `'increment'` for auto-increment integer IDs, or `'uuid'` for a unique
   * string ID.
   */
  readonly primaryKeyType: T;
  /**
   * @description
   * Allows the raw ID from the database to be transformed in some way before exposing
   * it in the GraphQL API.
   *
   * For example, you may need to use auto-increment integer IDs due to some business
   * constraint, but you may not want to expose this data publicly in your API. In this
   * case, you can use the encode/decode methods to obfuscate the ID with some kind of
   * encoding scheme, such as base64 (or something more sophisticated).
   */
  encodeId: (primaryKey: PrimaryKeyType<T>) => string;
  /**
   * @description
   * Reverses the transformation performed by the `encodeId` method in order to get
   * back to the raw ID value.
   */
  decodeId: (id: string) => PrimaryKeyType<T>;
}