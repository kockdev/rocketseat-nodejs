import http from 'node:http';

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

const users = []

const server = http.createServer((req, res) => {
    //const method = req.method
    //const url = req.url, os dois mesma coisa que:
    const {method, url} = req

    if(method == 'GET'&& url == '/users'){
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users));
    }
    if(method == 'POST'&& url =='/users'){
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@gmail.com',
        })
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end('Not Found');
})

server.listen(3333)
