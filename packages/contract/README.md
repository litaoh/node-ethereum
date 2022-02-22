# INSTALL

```bash
npm install ethereum-contract
```

# USAGE

usage examples:

```typescript
import { FunctionParameter, ContractFunction, ContractABI } from 'ethereum-contract';
import BN from 'bn.js';

const address: string = '0x8e41fa729ed07b39b2cf004187b710a55e840bc5';
const amount: BN = new BN(123).mul(new BN(10).pow(new BN(18)));
const parameters: FunctionParameter[] = [
  new FunctionParameter('address', ContractABI.parseType('address')),
  new FunctionParameter('uint', ContractABI.parseType('uint'))
];
const func: ContractFunction = new ContractFunction('transfer', parameters);

console.log(func.encode([address, amount]));
// a9059cbb0000000000000000000000008e41fa729ed07b39b2cf004187b710a55e840bc5000000000000000000000000000000000000000000000006aaf7c8516d0c0000
```
