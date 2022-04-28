const {
  addDirBooksHandler,
  getAllDirBooksHandler,
  getDirBooksByIdHandler,
  editDirBooksByIdHandler,
  deleteDirBooksByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addDirBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllDirBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getDirBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editDirBooksByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteDirBooksByIdHandler,
  },
];

module.exports = routes;