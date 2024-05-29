import Web3 from "web3";
import { suites } from 'jsonld-signatures/lib/suites';
import { SignatureSuiteOptions, SuiteVerifyOptions } from "../types/SuiteOptions";
import { CreateProofOptions } from "../types/ProofOptions";
import { SuiteSignOptions } from "../types/SuiteSignType";
import { VerifyProofOptions, VerifyProofResult } from "../types/VerifyProofOptions";
export declare function getTypesForEIP712Domain(params: {
    domain: any;
}): any[];
declare class EthereumEip712Signature2021 extends suites.LinkedDataSignature {
    index: number;
    web3: Web3 | any;
    wallet: any;
    account: any;
    mnemonic: string;
    proof: Record<string, any>;
    LDKeyClass: any;
    signer: any;
    proofSignatureKey: string;
    constructor(options: SignatureSuiteOptions, web3?: Web3);
    ensureSuiteContext(params: {
        document: any;
        addSuiteContext: any;
    }): void;
    getMnemonic(): string;
    generateKeyPair(seed?: string): Promise<{
        publicKey: string;
        privateKey: string;
        address: any;
    }>;
    fromPrivateKey(privateKey: string): {
        address: any;
        privateKey: string;
    };
    switchAccount(index: number): Promise<{
        publicKey: string;
        privateKey: string;
        address: any;
    }>;
    toJWK(): Error;
    canonicalizationHash(message: object, options: any): Promise<string>;
    createProof(options: CreateProofOptions): Promise<any>;
    verifyProof(options: VerifyProofOptions): Promise<VerifyProofResult>;
    canonize(input: any): Record<string, any>;
    canonizeProof(proof: any): Record<string, any>;
    createVerifyData(options: {
        document: any;
        proof: any;
    }): Promise<Record<string, any>[]>;
    getVerificationMethod(proof: any): string;
    sign(options: SuiteSignOptions): Promise<Record<string, any>>;
    verifySignature(options: SuiteVerifyOptions): boolean;
    extractAddressFromDID(vmId: string, verficationMethod: Array<any>): string;
    getSignFromMetamask(method: string, params: any[], provider: any): Promise<unknown>;
}
export default EthereumEip712Signature2021;
//# sourceMappingURL=EthereumEip712Signature2021.d.ts.map