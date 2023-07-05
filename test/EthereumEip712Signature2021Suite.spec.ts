import { EthereumEip712Signature2021 } from "../src";

// @ts-ignore
import { purposes } from 'jsonld-signatures'

import assert from "assert";
import { EIP712TypedData } from "../src/TypedData/Eip712Types";

const x = {

  "message": {
    "@context": ["https://schema.org", "https://w3id.org/security/v2"],
    "@type": "Person",
    "name": {
      "first": "Jane",
      "last": "Doe"
    },
    "otherData": {
      "jobTitle": "Professor",
      "school": "University of ExampleLand"
    },
    "telephone": "(425) 123-4567",
    "email": "jane.doe@example.com"
  },
  "primaryType": "Document",
  "types": { "Document": [{ "name": "@context", "type": "string[]" }, { "name": "@type", "type": "string" }, { "name": "email", "type": "string" }, { "name": "name", "type": "Name" }, { "name": "otherData", "type": "OtherData" }, { "name": "telephone", "type": "string" }], "Name": [{ "name": "first", "type": "string" }, { "name": "last", "type": "string" }], "OtherData": [{ "name": "jobTitle", "type": "string" }, { "name": "school", "type": "string" }] }
}

const vector1 = {
  "privateKey": "0x149195a4059ac8cafe2d56fc612f613b6b18b9265a73143c9f6d7cfbbed76b7e",
  "inputDocument": {
    "@context": ["https://schema.org", "https://w3id.org/security/v2"],
    "@type": "Person",
    "firstName": "Jane",
    "lastName": "Does",
    "jobTitle": "Professor",
    "telephone": "(425) 123-4567",
    "email": "jane.doe@example.com"
  },
  "inputOptions": {
    "date": "2021-08-30T13:28:02Z",
    "verificationMethod": "did:hid:testnet:0xAED7EA8035eEc47E657B34eF5D020c7005487443#key-1",
    "domain": {
      "name": "Test"
    }
  },
  "proof": {
    "created": "2021-08-30T13:28:02Z",
    "proofPurpose": "assertionMethod",
    "type": "EthereumEip712Signature2021",
    "verificationMethod": "did:hid:testnet:0xAED7EA8035eEc47E657B34eF5D020c7005487443#key-1",
    "proofValue": "0xd8ced27b921866a9cb6fb859503714ad4be03ae70706237d05c9f113da7f4a1d7f74f9f9df4301571f5c4f253c09e1b5119a85f00760f33924d72a07d31881ec1b",
    "eip712": {
      "domain": {
        "name": "Test"
      },
      "types": {
        "Document": [
          {
            "name": "@context",
            "type": "string[]"
          },
          {
            "name": "@type",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "firstName",
            "type": "string"
          },
          {
            "name": "jobTitle",
            "type": "string"
          },
          {
            "name": "lastName",
            "type": "string"
          },
          {
            "name": "telephone",
            "type": "string"
          }
        ]
      },
      "primaryType": "Document"
    }
  }
}

const vector2 = {
  "privateKey": "0x149195a4059ac8cafe2d56fc612f613b6b18b9265a73143c9f6d7cfbbed76b7e",
  "inputDocument": {
    "@context": ["https://schema.org", "https://w3id.org/security/v2"],
    "@type": "Person",
    "data": {
      "name": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "job": {
        "jobTitle": "Professor",
        "employer": "University of Waterloo"
      }
    },
    "telephone": "(425) 123-4567"
  },
  "inputOptions": {
    "date": "2021-08-30T13:28:02Z",
    "verificationMethod": "did:hid:testnet:0xAED7EA8035eEc47E657B34eF5D020c7005487443#key-1",
    "domain": {
      "name": "Test"
    }
  },
  "proof": {
    "created": "2021-08-30T13:28:02Z",
    "proofPurpose": "assertionMethod",
    "type": "EthereumEip712Signature2021",
    "verificationMethod": "did:hid:testnet:0xAED7EA8035eEc47E657B34eF5D020c7005487443#key-1",
    "proofValue": "0xc932c9f35b465f3f4f208ce7aa3335541ddb1e3d970ed36b9db29c13deadb54d53b5d87eafce0f9df6deb42e9522c079a995166d5c4f711d9ce9b6bde0747a461c",
    "eip712": {
      "domain": {
        "name": "Test"
      },
      "types": {
        "Data": [
          {
            "name": "job",
            "type": "Job"
          },
          {
            "name": "name",
            "type": "Name"
          }
        ],
        "Job": [
          {
            "name": "employer",
            "type": "string"
          },
          {
            "name": "jobTitle",
            "type": "string"
          }
        ],
        "Name": [
          {
            "name": "firstName",
            "type": "string"
          },
          {
            "name": "lastName",
            "type": "string"
          }
        ],
        "Document": [
          {
            "name": "@context",
            "type": "string[]"
          },
          {
            "name": "@type",
            "type": "string"
          },
          {
            "name": "data",
            "type": "Data"
          },
          {
            "name": "telephone",
            "type": "string"
          }
        ]
      },
      "primaryType": "Document"
    }
  }
}



const vector3 = {
  "privateKey": "0x149195a4059ac8cafe2d56fc612f613b6b18b9265a73143c9f6d7cfbbed76b7e",
  "inputDocument": {
    "@context": ["https://schema.org", "https://w3id.org/security/v2"],
    "@type": "Person",
    "data": {
      "name": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "job": {
        "jobTitle": "Professor",
        "employer": "University of Waterloo"
      }
    },
    "telephone": "(425) 123-4567"
  },
  "inputOptions": {
    "date": "2021-08-30T13:28:02Z",
    "verificationMethod": "did:hid:testnet:0xAED7EA8035eEc47E657B34eF5D020c7005487443",
    "domain": {
      "name": "Test"
    },
    "embed": false
  },
  "proof": {
    "created": "2021-08-30T13:28:02Z",
    "proofPurpose": "assertionMethod",
    "type": "EthereumEip712Signature2021",
    "verificationMethod": "did:hid:testnet:0xAED7EA8035eEc47E657B34eF5D020c7005487443",
    "proofValue": "0xc932c9f35b465f3f4f208ce7aa3335541ddb1e3d970ed36b9db29c13deadb54d53b5d87eafce0f9df6deb42e9522c079a995166d5c4f711d9ce9b6bde0747a461c"
  }
}


