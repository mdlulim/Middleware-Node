// eslint-disable-next-line  @typescript-eslint/no-empty-interface
export interface ViewerModel {}

// To match with graphql-relay
export interface PageInfoModel {
  startCursor?: string | null;
  endCursor?: string | null;
  hasPreviousPage?: boolean | null;
  hasNextPage?: boolean | null;
}
