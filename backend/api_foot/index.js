import { createServer } from "node:http";
import { URL } from "node:url";
import { json } from "node:stream/consumers";

const teams = [
  {
    id: 1,
    cover: "images/ghana.jpg",
    name: "Ghana",
    players_number: 11,
    coach: "Chris Hughton",
    capitaine: "Mohamed Kudus",
    slogan: "Black Stars",
  },
  // ...
];

const getMaxId = (list) => {
  if (list.length === 0) return 0;
  return Math.max(...list.map((t) => t.id));
};

const app = createServer(async (req, res) => {
  const port = 3000;
  const url = new URL(`http://127.0.0.1:${port}${req.url}`);
  const verb = req.method;
  const path = url.pathname;

  // ✅ CORS — à mettre AVANT tout autre setHeader
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Gérer la préflight OPTIONS (le navigateur l'envoie avant POST/PUT/PATCH/DELETE)
  if (verb === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  res.setHeader("Content-Type", "application/json");

  const idMatch = path.match(/^\/teams\/(\d+)$/);
  const id = idMatch ? Number(idMatch[1]) : null;

  // GET /
  if (verb === "GET" && path === "/") {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "API opérationnelle" }));
    return;
  }

  // GET /teams
  if (verb === "GET" && path === "/teams") {
    res.writeHead(200);
    res.end(JSON.stringify(teams));
    return;
  }

  // GET /teams/:id
  if (verb === "GET" && id !== null) {
    const team = teams.find((t) => t.id === id);
    if (!team) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Équipe introuvable" }));
      return;
    }
    res.writeHead(200);
    res.end(JSON.stringify(team));
    return;
  }

  // POST /teams
  if (verb === "POST" && path === "/teams") {
    try {
      const data = await json(req);
      const team = {
        id: getMaxId(teams) + 1,
        cover: data.cover,
        name: data.name,
        players_number: data.players_number,
        coach: data.coach,
        capitaine: data.capitaine,
        slogan: data.slogan,
      };
      teams.push(team);
      res.writeHead(201);
      res.end(JSON.stringify(team));

      console.log(teams);
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "Body invalide" }));
    }
    return;
  }

  // PUT /teams/:id
  if (verb === "PUT" && id !== null) {
    const index = teams.findIndex((t) => t.id === id);
    if (index === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Équipe introuvable" }));
      return;
    }
    try {
      const data = await json(req);
      teams[index] = { id, ...data };
      res.writeHead(200);
      res.end(JSON.stringify(teams[index]));
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "Body invalide" }));
    }
    return;
  }

  // PATCH /teams/:id
  if (verb === "PATCH" && id !== null) {
    const index = teams.findIndex((t) => t.id === id);
    if (index === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Équipe introuvable" }));
      return;
    }
    try {
      const data = await json(req);
      teams[index] = { ...teams[index], ...data, id };
      res.writeHead(200);
      res.end(JSON.stringify(teams[index]));
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "Body invalide" }));
    }
    return;
  }

  // DELETE /teams/:id
  if (verb === "DELETE" && id !== null) {
    const index = teams.findIndex((t) => t.id === id);
    if (index === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Équipe introuvable" }));
      return;
    }
    const deleted = teams.splice(index, 1)[0];
    res.writeHead(200);
    res.end(JSON.stringify(deleted));
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Resource not found" }));
});

const port = 3000;
app.listen(port, () => {
  console.log(`API foot activée sur : http://127.0.0.1:${port}`);
});   