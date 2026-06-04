export type ValidationResult =
  | { valid: true; network: 'airtel' | 'mtn' | 'zamtel' }
  | { valid: false; error: string };

const PREFIX_MAP: Record<string, 'airtel' | 'mtn' | 'zamtel'> = {
  '097': 'airtel',
  '077': 'airtel',
  '096': 'mtn',
  '076': 'mtn',
  '095': 'zamtel',
  '075': 'zamtel',
};

export function validateZambianMobile(input: unknown): ValidationResult {
  if (typeof input !== 'string' || input.trim() === '') {
    return { valid: false, error: 'Input must be a non-empty string.' };
  }

  let number = input.replace(/[\s\-.()+]/g, '');

  if (number.startsWith('260')) {
    number = '0' + number.slice(3);
  }

  if (/\D/.test(number)) {
    return { valid: false, error: 'Number contains invalid characters.' };
  }

  if (number.length !== 10) {
    return {
      valid: false,
      error: `Number must be 10 digits — got ${number.length}.`,
    };
  }

  if (!number.startsWith('0')) {
    return { valid: false, error: 'Number must start with 0.' };
  }

  const prefix = number.slice(0, 3);
  const network = PREFIX_MAP[prefix];

  if (!network) {
    return { valid: false, error: `Unrecognised prefix "${prefix}".` };
  }

  return { valid: true, network };
}
