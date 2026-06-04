# zambian-mobile-validator

Validate Zambian mobile numbers and detect the network.

## Install

```bash
npm install zambian-mobile-validator
```

**Requires Node.js ≥ 18.**

## Networks covered

| Network | Prefixes     |
|---------|--------------|
| Airtel  | `097`, `077` |
| MTN     | `096`, `076` |
| Zamtel  | `095`, `075` |

## Usage

```ts
import { validateZambianMobile } from 'zambian-mobile-validator';
```

### Valid numbers

```ts
validateZambianMobile('0971234567')
// { valid: true, network: 'airtel' }

validateZambianMobile('+260961234567')
// { valid: true, network: 'mtn' }

validateZambianMobile('260751234567')
// { valid: true, network: 'zamtel' }
```

### Input formats accepted

All formats are normalised before validation:

```ts
validateZambianMobile('0971234567')     // local
validateZambianMobile('+260971234567')  // international with +
validateZambianMobile('260971234567')   // international without +
validateZambianMobile('097 123 4567')   // spaces
validateZambianMobile('097-123-4567')   // hyphens
validateZambianMobile('(097) 123 4567') // parentheses
```

### Invalid numbers

```ts
validateZambianMobile('0801234567')
// { valid: false, error: 'Unrecognised prefix "080".' }

validateZambianMobile('097123')
// { valid: false, error: 'Number must be 10 digits — got 6.' }

validateZambianMobile('')
// { valid: false, error: 'Input must be a non-empty string.' }
```

## Return type

```ts
type ValidationResult =
  | { valid: true;  network: 'airtel' | 'mtn' | 'zamtel' }
  | { valid: false; error: string };
```

## License

MIT
