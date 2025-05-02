import { encode as base64Encode } from 'base-64';

interface InvoiceData {
    /** 
     * The MSISDN of the payer (e.g., '077000000' OR '066000000').
     * Required.
     */
    payer_msisdn: string;
  
    /** 
     * The amount of the bill. 
     * Required. 
     */
    amount: number;
  
    /** 
     * The short description of the bill. 
     * Required. 
     */
    short_description: string;
  
    /** 
     * The email of the payer. 
     * Optional. 
     */
    payer_email?: string;
  
    /** 
     * The full description of the bill. 
     * Optional. 
     */
    description?: string;
  
    /** 
     * The internal reference of the payment in merchant system 
     * for debugging and tracing. 
     * Optional. 
     */
    external_reference?: string;
  
    /** 
     * The datetime at which the bill should expire. 
     * If not specified, the invoice never expires. 
     * Format example: '2025-12-31T23:59:59Z'.
     * Optional.
     */
    expiry_period?: string;
}

interface CreateInvoiceResponse {
    client_transaction_id: string | null;
    server_transaction_id: string;
    e_bill: {
      bill_id: string;
      payer_msisdn: string;
      payer_email: string | null;
      payee_id: string;
      payee_name: string;
      amount: number;
      currency: string;
      state: string;
      created_at: string; // ISO datetime
      expire_at: string | null;
      expiry_period: number;
      schedule_at: string | null;
      updated_at: string;
      short_description: string;
      due_date: string; // YYYY-MM-DD
      external_reference: string | null;
      additional_info: string | null;
      description: string | null;
      reason: string | null;
      payer_name: string | null;
      payer_address: string | null;
      payer_city: string | null;
      accept_partial_payment: boolean;
      minimum_amount: number | null;
      amount_paid: number;
      ps_transaction_id: string | null;
      payment_system_name: string;
      payer_id: string | null;
      payer_code: string | null;
      data0: string | null;
      data1: string | null;
      data2: string | null;
      data3: string | null;
      data4: string | null;
      data5: string | null;
      data6: string | null;
      data7: string | null;
      data8: string | null;
      data9: string | null;
    };
}

interface GetInvoiceResponse {
    bill_id: string;
    payer_msisdn: string;
    payer_email: string | null;
    payee_id: string;
    payee_name: string;
    amount: number;
    currency: string;
    state: string;
    created_at: string; // ISO 8601 datetime
    expire_at: string | null;
    expiry_period: number;
    schedule_at: string | null;
    updated_at: string;
    short_description: string;
    due_date: string; // YYYY-MM-DD
    external_reference: string | null;
    additional_info: string | null;
    description: string | null;
    reason: string | null;
    payer_name: string | null;
    payer_address: string | null;
    payer_city: string | null;
    accept_partial_payment: boolean;
    minimum_amount: number | null;
    amount_paid: number;
    ps_transaction_id: string | null;
    payment_system_name: string;
    payer_id: string | null;
    payer_code: string | null;
    data0: string | null;
    data1: string | null;
    data2: string | null;
    data3: string | null;
    data4: string | null;
    data5: string | null;
    data6: string | null;
    data7: string | null;
    data8: string | null;
    data9: string | null;
  }
  
interface GetAllInvoiceResponse{
  current_page: number,
  per_page: number,
  total_entries: number,
  entries : GetAllInvoiceResponse[] | []
}

interface PushUssdData {
    /** 
     * The bill ID associated with the invoice. 
     * Required.
     */
    bill_id: string;
  
    /** 
     * The MSISDN (phone number) of the payee. 
     * Required. 
     */
    payer_msisdn: string;
  
    /** 
     * The username of the payment system which will process the payouts. 
     * Must be either 'airtelmoney' or 'moovmoney4'. 
     * Required.
     */
    payment_system_name: 'airtelmoney' | 'moovmoney4';
}

type Environment = 'lab' | 'production';

export class EbillingJS {

  private headers: HeadersInit;
  portalBaseUrl: string;
  apiBaseUrl: string;

  constructor(env: Environment = 'lab', username?: string, sharedkey?: string, domain?: string) {

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
    const encodedCredentials = base64Encode(credentials);

    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Basic ${encodedCredentials}`,
    };

  }

  private async request<T>(path: string, options: RequestInit): Promise<T> {

    try {
      const response = await fetch(`${this.portalBaseUrl}${path}`, {
        ...options,
        headers: {
          ...this.headers,
          ...(options.headers || {}),
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw json;
      }

      return json;

    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }


/**
 * Crée une facture (invoice) dans le système Ebilling.
 * 
 * @param data - Données nécessaires à la création de la facture, comme le montant, la description, etc.
 * @returns Une promesse contenant les détails de la facture créée.
 */
  async createInvoice(data: InvoiceData): Promise<CreateInvoiceResponse> {
    return this.request('/merchant/e_bills.json', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
 * Récupère les détails d'une facture spécifique en utilisant son identifiant.
 * 
 * @param billId - L'identifiant unique de la facture à récupérer.
 * @returns Une promesse contenant les informations de la facture.
 */
  async getInvoice(bill_id: string): Promise<GetInvoiceResponse> {
    return this.request(`/merchant/e_bills/${bill_id}.json`, {
      method: 'GET',
    });
  }

  /**
 * Récupère la liste paginée des factures créées.
 * 
 * @returns Une promesse contenant la pagination (page actuelle, total d’éléments, etc.) et un tableau des factures.
 */
  async getAllInvoices(): Promise<GetAllInvoiceResponse> {
    return this.request(`merchant/e_bills.json`, {
      method: 'GET',
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
  async makePushUSSD(data: PushUssdData) {
    return this.request(`/merchant/e_bills/${data.bill_id}/ussd_push`, {
      method: 'POST',
      body: JSON.stringify({
        payer_msisdn: data.payer_msisdn,
        payment_system_name: data.payment_system_name,
      }),
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
  async getGatewayPortal(
    bill_id: string,
    redirect_url: string,
    eb_callbackurl: string
  ): Promise<{ url: string; formData: URLSearchParams }> {

    const url = `${this.portalBaseUrl}?invoice=${bill_id}&redirect_url=${encodeURIComponent(redirect_url)}`;
  
    const formData = new URLSearchParams();
    formData.append('invoice_number', bill_id);
    formData.append('eb_callbackurl', eb_callbackurl);
  
    return {
      url,
      formData,
    };
  }

}
