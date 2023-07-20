import type { FunctionComponent } from 'react';
import React from 'react';
import Linkify from 'linkify-react';

interface ISubjectRenderProps {
  subject: string;
  onLinkClick: (href: string) => any;
}

export const SubjectRender: FunctionComponent<ISubjectRenderProps> = ({
  subject,
  onLinkClick,
}) => {
  return (
    <Linkify
      options={{
        target: '_blank',
        attributes: {
          onClick: (event: React.MouseEvent) => {
            const href = (event.target as any)?.href;
            onLinkClick(href);
          },
        },
      }}
    >
      {subject}
    </Linkify>
  );
};
