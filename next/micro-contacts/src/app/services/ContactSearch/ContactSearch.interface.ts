export interface ContactSearchState {
  entities: Entities;
  timestamp: number;
}

export interface SetSearchSuccessOptions {
  searchOnSources: string[];
  searchString: SearchString;
  entities: Entities;
}

export interface SetContactSearchOptions {
  sourceName: SearchSource['sourceName'];
  searchString: SearchString;
  entities: Entities;
  ttl: number;
}

export interface Searching {
  searchOnSources: SearchSource['sourceName'][];
  searchString: SearchString;
  result: Entities;
}

export type ContactSearchEntity = {
  id: string;
  name: string;
  phoneNumber: string;
  entityType?: string;
  phoneType?: string;
};

export type Entities = {
  id: string;
  name: string;
  phoneNumber: string;
}[];

export interface SearchFromCacheOptions {
  sourceName: SearchSource['sourceName'];
  searchString: SearchString;
}

export interface SearchSourceOptions {
  searchOnSources: SearchSource['sourceName'][];
  sourceName: SearchSource['sourceName'];
  searchString: SearchString;
}

export type SearchString = string;

export interface SearchStringOptions {
  searchString: SearchString | undefined;
}

export interface SearchSource {
  sourceName: string;
  searchFn: (
    searchStringOptions: SearchStringOptions,
  ) => Promise<null | Entities>;
  readyCheckFn: () => boolean;
  formatFn: (entities: Entities) => Entities;
}

export interface ContactSearchOptions {
  /**
   * minimal search text length, default 3 characters
   */
  minimalSearchLength?: number;
  /**
   * timestamp of local cache, default 5 mins
   */
  ttl?: number;
}
