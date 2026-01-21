import Linkify from 'linkify-react';
import type { FunctionComponent } from 'react';
import React from 'react';

interface ISubjectRenderProps {
  onLinkClick?: (href: string) => any;
  children: string;
}

/**
 * Component for rendering subject text with active links.
 * Uses Linkify to convert URLs in text to clickable links.
 *
 * @component
 * @param {object} props - Component props
 * @param {Function} [props.onLinkClick] - Optional callback function triggered when a link is clicked
 * @param {React.ReactNode} props.children - Content to be rendered with active links
 * @returns {React.ReactElement} A component with linkified content
 */
export const SubjectRender: FunctionComponent<ISubjectRenderProps> = ({
  onLinkClick,
  children,
}) => {
  return (
    <Linkify
      options={{
        target: '_blank',
        className: 'underline',
        attributes: {
          onClick: onLinkClick
            ? (event: React.MouseEvent) => {
                const href = (event.target as any)?.href;
                onLinkClick(href);
              }
            : undefined,
        },
      }}
    >
      {children}
    </Linkify>
  );
};
