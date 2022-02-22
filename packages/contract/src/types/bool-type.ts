import { ABIType } from './abi-type';

export class BoolType extends ABIType<boolean> {
  constructor() {
    super('bool');

  }

  public encode(data: boolean): string {
    return (data ? '1' : '0').padStart(ABIType.SIZE_UNIT_HEX - 1, '0');
  }

  public decode(data: string): [boolean, string] {
    return [data[ABIType.SIZE_UNIT_HEX - 1] == '1', data.substring(ABIType.SIZE_UNIT_HEX)];
  }

}
