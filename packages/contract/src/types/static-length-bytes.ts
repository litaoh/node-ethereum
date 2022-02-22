import { ABIType } from './abi-type';

export class StaticLengthBytes extends ABIType<Buffer> {
  private readonly _length: number;

  constructor(length: number, ignoreLength: boolean = false) {
    if (!ignoreLength && (length <= 0 || length > 32))
      throw new Error(`Length of static byte array must be between 0 and 32, was ${length}`);

    super(`bytes${length}`);
    this._length = length;
  }


  public encode(data: Buffer): string {
    if (!Buffer.isBuffer(data)) {
      data = Buffer.from(data);
    }
    if (data.length !== this._length) {
      throw new Error(`Length of bytes did not match. (Expected ${this._length}, got ${data.length})`);
    }
    const encoded = data.toString('hex');

    return encoded.padEnd(this.calculatePadLen(encoded.length), '0');
  }

  public decode(data: string): [Buffer, string] {
    const encodedLength = Math.floor((this.calculatePadLen(length * 2) + length * 2) / 2);
    const modifiedData = data.substring(0, length * 2); //rest is right-padded with 0
    const bytes = Buffer.from(modifiedData, 'hex');
    return [bytes, data.substring(encodedLength)];
  }
}
