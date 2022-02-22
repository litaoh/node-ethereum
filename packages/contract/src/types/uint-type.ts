import BN from 'bn.js';
import { ABIType } from './abi-type';


export class UintType extends ABIType<BN> {
  private readonly _maxValue: BN;

  constructor(M: number = 256) {
    super(`uint${M}`);
    if (M <= 0 || M > 256 || M % 8 !== 0) {
      throw new Error(`Invalid size argument: ${M}`);
    }
    this._maxValue = new BN(1).ishln(M);
  }

  public encode(data: BN): string {
    if (!BN.isBN(data)) {
      data = new BN(data, 10);
    }
    if (data.gt(this._maxValue)) {
      throw new Error(`Value to encode must be <= ${this._maxValue.toString()}, got ${data.toString()}`);
    }

    if (data.isNeg()) {
      throw new Error('Tried to encode negative number as an uint');
    }

    const hex: string = data.toString('hex');
    return hex.padStart(this.calculatePadLen(hex.length) + hex.length, '0');
  }

  public decode(data: string): [BN, string] {
    const len: number = ABIType.SIZE_UNIT_HEX;
    const ret: string = data.substring(0, len);
    return <any>[new BN(ret, 16), data.substr(len)];
  }
}
