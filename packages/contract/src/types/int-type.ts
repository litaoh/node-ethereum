import {ABIType} from './abi-type';
import BN from 'bn.js';

export class IntType extends ABIType<BN> {
  private readonly _M: number;
  private readonly _maxValue: BN;
  private readonly _minValue: BN;

  constructor(M: number = 256) {
    if (M <= 0 || M > 256 || M % 8 != 0) {
      throw new Error(`Invalid size argument: ${M}`);
    }

    super(`int${M}`);
    this._M = M;
    this._maxValue = new BN(1).ishln(M - 1).isub(new BN(1));
    this._minValue = new BN(1).ishln(M - 1);
  }


  public encode(data: BN): string {

    if (data.gt(this._maxValue) || data.lt(this._minValue)) {
      throw new Error(`Data (${data.toString()}) must be in [${this._minValue}, ${this._maxValue}]`);
    }

    if (data.isNeg()) {
      return new BN(1).ishln(ABIType.SIZE_UNIT_BYTES * 8).iadd(data).toString('hex');
    } else {
      const hex = data.toString('hex');
      return hex.padStart(this.calculatePadLen(hex.length) + hex.length, '0');
    }
  }

  public decode(data: string): [BN, string] {
    const part = data.substring(0, ABIType.SIZE_UNIT_HEX);

    const bytes = new BN(data, 16).toArray();

    const isNegative = (bytes[0] & (1 << 7)) === 128; //first bit set?

    let number = new BN(part, 16);

    if (isNegative) {
      number = new BN(1).ishln(ABIType.SIZE_UNIT_BYTES * 8).ineg().iadd(number);
    }

    return [number, data.substring(ABIType.SIZE_UNIT_HEX)];
  }

}
