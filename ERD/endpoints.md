# Ledenportaal – API endpoints
 
Base URL: `/api` (zoals `app.setGlobalPrefix('api')` in `main.ts`)
Formaat: JSON. Een lijst zit altijd in een object: `{ "items": [...] }`.
Lijsten ondersteunen later `?page=` en `?pageSize=` (zie appendix paginatie in de cursus).
`werkjaar` = het startjaar van het scoutsjaar (bv. `2026` = 2026–2027). Zonder `werkjaar` geldt het huidige werkjaar. Een werkjaar start op 1 september.
 
Legende kolom **Status**:
- ✅ = geïmplementeerd in hoofdstuk Relaties (zie `stappenplan-relaties-scouts.md`)
- 🔜 = later (CRUD-uitbreiding, validatie, authenticatie)
---
 
## 1. Rollen en scope
 
| Code | Rol | Hoe bepaald | Scope |
|------|-----|-------------|-------|
| **P** | Publiek | niet ingelogd | Enkel publieke websitegegevens (zie sectie 3) |
| ~~L~~ | Lid | `gebruikersType = Lid` | **Geen account, kan niet inloggen.** Zijn gegevens worden beheerd door zijn ouders (O) en de leiding (TL, EL) |
| **O** | Ouder | `gebruikersType = Ouder` + rij in `lid_ouder` | Zichzelf + gekoppelde kinderen |
| **LD** | Leiding | `gebruikersType = Leiding` + `lidmaatschappen` in het huidige werkjaar | Leden van de eigen tak |
| **TL** | Takleiding | `lidmaatschappen.isTakleiding = true` (huidig werkjaar) | Leden en leiding van de eigen tak |
| **EL** | Eenheidsleiding | `lidmaatschappen.isEenheidsleiding = true` (huidig werkjaar) | Alles |
 
Een lid is enkel een **resource**, nooit een gebruiker die zelf requests doet. Daarom staat `L` nergens in de kolom Toegang. Inloggen kan enkel voor `gebruikersType = Ouder` of `Leiding`.
 
Hiërarchie: **EL ⊃ TL ⊃ LD**. Een hogere rol heeft altijd minstens de rechten van de lagere (binnen zijn scope).
Eenheidsleiding hoort ook bij een tak (`lidmaatschappen.takId` is verplicht), maar zijn scope is de hele eenheid.
 
Algemene regels:
- Scope wordt **server-side** afgedwongen. Een ouder mag nooit het kind van een andere ouder opvragen, ook niet via een gok-ID.
- Geen toegang tot een resource buiten scope → `404` (verklapt niet dat ze bestaat). Wel toegang tot de resource maar niet tot een actie of veld → `403`.
- Velden waar de rol geen recht op heeft, worden bij `GET` weggelaten. Bij `POST/PUT` worden ze geweigerd met `403`.
- Lijsten van gebruikers tonen enkel `id`, `voornaam`, `achternaam`, `gebruikersType`, `email`, `telefoonnummer`. Adres en rijksregisternummer staan enkel in het detail.
- Tussentabellen (`lid_ouder`, `lidmaatschappen`) krijgen **geen eigen controller of route**. Ze worden altijd via `gebruikers` of `takken` bevraagd.
- Aanbevolen: audit log op wijzigingen van gevoelige data (medische fiche, medicatie, rijksregisternummer).
Tot het hoofdstuk authenticatie zijn alle ✅-endpoints **zonder** login bereikbaar. Zet de API in die fase niet online met echte gegevens.
 
---
 
## 2. Authenticatie 🔜
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| POST | `/auth/login` | Inloggen (email + wachtwoord) → tokens | P | 🔜 |
| POST | `/auth/refresh` | Nieuw access token | P (refresh token) | 🔜 |
| POST | `/auth/logout` | Refresh token intrekken | Ingelogd | 🔜 |
| POST | `/auth/account-activeren` | Account activeren via uitnodigingslink + wachtwoord kiezen | P (token) | 🔜 |
| POST | `/auth/wachtwoord-vergeten` | Resetmail aanvragen | P | 🔜 |
| POST | `/auth/wachtwoord-reset` | Nieuw wachtwoord instellen met resettoken | P (token) | 🔜 |
| POST | `/auth/wachtwoord-wijzigen` | Wachtwoord wijzigen | Ingelogd | 🔜 |
 
