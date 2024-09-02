export class SearchObject {
  offset: number;
  limit: number;
}

export abstract class SearchableDTO {
  search?: SearchObject;
}
