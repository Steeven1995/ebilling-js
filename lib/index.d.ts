interface InvoiceData {
    amount: number;
    payer_msisdn: string;
    payer_email: string;
    short_description: string;
    external_reference: string;
    description?: string;
    expiry_period?: string;
}
interface PushUssdData {
    bill_id: string;
    payer_msisdn: string;
    payment_system_name: string;
}
interface PayoutRequireData {
    payee_msisdn: string;
    amount: string;
    external_reference: string;
    payout_type: string;
}
interface PropertyName {
    payment_system_name: string;
    payer_pin: string;
    payer_client_id: string;
    payer_client_secret_key: string;
    payouts: PayoutRequireData;
}
export declare function CreateInvoice(data: InvoiceData): Promise<any>;
export declare function MakePushUSSD(data: PushUssdData): Promise<any>;
export declare function GetInvoice(bill_id: string): Promise<any>;
export declare function CreatePayout(data: PropertyName): Promise<any>;
export {};
