# Introduction 
Ce package e-Billing est basé la documention de l'API REST e-Billing spécification V1.9 de Digitech Africa  pour le système de payement via mobile money au Gabon.

# Installation

`npm install @gabinSteeven/ebilling-js`

**Avant de l'installer sur votre projet**
Rassurer d'avoir [axios](https://www.npmjs.com/package/axios) , [base-64](https://www.npmjs.com/package/base-64) et [dotenv](https://www.npmjs.com/package/dotenv) comme dépendance préalablement installer

## Configurer les variables d'environnement

**EBILLING_USERNAME**  :  Votre nom utilisateur sur ebilling
**EBILLING_SHAREDKEY**  :  La clé partager de ebilling que vous trouverez ou generez sur votre espace d'administration 
**EBILLING_DOMAIN** : selon que vous soyez en production == ????   ou en developpeur == https://lab.billing-easy.net/api/v1/

## Fonctions utiles pour démarrer avec Ebilling

### 1 . Créer une facture
**CreateInvoice** qui prend en paramètre un objet InvoiceData

    interface  InvoiceData {
	    amount: number;
	    payer_msisdn: string;
	    payer_email: string;
	    short_description: string;
	    external_reference: string;
	    description?: string;
	    expiry_period?: string;
    }

Cette fonction return un objet sous ce format

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
    }


### 1 . Faire un push ussd
...