const customDocLoader = (url: string): any => {
  //@ts-ignore
  const context = documents[url];

  if (context) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: context, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }

  throw new Error(
    `Error attempted to load document remotely, please cache '${url}'`
  );
};


describe('Suite Testcase ', () => {
  let EthereumEip712Signature2021obj: EthereumEip712Signature2021;
  let keyPair: any;
  beforeEach(async () => {

    // @ts-ignore
    EthereumEip712Signature2021obj = new EthereumEip712Signature2021({});
    keyPair = await EthereumEip712Signature2021obj.fromPrivateKey('0x149195a4059ac8cafe2d56fc612f613b6b18b9265a73143c9f6d7cfbbed76b7e');
    // keyPair = await EthereumEip712Signature2021obj.generateKeyPair('situate describe that jar coin blade husband cruel speak universe novel number busy anchor decrease');



  })

  it('should generate keypair', async () => {
    assert.equal(keyPair.address, '0xAED7EA8035eEc47E657B34eF5D020c7005487443')


  });


  it('should successfully create and verify a proof over basic document where schema is embedded', async () => {
    const proof = await EthereumEip712Signature2021obj.createProof({
      document: vector1.inputDocument,
      purpose: new purposes.AssertionProofPurpose(),
      verificationMethod: vector1.inputOptions.verificationMethod,
      date: vector1.inputOptions.date,
      domain: vector1.inputOptions.domain,
      documentLoader: customDocLoader,
    })
    assert.equal(proof.proofPurpose, 'assertionMethod')
    assert.equal(proof.type, 'EthereumEip712Signature2021')
    assert.equal(proof.verificationMethod, 'did:hid:testnet:0xAED7EA8035eEc47E657B34eF5D020c7005487443#key-1')
    assert.equal(proof.eip712.domain.name, 'Test')
    assert.equal(proof.eip712.types.Document[0].name, '@context')
    assert.equal(proof.eip712.types.Document[0].type, 'string[]')
    assert.equal(proof.eip712.types.Document[1].name, '@type')
    assert.equal(proof.eip712.types.Document[1].type, 'string')
    assert.equal(proof.eip712.types.Document[2].name, 'email')
    assert.equal(proof.eip712.types.Document[2].type, 'string')
    assert.equal(proof.eip712.types.Document[3].name, 'firstName')
    assert.equal(proof.eip712.types.Document[3].type, 'string')
    assert.equal(proof.eip712.types.Document[4].name, 'jobTitle')
    assert.equal(proof.eip712.types.Document[4].type, 'string')
    assert.equal(proof.eip712.types.Document[5].name, 'lastName')
    assert.equal(proof.eip712.types.Document[5].type, 'string')
    assert.equal(proof.eip712.types.Document[6].name, 'telephone')
    assert.equal(proof.eip712.types.Document[6].type, 'string')
    assert.equal(proof.eip712.primaryType, 'Document')
    const verificationResult = await EthereumEip712Signature2021obj.verifyProof({
      proof: proof,
      document: vector1.inputDocument,
      types: proof.eip712.types,
      domain: proof.eip712.domain,
      purpose: new purposes.AssertionProofPurpose(),
      documentLoader: customDocLoader,
    });

    assert.equal(verificationResult.verified, true)

  })


  it('should successfully create and verify a proof over nested document where schema is  embedded', async () => {
    const proof = await EthereumEip712Signature2021obj.createProof({
      document: vector2.inputDocument,
      purpose: new purposes.AssertionProofPurpose(),
      verificationMethod: vector2.inputOptions.verificationMethod,
      date: vector2.inputOptions.date,
      domain: vector2.inputOptions.domain,
      documentLoader: customDocLoader
    })
    assert.equal(proof.proofPurpose, 'assertionMethod')
    assert.equal(proof.type, 'EthereumEip712Signature2021')
    assert.equal(proof.proofValue, vector2.proof.proofValue)
    const verificationResult = await EthereumEip712Signature2021obj.verifyProof({
      proof: proof,
      document: vector2.inputDocument,
      types: proof.eip712.types,
      domain: proof.eip712.domain,
      purpose: new purposes.AssertionProofPurpose(),
      documentLoader: customDocLoader,
    });

    assert.equal(verificationResult.verified, true)

  })
  it("should create and verify proof over nested data where schema is not embedded", async () => {

    const proof = await EthereumEip712Signature2021obj.createProof({
      document: vector3.inputDocument,
      purpose: new purposes.AssertionProofPurpose(),
      verificationMethod:
        vector3.inputOptions.verificationMethod,
      date: vector3.inputOptions.date,
      embed: vector3.inputOptions.embed,
      documentLoader: customDocLoader,
    });
    assert.equal(proof.proofPurpose, 'assertionMethod')
    assert.equal(proof.type, 'EthereumEip712Signature2021')
    assert.equal(proof.proofValue, vector3.proof.proofValue)

    const verificationResult = await EthereumEip712Signature2021obj.verifyProof({
      proof: proof,
      document: vector3.inputDocument,
      purpose: new purposes.AssertionProofPurpose(),
      documentLoader: customDocLoader,
    });

    assert.equal(verificationResult.verified, true)


  })





});
