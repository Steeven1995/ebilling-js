    ## npm install @gabinSteeven/ebilling-js
Il s'agit d'une bibliothèque Node.js/TypeScript conçue pour faciliter les interactions avec l'API REST de facturation électronique, version 1.9, fournie par Digitech Africa. Cette bibliothèque simplifie l'intégration des systèmes de paiement mobile au Gabon dans vos applications Node.js. Elle vous permet de créer facilement des factures, d'initier des push USSD et de consulter l'état des factures.

    ## Fonctionnalité

- **Création de factures :** Générez des factures avec des informations détaillées.
- **Intégration de l'argent mobile :** Intégration transparente aux systèmes de paiement mobile du Gabon.
- **Push USSD :** Déclenchez des push USSD pour inviter les utilisateurs à effectuer des paiements.
- **Vérification de l'état de la facture :** Vérifiez l'état d'une facture.
- **Prise en charge TypeScript :** Entièrement écrit en TypeScript pour la sécurité des types et une meilleure expérience de développement.
- **Configuration facile :** Configuration simple avec des variables d'environnement.


## Compte e-Billing

Avant de commencer à utiliser cette bibliothèque, vous devez disposer d'un compte de facturation électronique. Vous pouvez vous inscrire sur [https://lab.billing-easy.net/merchant/registrations/new](https://lab.billing-easy.net/merchant/registrations/new). Une fois votre compte créé, vous trouverez vos identifiants « EBILLING_USERNAME » et « EBILLING_SHAREDKEY » dans votre profil de facturation électronique.

    ## Conditions préalables

Avant d'installer cette bibliothèque, assurez-vous que les dépendances suivantes sont installées dans votre projet :

- [axios](https://www.npmjs.com/package/axios) : Pour effectuer des requêtes HTTP.
- [base-64](https://www.npmjs.com/package/base-64) : Pour encoder et décoder des chaînes Base64.
- [dotenv](https://www.npmjs.com/package/dotenv) : Pour gérer les variables d'environnement.
