# Ledenportaal – API endpoints

Base URL: `/api/v1`  
Formaat: JSON. Lijsten ondersteunen `?page=`, `?pageSize=` en waar vermeld filters.  
`werkjaar` = het startjaar van het scoutsjaar (bv. `2026` = 2026–2027).

---

## 1. Rollen en scope

| Code | Rol | Hoe bepaald | Scope |
|------|-----|-------------|-------|
| **L** | Lid | `gebruikerType = Lid` | Enkel eigen gegevens |
| **O** | Ouder | `gebruikerType = Ouder` + rij in `Lid_Ouder` | Zichzelf + gekoppelde kinderen |
| **LD** | Leiding | `Leiding_Werkjaar` van het huidige werkjaar | Leden van de eigen tak |
| **TL** | Takleiding | `Leiding_Werkjaar.isTakleiding = true` | Leden en leiding van de eigen tak |
| **EL** | Eenheidsleiding | `Leiding_Werkjaar.isEenheidsleiding = true` | Alles |

Hiërarchie: **EL ⊃ TL ⊃ LD**. Een hogere rol heeft altijd minstens de rechten van de lagere (binnen zijn scope).

Algemene regels:
- Scope wordt **server-side** afgedwongen (een ouder mag nooit het kind van een andere ouder opvragen, ook niet via een gok-ID).
- Geen toegang tot een resource buiten scope → `404` (lekt niet dat het bestaat). Wel toegang tot de resource maar niet tot een actie of veld → `403`.
- Velden waar de rol geen recht op heeft worden bij `GET` weggelaten en bij `PATCH/POST` geweigerd met `403`.
- Aanbevolen: audit log op wijzigingen van gevoelige data (medische fiche, rijksregisternummer).

---

## 2. Authenticatie

| Methode | Endpoint | Beschrijving | Toegang |
|---------|----------|--------------|---------|
| POST | `/auth/login` | Inloggen (email + wachtwoord) → tokens | Publiek |
| POST | `/auth/refresh` | Nieuw access token | Publiek (refresh token) |
| POST | `/auth/logout` | Refresh token intrekken | Ingelogd |
| POST | `/auth/account-activeren` | Account activeren via uitnodigingslink + wachtwoord kiezen | Publiek (token) |
| POST | `/auth/wachtwoord-vergeten` | Resetmail aanvragen | Publiek |
| POST | `/auth/wachtwoord-reset` | Nieuw wachtwoord instellen met resettoken | Publiek (token) |
| POST | `/auth/wachtwoord-wijzigen` | Wachtwoord wijzigen | Ingelogd |

> Je ERD heeft geen wachtwoord/credentials-tabel. Voeg die toe (of gebruik een externe identity provider), zeker omdat `emailadres` nullable is en dus niet altijd als login kan dienen.

---

## 3. Huidige gebruiker

| Methode | Endpoint | Beschrijving | Toegang |
|---------|----------|--------------|---------|
| GET | `/me` | Eigen profiel + rol(len) + tak en werkjaar-context | Ingelogd |
| GET | `/me/kinderen` | Gekoppelde leden met basisinfo | O |
| GET | `/me/tak` | Tak(ken) waarin de leiding actief is (huidig werkjaar) | LD, TL, EL |

---

## 4. Gebruikers (`Gebruiker`)

| Methode | Endpoint | Beschrijving | Toegang |
|---------|----------|--------------|---------|
| GET | `/gebruikers` | Lijst. Filters: `type`, `takId`, `werkjaar`, `zoek`, `betaald` | LD (eigen tak), TL (eigen tak), EL (alle) |
| POST | `/gebruikers` | Gebruiker aanmaken (Lid/Ouder) | TL, EL |
| POST | `/gebruikers` | Gebruiker aanmaken met `type = Leiding` | EL |
| GET | `/gebruikers/{id}` | Detail | L (zelf), O (zelf/kinderen), LD/TL (eigen tak), EL |
| PATCH | `/gebruikers/{id}` | Wijzigen (zie veldrechten hieronder) | L (zelf, beperkt), O (zelf/kinderen), LD, TL, EL |
| DELETE | `/gebruikers/{id}` | Verwijderen / anonimiseren (GDPR) | EL |
| POST | `/gebruikers/{id}/uitnodiging` | Activatiemail (opnieuw) versturen | TL, EL |

### Veldrechten op `Gebruiker`

| Veld | Lezen | Schrijven |
|------|-------|-----------|
| voornaam, achternaam | O, LD, TL, EL | O, LD, TL, EL |
| straatnaam, huisnummer, postcode, gemeente | O, LD, TL, EL | O, LD, TL, EL |
| emailadres, telefoonnummer | O, LD, TL, EL | O, LD, TL, EL |
| heeftToestemmingFotos | O, LD, TL, EL | **O**, TL, EL (leiding mag dit niet zelf wijzigen) |
| rijksregisternummer | O, TL, EL | O, TL, EL |
| gebruikerType | O, LD, TL, EL | **EL** |
| startdatumLeiding | LD, TL, EL | **EL** |
| datumAccountcreatie | alle | niemand (door systeem gezet) |

> Dit is een voorstel. Pas de matrix aan naar wat jullie willen, de structuur blijft hetzelfde.

---

## 5. Ouder–lid koppeling (`Lid_Ouder`)

