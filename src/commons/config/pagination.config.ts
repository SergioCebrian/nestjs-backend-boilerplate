import { PaginateConfig, PaginationType } from 'nestjs-paginate';

export const PAGINATION_CONFIG: PaginateConfig<any> = {
  /**
   * Required: true (must have a minimum of one column)
   * Type: (keyof CatEntity)[]
   * Description: These are the columns that are valid to be sorted by.
   */
  sortableColumns: ['email', 'name'],

  /**
   * Required: false
   * Type: 'first' | 'last'
   * Description: Define whether to put null values at the beginning
   * or end of the result set.
   */
  nullSort: 'last',

  /**
   * Required: false
   * Type: [keyof CatEntity, 'ASC' | 'DESC'][]
   * Default: [[sortableColumns[0], 'ASC]]
   * Description: The order to display the sorted entities.
   */
  defaultSortBy: [['name', 'DESC']],

  /**
   * Required: false
   * Type: number
   * Default: 100
   * Description: The maximum amount of entities to return per page.
   * Set it to 0, in conjunction with limit=0 on query param, to disable pagination.
   */
  maxLimit: 20,

  /**
   * Required: false
   * Type: number
   * Default: 20
   */
  defaultLimit: 10,

  /**
   * Required: false
   * Type: boolean
   * Default: false
   * Description: Load eager relations using TypeORM's eager property.
   * Only works if `relations` is not defined.
   */
  loadEagerRelations: true,

  /**
   * Required: false
   * Type: boolean
   * Description: Disables the global condition of "non-deleted" for the entity with delete date columns.
   * https://typeorm.io/select-query-builder#querying-deleted-rows
   */
  withDeleted: false,

  /**
   * Required: false
   * Type: string
   * Description: Allow user to choose between limit/offset and take/skip.
   * Default: PaginationType.TAKE_AND_SKIP
   *
   * However, using limit/offset can cause problems with relations.
   */
  paginationType: PaginationType.LIMIT_AND_OFFSET,

  /**
   * Required: false
   * Type: boolean
   * Default: false
   * Description: Prevent `searchBy` query param from limiting search scope further. Search will depend upon `searchableColumns` config option only
   */
  ignoreSearchByInQueryParam: true,

  /**
   * Required: false
   * Type: boolean
   * Default: false
   * Description: Prevent `select` query param from limiting selection further. Partial selection will depend upon `select` config option only
   */
  ignoreSelectInQueryParam: true,
};
