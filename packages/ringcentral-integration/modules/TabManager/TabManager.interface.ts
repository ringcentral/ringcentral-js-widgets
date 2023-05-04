export interface TabManagerOptions {
  enableCache?: boolean;
  autoMainTab?: boolean;
  isMainTab?: boolean;
}

export interface Deps {
  prefix: string;
  tabManagerOptions?: TabManagerOptions;
}

export interface TabEvent {
  name: string;
  args?: any[];
}
