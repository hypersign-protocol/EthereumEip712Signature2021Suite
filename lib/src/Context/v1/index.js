var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import did from './did.json';
import ed25519signature2020 from './ed25519-signature-2020.json';
import securityv2 from './security-v2.json';
import credentials from './credentials.json';
import EthereumEip712Signature2021 from './EthereumEip712Signature2021.json';
// @ts-ignore
import jsonld from 'jsonld';
import schemaOrgContext from '../schemaOrg.json';
import dataintegrety from './vc-data-integrety.json';
import ecdsasecp2020 from './lds-ecdsa-secp256k1-recovery2020.json';
// Ref: https://github.com/digitalbazaar/jsonld.js/#custom-document-loader
// @ts-ignore
const nodeDocumentLoader = jsonld.documentLoader;
const CONTEXTS = Object.freeze({
    "https://w3id.org/security/suites/eip712sig-2021/v1": Object.assign({}, EthereumEip712Signature2021),
    "https://schema.org": schemaOrgContext,
    "https://www.w3.org/ns/did/v1": Object.assign({}, did),
    "https://w3id.org/security/suites/ed25519-2020/v1": Object.assign({}, ed25519signature2020),
    "https://w3id.org/security/v2": Object.assign({}, securityv2),
    "https://www.w3.org/2018/credentials/v1": Object.assign({}, credentials),
    "https://w3c.github.io/vc-data-integrity/vocab/security/vocabulary.jsonld": Object.assign({}, dataintegrety),
    "https://w3id.org/security/suites/secp256k1recovery-2020/v2": Object.assign({}, ecdsasecp2020)
});
const docloader = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (url in CONTEXTS) {
        return {
            contextUrl: null,
            document: CONTEXTS[url],
            documentUrl: url // this is the actual context URL after redirects
        };
    }
    return nodeDocumentLoader(url);
});
export { docloader, CONTEXTS };
