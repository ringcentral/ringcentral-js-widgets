export interface CarouselModalViewOptions {
  /**
   * default selector that be use when iframe loaded to calculate size
   */
  defaultSelector: (
    contentDocument: Document | null,
  ) => Element | HTMLElement | null | undefined;
}
