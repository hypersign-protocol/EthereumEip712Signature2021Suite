"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentLoader = exports.EthereumEip712Signature2021 = void 0;
const v1_1 = require("./Context/v1");
Object.defineProperty(exports, "DocumentLoader", { enumerable: true, get: function () { return v1_1.docloader; } });
const EthereumEip712Signature2021_1 = __importDefault(require("./EthereumEip712Signature2021/EthereumEip712Signature2021"));
exports.EthereumEip712Signature2021 = EthereumEip712Signature2021_1.default;
