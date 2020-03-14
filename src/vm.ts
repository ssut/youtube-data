import * as vm from 'vm';

export const vmContext = vm.createContext({
  google: {
    sbox: {
      p50: (result: any) => result,
    },
  },
});
