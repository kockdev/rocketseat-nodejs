import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

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

//3 formas do front enviar infos:
//Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
//Route Parameters: Identificação de recurso
//Request Body: Envio de informações de um formulário (HTTPs)

const server = http.createServer(async(req, res) => {
  //const method = req.method
  //const url = req.url, os dois mesma coisa que:
    const { method, url } = req;

    await json(req, res)

    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    if(route){
        const routeParams = req.url.match(route.path)

        const {query, ...params} = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end("Not Found");
});

server.listen(3333);


