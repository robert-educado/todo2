import express from 'express';

const app = express();

// process.env.PORT syftar på miljövariabeln PORT. Vi kan nu bestämma vilken
// port applikationen ska lyssna på genom att sätta miljövariabeln.
const port = process.env.PORT || 8000;

// Vi behöver detta middleware i de fall det skickas 
// in data till vårt API vid POST, PUT, PATCH.
// Vi får in data som JSON - vi vill deserilisera detta
// till ett JS-objekt (alltså JSON -> JS).
// Detta finns sedan tillgängligt i res.body.
app.use(express.json());

// Kunna bygga en enkel backend med Express som tillhandahåller data i JSON-format

// GET /api/tasks -> [...]
// GET /api/tasks/1
// POST /api/tasks
// DELETE /api/tasks/1

let tasks = [
  { id: 1, name: "Städa" },
  { id: 2, name: "Plugga JavaScript i webbläsaren" },
  { id: 3, name: "Vattna blommorna" },
];

let nextId = tasks.length + 1;

// API
// GET /api/tasks
// GET /api/tasks/:id
// POST /api/tasks

// GET /api/tasks
app.get('/api/tasks', (req, res) => {
  // Serialisera vår tasks array till en JSON array
  // "[{/"id/": 1, /"name:/": /"Städa/"}"
  res.json(tasks);
});

// GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {

  // Vi hämtar ut värdet av :id från path / sökvägen
  // t.ex. 1 om sökvägen är /api/tasks/1
  // samt konverterar värdet, som är en sträng, till en number
  const id = Number(req.params.id);

  // Här söker vi sedan upp uppgiften baserat på ID, och använder
  // då strikt lika med (===). Om uppgiften inte hittas
  // får vi undefined tillbaka
  const task = tasks.find(x => x.id === id);

  // ! + undefined = true - alltså, vi kontrollerar om 
  // vi hittade uppgiften. Om vi har undefined blir !undefined true
  if (!task) {
    res.status(404).send();
    // Vi behöver return här alltså fortsätter exekveringen vidare
    // till nästa rad.
    return;
  }

  // Serialiserar vår task - som är ett JS-objekt, till 
  // JSON - vad är JSON? Det är text som är formaterad på 
  // ett sätt som gör det möjligt att läsa ut informationen
  // maskinellt / via kod på frontend.
  res.json(task);
});


// POST /api/tasks
// {
//  "name": "Städa"
// }
app.post('/api/tasks', (req, res) => {

  // {
  //  name: "Städa"
  // }

  // Plocka ut name från body - name blir en const
  // variable i koden.
  const {
    name
  } = req.body;

  const newTask = {
    id: nextId++,
    name
  };

  tasks.push(newTask);

  res.status(201).send(); // 201 Created
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {

  // Vi hämtar ut värdet av :id från path / sökvägen
  // t.ex. 1 om sökvägen är /api/tasks/1
  // samt konverterar värdet, som är en sträng, till en number
  const id = Number(req.params.id);

  // Här söker vi sedan upp uppgiften baserat på ID, och använder
  // då strikt lika med (===). Om uppgiften inte hittas
  // får vi undefined tillbaka
  const task = tasks.find(x => x.id === id);

  // ! + undefined = true - alltså, vi kontrollerar om 
  // vi hittade uppgiften. Om vi har undefined blir !undefined true
  if (!task) {
    res.status(404).send();
    // Vi behöver return här alltså fortsätter exekveringen vidare
    // till nästa rad.
    return;
  }
  
  // Här söker vi sedan upp uppgiften baserat på ID, och använder
  // då strikt lika med (===). Om uppgiften inte hittas
  // får vi undefined tillbaka
  tasks = tasks.filter(x => x.id !== id);

  // 204 No Content
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});