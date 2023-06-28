import { TypedDataDomain, TypedDataField } from "ethers/types/hash/typed-data";
export interface CreateProofOptions {
    domain?: TypedDataDomain;
    types?: Record<string, TypedDataField[]>;
    primaryType?: string;
    readonly verificationMethod?: string;
    readonly date?: string | Date;
    readonly document: any;
    readonly purpose: any;
    embed?: boolean;
    documentLoader?: Function;
    expansionMap?: Function;
}
//# sourceMappingURL=ProofOptions.d.ts.map