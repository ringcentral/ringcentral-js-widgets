// Description of an error occurred during request processing. This data type can be used only in readonly mode, no writing is allowed
export interface ADGError {
  /**
   * Code that characterizes this error. Code uniqly identifies the source of the error.
   */
  errorCode:
    | "ErrorCode{code='ADG-000', httpStatus=503, description='Service temporary unavailable.'}"
    | "ErrorCode{code='ADG-010', httpStatus=503, description='Federation data temporary unavailable.'}"
    | "ErrorCode{code='ADG-001', httpStatus=500, description='Service internal error.'}"
    | "ErrorCode{code='ADG-100', httpStatus=403, description='Insufficient permissions.'}"
    | "ErrorCode{code='ADG-101', httpStatus=403, description='Unauthorized access.'}"
    | "ErrorCode{code='ADG-102', httpStatus=405, description='Method not allowed.'}"
    | "ErrorCode{code='ADG-111', httpStatus=400, description='Need Content-Type header.'}"
    | "ErrorCode{code='ADG-112', httpStatus=400, description='Request body is invalid.'}"
    | "ErrorCode{code='ADG-121', httpStatus=400, description='Parameter [${paramName}]is invalid. ${additionalInfo:-}'}"
    | "ErrorCode{code='ADG-115', httpStatus=415, description='Unsupported Media Type.'}"
    | "ErrorCode{code='ADG-105', httpStatus=404, description='Current account is not linked to any federation.'}"
    | "ErrorCode{code='ADG-107', httpStatus=404, description='Account not found.'}"
    | "ErrorCode{code='ADG-122', httpStatus=404, description='Contact not found.'}"
    | "ErrorCode{code='ADG-200', httpStatus=404, description='Invalid URI'}";
  /**
   * Message that describes the error. This message can be used in UI.
   */
  message: string;
}
