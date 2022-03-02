let { users } = require('./data.json');
const { writeDataToFile } = require('./utils');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

function findById(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

function create(user) {
  return new Promise((resolve, reject) => {
    users.push(user);
    writeDataToFile('data.json', users);
    resolve(user);
  });
};

function update(id, user) {
  return new Promise((resolve, reject) => {
    users[id-1] = user; 
    writeDataToFile('data.json', users);
    resolve(user);
  });
};

function remove(id) {
  return new Promise((resolve, reject) => {
    users = users.filter(user => user.id !== id);
    writeDataToFile('data.json', users);
    resolve();
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
