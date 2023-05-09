import { TypedDataDomain, TypedDataField } from "ethers/types/hash/typed-data";


export interface EIP712SignatureOptions {
    domain: TypedDataDomain;
    types: Record<string, Array<TypedDataField>>;
    message: Record<string, any>;
    primaryType: string;
  }
  