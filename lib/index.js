"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePayout = exports.GetInvoice = exports.MakePushUSSD = exports.CreateInvoice = void 0;
const axios_1 = __importStar(require("axios"));
const base_64_1 = require("base-64");
require('dotenv').config();
const username = process.env.EBILLING_USERNAME;
const sharedkey = process.env.EBILLING_SHAREDKEY;
const domain = process.env.EBILLING_DOMAIN;
const credentials = `${username}:${sharedkey}`;
const encodedCredentials = (0, base_64_1.encode)(credentials); // Je Change 'base64.encode' to 'base64Encode'
const requestHeaders = {
    'Content-type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Basic ' + encodedCredentials,
};
const api = axios_1.default.create({
    baseURL: domain,
    headers: requestHeaders
});
function CreateInvoice(data) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            { /**
                HTTP/1.1 200 OK RETURN RESPONSE DATA
    
                {
                    "client_transaction_id":"001",
                    "server_transaction_id":"0000000000001",
                    "e_bill":{
                    "bill_id":"5550000001",
                    "payer_msisdn":"4362752893",
                    "payer_email":"leola.bernier@haneconn.com",
                    "payee_id":"9016529699",
                    "payee_name":"merchant",
                    "amount":100,
                    "currency":"XAF",
                    "state":"ready",
                    "created_at":"2013-12-29T18:03:10.009+08:00",
                    "expire_at":"2013-07-25T01:51:29.000+08:00",
                    "schedule_at":null,
                    "updated_at":"2013-12-29T18:03:10.009+08:00",
                    "short_description":"short_description",
                    "due_date":"2013-10-31",
                    "external_reference":null,
                    "additional_info":null,
                    "description":"description",
                    "reason":null,
                    "accept_partial_payment": false,
                    "minimum_amount": 0
                }
            */
            }
            const { payer_msisdn, amount, short_description, payer_email, description, external_reference, expiry_period } = data;
            const response = yield api.post('/merchant/e_bills.json', {
                payer_msisdn,
                amount,
                short_description,
                payer_email,
                description,
                external_reference,
                expiry_period,
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError) {
                console.error('Erreur lors de la création de la facture :', (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                throw (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
            }
            else {
                console.error('Erreur inattendue :', error);
                throw error;
            }
        }
    });
}
exports.CreateInvoice = CreateInvoice;
function MakePushUSSD(data) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { payer_msisdn, bill_id, payment_system_name } = data;
            const response = yield api.post(`/merchant/e_bills/${bill_id}/ussd_push`, { payer_msisdn, payment_system_name });
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError) {
                console.error("Erreur lors de l'envoie du push ussd", (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                throw (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
            }
            else {
                console.error('Erreur inattendue :', error);
                throw error;
            }
        }
    });
}
exports.MakePushUSSD = MakePushUSSD;
function GetInvoice(bill_id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            { /**
                HTTP/1.1 200 OK RETURN RESPONSE DATA
    
                {
                    "bill_id":"5550000001",
                    "payer_msisdn":"4362752893",
                    "payer_email":"leola.bernier@haneconn.com",
                    "payee_id":"9016529699",
                    "payee_name":"merchant",
                    "amount":100,
                    "currency":"XAF",
                    "state":"processed",
                    "ps_transaction_id":"MP210817.2353.A90673",
                    "payment_system_name":"airtelmoney",
                    "created_at":"2013-12-29T18:03:10.009+08:00",
                    "expire_at":"2013-07-25T01:51:29.000+08:00",
                    "updated_at":"2013-12-29T18:03:10.009+08:00",
                    "short_description":"short_description",
                    "due_date":"2013-10-31",
                    "external_reference":null,
                    "additional_info":null,
                    "description":"description",
                    "reason":null
                    }
            */
            }
            const response = yield api.get(`/merchant/e_bills/${bill_id}.json`);
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError) {
                console.error('Erreur lors de la recuperation de la facture :', (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                throw (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
            }
            else {
                console.error('Erreur inattendue :', error);
                throw error;
            }
        }
    });
}
exports.GetInvoice = GetInvoice;
function CreatePayout(data) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.get('/merchant/payouts', { data });
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError) {
                console.error('Erreur lors de la création du paiement :', (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                throw (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
            }
            else {
                console.error('Erreur inattendue :', error);
                throw error;
            }
        }
    });
}
exports.CreatePayout = CreatePayout;
