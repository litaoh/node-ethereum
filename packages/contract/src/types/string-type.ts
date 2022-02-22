import { ABIType } from './abi-type';
import { DynamicLengthBytes } from './dynamic-length-bytes';

export class StringType extends ABIType<string> {
  constructor() {
    super('string', true);
  }

  public encode(data: string): string {
    return new DynamicLengthBytes().encode(Buffer.from(data));
  }

  public decode(data: string): [string, string] {
    const decodedBytes = new DynamicLengthBytes().decode(data);
    return [decodedBytes[0].toString(), decodedBytes[1]];
  }

}
