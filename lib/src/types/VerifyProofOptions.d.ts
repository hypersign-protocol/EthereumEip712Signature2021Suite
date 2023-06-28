import { TypedDataField } from "@ethersproject/abstract-signer";
export interface VerifyProofOptions {
    domain?: any;
    types?: Record<string, TypedDataField[]> | string;
    readonly proof: any;
    readonly document: any;
    readonly purpose: any;
    documentLoader?: Function;
    expansionMap?: Function;
    primaryType?: string;
}
export interface VerifyProofResult {
    verified: boolean;
    status: any;
    error?: any;
}
//# sourceMappingURL=VerifyProofOptions.d.ts.map