| Methode | Endpoint | Beschrijving | Toegang |
|---------|----------|--------------|---------|
| GET | `/gebruikers/{lidId}/ouders` | Ouders/voogden van een lid (relatie, isNoodcontact) | O (eigen kinderen), LD, TL, EL |
| GET | `/gebruikers/{ouderId}/kinderen` | Kinderen van een ouder | O (zelf), LD, TL, EL |
| POST | `/gebruikers/{lidId}/ouders` | Ouder koppelen `{ ouderGebruikerID, relatie, isNoodcontact }` | TL, EL |
| PATCH | `/gebruikers/{lidId}/ouders/{ouderId}` | `relatie` en `isNoodcontact` wijzigen | O (eigen kinderen), TL, EL |
| DELETE | `/gebruikers/{lidId}/ouders/{ouderId}` | Koppeling verwijderen | TL, EL |

---

## 6. Medische fiche (`MedischeFiche`)

Eén fiche per gebruiker (relatie `?--1`), dus singular onder de gebruiker.

| Methode | Endpoint | Beschrijving | Toegang |
|---------|----------|--------------|---------|
| GET | `/gebruikers/{id}/medische-fiche` | Fiche ophalen | L (zelf), O (kinderen), LD/TL (eigen tak), EL |
| POST | `/gebruikers/{id}/medische-fiche` | Fiche aanmaken | O (kinderen), TL, EL |
| PATCH | `/gebruikers/{id}/medische-fiche` | Fiche wijzigen (`datumLaatsteWijziging` automatisch) | O (kinderen), TL, EL |
| POST | `/gebruikers/{id}/medische-fiche/toestemming` | Ouderlijke toestemming bevestigen (zet `datumToestemmingOuders`) | O (kinderen) |
| DELETE | `/gebruikers/{id}/medische-fiche` | Fiche verwijderen | EL |

### Medicatie (`Medicatie`)

| Methode | Endpoint | Beschrijving | Toegang |
|---------|----------|--------------|---------|
| GET | `/gebruikers/{id}/medische-fiche/medicatie` | Lijst | zoals fiche (lezen) |
| POST | `/gebruikers/{id}/medische-fiche/medicatie` | Toevoegen | O (kinderen), TL, EL |
| PATCH | `/gebruikers/{id}/medische-fiche/medicatie/{medicatieId}` | Wijzigen | O (kinderen), TL, EL |
| DELETE | `/gebruikers/{id}/medische-fiche/medicatie/{medicatieId}` | Verwijderen | O (kinderen), TL, EL |

> Elke wijziging aan medicatie moet `datumLaatsteWijziging` van de fiche bijwerken, en intrekken van toestemming (`datumToestemmingOuders = null`) kan gewenst zijn bij grote wijzigingen.

---

## 7. Takken (`Tak`)

| Methode | Endpoint | Beschrijving | Toegang |
|---------|----------|--------------|---------|
| GET | `/takken` | Alle takken | Ingelogd |
| GET | `/takken/{takId}` | Detail | Ingelogd |
| POST | `/takken` | Tak aanmaken | EL |
| PATCH | `/takken/{takId}` | Tak wijzigen (leeftijden, maximum per geboortejaar) | EL |
| DELETE | `/takken/{takId}` | Tak verwijderen (enkel als niet in gebruik) | EL |
| GET | `/takken/{takId}/leden?werkjaar=` | Leden van de tak in een werkjaar | LD, TL (eigen tak), EL |
| GET | `/takken/{takId}/leiding?werkjaar=` | Leiding van de tak in een werkjaar | LD, TL (eigen tak), EL |
| GET | `/takken/{takId}/bezetting?werkjaar=` | Aantal leden per geboortejaar t.o.v. `maximumAantalLedenGeboortejaar` | TL (eigen tak), EL |

---

## 9. Lidmaatschappen (`Lidmaatschap`)

PK `(gebruikerID, werkjaar)`, dus één lidmaatschap per lid per werkjaar.

| Methode | Endpoint | Beschrijving | Toegang |
|---------|----------|--------------|---------|
| GET | `/lidmaatschappen?werkjaar=&takId=&betaald=` | Overzicht (bv. wie heeft nog niet betaald) | TL (eigen tak), EL |
| GET | `/gebruikers/{id}/lidmaatschappen` | Historiek van een lid | L (zelf), O (kinderen), LD, TL, EL |
| PUT | `/gebruikers/{id}/lidmaatschappen/{werkjaar}` | Inschrijven / tak wijzigen `{ takID }` | TL (eigen tak), EL |
| PATCH | `/gebruikers/{id}/lidmaatschappen/{werkjaar}` | `betaald` aanpassen | **EL** |
| DELETE | `/gebruikers/{id}/lidmaatschappen/{werkjaar}` | Uitschrijven | EL |

---

## 12. Opmerkingen bij het datamodel

- **Geboortedatum ontbreekt** in `Gebruiker`. Zonder kan je `Tak.minimumLeeftijd/maximumLeeftijd` en `maximumAantalLedenGeboortejaar` niet controleren, en de endpoint `/takken/{id}/bezetting` niet berekenen.
- **Geen credentials** (zie sectie 2).
- Leiding zit per werkjaar in een tak via `Leiding_Werkjaar`. Een leider die niet meer actief is dit werkjaar, heeft dus geen leidingrechten meer, ook al blijft het account bestaan.
- `MedischeFiche` is gekoppeld aan `Gebruiker`, dus ook leiding kan een fiche hebben. De endpoints hierboven ondersteunen dat al.