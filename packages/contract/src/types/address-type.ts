import { UintType } from './uint-type';
import BN from 'bn.js';

export class AddressType extends UintType {

  constructor() {
    super(160);
    this._name = 'address';
  }

  public encode(data: BN | string): string {
    if (typeof data === 'string') {
      if (data.slice(0, 2) === '0x') {
        data = data.slice(2);
      }
      return super.encode(new BN(data, 16));
    }
    return super.encode(data as BN);
  }
}
