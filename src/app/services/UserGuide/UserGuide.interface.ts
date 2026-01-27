export interface UserGuideOptions {}

export interface CarouselOptions extends CarouselState {
  firstLogin?: boolean;
}

export interface CarouselState {
  curIdx: number;
  entered: boolean;
  playing: boolean;
}

export type Guides = Record<string, string[]>;
