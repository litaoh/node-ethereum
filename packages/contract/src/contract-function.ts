import { FunctionParameter } from './function-parameter';
import { Keccak } from 'sha3';
import BN from 'bn.js';
import { UintType } from './types';

export class ContractFunction {
  private readonly _name: string;
  private readonly _parameters: FunctionParameter[];

  constructor(name: string, parameters: FunctionParameter[]) {
    this._name = name;
    this._parameters = parameters;
  }

  public encodeName(): string {
    const parameterTypes = this._parameters.map((p: FunctionParameter) => p.type.name).join(',');
    return `${this._name}(${parameterTypes})`;
  }

  public encode(params: any[]): string {
    const parameters = this._parameters;

    if (params.length !== parameters.length) {
      throw new Error(`Must match function parameters: ${params.length}`);
    }

    const startHash = sha3(Buffer.from(this.encodeName())).slice(0, 4);
    const finishedEncodings: string[] = [];
    const dynamicEncodings: string[] = [];

    for (let i = 0; i < parameters.length; i++) {
      const parameter = parameters[i];
      const value: any = params[i];

      const encoded = parameter.type.encode(value);

      if (parameter.type.isDynamic) {
        dynamicEncodings.push(encoded);
        finishedEncodings.push(('').padStart(64, '0')); //will be set later
      } else {
        finishedEncodings.push(encoded);
      }
    }

    let currentOffset = finishedEncodings.reduce((ret, val) => ret + Math.floor(val.length / 2), 0)
    const dynamicParam = parameters.filter(k => k.type.isDynamic);
    dynamicParam.forEach(param => {
      const index = parameters.indexOf(param);
      finishedEncodings[index] = new UintType().encode(new BN(currentOffset));
      const firstDynamicEncoding = dynamicEncodings.shift();
      if (firstDynamicEncoding === undefined) return;
      finishedEncodings.push(firstDynamicEncoding);
      currentOffset += Math.floor(firstDynamicEncoding.length / 2);
    })
    return startHash.toString('hex') + finishedEncodings.join('');
  }

  public decode(data: string): any[] {
    data = data.substring(8);
    const parameters = this._parameters;
    const result = [];
    for (let i = 0; i < parameters.length; i++) {
      const parameter = parameters[i];
      let decode: any;
      [decode, data] = parameter.type.decode(data);
      result.push(decode);
    }

    return result;
  }
}

function sha3(data: Buffer): Buffer {
  const hash = new Keccak(256);
  hash.update(data);
  return hash.digest();
}
