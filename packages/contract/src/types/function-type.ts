import { StaticLengthBytes } from './static-length-bytes';

export class FunctionType extends StaticLengthBytes {

  constructor() {
    super(24);
    this._name = 'function';
  }

}
