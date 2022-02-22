import { FunctionParameter, ContractFunction, ContractABI } from '../src';
import BN from 'bn.js';

describe('contract library', () => {
  const address: string = '0x8e41fa729ed07b39b2cf004187b710a55e840bc5';
  const amount: BN = new BN(123).mul(new BN(10).pow(new BN(18)));
  const data: string = 'a9059cbb0000000000000000000000008e41fa729ed07b39b2cf004187b710a55e840bc5000000000000000000000000000000000000000000000006aaf7c8516d0c0000';
  const parameters: FunctionParameter[] = [
    new FunctionParameter('address', ContractABI.parseType('address')),
    new FunctionParameter('uint', ContractABI.parseType('uint'))
  ];
  const func: ContractFunction = new ContractFunction('transfer', parameters);
  it('encode data', () => {
    expect(func.encode([address, amount])).toBe(data);
  });
  it('decode data', () => {
    const [addr, amt] = func.decode(data);
    expect(addr.toString(16)).toBe(address.slice(2));
    expect(amt.toString(16)).toBe(amount.toString(16));
  });

});
