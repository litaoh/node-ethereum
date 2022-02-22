import { ABIType } from './types';

export class FunctionParameter {
  private readonly _name: string;
  private readonly _type: ABIType<any>;

  constructor(name: string, type: ABIType<any>) {
    this._name = name;
    this._type = type;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): ABIType<any> {
    return this._type;
  }
}
