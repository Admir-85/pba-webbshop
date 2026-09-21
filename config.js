/* ============ PBA webbshop – inställningar ============
   Fyll i era uppgifter här. Inget annat i sajten behöver ändras. */
window.PBA_CONFIG = {
  company: {
    name: 'PBA Solution AB',
    web: 'pbasolution.se',
    orgnr: '',          // t.ex. 556123-4567
    vatnr: '',          // t.ex. SE556123456701
    email: '',          // t.ex. info@pbasolution.se  (visas i sidfot/kontakt och används som reserv för order via e-post)
    phone: '',
    address: '',
    zip: '',
    city: '',
    country: 'Sverige'
  },
  currency: 'SEK',
  vat: 0.25,                       // moms 25 %
  pricesIncludeVat: false,         // priserna i katalogen är exkl. moms
  /* Var order från faktura/offert skickas (POST, JSON). Se backend/README. Tomt = order sparas i webbläsaren och kunden får skicka via e-post. */
  orderEndpoint: '',
  shipping: {
    options: [
      { id: 'standard', name: 'Standardfrakt (2–4 vardagar)', price: 0, note: 'Fraktkostnad meddelas i orderbekräftelsen.' },
      { id: 'pickup',   name: 'Hämta enligt överenskommelse', price: 0, note: '' }
    ],
    freeOver: 0                    // fri frakt över belopp (exkl. moms). 0 = av
  },
  payments: {
    invoice: { enabled: true,  label: 'Faktura (30 dagar netto)', help: 'För företag. Kreditprövning kan förekomma.', b2bOnly: true },
    card:    { enabled: true,  label: 'Kort (Visa, Mastercard)',   help: 'Säker kortbetalning.' },
    klarna:  { enabled: true,  label: 'Klarna',                    help: 'Betala med Klarna.' },
    /* Adress till funktionen som skapar en betalsession hos Stripe (kort + Klarna). Se backend/README. Tomt = kort och Klarna visas som "kopplas in". */
    checkoutEndpoint: ''
  }
};
