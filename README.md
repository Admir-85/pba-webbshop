# PBA webbshop

Färdig webbplats för PBA Solution AB med produktkatalog, huvud- och undermeny, sök, varukorg, offertförfrågan och kassa (faktura, kort, Klarna). Byggd utan byggsteg: bara HTML, CSS och JavaScript.

## Innehåll
- 5 huvudkategorier med 32 undermenyer, 205 produktserier och 3 316 artiklar (från katalogen)
- Serie-sidor med artikeltabell (mått, pris, antal, köp/offert), artikelsidor, sök med förslag
- Varukorg, kassa, orderbekräftelse, kontaktformulär, om oss, frakt & betalning, köpvillkor, integritetspolicy
- Mobilanpassad

## Kom igång
1. Öppna `config.js` och fyll i företagsuppgifter (org.nr, e-post, telefon, adress), frakt och moms.
2. Lägg mappen på en webbadress (GitHub Pages, Netlify, eget webbhotell). Testa lokalt: `python3 -m http.server` i mappen och öppna http://localhost:8000.
3. Innan lansering: läs igenom **Checklista** nedan.

## Uppdatera sortiment och priser
Allt sortiment ligger i `data/catalog-data.js` och `images/`. Gör så här:
1. Öppna **Katalog Editor** (PBA_Katalog_Editor.html), lägg in *Pris* på artiklarna (prisverktyget räknar påslag), justera kategorier och texter.
2. **Exportera → Webbpaket (ZIP)**. Packa upp: ersätt `data/catalog-data.js` med `site/catalog-data.js` och `images/` med bilderna i ZIP-filen.
3. Köra `node tools/make_prices.js` om ni använder betalning med kort/Klarna (skapar prislistan som servern kontrollerar mot).

Inköpspriser exporteras aldrig till webbplatsen – bara försäljningspriset.
Artiklar utan pris visas som *Pris på förfrågan* och kan läggas i en offertlista.

## Beställningar och betalning
| Betalsätt | Hur det fungerar | Vad som krävs |
|---|---|---|
| **Faktura** (företag) | Ordern skickas till er (e-post). Ni fakturerar enligt villkoren. | Sätt `orderEndpoint` i `config.js` (se `backend/`), annars sparas ordern i kundens webbläsare och kunden mejlar den till er. |
| **Kort** | Kunden skickas till Stripes betalsida. | Stripe-konto + `backend/netlify/functions/create-checkout.js` + `checkoutEndpoint` i `config.js`. |
| **Klarna** | Via Stripe Checkout. | Samma som kort, plus Klarna aktiverat i Stripe Dashboard (Settings → Payment methods). |
| **Offertförfrågan** | Används automatiskt när varukorgen innehåller artiklar utan pris. Ingen betalning. | Samma som faktura. |

**Viktigt:** utan `orderEndpoint` och `checkoutEndpoint` skickas ingenting automatiskt. Kort och Klarna visas då som "kopplas in" och kan inte väljas. Ordern sparas i webbläsaren och kunden får knappar för e-post/nedladdning.

### Koppla in (Netlify, ca 30 minuter)
1. Skapa ett konto på netlify.com och koppla mappen (Deploy from Git eller dra och släpp). `netlify.toml` ställer in funktionerna.
2. I Netlify → Site settings → Environment variables:
   - `STRIPE_SECRET_KEY` (börja med testnyckel `sk_test_…`)
   - `RESEND_API_KEY`, `MAIL_FROM` (verifierad avsändare i Resend), `ORDER_TO_EMAIL` (era ordermejl)
   - valfritt: `ALLOWED_ORIGIN` (er webbadress), `SHIPPING_FEE`, `VAT`, `SEND_CUSTOMER_COPY=1`
3. I `config.js`: `orderEndpoint: '/.netlify/functions/submit-order'` och `checkoutEndpoint: '/.netlify/functions/create-checkout'`.
4. Kör `node tools/make_prices.js` och publicera igen.
5. Testa med Stripes testkort 4242 4242 4242 4242 innan ni går live.

### Bra att veta
- Priserna i kassan räknas om på servern från `prices.json`, så kunden kan inte ändra priset i webbläsaren.
- Klarna via Stripe kräver att priser visas inkl. moms i betalflödet – funktionen lägger på moms enligt `VAT`.
- Fakturaköp: kreditprövning och fakturering sköter ni. Överväg t.ex. Klarna Invoice B2B eller ert affärssystem.
- Ingen kundinloggning, lagersaldo eller fraktberäkning ingår.

## Checklista före lansering
- [ ] Fyll i `config.js` (org.nr, moms-nr, e-post, telefon, adress).
- [ ] Lägg in försäljningspriser och kontrollera moms och frakt.
- [ ] Låt jurist granska **köpvillkor** och **integritetspolicy** (mallar). Lägg till uppgifter om ångerrätt och reklamation.
- [ ] Koppla in order (`orderEndpoint`) och betalning i testläge, gör en testorder av varje betalsätt.
- [ ] Kontrollera att alla produktbilder är rätt. Produktbilderna är hämtade ur leverantörens katalog; kontrollera att ni har rätt att använda dem och byt vid behov via Katalog Editor.
- [ ] Sökmotoroptimering: sajten använder #-adresser (hash-routing) för enkelhetens skull. För bättre synlighet i Google kan statiska sidor genereras per kategori/serie.

## Filer
```
index.html            sidan
config.js             era inställningar
data/catalog-data.js  sortiment (skapas av Katalog Editor)
images/               produktbilder
assets/               stil, skript, logotyper
backend/              exempel på serverfunktioner (Stripe, e-post)
tools/make_prices.js  skapar prislistan för serverkontroll
netlify.toml          Netlify-inställningar
```
