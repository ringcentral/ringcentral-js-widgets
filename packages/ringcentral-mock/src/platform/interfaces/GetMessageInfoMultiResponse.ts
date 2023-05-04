import { MessageBody } from './MessageBody';

export interface GetMessageInfoMultiResponse {
  /**
   * Internal identifier of a resource
   */
  resourceId: string;
  /**
   * Status code of resource retrieval
   */
  status: number;
  /**
   */
  body: MessageBody;
}
