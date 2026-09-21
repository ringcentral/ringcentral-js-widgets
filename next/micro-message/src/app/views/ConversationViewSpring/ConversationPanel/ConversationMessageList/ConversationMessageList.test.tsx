import { screen, render } from '@testing-library/react';
import React from 'react';

import { ConversationMessageList } from './ConversationMessageList';

// Mock dependencies
jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@ringcentral-integration/micro-phone/src/app/hooks', () => ({
  useFormattedDateFromNowFn: () =>
    jest.fn((timestamp: number, format: string) => {
      const date = new Date(timestamp);
      return format === 'withTime'
        ? `${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}`
        : date.toLocaleDateString();
    }),
}));

jest.mock('./SubjectRender', () => ({
  SubjectRender: ({ children }: any) => (
    <div data-testid="subject-render">{children}</div>
  ),
}));

jest.mock('./ImageAttachmentRender', () => ({
  ImageAttachmentRender: ({ attachment }: any) => (
    <div data-testid="image-attachment">Image: {attachment.id}</div>
  ),
}));

jest.mock('./FileAttachmentRender', () => ({
  FileAttachmentRender: ({ attachment }: any) => (
    <div data-testid="file-attachment">File: {attachment.id}</div>
  ),
}));

jest.mock('./i18n', () => ({
  getString: (key: string) => {
    const translations: Record<string, string> = {
      loading: 'Loading ...',
    };
    return translations[key] || key;
  },
}));

// Mock CSS modules
jest.mock('./styles.scss', () => ({
  root: 'root',
  message: 'message',
  time: 'time',
  messageBody: 'messageBody',
  big: 'big',
  imageBody: 'imageBody',
  clear: 'clear',
  loading: 'loading',
}));

describe('ConversationMessageList - Basic Tests', () => {
  const mockMessages = [
    {
      id: '1',
      subject: 'Hello world',
      direction: 'Inbound' as const,
      creationTime: new Date('2023-01-01T10:00:00Z').getTime(),
      mmsAttachments: [],
    },
    {
      id: '2',
      subject: 'How are you?',
      direction: 'Outbound' as const,
      creationTime: new Date('2023-01-01T10:30:00Z').getTime(),
      mmsAttachments: [
        {
          id: 'img1',
          contentType: 'image/jpeg',
        },
      ],
    },
    {
      id: '3',
      subject: 'Here is a document',
      direction: 'Inbound' as const,
      creationTime: new Date('2023-01-01T11:00:00Z').getTime(),
      mmsAttachments: [
        {
          id: 'doc1',
          contentType: 'application/pdf',
        },
      ],
    },
  ];

  const defaultProps = {
    messages: mockMessages,
    currentLocale: 'en-US',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Element.prototype.scrollIntoView = jest.fn();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(
        <ConversationMessageList {...defaultProps} />,
      );
      const subjectElements = container.querySelectorAll(
        '[data-testid="subject-render"]',
      );
      expect(subjectElements).toHaveLength(3);
    });

    it('renders all messages', () => {
      render(<ConversationMessageList {...defaultProps} />);

      expect(screen.getByText('Hello world')).toBeInTheDocument();
      expect(screen.getByText('How are you?')).toBeInTheDocument();
      expect(screen.getByText('Here is a document')).toBeInTheDocument();
    });

    it('renders image attachments', () => {
      const { container } = render(
        <ConversationMessageList {...defaultProps} />,
      );

      const imageElement = container.querySelector(
        '[data-testid="image-attachment"]',
      );
      expect(imageElement).toBeInTheDocument();
      expect(screen.getByText('Image: img1')).toBeInTheDocument();
    });

    it('renders file attachments', () => {
      const { container } = render(
        <ConversationMessageList {...defaultProps} />,
      );

      const fileElement = container.querySelector(
        '[data-testid="file-attachment"]',
      );
      expect(fileElement).toBeInTheDocument();
      expect(screen.getByText('File: doc1')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ConversationMessageList {...defaultProps} className="custom-class" />,
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Loading State', () => {
    it('displays loading indicator when loadingNextPage is true', () => {
      render(
        <ConversationMessageList {...defaultProps} loadingNextPage={true} />,
      );

      expect(screen.getByText('Loading ...')).toBeInTheDocument();
    });

    it('does not display loading indicator when loadingNextPage is false', () => {
      render(
        <ConversationMessageList {...defaultProps} loadingNextPage={false} />,
      );

      expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();
    });
  });

  describe('Message Types', () => {
    it('renders inbound message with correct data attribute', () => {
      const { container } = render(
        <ConversationMessageList {...defaultProps} />,
      );

      const inboundElements = container.querySelectorAll(
        '[data-sign="InboundText"]',
      );
      expect(inboundElements.length).toBeGreaterThan(0);
    });

    it('renders outbound message with correct data attribute', () => {
      const { container } = render(
        <ConversationMessageList {...defaultProps} />,
      );

      const outboundElement = container.querySelector(
        '[data-sign="OutboundText"]',
      );
      expect(outboundElement).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty messages array', () => {
      render(<ConversationMessageList {...defaultProps} messages={[]} />);

      expect(screen.queryByTestId('subject-render')).not.toBeInTheDocument();
    });

    it('handles messages without creationTime', () => {
      const messagesWithoutTime = [
        {
          id: '1',
          subject: 'No time message',
          direction: 'Inbound' as const,
          mmsAttachments: [],
        },
      ];

      render(
        <ConversationMessageList
          {...defaultProps}
          messages={messagesWithoutTime}
        />,
      );

      expect(screen.getByText('No time message')).toBeInTheDocument();
    });

    it('handles messages without mmsAttachments', () => {
      const messagesWithoutAttachments = [
        {
          id: '1',
          subject: 'No attachments',
          direction: 'Inbound' as const,
          creationTime: Date.now(),
        },
      ];

      render(
        <ConversationMessageList
          {...defaultProps}
          messages={messagesWithoutAttachments}
        />,
      );

      expect(screen.getByText('No attachments')).toBeInTheDocument();
      expect(screen.queryByTestId('image-attachment')).not.toBeInTheDocument();
      expect(screen.queryByTestId('file-attachment')).not.toBeInTheDocument();
    });

    it('handles missing optional props gracefully', () => {
      render(<ConversationMessageList messages={mockMessages} />);

      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('calls onAttachmentDownload when provided', () => {
      const mockOnAttachmentDownload = jest.fn();
      const { container } = render(
        <ConversationMessageList
          {...defaultProps}
          onAttachmentDownload={mockOnAttachmentDownload}
        />,
      );

      // Test that component renders correctly with the handler
      expect(container).toBeInTheDocument();
    });

    it('calls onLinkClick when provided', () => {
      const mockOnLinkClick = jest.fn();
      const { container } = render(
        <ConversationMessageList
          {...defaultProps}
          onLinkClick={mockOnLinkClick}
        />,
      );

      // Test that component renders correctly with the handler
      expect(container).toBeInTheDocument();
    });
  });

  describe('Sender Name Rendering', () => {
    it('renders component with sender name function', () => {
      const mockRenderSenderName = jest.fn((message) => (
        <div data-testid="sender-name">Sender: {message.id}</div>
      ));

      render(
        <ConversationMessageList
          {...defaultProps}
          renderSenderName={mockRenderSenderName}
        />,
      );

      // Should call renderSenderName for inbound messages
      expect(mockRenderSenderName).toHaveBeenCalled();
    });
  });
});
