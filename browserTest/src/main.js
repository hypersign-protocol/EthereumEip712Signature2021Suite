const {EthereumEip712Signature2021}=require('ethereumeip712signature2021suite');
import { purposes } from 'jsonld-signatures'

const Web3 = require("web3");
const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.request({method: 'eth_requestAccounts'});
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
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
        "proofValue": "0x3d4518532cb589760742045bce8deb57dab474a3db500a7162b53ed43b034ef332e7e7f0c361140c366505e820ee4146f4fdd918e3dd27286f70df6435ab0b821c",
        "eip712Domain": {
            "domain": {
                "name": "Test"
            },
            "messageSchema": {
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
};

const customDocLoader = (url) => {
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

document.getElementById("initiate").addEventListener("click", async () => {
   await  ethEnabled()

const ethereumeip712signature2021suite = new EthereumEip712Signature2021({},window.web3)
const proof = await ethereumeip712signature2021suite.createProof({
    document: vector1.inputDocument,
    purpose: new purposes.AssertionProofPurpose(),
    verificationMethod: vector1.inputOptions.verificationMethod,
    date: vector1.inputOptions.date,
    domain: vector1.inputOptions.domain,
    documentLoader: customDocLoader,


  })
document.getElementById('proof').innerHTML=JSON.stringify(proof,null,2)



  const verificationResult = await ethereumeip712signature2021suite.verifyProof({
    proof: proof,
    document: vector1.inputDocument,
    types: proof.eip712Domain.messageSchema,
    domain: proof.eip712Domain.domain,
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader: customDocLoader,
  });
document.getElementById('verificationResult').innerHTML=JSON.stringify(verificationResult,null,2)


})