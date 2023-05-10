
![Build](https://github.com/hypersign-protocol/EthereumEip712Signature2021Suite/workflows/Build/badge.svg)
# EthereumEip712Signature2021Suite 
### Supports only the `eth_signTypedData_v4` signature method.



## Install

```bash
npm i https://github.com/hypersign-protocol/EthereumEip712Signature2021Suite.git
```

## Usage

```js
import {EthereumEip712Signature2021Suite} from 'EthereumEip712Signature2021Suite';
import { purposes } from 'jsonld-signatures'

// can pass baseWallet from ethers
// new EthereumEip712Signature2021Suite(baseWalletObj);
// or can use metamask object
// var web3=new Web3(window.ethereum);
// new EthereumEip712Signature2021Suite({},web3);
const suite = new EthereumEip712Signature2021Suite({});

const kp=await EthereumEip712Signature2021obj.fromPrivateKey('0x149195a4059ac8cafe2d56fc612f613b6b18b9265a73143c9f6d7cfbbed76b7e');



const customDocLoader = (url: string): any => {
  //@ts-ignore
  const context = documents[url];

  if (context) {
    return {
      contextUrl: null, 
      document: context, 
      documentUrl: url, 
    };
  }

    return jsonld.documentLoaders.node()(url);
    // jsonld version : 3.1.1 
};

const inputData={
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
  }

 const inputOptions={
    "date": "2021-08-30T13:28:02Z",
    "verificationMethod": "did:hid:testnet:0xAED7EA8035eEc47E657B34eF5D020c7005487443#key-1",
    "domain": {
      "name": "Test"
    }
 }



const proof = await EthereumEip712Signature2021obj.createProof({
      document: inputData,
      purpose: new purposes.AssertionProofPurpose(),
      verificationMethod: vector1.inputOptions.verificationMethod,
      date: inputOptions.date,
      domain: inputOptions.domain,
      documentLoader: customDocLoader,


    })

 const result = await EthereumEip712Signature2021obj.verifyProof({
      proof,
      document: inputData,
      types: proof.eip712Domain.messageSchema,
      domain: proof.eip712Domain.domain,
      purpose: new purposes.AssertionProofPurpose(),
      documentLoader: customDocLoader,
    })   

```


```bash
"proof": {
    "created": "2021-08-30T13:28:02Z",
    "proofPurpose": "assertionMethod",
    "type": "EthereumEip712Signature2021",
    "verificationMethod": "did:hid:testnet:0xAED7EA8035eEc47E657B34eF5D020c7005487443#key-1",
    "proofValue": "0xc932c9f35b465f3f4f208ce7aa3335541ddb1e3d970ed36b9db29c13deadb54d53b5d87eafce0f9df6deb42e9522c079a995166d5c4f711d9ce9b6bde0747a461c",
    "eip712Domain": {
      "domain": {
        "name": "Test"
      },
      "messageSchema": {
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
```
## License
[MIT License](LICENSE) © Hypersign-Protocol














