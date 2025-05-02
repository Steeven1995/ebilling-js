"use strict";
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
exports.EbillingJS = void 0;
const base_64_1 = require("base-64");
class EbillingJS {
    constructor(env = 'lab', username, sharedkey, domain) {
        if (!username || !sharedkey || !domain) {
            throw new Error('Missing required parameters: username, sharedkey, or domain');
        }
        const user = username || process.env.EBILLING_USERNAME || '';
        const key = sharedkey || process.env.EBILLING_SHAREDKEY || '';
        this.portalBaseUrl =
            env === 'lab'
                ? 'https://test.billing-easy.net'
                : 'https://staging.billing-easy.net';
        this.apiBaseUrl = env === 'lab'
            ? 'https://lab.billing-easy.net/api/v1/'
            : 'https://stg.billing-easy.com/api/v1';
        const credentials = `${user}:${key}`;
        const encodedCredentials = (0, base_64_1.encode)(credentials);
        this.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Basic ${encodedCredentials}`,
        };
    }
    request(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.portalBaseUrl}${path}`, Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, this.headers), (options.headers || {})) }));
                const json = yield response.json();
                if (!response.ok) {
                    throw json;
                }
                return json;
            }
            catch (error) {
                console.error('Request error:', error);
                throw error;
            }
        });
    }
    /**
     * Crée une facture (invoice) dans le système Ebilling.
     *
     * @param data - Données nécessaires à la création de la facture, comme le montant, la description, etc.
     * @returns Une promesse contenant les détails de la facture créée.
     */
    createInvoice(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('/merchant/e_bills.json', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        });
    }
    /**
   * Récupère les détails d'une facture spécifique en utilisant son identifiant.
   *
   * @param billId - L'identifiant unique de la facture à récupérer.
   * @returns Une promesse contenant les informations de la facture.
   */
    getInvoice(bill_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(`/merchant/e_bills/${bill_id}.json`, {
                method: 'GET',
            });
        });
    }
    /**
   * Récupère la liste paginée des factures créées.
   *
   * @returns Une promesse contenant la pagination (page actuelle, total d’éléments, etc.) et un tableau des factures.
   */
    getAllInvoices() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(`merchant/e_bills.json`, {
                method: 'GET',
            });
        });
    }
    /**
   * Envoie un *USSD Push* à un numéro de téléphone mobile pour initier un paiement via mobile money.
   *
   * ⚠️ Cette méthode **ne redirige pas** vers le portail de paiement, elle pousse directement le message au téléphone du client via l'opérateur mobile.
   *
   * Vous devez également configurer une URL de **notification (callback)** dans votre compte Ebilling
   * pour recevoir l’état final du paiement.
   *
   * @param data - Doit contenir au minimum `payer_msisdn` (numéro du client) et `payment_system_name` ("airtelmoney" ou "moovmoney4").
   * @returns Une promesse contenant la réponse de l'opérateur.
   */
    makePushUSSD(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(`/merchant/e_bills/${data.bill_id}/ussd_push`, {
                method: 'POST',
                body: JSON.stringify({
                    payer_msisdn: data.payer_msisdn,
                    payment_system_name: data.payment_system_name,
                }),
            });
        });
    }
    /**
   * Génère l’URL vers le portail de paiement Ebilling pour une facture donnée.
   *
   * Ce portail permet au client de finaliser son paiement via une interface web.
   * À utiliser si vous souhaitez rediriger l’utilisateur vers une page de paiement hébergée par Ebilling.
   *
   * @param billId - L’identifiant de la facture.
   * @returns Une URL complète vers le portail de paiement Ebilling.
   */
    getGatewayPortal(bill_id, redirect_url, eb_callbackurl) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.portalBaseUrl}?invoice=${bill_id}&redirect_url=${encodeURIComponent(redirect_url)}`;
            const formData = new URLSearchParams();
            formData.append('invoice_number', bill_id);
            formData.append('eb_callbackurl', eb_callbackurl);
            return {
                url,
                formData,
            };
        });
    }
}
exports.EbillingJS = EbillingJS;
