import { StaticLengthBytes } from './static-length-bytes';
import { UintType } from './uint-type';
import BN from 'bn.js';
import { ABIType } from './abi-type';

export class DynamicLengthBytes extends ABIType<Buffer> {
  constructor() {
    super('bytes', true);
  }

  public encode(bytes: Buffer): string {
    const length = bytes.length;

    const dataEncoded = new StaticLengthBytes(length, true).encode(bytes);

    return new UintType().encode(new BN(length)) + dataEncoded;
  }

  public decode(data: string): [Buffer, string] {
    const decodedLength = new UintType().decode(data);

    const length: number = decodedLength[0].toNumber();
    data = decodedLength[1];

    return new StaticLengthBytes(length, true).decode(data);
  }
}
