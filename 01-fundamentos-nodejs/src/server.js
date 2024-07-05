import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar uma recurso do back-end
// POST => Criar uma recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação especifica de um recurso back-end
// DELETE => Deletar um recurso do back-end

// Cabeçalhos (Requisição/resposta) => Metadados

// Stateful - Guarda informações na memoria
// Stateless - Não salva nada na memória, geralmente em um banco de dados

// HTTP Status Code



const server = http.createServer(async(req, res) => {
  //const method = req.method
  //const url = req.url, os dois mesma coisa que:
    const { method, url } = req;

    await json(req, res)

    const route = routes.find(route => {
        return route.method == method && route.path == url
    })

    if(route){
        return route.handler(req, res)
    }

    return res.writeHead(404).end("Not Found");
});

server.listen(3333);
