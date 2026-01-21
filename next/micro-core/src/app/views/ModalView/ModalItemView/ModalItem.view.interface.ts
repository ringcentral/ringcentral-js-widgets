import type { ModalItemPanel, ModalItemProps } from './ModalItemPanel';
import { CustomEventProps } from './contexts';

export interface ModalItemViewOptions {
  component?: typeof ModalItemPanel;
}

export type NonJSXModalItemProps = CustomEventProps<
  Partial<Omit<ModalItemProps, 'header' | 'footer' | 'children' | 'data'>> & {
    /**
     * header message for set on dialog header, that will give you default header with title.
     *
     * when you need custom jsx or style with React,
     * use view module implements `ModalRef` with `header` component instead.
     *
     * set `null` to make us not have header component rendered
     */
    header?: string | null;
    /**
     * set `null` to make us not have footer component rendered
     */
    footer?: null;
    /**
     * dialog content string.
     *
     * when you just want some text message be show
     * and not need custom jsx or style with React,
     */
    content?: string;
  }
>;
