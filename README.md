# Examenopdracht Front-end Web Development & Web Services

> Schrap hierboven eventueel wat niet past

- Student: Jorgen Caekaert
- Studentennummer: 202514873
- E-mailadres: <jorgen.caekaert@student.hogent.be>
- Student: Yul Claeys
- Studentennummer: 202512216
- E-mailadres: <yul.claeys@student.hogent.be>

## Vereisten

> Vul de vereisten eventueel aan

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

> Je kan ook een aparte README per project (in de respectievelijke map) voorzien. Verwijs er dan hier naar.

## Front-end

## Opstarten

```bash
cd frontend
pnpm install
pnpm dev
```

> .env file
```bash
VITE_API_URL=http://localhost:3000/api
```


## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)

## Docker

> Schrijf hier hoe we de applicatie starten/stoppen in Docker (commando's om uit te voeren...)

## Back-end

## Opstarten

> .env file
```bash
NODE_ENV=development 
PORT=3000
DATABASE_URL=mysql://devusr:devpwd@localhost:3307/scouts
CORS_ORIGINS=["http://localhost:5173"]
CORS_MAX_AGE=10800
```
> commando's

```bash
cd backend
pnpm install
docker compose p -d
pnpm db: migrate
pnpm db: seed
pnpm start: dev
```

## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)

## Docker

> Schrijf hier hoe we de applicatie starten/stoppen in Docker (commando's om uit te voeren...)
