const User = require('./services');
const { getUserData } = require('./utils');

async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users))  
  } catch (error) {
    console.log(error);
  };
};

async function getUser(req, res, id) {
  try {
    const user = await User.findById(id);
    if(!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));  
    }
  } catch (error) {
    console.log(error);
  };
};

async function createUser(req, res) {
  try {
    const body = await getUserData(req);
    const { name, email } = JSON.parse(body);
    const newId = await User.findAll();
    const newUser = await User.create({
      id: newId.length + 1,
      name,
      email,
    });
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newUser));  
  } catch (error) {
    console.log(error);
  };
};

async function updateUser(req, res, id) {
  try {
    const user = await User.findById(id);
    if(!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }))
    } else {
      const body = await getUserData(req);
      const { name, email } = JSON.parse(body);
      const updatedUser = await User.update(id, {
        id: user.id,
        name: name || user.name,
        email: email || user.email,
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedUser));   
    };
  } catch (error) {
    console.log(error);
  };
};

async function deleteUser(req, res, id) {
  try {
    const user = await User.findById(id);
    if(!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      await User.remove(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: `User ${id} removed` }));  
    };
  } catch (error) {
    console.log(error);
  };
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
