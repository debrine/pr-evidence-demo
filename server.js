// A tiny notes server with no dependencies. Notes live in memory and reset on restart.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = 3000;
const saveDelayMilliseconds = 300; // stands in for a real network round trip
const notes = [];

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => (body += chunk));
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

const server = http.createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(path.join(__dirname, "index.html")).pipe(response);
    return;
  }

  if (request.method === "GET" && request.url === "/notes") {
    sendJson(response, 200, notes);
    return;
  }

  if (request.method === "POST" && request.url === "/notes") {
    const { text } = JSON.parse(await readBody(request));
    await new Promise((resolve) => setTimeout(resolve, saveDelayMilliseconds));
    const note = { id: notes.length + 1, text };
    notes.push(note);
    sendJson(response, 201, note);
    return;
  }

  sendJson(response, 404, { error: "Not found" });
});

server.listen(port, () => {
  console.log(`Notes app running at http://localhost:${port}`);
});
