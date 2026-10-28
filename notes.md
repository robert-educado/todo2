1. Generera package.json

npm init -y

2. Uppdatera package.json - ta bort det vi inte behöver

{
  "scripts": {
    
  },
  "type": "module"
}

3. Installera beroenden

    npm install express


4. 

    node --watch path/to/server


Lista miljövariabler (Windows)

dir Env:

Lista miljövariabler (Mac)

printenv




node --env-file=.env .\src\server.js








------------------------
Kunna använda Fetch API och fetch() för att hämta och skicka data mellan frontend och backend
Förstå hur JSON används för att överföra data mellan frontend och backend
Förstå vad REST API innebär och hur vanliga HTTP-metoder som GET, POST och DELETE används
Förstå hur frontend och backend kommunicerar med varandra via HTTP
