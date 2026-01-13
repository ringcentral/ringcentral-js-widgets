/**
 * Mask sensitive data - hide sensitive information
 * @param value Value to be masked
 * @param visibleLength Length to display from the beginning
 * @param maskChar Character used for masking
 * @returns Masked string
 */
export function maskSensitiveData(
  value: string | number | undefined | null,
  visibleLength: number = 3,
  maskChar: string = '*',
): string {
  if (!value) return '***';

  const str = String(value);
  if (str.length <= visibleLength) {
    return maskChar.repeat(str.length);
  }

  const visiblePart = str.substring(0, visibleLength);
  const maskedPart = maskChar.repeat(str.length - visibleLength);
  return visiblePart + maskedPart;
}

/**
 * Mask phone number - show first 3 and last 4 digits
 * @param phoneNumber Phone number to mask
 * @returns Masked phone number
 */
export function maskPhoneNumber(
  phoneNumber: string | number | undefined | null,
): string {
  if (!phoneNumber) return '***';

  const str = String(phoneNumber);
  if (str.length <= 7) {
    return maskSensitiveData(str, 3);
  }

  const visibleStart = str.substring(0, 3);
  const visibleEnd = str.substring(str.length - 4);
  const maskedMiddle = '*'.repeat(str.length - 7);
  return visibleStart + maskedMiddle + visibleEnd;
}

/**
 * Mask email - show first 2 characters of username and domain
 * @param email Email address to mask
 * @returns Masked email
 */
export function maskEmail(email: string | undefined | null): string {
  if (!email) return '***';

  const [username, domain] = email.split('@');
  if (!username || !domain) {
    // For invalid emails, show first 2 characters and mask the rest
    const visiblePart = email.substring(0, 2);
    const maskedPart = '*'.repeat(Math.max(0, email.length - 2));
    return visiblePart + maskedPart;
  }

  if (username.length <= 2) {
    const visibleUsername = username.substring(0, 1);
    const maskedUsername = '*'.repeat(Math.max(1, username.length - 1));
    return `${visibleUsername}${maskedUsername}@${domain}`;
  }

  const visibleUsername = username.substring(0, 2);
  const maskedUsername = '*'.repeat(username.length - 2);
  return `${visibleUsername}${maskedUsername}@${domain}`;
}

/**
 * Mask ID number - show first 4 and last 4 digits
 * @param idNumber ID number to mask
 * @returns Masked ID number
 */
export function maskIdNumber(idNumber: string | undefined | null): string {
  if (!idNumber) return '***';

  const str = String(idNumber);
  if (str.length <= 8) {
    return maskSensitiveData(str, 4);
  }

  const visibleStart = str.substring(0, 4);
  const visibleEnd = str.substring(str.length - 4);
  const maskedMiddle = '*'.repeat(str.length - 8);
  return visibleStart + maskedMiddle + visibleEnd;
}
