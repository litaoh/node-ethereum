import { FunctionParameter } from './function-parameter';
import {
  ABIType,
  AddressType, BoolType,
  DynamicLengthBytes,
  FunctionType,
  StaticLengthBytes,
  StringType,
  UintType
} from './types';


export interface AbiParameter {
  type: string;
  name: string;
}

export class ContractABI {
  static parseParameters(data: AbiParameter[]): FunctionParameter[] {
    if (!data || !data.length) {
      return [];
    }

    const elements = [];

    for (let ele of data) {
      const name = ele.name;
      const type = ele.type;
      elements.push(new FunctionParameter(name, ContractABI.parseType(type)));
    }

    return elements;
  }

  /**
   * @param {String} type
   * @return {ABIType}
   */
  static parseType(type: string): ABIType<any> {
    if (type.match(/^uint/)) {
      if (type.length === 4) {
        return new UintType();
      }
      const M = parseInt(type.substring(4));
      return new UintType(M);
    } else if (type.match(/^bytes/)) {
      if (type.length === 5) {
        return new DynamicLengthBytes();
      }
      const length = parseInt(type.substring(5));
      return new StaticLengthBytes(length);
    }

    switch (type) {
      case 'string':
        return new StringType();
      case 'address':
        return new AddressType();
      case 'function':
        return new FunctionType();
      case 'bool':
        return new BoolType();
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }


}
