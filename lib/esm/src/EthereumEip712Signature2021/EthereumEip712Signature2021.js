import Web3 from "web3";
//@ts-ignore
import { suites } from 'jsonld-signatures/lib/suites';
//@ts-ignore
import jsonld from 'jsonld';
import crypto from "crypto";
const nodeDocumentLoader = jsonld.documentLoader;
import { Mnemonic, HDNodeWallet, BaseWallet, SigningKey } from "ethers";
import * as bip39 from "bip39";
import { w3cDate } from "../utils";
import { EIP712TypedData } from "../TypedData/Eip712Types";
import { CONTEXTS } from '../Context/v1';
import { signTypedData_v4, recoverTypedSignature_v4 } from "eth-sig-util";
export function getTypesForEIP712Domain(params) {
    return [
        typeof params.domain?.name === 'string' && { name: 'name', type: 'string' },
        params.domain?.version && { name: 'version', type: 'string' },
        typeof params.domain?.chainId === 'number' && {
            name: 'chainId',
            type: 'uint256',
        },
        params.domain?.verifyingContract && {
            name: 'verifyingContract',
            type: 'address',
        },
        params.domain?.salt && { name: 'salt', type: 'bytes32' },
    ].filter(Boolean);
}
const docloader = async (url, options) => {
    if (url in CONTEXTS) {
        return {
            contextUrl: null,
            document: CONTEXTS[url],
            documentUrl: url // this is the actual context URL after redirects
        };
    }
    // call the default documentLoader
    return nodeDocumentLoader(url);
};
import { JCS } from 'jcs';
// @ts-ignore
JSON.canonify = JCS.cannonicalize;
class EthereumEip712Signature2021 extends suites.LinkedDataSignature {
    index;
    web3;
    wallet;
    account;
    mnemonic;
    proof;
    LDKeyClass;
    signer;
    proofSignatureKey;
    constructor(options, web3) {
        // web3 send web3 wrapper arround webwallet
        super({ type: "EthereumEip712Signature2021" });
        this.index = 0;
        this.mnemonic = "";
        if (web3) {
            this.web3 = web3;
        }
        else {
            this.web3 = new Web3();
        }
        const { signer, LDKeyClass } = options;
        this.proof = {
            type: "EthereumEip712Signature2021",
        };
        this.LDKeyClass = LDKeyClass;
        if (signer) {
            this.signer = signer;
        }
        this.proofSignatureKey = "proofValue";
    }
    ensureSuiteContext(params) {
        return;
    }
    getMnemonic() {
        if (this.mnemonic === "") {
            throw new Error("Mnemonic is not set");
        }
        return this.mnemonic;
    }
    async generateKeyPair(seed) {
        if (seed) {
            this.mnemonic = seed;
        }
        else {
            // @ts-ignore
            this.mnemonic = await bip39.generateMnemonic(256, crypto.randomBytes);
        }
        const mnemonic = await Mnemonic.fromPhrase(this.mnemonic);
        const wallet = await HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${this.index}`);
        this.wallet = wallet;
        const account = await this.web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
        this.account = account;
        this.signer = wallet;
        return {
            publicKey: wallet.publicKey,
            privateKey: wallet.privateKey,
            address: account.address
        };
    }
    fromPrivateKey(privateKey) {
        const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        this.account = account;
        this.signer = new BaseWallet(new SigningKey(privateKey));
        this.wallet = this.signer;
        return {
            address: account.address,
            privateKey: privateKey,
        };
    }
    async switchAccount(index) {
        const mnemonic = await Mnemonic.fromPhrase(this.getMnemonic());
        const wallet = await HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`);
        this.wallet = wallet;
        const account = await this.web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
        this.account = account;
        return {
            publicKey: wallet.publicKey,
            privateKey: wallet.privateKey,
            address: account.address
        };
    }
    toJWK() {
        return new Error("Not Implemented");
    }
    async canonicalizationHash(message) {
        const c14nDocument = await jsonld.canonize(message, {
            algorithm: "URDNA2015",
            format: "application/n-quads",
            useNative: false,
            documentLoader: docloader
        });
        const sha256 = crypto.createHash('sha256');
        let hash = sha256.update(c14nDocument);
        return hash.digest('hex');
    }
    async createProof(options) {
        const vmId = options.purpose.controller.id;
        let proof = {
            // @ts-ignore
            type: this.type,
        };
        let embed = options.embed ? options.embed : true;
        if (options.verificationMethod !== undefined && typeof options.verificationMethod !== "string") {
            throw TypeError(`"verificationMethod" must be a URI string`);
        }
        let date = options.date ? new Date(options.date).getTime() : undefined;
        if (date === undefined) {
            date = Date.now();
        }
        if (date !== undefined && typeof date !== "string") {
            date = w3cDate(date);
        }
        if (date !== undefined) {
            proof.created = date;
        }
        proof.verificationMethod = options.document.verificationMethod.find((obj) => obj.controller === vmId);
        proof.verificationMethod = this.getVerificationMethod(proof);
        proof = await options.purpose.update(proof, {
            document: options.document,
            suite: this,
            documentLoader: options.documentLoader,
            expansionMap: options.expansionMap,
        });
        let domain = options.domain ? options.domain : {};
        const primaryType = options.primaryType ?? "Document";
        const eip712TypedData = new EIP712TypedData();
        let types = options.types ? options.types : eip712TypedData.generateTypes(options.document, primaryType);
        types.EIP712Domain = getTypesForEIP712Domain({ domain });
        const toBeSignedDocument = {
            types,
            domain,
            primaryType,
            message: options.document,
        };
        proof.canonicalizationHash = await this.canonicalizationHash(toBeSignedDocument.message);
        const [canonizeProof, canonizeDocument] = await this.createVerifyData({ document: toBeSignedDocument, proof });
        let signOptions = {
            proof: canonizeProof,
            verifyData: canonizeDocument,
            embed: embed,
        };
        proof = await this.sign(signOptions);
        return proof;
    }
    async verifyProof(options) {
        const { proof, document } = options;
        let domain = options.domain ? options.domain : {};
        const primaryType = options.primaryType ?? "Document";
        const eip712TypedData = new EIP712TypedData();
        let types = options.types ? options.types : eip712TypedData.generateTypes(options.document, primaryType);
        if (typeof types === "string") {
            if (options.documentLoader === undefined) {
                throw new Error("documentLoader must be defined for remote types");
            }
            types = await options.documentLoader(types).document;
        }
        const toBeVerifiedDocument = {
            types: types,
            domain,
            primaryType: "Document",
            message: document,
        };
        try {
            const [canonizeProof, canonizeDocument] = await this.createVerifyData({
                proof,
                document: toBeVerifiedDocument,
            });
            const vm = this.getVerificationMethod(canonizeProof);
            const canonicalizationHashVerified = proof.canonicalizationHash ? await this.canonicalizationHash(document) === proof.canonicalizationHash : null;
            const verified = this.verifySignature({
                signature: proof[this.proofSignatureKey],
                verificationMethod: vm,
                domain: canonizeDocument.domain,
                types: canonizeDocument.types,
                message: canonizeDocument.message,
                primaryType: canonizeDocument.primaryType,
            });
            if (!verified) {
                throw Error(`Invalid signature`);
            }
            const purposeResult = (await options.purpose.validate(canonizeProof, {
                verificationMethod: {
                    id: vm,
                },
                documentLoader: options.documentLoader
            }));
            if (!purposeResult.valid) {
                throw Error(purposeResult);
            }
            const returnObj = {
                verified: true,
                results: [
                    {
                        proof,
                        verified,
                        verficationMethod: vm,
                        purposeResult: { valid: purposeResult.valid },
                    }
                ],
                statusResult: {
                    canonicalizationHashVerified,
                    signatureVerified: verified,
                }
            };
            if (proof.canonicalizationHash && canonicalizationHashVerified === false) {
                throw Error(`Invalid canonicalizationHash`);
            }
            return returnObj;
        }
        catch (error) {
            return { verified: false,
                error: error };
        }
    }
    canonize(input) {
        // @ts-ignore
        return JSON.parse(JSON.canonify(input));
    }
    canonizeProof(proof) {
        proof = { ...proof };
        delete proof[this.proofSignatureKey];
        return this.canonize(proof);
    }
    async createVerifyData(options) {
        const { proof, document } = options;
        // JCS   RFC 8785
        const canonizeProof = this.canonizeProof(proof);
        const canonizeDocument = this.canonize(document);
        return [canonizeProof, canonizeDocument];
    }
    getVerificationMethod(proof) {
        let verificationMethod = proof.verificationMethod;
        if (typeof verificationMethod === "object") {
            verificationMethod = verificationMethod.id;
        }
        if (!verificationMethod) {
            throw new Error('No "verificationMethod" found in proof.');
        }
        // TODO: resolve DID to check if DID belongs to the controller of the proof or the status of the DID
        return verificationMethod;
    }
    async sign(options) {
        const { verifyData, proof } = options;
        let proofValue;
        //@ts-ignore
        if (this.web3._provider !== undefined && this.web3._provider !== null) {
            //@ts-ignore
            const from = await this.web3._provider.selectedAddress ? await this.web3._provider.selectedAddress : this.web3._provider.accounts;
            const params = [from, JSON.stringify(verifyData)];
            const method = 'eth_signTypedData_v4';
            //@ts-ignore
            proofValue = await this.getSignFromMetamask(method, params, this.web3._provider);
        }
        else if (!this.signer) {
            throw new Error("A Web3 Signer API has not been specified");
        }
        else {
            {
                //@ts-ignore
                proofValue = await signTypedData_v4(Buffer.from(this.wallet.privateKey.replace('0x', ''), 'hex'), { data: verifyData });
            }
        }
        proof[this.proofSignatureKey] = proofValue;
        if (options.embed) {
            proof["eip712"] = {
                domain: options.verifyData.domain,
                types: options.verifyData.types,
                primaryType: options.verifyData.primaryType,
            };
        }
        return proof;
    }
    verifySignature(options) {
        const recoveredAddress = recoverTypedSignature_v4({
            //@ts-ignore
            data: {
                domain: options.domain,
                message: options.message,
                types: options.types,
                primaryType: options.primaryType,
            }, sig: options.signature
        });
        // TODO: add DID resolver (did-resolver)
        if (recoveredAddress.toLowerCase() ===
            this.extractAddressFromDID(options.verificationMethod).toLowerCase()) {
            return true;
        }
        return false;
    }
    extractAddressFromDID(did) {
        const didParts = did.split(":");
        // last elem of array
        let address = didParts[didParts.length - 1];
        address = address.split("#")[0];
        return address.toLocaleLowerCase();
    }
    async getSignFromMetamask(method, params, provider) {
        return new Promise((resolve, reject) => {
            provider.sendAsync({
                method,
                params,
                from: provider.selectedAddress,
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result.result);
                }
            });
        });
    }
}
export default EthereumEip712Signature2021;
//mesh short coral rescue height arrive bitter improve lift mystery point invite
