import type { SpinnerOverlayProps } from '../../components/SpinnerOverlay';

export type BlockItem = {} & SpinnerOverlayProps;

export type BlockMappingType = Record<string, BlockItem>;

export interface State {
  blockIds: string[];
  blockMapping: BlockMappingType;
}

export interface DepsModules {}

export interface IBlock extends State {
  //
}
