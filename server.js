const http = require('http');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('./controllers');

const server = http.createServer((req, res) => {
  if(req.url === '/users' && req.method === 'GET'){
    getUsers(req, res);
  } else if(req.url.match(/\/users\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[2];
    getUser(req, res, Number(id));
  } else if(req.url === '/users' && req.method === 'POST') {
    createUser(req, res);
  } else if(req.url.match(/\/users\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    updateUser(req, res, Number(id));
  } else if(req.url.match(/\/users\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    deleteUser(req, res, Number(id));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  };
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