> Het ERD heeft nog geen kolom voor het wachtwoord (hash). Voeg die toe in het hoofdstuk authenticatie. Enkel Ouder en Leiding krijgen een wachtwoord. `POST /auth/login` weigert een gebruiker met `gebruikersType = Lid` altijd (`401`), ook als die een e-mailadres heeft. Ouders en leiding hebben dus een verplicht `email` nodig: controleer dat in de service (in het ERD blijft het nullable, omdat leden er geen hebben).
 
---
 
## 3. Publieke website
 
Voor de pagina's `TotemGalerij`, `Leiders` en `EenheidsLeiders` in de frontend. Ze geven **enkel** de velden hieronder terug, zonder achternaam, contactgegevens of id's van minderjarigen.
 
| Methode | Endpoint | Beschrijving | Velden | Toegang | Status |
|---------|----------|--------------|--------|---------|--------|
| GET | `/takken` | Alle takken (gesorteerd op leeftijd) | alle velden van `Tak` | P | ✅ |
| GET | `/totems` | Totemgalerij | `totem`, `voortotem`, `plaats`, `jaar`, `gebruiker.voornaam` | P | ✅ (geeft nu ook `achternaam` en `id`: inperken bij authenticatie) |
| GET | `/takken/{takId}/leiding` | Leiding van een tak (huidig werkjaar) | `voornaam`, `totem`, `isTakleiding` | P (beperkt), LD/TL/EL (volledig) | ✅ (nog niet beperkt) |
| GET | `/gebruikers?rol=eenheidsleiding` | Eenheidsleiding (huidig werkjaar) | `voornaam`, `totem` | P (beperkt), ingelogd (volledig) | ✅ (nog niet beperkt) |
 
