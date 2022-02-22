export class ABIType<T> {

  static SIZE_UNIT_BYTES: number = 32;
  static SIZE_UNIT_HEX: number = 64;
  protected _name: string;
  protected _dynamic: boolean;

  constructor(name: string, dynamic: boolean = false) {
    this._name = name;
    this._dynamic = dynamic;
  }

  public get name(): string {
    return this._name;
  }

  public get isDynamic(): boolean {
    return this._dynamic;
  }


  public encode(data: T): string {
    return '';
  }

  public decode(data: string): [T, string] {
    return <any>[];
  }


  public calculatePadLen(actualLength: number): number {
    const mod = actualLength % ABIType.SIZE_UNIT_HEX;
    return mod === 0 && actualLength > 0 ? 0 : ABIType.SIZE_UNIT_HEX - mod;
  }

}
