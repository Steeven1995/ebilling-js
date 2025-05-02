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
        created_at: string;
        expire_at: string | null;
        expiry_period: number;
        schedule_at: string | null;
        updated_at: string;
        short_description: string;
        due_date: string;
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
    created_at: string;
    expire_at: string | null;
    expiry_period: number;
    schedule_at: string | null;
    updated_at: string;
    short_description: string;
    due_date: string;
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
interface GetAllInvoiceResponse {
    current_page: number;
    per_page: number;
    total_entries: number;
    entries: GetAllInvoiceResponse[] | [];
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
export declare class EbillingJS {
    private headers;
    portalBaseUrl: string;
    apiBaseUrl: string;
    constructor(env?: Environment, username?: string, sharedkey?: string, domain?: string);
    private request;
    /**
     * Crée une facture (invoice) dans le système Ebilling.
     *
     * @param data - Données nécessaires à la création de la facture, comme le montant, la description, etc.
     * @returns Une promesse contenant les détails de la facture créée.
     */
    createInvoice(data: InvoiceData): Promise<CreateInvoiceResponse>;
    /**
   * Récupère les détails d'une facture spécifique en utilisant son identifiant.
   *
   * @param billId - L'identifiant unique de la facture à récupérer.
   * @returns Une promesse contenant les informations de la facture.
   */
    getInvoice(bill_id: string): Promise<GetInvoiceResponse>;
    /**
   * Récupère la liste paginée des factures créées.
   *
   * @returns Une promesse contenant la pagination (page actuelle, total d’éléments, etc.) et un tableau des factures.
   */
    getAllInvoices(): Promise<GetAllInvoiceResponse>;
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
    makePushUSSD(data: PushUssdData): Promise<unknown>;
    /**
   * Génère l’URL vers le portail de paiement Ebilling pour une facture donnée.
   *
   * Ce portail permet au client de finaliser son paiement via une interface web.
   * À utiliser si vous souhaitez rediriger l’utilisateur vers une page de paiement hébergée par Ebilling.
   *
   * @param billId - L’identifiant de la facture.
   * @returns Une URL complète vers le portail de paiement Ebilling.
   */
    getGatewayPortal(bill_id: string, redirect_url: string, eb_callbackurl: string): Promise<{
        url: string;
        formData: URLSearchParams;
    }>;
}
export {};