> Toon je volledige namen van leiding publiek? Vraag dan toestemming (`heeftToestemmingFotos` dekt enkel foto's).
 
---
 
## 4. Huidige gebruiker 🔜
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| GET | `/me` | Eigen profiel + rol(len) + tak en werkjaar-context | O, LD, TL, EL | 🔜 |
| GET | `/me/kinderen` | Gekoppelde leden met basisinfo | O | 🔜 |
| GET | `/me/tak` | Tak waarin de leiding actief is (huidig werkjaar) | LD, TL, EL | 🔜 |
 
> Dit zijn snelkoppelingen naar de routes in sectie 5–9 met `{id}` = de ingelogde gebruiker.
 
---
 
## 5. Gebruikers (`Gebruiker`)
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| GET | `/gebruikers` | Lijst. Filters: `type` (`Lid`/`Ouder`/`Leiding`), `rol` (`takleiding`/`eenheidsleiding`), `takId`, `werkjaar` | LD/TL (eigen tak), EL (alle) | ✅ |
| GET | `/gebruikers?type=Lid&werkjaar=` | Alle leden van de eenheid | EL | ✅ |
| GET | `/gebruikers?rol=takleiding&werkjaar=` | Alle takleiders | LD, TL, EL | ✅ |
| GET | `/gebruikers?rol=eenheidsleiding&werkjaar=` | Alle eenheidsleiding | LD, TL, EL | ✅ |
| GET | `/gebruikers/{id}` | Detail (alle velden) | O (zelf/kinderen), LD/TL (eigen tak), EL | ✅ |
| POST | `/gebruikers` | Gebruiker aanmaken (`Lid`/`Ouder`) | TL, EL | ✅ |
| POST | `/gebruikers` | Gebruiker aanmaken met `gebruikersType = Leiding` | EL | ✅ (rolcheck 🔜) |
| PUT | `/gebruikers/{id}` | Wijzigen (zie veldrechten hieronder) | O (zelf/kinderen), LD, TL, EL | ✅ |
| DELETE | `/gebruikers/{id}` | Verwijderen (cascade: totem, fiche, medicatie, lidmaatschappen, ouder-koppelingen) | EL | ✅ |
| POST | `/gebruikers/{id}/uitnodiging` | Activatiemail (opnieuw) versturen | TL, EL | 🔜 |
 
### Veldrechten op `Gebruiker`
 
| Veld | Lezen | Schrijven |
|------|-------|-----------|
| voornaam, achternaam | O, LD, TL, EL | O, LD, TL, EL |
| straatnaam, huisnummer, postcode, gemeente | O, LD, TL, EL | O, LD, TL, EL |
| email, telefoonnummer | O, LD, TL, EL | O, LD, TL, EL |
| geboortedatum | O, LD, TL, EL | O, TL, EL |
| heeftToestemmingFotos | O, LD, TL, EL | **O**, TL, EL (leiding mag dit niet zelf wijzigen) |
| rijksregisternummer | O, TL, EL | O, TL, EL |
| gebruikersType | O, LD, TL, EL | **EL** |
| startdatumLeiding | LD, TL, EL | **EL** |
| datumAccountcreatie | alle | niemand (door systeem gezet) |
 
> Dit is een voorstel. Pas de matrix aan naar wat jullie willen. De structuur blijft dezelfde.
 
---
 
## 6. Ouder–lid koppeling (`lid_ouder`, via `Gebruiker`)
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| GET | `/gebruikers/{lidId}/ouders` | Ouders/voogden van een lid, met `relatie` en `isNoodcontact` | O (eigen kinderen), LD, TL, EL | ✅ |
| GET | `/gebruikers/{ouderId}/kinderen` | Kinderen van een ouder, met `relatie` en `isNoodcontact` | O (zelf), LD, TL, EL | ✅ |
| POST | `/gebruikers/{lidId}/ouders` | Ouder koppelen `{ ouderGebruikerId, relatie, isNoodcontact }` | TL, EL | 🔜 |
| PUT | `/gebruikers/{lidId}/ouders/{ouderId}` | `relatie` en `isNoodcontact` wijzigen | O (eigen kinderen), TL, EL | 🔜 |
| DELETE | `/gebruikers/{lidId}/ouders/{ouderId}` | Koppeling verwijderen | TL, EL | 🔜 |
 
Een koppeling bestaat maximaal één keer (PK `lid_gebruiker_id` + `ouder_gebruiker_id`). Een tweede `POST` voor hetzelfde paar → `409 Conflict`.
 
---
 
## 7. Medische fiche (`MedischeFiche`, via `Gebruiker`)
 
Nul of één fiche per gebruiker (`?--1`), dus enkelvoud onder de gebruiker en zonder fiche-id in de URL.
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| GET | `/gebruikers/{id}/medische-fiche` | Fiche ophalen (`404` als de gebruiker geen fiche heeft) | O (kinderen), LD/TL (eigen tak), EL | ✅ |
| POST | `/gebruikers/{id}/medische-fiche` | Fiche aanmaken (`409` als er al een is) | O (kinderen), TL, EL | 🔜 |
| PUT | `/gebruikers/{id}/medische-fiche` | Fiche wijzigen (`datumLaatsteWijziging` wordt automatisch gezet) | O (kinderen), TL, EL | 🔜 |
| POST | `/gebruikers/{id}/medische-fiche/toestemming` | Ouderlijke toestemming bevestigen (zet `datumToestemmingOuders`) | O (kinderen) | 🔜 |
| DELETE | `/gebruikers/{id}/medische-fiche` | Fiche verwijderen (cascade: medicatie) | EL | 🔜 |
 
### Medicatie (`Medicatie`, via de medische fiche)
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| GET | `/gebruikers/{id}/medische-fiche/medicatie` | Medicatie van de fiche van deze gebruiker | zoals fiche (lezen) | ✅ |
| POST | `/gebruikers/{id}/medische-fiche/medicatie` | Toevoegen `{ naamMedicatie, dosering, tijdstip, opmerking }` | O (kinderen), TL, EL | 🔜 |
| PUT | `/gebruikers/{id}/medische-fiche/medicatie/{medicatieId}` | Wijzigen | O (kinderen), TL, EL | 🔜 |
| DELETE | `/gebruikers/{id}/medische-fiche/medicatie/{medicatieId}` | Verwijderen | O (kinderen), TL, EL | 🔜 |
 
> Elke wijziging aan de medicatie werkt ook `datumLaatsteWijziging` van de fiche bij. Bij grote wijzigingen kan je de toestemming intrekken (`datumToestemmingOuders = null`).
> Controleer bij `{medicatieId}` altijd dat die medicatie bij de fiche van `{id}` hoort. Anders → `404`.
 
---
 
## 8. Totems (`Totem`)
 
Niet iedereen heeft een totem. Een gebruiker heeft er nul of één (`?--1`).
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| GET | `/totems` | Alle totems, gesorteerd op totem, met `gebruiker { id, voornaam, achternaam }` | P (beperkt, zie sectie 3), ingelogd | ✅ |
| GET | `/gebruikers/{id}/totem` | Totem van een gebruiker (`404` als die er geen heeft) | O (kinderen), LD, TL, EL | 🔜 |
| PUT | `/gebruikers/{id}/totem` | Totem geven of wijzigen `{ totem, voortotem, plaats, jaar }` (aanmaken als er nog geen is) | EL | 🔜 |
| DELETE | `/gebruikers/{id}/totem` | Totem verwijderen | EL | 🔜 |
 
> `PUT` i.p.v. `POST`: er is maximaal één totem per gebruiker, dus de URL bepaalt de resource volledig.
 
---
 
## 9. Takken (`Tak`)
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| GET | `/takken` | Alle takken | P | ✅ |
| GET | `/takken/{takId}` | Detail | P | ✅ |
| POST | `/takken` | Tak aanmaken | EL | ✅ |
| PUT | `/takken/{takId}` | Tak wijzigen (leeftijden, maximum per geboortejaar) | EL | ✅ |
| DELETE | `/takken/{takId}` | Tak verwijderen (enkel als er geen lidmaatschappen aan hangen → anders `409`) | EL | ✅ (`409` 🔜, nu `500`) |
| GET | `/takken/{takId}/leden?werkjaar=` | Leden van de tak in een werkjaar (takleiding → zijn leden) | LD, TL (eigen tak), EL | ✅ |
| GET | `/takken/{takId}/leiding?werkjaar=` | Leiding van de tak in een werkjaar (incl. takleiding en eenheidsleiding van die tak) | P (beperkt), LD, TL, EL | ✅ |
| GET | `/takken/{takId}/lidmaatschappen?werkjaar=&betaald=` | Lidmaatschappen van de tak (bv. wie heeft nog niet betaald) | TL (eigen tak), EL | 🔜 |
| GET | `/takken/{takId}/bezetting?werkjaar=` | Aantal leden per geboortejaar t.o.v. `maximumAantalLedenGeboortejaar` | TL (eigen tak), EL | 🔜 |
 
---
 
## 10. Lidmaatschappen (`Lidmaatschap`, via `Gebruiker`)
 
PK `(gebruiker_id, werkjaar)`: één lidmaatschap per gebruiker per werkjaar. Geldt voor leden **en** leiding. Leiding heeft daarnaast `isTakleiding` en/of `isEenheidsleiding`. Elk lidmaatschap hoort bij een tak (`takId` verplicht).
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| GET | `/gebruikers/{id}/lidmaatschappen` | Historiek van een lid of leider (met tak) | O (kinderen), LD, TL, EL | 🔜 |
| PUT | `/gebruikers/{id}/lidmaatschappen/{werkjaar}` | Inschrijven / tak wijzigen `{ takId }` | TL (eigen tak), EL | 🔜 |
| PUT | `/gebruikers/{id}/lidmaatschappen/{werkjaar}` | Leidingrollen zetten `{ takId, isTakleiding, isEenheidsleiding }` | **EL** | 🔜 |
| PATCH | `/gebruikers/{id}/lidmaatschappen/{werkjaar}` | `betaald` aanpassen | **EL** | 🔜 |
| DELETE | `/gebruikers/{id}/lidmaatschappen/{werkjaar}` | Uitschrijven | EL | 🔜 |
 
Regels (validatie):
- `isTakleiding` en `isEenheidsleiding` mogen enkel `true` zijn als `gebruikersType = Leiding` → anders `400`.
- Een lid moet qua leeftijd (`geboortedatum`) binnen `minimumLeeftijd`–`maximumLeeftijd` van de tak vallen → anders `400`.
- Is `maximumAantalLedenGeboortejaar` voor dat geboortejaar bereikt → `409`.
- `PUT` is idempotent: bestaat het lidmaatschap al, dan wordt het overschreven.
---
 
## 11. Optioneel / handig 🔜
 
| Methode | Endpoint | Beschrijving | Toegang | Status |
|---------|----------|--------------|---------|--------|
| GET | `/takken/{takId}/export/ledenlijst?werkjaar=&format=csv` | Ledenlijst exporteren | TL (eigen tak), EL | 🔜 |
| GET | `/takken/{takId}/export/medisch-overzicht?werkjaar=` | Overzicht allergieën, medicatie en aandachtspunten (kamp) | TL (eigen tak), EL | 🔜 |
| GET | `/gebruikers/{id}/export` | Alle gegevens van één persoon (GDPR-inzage) | O (zelf/kinderen), EL | 🔜 |
| POST | `/werkjaren/{werkjaar}/overschrijven` | Lidmaatschappen (incl. leiding) naar het volgende werkjaar kopiëren | EL | 🔜 |
 
---
 
## 12. Opmerkingen bij het datamodel
 
- **Geboortedatum** staat in de code (`gebruikers.geboortedatum`) maar nog niet in `schema.erd`. Voeg die toe: zonder geboortedatum kan je leeftijdsgrenzen en `/bezetting` niet berekenen.
- **Credentials** ontbreken nog (zie sectie 2).
- Leiding is per werkjaar aan een tak gekoppeld via `lidmaatschappen`. Een leider zonder lidmaatschap in het huidige werkjaar heeft geen leidingrechten meer, ook al blijft het account bestaan.
- Leden hebben geen account. `POST /gebruikers/{id}/uitnodiging` is dus enkel zinvol voor Ouder en Leiding. Voor een lid → `400`.
- `MedischeFiche` en `Totem` hangen aan `Gebruiker`, dus ook leiding kan een fiche of totem hebben. De endpoints hierboven ondersteunen dat.
- Verwijder je een gebruiker, dan verdwijnen via cascade ook zijn totem, fiche, medicatie, lidmaatschappen en ouder-koppelingen. Voor GDPR is anonimiseren soms beter dan verwijderen (bv. betalingshistoriek bewaren).
---
 
## 13. Overzicht: wat nu werkt (✅)
 
```
GET    /api/takken
GET    /api/takken/{id}
POST   /api/takken
PUT    /api/takken/{id}
DELETE /api/takken/{id}
GET    /api/takken/{id}/leden?werkjaar=
GET    /api/takken/{id}/leiding?werkjaar=
 
GET    /api/gebruikers?type=&rol=&takId=&werkjaar=
GET    /api/gebruikers/{id}
POST   /api/gebruikers
PUT    /api/gebruikers/{id}
DELETE /api/gebruikers/{id}
GET    /api/gebruikers/{id}/ouders
GET    /api/gebruikers/{id}/kinderen
GET    /api/gebruikers/{id}/medische-fiche
GET    /api/gebruikers/{id}/medische-fiche/medicatie
 
GET    /api/totems
```
 
